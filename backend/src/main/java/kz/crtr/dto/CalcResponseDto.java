package kz.crtr.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CalcResponseDto {
    private String id;
    private String idh;
    private String name;
    private String nameKz;
    private String statusLock;
    private String statusCalc;
}
