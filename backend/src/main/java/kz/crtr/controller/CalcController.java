package kz.crtr.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Authorization;
import kz.crtr.dto.CalcResponseDto;
import kz.crtr.dto.ErrorDto;
import kz.crtr.dto.LocalValue;
import kz.crtr.service.CalcService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/api/calc", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class CalcController {

    private final CalcService calcService;

    @ApiOperation(value = "", notes = "Расчет потребности", response = CalcResponseDto.class, authorizations = {
            @Authorization(value = "bearer-key")}, tags = {})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = CalcResponseDto.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = ErrorDto.class)})
    @PostMapping("/getCalcData")
    public ResponseEntity<List<CalcResponseDto>> getCalcData(@RequestHeader final LocalValue lang) {
        return ResponseEntity.ok(calcService.getCalcData(lang));
    }
}
