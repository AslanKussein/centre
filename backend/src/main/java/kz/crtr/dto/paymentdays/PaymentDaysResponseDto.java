package kz.crtr.dto.paymentdays;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDaysResponseDto {
    private Date payDay;
    private String payDayChar;
    private ZonedDateTime payMonth;
    private String payMonthChar;
    private String stageBegin;
    private String stageEnd;
    private String statusLockDecode;
    private String statusLock;
}
