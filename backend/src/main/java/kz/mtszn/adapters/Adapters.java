package kz.mtszn.adapters;

import kz.mtszn.dto.CalcResponseDto;
import kz.mtszn.dto.DictDto;
import kz.mtszn.dto.DictionaryDto;
import kz.mtszn.dto.paymentdays.PaymentDaysResponseDto;
import kz.mtszn.util.PostgresMapResultScanner;
import kz.mtszn.util.StringUtils;

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
                .code(scanner.getString("code"))
                .nameRu(scanner.getString("NAMERU"))
                .nameKz(scanner.getString("NAME_KZ"))
                .build();
    }

    public static DictDto toDictDto(Map<String, Object> map) {
        PostgresMapResultScanner scanner = new PostgresMapResultScanner(map);

        return DictDto.builder()
                .id(scanner.getString("id"))
                .nameRu(scanner.getString("NAME_RU"))
                .nameKz(scanner.getString("NAME_KZ"))
                .build();
    }
}
