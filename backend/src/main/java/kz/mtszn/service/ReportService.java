package kz.mtszn.service;

import kz.mtszn.dto.NodeDto;
import kz.mtszn.dto.ReportResponseDto;
import kz.mtszn.dto.ResultDto;

import java.util.List;

public interface ReportService {
    List<NodeDto> getAllReportList();

    List<?> getRepParam(final Long repId);

    ResultDto createOrder(final ReportResponseDto body);
}
