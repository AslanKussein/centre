package kz.crtr.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDaysResponseDto {
    private String payDay;
    private ZonedDateTime payMonth;
    private String payMonthChar;
    private String stageBegin;
    private String stageEnd;
    private String statusLockDecode;
    private String statusLock;
}
