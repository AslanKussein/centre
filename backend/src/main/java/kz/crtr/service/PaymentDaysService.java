package kz.crtr.service;

import kz.crtr.dto.LocalValue;
import kz.crtr.dto.PaymentDaysResponseDto;

import java.time.ZonedDateTime;
import java.util.List;

public interface PaymentDaysService {
    List<PaymentDaysResponseDto> getPaymentDaysList(final LocalValue lang, final ZonedDateTime date);
}
