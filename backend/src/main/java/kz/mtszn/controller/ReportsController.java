package kz.mtszn.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Authorization;
import kz.mtszn.dto.*;
import kz.mtszn.service.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping(value = "/api/reports", produces = MediaType.APPLICATION_JSON_VALUE)
public class ReportsController {

    private final ReportService reportService;

    @ApiOperation(value = "", notes = "Список отчетов", response = NodeDto.class, authorizations = {
            @Authorization(value = "bearer-key")}, tags = {})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = NodeDto.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = ErrorDto.class)})
    @GetMapping("/getAllReportList")
    public ResponseEntity<List<NodeDto>> getAllReportList() {
        return ResponseEntity.ok(reportService.getAllReportList());
    }

    @ApiOperation(value = "", notes = "Параметры отчета по ID", response = ReportParDto.class, authorizations = {
            @Authorization(value = "bearer-key")}, tags = {})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = ReportParDto.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = ErrorDto.class)})
    @GetMapping("/getRepParam/{repId}")
    public ResponseEntity<List<?>> getRepParam(@PathVariable final Long repId) {
        return ResponseEntity.ok(reportService.getRepParam(repId));
    }

    @PostMapping("/createOrder")
    public ResponseEntity<ResultDto> createOrder(@RequestBody final ReportResponseDto body) {
        return ResponseEntity.ok(reportService.createOrder(body));
    }
}
