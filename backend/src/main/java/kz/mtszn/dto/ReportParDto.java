package kz.mtszn.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReportParDto {
    private Long num;
    private Long repid;
    private String lev;
    private String name;
    private String tip;
    private Long required;
    private String defval;
    private Long maxval;
    private Long minval;
    private Long length;
    private String precision;
    private String fieldname;
    private String formatmask;
    private String formName;
    private String lovNew;
    private String nameKz;
    private Object dic;
}
