package kz.mtszn.dto;

import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class PregnancyRequestDto {
    private ZonedDateTime dateTime;
    private String branch;
    private String level;
    private Long dicId;
}
