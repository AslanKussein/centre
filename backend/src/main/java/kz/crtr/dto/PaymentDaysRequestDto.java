package kz.crtr.dto;

import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class PaymentDaysRequestDto {
    private ZonedDateTime date;
}
