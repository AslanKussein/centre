package kz.crtr.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Authorization;
import kz.crtr.dto.DictionaryDto;
import kz.crtr.dto.ErrorDto;
import kz.crtr.service.DictionaryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/api/dic", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class DictionaryController {

    private final DictionaryService dictionaryService;

    @ApiOperation(value = "", notes = "Тип выплаты", response = DictionaryDto.class, authorizations = {
            @Authorization(value = "bearer-key")}, tags = {})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = List.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = ErrorDto.class)})
    @GetMapping("/getPaymentTypes")
    public ResponseEntity<List<DictionaryDto>> getPaymentTypes() {
        return ResponseEntity.ok(dictionaryService.getPaymentTypes());
    }
}
