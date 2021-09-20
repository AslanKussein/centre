package kz.mtszn.dto.paymentdays;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChangeLevelResponse {
    private ZonedDateTime payDay;
    private String stageBegin;
    private String stageEnd;
}
