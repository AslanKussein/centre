package kz.mtszn.service;

import kz.mtszn.dto.LocalValue;
import kz.mtszn.dto.ResultDto;
import kz.mtszn.dto.paymentdays.ChangeLevelResponse;
import kz.mtszn.dto.paymentdays.PaymentDaysRequestDto;
import kz.mtszn.dto.paymentdays.PaymentDaysResponseDto;

import java.time.ZonedDateTime;
import java.util.List;

public interface PaymentDaysService {
    PaymentDaysRequestDto getMaxPayMonth();

    List<PaymentDaysResponseDto> getPaymentDaysList(final LocalValue lang, final ZonedDateTime date);

    ResultDto sendGraphicToEnpf(final ZonedDateTime zonedDateTime);

    ResultDto changeLevel(final ChangeLevelResponse dto);

    ResultDto deletePayDay(final ZonedDateTime zonedDateTime);

    ResultDto addNewPayDay(final ChangeLevelResponse dto);

    ResultDto lockUnlockPayDay(final PaymentDaysResponseDto dto);
}
