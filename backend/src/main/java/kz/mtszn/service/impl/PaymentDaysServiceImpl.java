package kz.mtszn.service.impl;

import kz.mtszn.adapters.Adapters;
import kz.mtszn.dto.LocalValue;
import kz.mtszn.dto.ResultDto;
import kz.mtszn.dto.paymentdays.ChangeLevelResponse;
import kz.mtszn.dto.paymentdays.PaymentDaysRequestDto;
import kz.mtszn.dto.paymentdays.PaymentDaysResponseDto;
import kz.mtszn.security.IAuthenticationFacade;
import kz.mtszn.service.PaymentDaysService;
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

import static kz.mtszn.util.DateUtils.firstDayOfMonth;
import static kz.mtszn.util.DateUtils.lastDayOfMonth;
import static kz.mtszn.util.Utils.getStringResultExceptionDto;

@RequiredArgsConstructor
@Service
@Log
public class PaymentDaysServiceImpl implements PaymentDaysService {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private final JdbcTemplate jdbcTemplate;
    private final IAuthenticationFacade authenticationFacade;

    @Override
    public PaymentDaysRequestDto getMaxPayMonth() {
        String query = "select max(pay_month) from SOLIDARY.pndy_daypay";
        return PaymentDaysRequestDto.builder().date(jdbcTemplate.queryForObject(query, ZonedDateTime.class)).build();
    }

    @Override
    public List<PaymentDaysResponseDto> getPaymentDaysList(final LocalValue lang, final ZonedDateTime date) {
        ZonedDateTime of = date.withZoneSameInstant(ZoneId.of("Asia/Almaty"));

        ParamMap<String, Object> paramMap = new ParamMap<>();

        paramMap.put("pay_monthBegin", DateUtils.convertToSqlDate(firstDayOfMonth(of)));
        paramMap.put("pay_monthEnd", DateUtils.convertToSqlDate(lastDayOfMonth(of)));
        paramMap.put("lock", BundleMessageUtil.getLocaledValue(lang, "status.lock"));
        paramMap.put("unlock", BundleMessageUtil.getLocaledValue(lang, "status.unlock"));

        String query = new StringJoiner(" ")
                .add("select pay_month, pay_day, To_char(pay_day, 'dd.mm.yyyy') as pay_dayChar, to_char(pay_month,'mm.yyyy') pay_monthChar, StageBegin,StageEnd,")
                .add("deCode(statuslock,1,:lock,0,:unlock) statusLockDecode,")
                .add("statuslock from pndy_daypay")
                .add("where pay_month between :pay_monthBegin and :pay_monthEnd")
                .add("order by pay_month, pay_day")
                .toString();

        return namedParameterJdbcTemplate.queryForList(query, paramMap).stream().map(Adapters::toPaymentDaysResponseDto).collect(Collectors.toList());
    }

    @Override
    public ResultDto sendGraphicToEnpf(final ZonedDateTime zonedDateTime) {
        ZonedDateTime dateTime = zonedDateTime.withZoneSameInstant(ZoneId.of("Asia/Almaty"));

        try {
            SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                    .withSchemaName("SOLIDARY")
                    .withCatalogName("pn_enpf")
                    .withProcedureName("cr_xml_sched");

            Map<String, Object> inParamMap = new HashMap<>();
            inParamMap.put("iopMonth", DateUtils.convertToSqlDate(dateTime));

            SqlParameterSource in = new MapSqlParameterSource(inParamMap);
            simpleJdbcCall.execute(in);
        } catch (Exception e) {
            return getStringResultExceptionDto(e);
        }
        return new ResultDto<>(Boolean.TRUE, "График выплат за " + DateUtils.formatHuman(dateTime) + " успешно отправлен");
    }

