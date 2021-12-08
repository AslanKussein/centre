package kz.mtszn.service.impl;

import kz.mtszn.adapters.Adapters;
import kz.mtszn.dto.NodeDto;
import kz.mtszn.dto.ReportParDto;
import kz.mtszn.dto.ReportResponseDto;
import kz.mtszn.dto.ResultDto;
import kz.mtszn.models.ReportPar;
import kz.mtszn.models.repository.ReportParRepository;
import kz.mtszn.models.repository.ReportsRepository;
import kz.mtszn.service.ReportService;
import kz.mtszn.util.DateUtils;
import kz.mtszn.util.StringUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;
import static kz.mtszn.util.Utils.getStringResultExceptionDto;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ReportsRepository reportsRepository;
    private final ReportParRepository reportParRepository;
    private final JdbcTemplate jdbcTemplate;

    @Cacheable("getAllReportList")
    @Override
    public List<NodeDto> getAllReportList() {
        List<NodeDto> responseList = new ArrayList<>();
        List<NodeDto> nodeList;

        nodeList = reportsRepository.findAllByOrderById().stream().map(reports -> NodeDto.builder()
                        .id(reports.getId())
                        .parentId(reports.getParentId())
                        .nameRu(reports.getId() + " " + reports.getNameRu())
                        .nameKz(reports.getId() + " " + reports.getNameKz())
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

    private ReportParDto extracted(ReportPar reportPar) {
        ReportParDto.ReportParDtoBuilder builder = ReportParDto.builder();
        builder
                .num(reportPar.getNum())
                .repid(reportPar.getRepid())
                .lev(reportPar.getLev())
                .name(reportPar.getName())
                .nameKz(reportPar.getNameKz())
                .tip(reportPar.getTip())
                .required(reportPar.getRequired())
                .defval(reportPar.getDefval())
                .maxval(reportPar.getMaxval())
                .minval(reportPar.getMinval())
                .length(reportPar.getLength())
                .precision(reportPar.getPrecision())
                .fieldname(reportPar.getFieldname())
                .formatmask(reportPar.getFormatmask())
                .formName(reportPar.getFormName());

        if (StringUtils.isNotEmpty(reportPar.getLovNew())) {
            builder.dic(jdbcTemplate.queryForList(reportPar.getLovNew()).stream().map(Adapters::toDictDto).collect(Collectors.toList()));
        }

        return builder.build();
    }

    @Override
    public List<?> getRepParam(final Long repId) {
        return reportParRepository.findAllByRepidOrderByNum(repId)
                .stream()
                .map(this::extracted)
                .collect(Collectors.toList());
    }

    @Override
    public ResultDto createOrder(final ReportResponseDto body) {

        try {
            SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                    .withSchemaName("SOLIDARY")
                    .withProcedureName("rep_san_sub_51_version_2");

            Map<String, Object> inParamMap = new HashMap<>();
            inParamMap.put("P_DATESTART", DateUtils.convertToSqlDate(body.getBegin_date()));
            inParamMap.put("P_DATEEND", DateUtils.convertToSqlDate(body.getEnd_date()));
            inParamMap.put("BRID", body.getBrid());
            inParamMap.put("CUR_INS", body.getCur_ins() ? 1 : 0);
            inParamMap.put("CLOSE_PAY", body.getClose_pay() ? 1 : 0);

            SqlParameterSource in = new MapSqlParameterSource(inParamMap);
            Map<String, Object> execute = simpleJdbcCall.execute(in);

            System.out.println((String) execute.get("PNOTE"));
        } catch (Exception e) {
            return getStringResultExceptionDto(e);
        }
//
        return null;
    }
}
