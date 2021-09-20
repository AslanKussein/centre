package kz.mtszn.service;

import kz.mtszn.dto.CalcResponseDto;
import kz.mtszn.dto.LocalValue;

import java.util.List;

public interface CalcService {
    List<CalcResponseDto> getCalcData(final LocalValue lang);
}
