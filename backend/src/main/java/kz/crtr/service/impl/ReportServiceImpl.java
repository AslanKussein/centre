package kz.crtr.service.impl;

import kz.crtr.service.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    @Override
    public List<?> getAllReportList() {

        return new ArrayList<>();
    }
}
