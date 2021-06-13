package kz.crtr.service.impl;

import kz.crtr.adapters.Adapters;
import kz.crtr.dto.CalcResponseDto;
import kz.crtr.dto.LocalValue;
import kz.crtr.service.CalcService;
import kz.crtr.util.BundleMessageUtil;
import kz.crtr.util.ParamMap;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.StringJoiner;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Log
public class CalcServiceImpl implements CalcService {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Override
    public List<CalcResponseDto> getCalcData(final LocalValue lang) {
        ParamMap<String, Object> paramMap = new ParamMap<>();
        paramMap.put("branch", "0000");
        paramMap.put("lock", BundleMessageUtil.getLocaledValue(lang, "status.lock"));
        paramMap.put("unlock", BundleMessageUtil.getLocaledValue(lang, "status.unlock"));
        paramMap.put("notCalculated", BundleMessageUtil.getLocaledValue(lang, "not.calculated"));
        paramMap.put("calculated", BundleMessageUtil.getLocaledValue(lang, "calculated"));


        String query = new StringJoiner(" ")
                .add("Select a.rfrg_id id, '-1' idh, a.NAME, a.name_kz, null StatusLock, null StatusCalc")
                .add("from rfrg_region a union all")
                .add("Select r.RFBN_ID id, SubStr(r.RFBN_ID, 1, 2) idh, r.short_name name, r.SHORT_NAME_,")
                .add("decode(b.statuslock, 0, :unlock, 1, :lock, b.statuslock) statuslock,")
                .add("decode(b.statuscalc, 0, :notCalculated, 1, :calculated, b.statuscalc) statuscalc")
                .add("from rfbn_branch r, branch_prt b where r.rfbn_id = b.branch_id and r.RFBN_ID <> :branch")
                .toString();

        return namedParameterJdbcTemplate.queryForList(query, paramMap).stream().map(Adapters::toCalcResponseDto).collect(Collectors.toList());
    }
}
