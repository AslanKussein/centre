package kz.crtr.service;

import kz.crtr.dto.CalcResponseDto;
import kz.crtr.dto.LocalValue;

import java.util.List;

public interface CalcService {
    List<CalcResponseDto> getCalcData(final LocalValue lang);
}
