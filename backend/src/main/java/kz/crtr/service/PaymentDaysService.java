package kz.crtr.service;

import kz.crtr.dto.LocalValue;
import kz.crtr.dto.ResultDto;
import kz.crtr.dto.paymentdays.ChangeLevelResponse;
import kz.crtr.dto.paymentdays.PaymentDaysRequestDto;
import kz.crtr.dto.paymentdays.PaymentDaysResponseDto;

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
