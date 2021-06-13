package kz.crtr.adapters;

import kz.crtr.dto.CalcResponseDto;
import kz.crtr.dto.PaymentDaysResponseDto;
import kz.crtr.util.PostgresMapResultScanner;
import kz.crtr.util.StringUtils;

import java.util.Map;

public class Adapters {

    public static PaymentDaysResponseDto toPaymentDaysResponseDto(Map<String, Object> map) {
        PostgresMapResultScanner scanner = new PostgresMapResultScanner(map);

        return PaymentDaysResponseDto.builder()
                .payDay(scanner.getString("pay_day"))
                .payMonth(scanner.getZonedDateTime("pay_month"))
                .payMonthChar(scanner.getString("pay_monthChar"))
                .stageBegin(scanner.getString("stagebegin"))
                .stageEnd(StringUtils.nvl(scanner.getString("stageend"), ""))
                .statusLockDecode(StringUtils.nvl(scanner.getString("statusLockDecode"), ""))
                .statusLock(StringUtils.nvl(scanner.getString("statuslock"), ""))
                .build();
    }

    public static CalcResponseDto toCalcResponseDto(Map<String, Object> map) {
        PostgresMapResultScanner scanner = new PostgresMapResultScanner(map);

        return CalcResponseDto.builder()
                .id(scanner.getString("id"))
                .idh(scanner.getString("idh"))
                .name(scanner.getString("name"))
                .nameKz(scanner.getString("name_kz"))
                .statusLock(scanner.getString("statuslock"))
                .statusCalc(scanner.getString("statuscalc"))
                .build();
    }
}
