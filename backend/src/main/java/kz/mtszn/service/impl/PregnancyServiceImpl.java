package kz.mtszn.service.impl;

import kz.mtszn.dto.PregnancyRequestDto;
import kz.mtszn.dto.ResultDto;
import kz.mtszn.service.PregnancyService;
import kz.mtszn.util.DateUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.Map;

import static kz.mtszn.util.Utils.getStringResultExceptionDto;

@RequiredArgsConstructor
@Service
@Log
public class PregnancyServiceImpl implements PregnancyService {

    private final JdbcTemplate jdbcTemplate;

    @Transactional
    @Override
    public ResultDto runProc(final PregnancyRequestDto dto) {
        ZonedDateTime dateTime = dto.getDateTime().withZoneSameInstant(ZoneId.of("Asia/Almaty"));

        try {
            SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                    .withSchemaName("SOLIDARY")
                    .withCatalogName("pn_doc")
                    .withProcedureName("estimate_need_0704");

            Map<String, Object> inParamMap = new HashMap<>();
            inParamMap.put("iMonth", DateUtils.convertToSqlDate(dateTime));
            inParamMap.put("iPnsp_Id", dto.getLevel());
            inParamMap.put("iRfbn_Id", dto.getBranch());
            inParamMap.put("iRfsp_id", dto.getDicId());

            SqlParameterSource in = new MapSqlParameterSource(inParamMap);
            simpleJdbcCall.execute(in);
        } catch (Exception e) {
            return getStringResultExceptionDto(e);
        }
        return new ResultDto<>(Boolean.TRUE, "График выплат за " + DateUtils.formatHuman(dateTime) + " успешно отправлен");
    }
}
