package kz.mtszn.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReportResponseDto {
    private Long repId;
    private String brid;
    private ZonedDateTime begin_date;
    private ZonedDateTime end_date;
    private Boolean close_pay;
    private Boolean cur_ins;

}
