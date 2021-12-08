package kz.mtszn.service.impl;

import kz.mtszn.adapters.Adapters;
import kz.mtszn.dto.CalcResponseDto;
import kz.mtszn.dto.EstimateNeedDto;
import kz.mtszn.dto.LocalValue;
import kz.mtszn.dto.ResultDto;
import kz.mtszn.service.CalcService;
import kz.mtszn.util.BundleMessageUtil;
import kz.mtszn.util.DateUtils;
import kz.mtszn.util.ParamMap;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringJoiner;
import java.util.stream.Collectors;

import static kz.mtszn.util.Utils.getStringResultExceptionDto;

@RequiredArgsConstructor
@Service
@Log
public class CalcServiceImpl implements CalcService {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private final JdbcTemplate jdbcTemplate;

    @Override
    public List<CalcResponseDto> getCalcData(final LocalValue lang) {
        ParamMap<String, Object> paramMap = new ParamMap<>();
        paramMap.put("branch", "0000");
        paramMap.put("lock", BundleMessageUtil.getLocaledValue(lang, "status.lock"));
        paramMap.put("unlock", BundleMessageUtil.getLocaledValue(lang, "status.unlock"));
        paramMap.put("notCalculated", BundleMessageUtil.getLocaledValue(lang, "not.calculated"));
        paramMap.put("calculated", BundleMessageUtil.getLocaledValue(lang, "calculated"));

        String query = new StringJoiner(" ")
                .add("Select a.rfrg_id id, '0' parent, a.NAME, a.name_kz, null StatusLock, null StatusCalc")
                .add("from rfrg_region a union all")
                .add("Select r.RFBN_ID id, SubStr(r.RFBN_ID, 1, 2) idh, r.short_name name, r.SHORT_NAME_,")
                .add("decode(b.statuslock, 0, :unlock, 1, :lock, b.statuslock) statuslock,")
                .add("decode(b.statuscalc, 0, :notCalculated, 1, :calculated, b.statuscalc) statuscalc")
                .add("from rfbn_branch r, branch_prt b where r.rfbn_id = b.branch_id and r.RFBN_ID <> :branch")
                .toString();

        return namedParameterJdbcTemplate.queryForList(query, paramMap).stream().map(Adapters::toCalcResponseDto).collect(Collectors.toList());
    }

    @Override
    public ResultDto estimateNeed(final LocalValue lang, final EstimateNeedDto dto) {
        ZonedDateTime dateTime = dto.getTime().withZoneSameInstant(ZoneId.of("Asia/Almaty"));

        try {
            SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                    .withSchemaName("SOLIDARY")
                    .withCatalogName("pn_doc")
                    .withProcedureName("Estimate_Need");

            Map<String, Object> inParamMap = new HashMap<>();
            inParamMap.put("iopMonth", DateUtils.convertToSqlDate(dateTime));
            inParamMap.put("Irfbr_Id", dto.getBranchId());
            inParamMap.put("SHEDULER_ID", null);

            SqlParameterSource in = new MapSqlParameterSource(inParamMap);
            simpleJdbcCall.execute(in);
        } catch (Exception e) {
            return getStringResultExceptionDto(e);
        }
        return new ResultDto<>(Boolean.TRUE, "Расчет потребности сформирован");
    }
}
