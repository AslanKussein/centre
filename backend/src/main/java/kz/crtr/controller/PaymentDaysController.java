package kz.crtr.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Authorization;
import kz.crtr.dto.ErrorDto;
import kz.crtr.dto.LocalValue;
import kz.crtr.dto.PaymentDaysRequestDto;
import kz.crtr.dto.PaymentDaysResponseDto;
import kz.crtr.service.PaymentDaysService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/api/payment-days", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class PaymentDaysController {

    private final PaymentDaysService paymentDaysService;

    @ApiOperation(value = "", notes = "Ведение дней выплат", response = PaymentDaysResponseDto.class, authorizations = {
            @Authorization(value = "bearer-key")}, tags = {})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = PaymentDaysResponseDto.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = ErrorDto.class)})
    @PostMapping("/getPaymentDaysList")
    public ResponseEntity<List<PaymentDaysResponseDto>> getPaymentDaysList(@RequestHeader final LocalValue lang,
                                                                           @RequestBody final PaymentDaysRequestDto dto) {
        return ResponseEntity.ok(paymentDaysService.getPaymentDaysList(lang, dto.getDate()));
    }
}
