package kz.mtszn.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Authorization;
import kz.mtszn.dto.ErrorDto;
import kz.mtszn.dto.PregnancyRequestDto;
import kz.mtszn.dto.ResultDto;
import kz.mtszn.service.PregnancyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(value = "/api/pregn", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class PregnancyController {

    private final PregnancyService pregnancyService;

    @ApiOperation(value = "", notes = "Расчет потребности", response = ResultDto.class, authorizations = {
            @Authorization(value = "bearer-key")}, tags = {})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = ResultDto.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = ErrorDto.class)})
    @PostMapping("/runProc")
    public ResponseEntity<ResultDto> runProc(@RequestBody final PregnancyRequestDto dto) {
        return ResponseEntity.ok(pregnancyService.runProc(dto));
    }
}
