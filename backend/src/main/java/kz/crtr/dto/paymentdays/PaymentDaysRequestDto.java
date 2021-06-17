package kz.crtr.dto.paymentdays;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PaymentDaysRequestDto {
    private ZonedDateTime date;
}
