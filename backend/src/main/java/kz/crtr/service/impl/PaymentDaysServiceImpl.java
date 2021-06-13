package kz.crtr.service.impl;

import kz.crtr.adapters.Adapters;
import kz.crtr.dto.LocalValue;
import kz.crtr.dto.PaymentDaysResponseDto;
import kz.crtr.service.PaymentDaysService;
import kz.crtr.util.BundleMessageUtil;
import kz.crtr.util.DateUtils;
import kz.crtr.util.ParamMap;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.StringJoiner;
import java.util.stream.Collectors;

import static kz.crtr.util.DateUtils.firstDayOfMonth;
import static kz.crtr.util.DateUtils.lastDayOfMonth;

@RequiredArgsConstructor
@Service
@Log
public class PaymentDaysServiceImpl implements PaymentDaysService {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Override
    public List<PaymentDaysResponseDto> getPaymentDaysList(final LocalValue lang, final ZonedDateTime date) {
        ZonedDateTime of = date.withZoneSameInstant(ZoneId.of("Asia/Almaty"));

        ParamMap<String, Object> paramMap = new ParamMap<>();

        paramMap.put("pay_monthBegin", DateUtils.convertToSqlDate(firstDayOfMonth(of)));
        paramMap.put("pay_monthEnd", DateUtils.convertToSqlDate(lastDayOfMonth(of)));
        paramMap.put("lock", BundleMessageUtil.getLocaledValue(lang, "status.lock"));
        paramMap.put("unlock", BundleMessageUtil.getLocaledValue(lang, "status.unlock"));

        String query = new StringJoiner(" ")
                .add("select To_char(pay_day, 'dd.mm.yyyy') as pay_day,pay_month,To_char(pay_month,'mm.yyyy') pay_monthChar, StageBegin,StageEnd,")
                .add("deCode(statuslock,1,:lock,0,:unlock) statusLockDecode,")
                .add("statuslock from pndy_daypay")
                .add("where pay_month between :pay_monthBegin and :pay_monthEnd")
                .add("order by pay_month, pay_day")
                .toString();

        return namedParameterJdbcTemplate.queryForList(query, paramMap).stream().map(Adapters::toPaymentDaysResponseDto).collect(Collectors.toList());
    }
}
