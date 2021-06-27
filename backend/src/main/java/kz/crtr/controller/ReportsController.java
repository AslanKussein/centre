package kz.crtr.controller;

import kz.crtr.service.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping(value = "/api/reports", produces = MediaType.APPLICATION_JSON_VALUE)
public class ReportsController {

    private final ReportService reportService;

    @GetMapping("/getAllReportList")
    public ResponseEntity<List<?>> getAllReportList() {
        return ResponseEntity.ok(reportService.getAllReportList());
    }
}
