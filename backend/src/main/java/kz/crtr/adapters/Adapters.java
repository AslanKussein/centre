package kz.crtr.adapters;

import kz.crtr.dto.CalcResponseDto;
import kz.crtr.dto.DictionaryDto;
import kz.crtr.dto.paymentdays.PaymentDaysResponseDto;
import kz.crtr.util.PostgresMapResultScanner;
import kz.crtr.util.StringUtils;

import java.util.Map;

public class Adapters {

    public static PaymentDaysResponseDto toPaymentDaysResponseDto(Map<String, Object> map) {
        PostgresMapResultScanner scanner = new PostgresMapResultScanner(map);

        return PaymentDaysResponseDto.builder()
                .payDay(scanner.getDate("pay_day"))
                .payDayChar(scanner.getString("pay_dayChar"))
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
                .parent(scanner.getString("parent"))
                .name(scanner.getString("name"))
                .nameKz(scanner.getString("name_kz"))
                .statusLock(scanner.getString("statuslock"))
                .statusCalc(scanner.getString("statuscalc"))
                .build();
    }

    public static DictionaryDto toDictionaryDto(Map<String, Object> map) {
        PostgresMapResultScanner scanner = new PostgresMapResultScanner(map);

        return DictionaryDto.builder()
                .id(scanner.getLong("id"))
                .nameRu(scanner.getString("NAMERU"))
                .nameKz(scanner.getString("NAME_KZ"))
                .build();
    }
}
