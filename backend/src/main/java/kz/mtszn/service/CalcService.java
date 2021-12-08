package kz.mtszn.service;

import kz.mtszn.dto.CalcResponseDto;
import kz.mtszn.dto.EstimateNeedDto;
import kz.mtszn.dto.LocalValue;
import kz.mtszn.dto.ResultDto;

import java.util.List;

public interface CalcService {
    List<CalcResponseDto> getCalcData(final LocalValue lang);

    ResultDto estimateNeed(final LocalValue lang, final EstimateNeedDto dto);
}
