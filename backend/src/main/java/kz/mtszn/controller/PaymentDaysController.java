package kz.mtszn.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Authorization;
import kz.mtszn.dto.ErrorDto;
import kz.mtszn.dto.LocalValue;
import kz.mtszn.dto.ResultDto;
import kz.mtszn.dto.paymentdays.ChangeLevelResponse;
import kz.mtszn.dto.paymentdays.PaymentDaysRequestDto;
import kz.mtszn.dto.paymentdays.PaymentDaysResponseDto;
import kz.mtszn.service.PaymentDaysService;
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

    @ApiOperation(value = "", notes = "Максимальный день", response = PaymentDaysRequestDto.class, authorizations = {
            @Authorization(value = "bearer-key")}, tags = {})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = PaymentDaysRequestDto.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = ErrorDto.class)})
    @GetMapping("/getMaxPayMonth")
    public ResponseEntity<PaymentDaysRequestDto> getMaxPayMonth() {
        return ResponseEntity.ok(paymentDaysService.getMaxPayMonth());
    }

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

    @ApiOperation(value = "", notes = "Отправить граффик в енпф", response = ResultDto.class, authorizations = {
            @Authorization(value = "bearer-key")}, tags = {})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = ResultDto.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = ErrorDto.class)})
    @PostMapping("/sendGraphicToEnpf")
    public ResponseEntity<ResultDto> sendGraphicToEnpf(@RequestBody final PaymentDaysRequestDto dto) {
        return ResponseEntity.ok(paymentDaysService.sendGraphicToEnpf(dto.getDate()));
    }

    @ApiOperation(value = "", notes = "Изменить этапы", response = ResultDto.class, authorizations = {
            @Authorization(value = "bearer-key")}, tags = {})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = ResultDto.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = ErrorDto.class)})
    @PostMapping("/changeLevel")
    public ResponseEntity<ResultDto> changeLevel(@RequestBody final ChangeLevelResponse dto) {
        return ResponseEntity.ok(paymentDaysService.changeLevel(dto));
    }

    @ApiOperation(value = "", notes = "Удалить день выплаты", response = ResultDto.class, authorizations = {
            @Authorization(value = "bearer-key")}, tags = {})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = ResultDto.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = ErrorDto.class)})
    @PostMapping("/deletePayDay")
    public ResponseEntity<ResultDto> deletePayDay(@RequestBody final PaymentDaysRequestDto dto) {
        return ResponseEntity.ok(paymentDaysService.deletePayDay(dto.getDate()));
    }

    @ApiOperation(value = "", notes = "Новый день выплаты", response = ResultDto.class, authorizations = {
            @Authorization(value = "bearer-key")}, tags = {})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = ResultDto.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = ErrorDto.class)})
    @PostMapping("/addNewPayDay")
    public ResponseEntity<ResultDto> addNewPayDay(@RequestBody final ChangeLevelResponse dto) {
        return ResponseEntity.ok(paymentDaysService.addNewPayDay(dto));
    }

    @ApiOperation(value = "", notes = "Блокировка/Разблокировка дней выплаты", response = ResultDto.class, authorizations = {
            @Authorization(value = "bearer-key")}, tags = {})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = ResultDto.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = ErrorDto.class)})
    @PostMapping("/lockUnlockPayDay")
    public ResponseEntity<ResultDto> lockUnlockPayDay(@RequestBody final PaymentDaysResponseDto dto) {
        return ResponseEntity.ok(paymentDaysService.lockUnlockPayDay(dto));
    }
}