    @Override
    public ResultDto changeLevel(final ChangeLevelResponse dto) {
        Map<String, Object> execute;
        ZonedDateTime dateTime = dto.getPayDay().withZoneSameInstant(ZoneId.of("Asia/Almaty"));
        try {
            SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                    .withSchemaName("SOLIDARY")
                    .withCatalogName("PKG_DAY_PAY_WL")
                    .withProcedureName("upd_stage");

            Map<String, Object> inParamMap = new HashMap<>();

            inParamMap.put("iPay_Day", DateUtils.convertToSqlDate(dateTime));
            inParamMap.put("iStageBegin", dto.getStageBegin());
            inParamMap.put("iStageEnd", dto.getStageEnd());
            inParamMap.put("empId", authenticationFacade.getUser().getEmpId());

            SqlParameterSource in = new MapSqlParameterSource(inParamMap);
            execute = simpleJdbcCall.execute(in);
        } catch (Exception e) {
            return getStringResultExceptionDto(e);
        }
        return new ResultDto<>(Boolean.TRUE, "Этап успешно изменен " + DateUtils.formatHuman(dateTime));
    }

    @Override
    public ResultDto deletePayDay(final ZonedDateTime zonedDateTime) {
        ZonedDateTime dateTime = zonedDateTime.withZoneSameInstant(ZoneId.of("Asia/Almaty"));
        try {
            SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                    .withSchemaName("SOLIDARY")
                    .withCatalogName("PKG_DAY_PAY_WL")
                    .withProcedureName("del_pay_day");

            Map<String, Object> inParamMap = new HashMap<>();

            inParamMap.put("iPay_Day", DateUtils.convertToSqlDate(dateTime));
            inParamMap.put("empId", authenticationFacade.getUser().getEmpId());

            SqlParameterSource in = new MapSqlParameterSource(inParamMap);
            simpleJdbcCall.execute(in);
        } catch (Exception e) {
            return getStringResultExceptionDto(e);
        }
        return new ResultDto<>(Boolean.TRUE, "День выплаты" + DateUtils.formatHuman(dateTime) + " успешно удалено");
    }

    @Override
    public ResultDto addNewPayDay(final ChangeLevelResponse dto) {
        ZonedDateTime dateTime = dto.getPayDay().withZoneSameInstant(ZoneId.of("Asia/Almaty"));
        try {
            SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                    .withSchemaName("SOLIDARY")
                    .withCatalogName("PKG_DAY_PAY_WL")
                    .withProcedureName("new_pay_day");

            Map<String, Object> inParamMap = new HashMap<>();

            inParamMap.put("iPay_Day", DateUtils.convertToSqlDate(dateTime));
            inParamMap.put("iPay_Month", DateUtils.convertToSqlDate(dateTime));
            inParamMap.put("iStageBegin", dto.getStageBegin());
            inParamMap.put("iStageEnd", dto.getStageEnd());
            inParamMap.put("empId", authenticationFacade.getUser().getEmpId());

            SqlParameterSource in = new MapSqlParameterSource(inParamMap);
            simpleJdbcCall.execute(in);
        } catch (Exception e) {
            return getStringResultExceptionDto(e);
        }
        return new ResultDto<>(Boolean.TRUE, "Новый день выплаты " + DateUtils.formatHuman(dateTime) + "добавлено");
    }

    @Override
    public ResultDto lockUnlockPayDay(final PaymentDaysResponseDto dto) {
        try {
            SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                    .withSchemaName("SOLIDARY")
                    .withCatalogName("PKG_DAY_PAY_WL")
                    .withProcedureName("lock_pay_day");

            Map<String, Object> inParamMap = new HashMap<>();

            inParamMap.put("iPay_Day", DateUtils.convertToSqlDate(dto.getPayDay()));
            inParamMap.put("iStatus", dto.getStatusLock());
//            inParamMap.put("iRfbn_id", dto.getBranchId());
//            inParamMap.put("iStage", dto.get());
            inParamMap.put("empId", authenticationFacade.getUser().getEmpId());

            SqlParameterSource in = new MapSqlParameterSource(inParamMap);
            simpleJdbcCall.execute(in);
        } catch (Exception e) {
            return getStringResultExceptionDto(e);
        }
        return new ResultDto<>(Boolean.TRUE, "График выплат за " + " успешно отправлен");
    }
}
