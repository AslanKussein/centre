package kz.mtszn.service;

import kz.mtszn.dto.PregnancyRequestDto;
import kz.mtszn.dto.ResultDto;

public interface PregnancyService {
    ResultDto runProc(final PregnancyRequestDto dto);
}
