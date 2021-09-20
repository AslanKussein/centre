package kz.mtszn.service.impl;

import kz.mtszn.dto.NodeDto;
import kz.mtszn.models.repository.ReportsRepository;
import kz.mtszn.service.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ReportsRepository reportsRepository;

    @Cacheable("getAllReportList")
    @Override
    public List<NodeDto> getAllReportList() {
        List<NodeDto> responseList = new ArrayList<>();
        List<NodeDto> nodeList;

        nodeList = reportsRepository.findAllByOrderById().stream().map(reports -> NodeDto.builder()
                .id(reports.getId())
                .parentId(reports.getParentId())
                .nameRu(isNull(reports.getParentId()) ? reports.getId() + " " + reports.getNameRu() : "")
                .nameKz(isNull(reports.getParentId()) ? reports.getId() + " " + reports.getNameKz() : "")
                .build())
                .collect(Collectors.toList());

        getNodeParent(responseList, nodeList);

        return responseList;
    }

    private void getNodeParent(List<NodeDto> responseList, List<NodeDto> list) {
        for (NodeDto nodeDto : list) {
            if (isNull(nodeDto.getParentId())) {
                nodeDto.setChildren(findByParentId(list, nodeDto.getId()));
                responseList.add(nodeDto);
            }
        }
    }

    private List<NodeDto> findByParentId(List<NodeDto> responseList, Long id) {
        List<NodeDto> list = new ArrayList<>();
        for (NodeDto nodeDto : responseList) {
            if (nonNull(nodeDto.getParentId()) && nodeDto.getParentId().equals(id)) {
                NodeDto node = NodeDto.builder()
                        .id(nodeDto.getId())
                        .nameRu(nodeDto.getNameRu())
                        .nameKz(nodeDto.getNameKz())
                        .build();
                list.add(node);
            }
        }
        return list;
    }
}
