package kz.mtszn.util;

import kz.mtszn.dto.PageableDTO;

import java.util.Map;
import java.util.StringJoiner;

import static java.util.Objects.nonNull;

public class DbUtils {
    public static void initPageParams(Map<String, Object> paramMap, PageableDTO pageable) {
        if (nonNull(pageable)) {
            paramMap.put("limit", pageable.getPageSize());
            paramMap.put("offset", pageable.getPageNumber());
        }
    }

    public static String initLimitAndOffSet() {
        return " LIMIT :limit OFFSET :offset ";
    }

    public static String like(String value) {
        return StringUtils.isEmpty(value) ? null : value.toLowerCase() + "%";
    }

    public static String fullLike(String value) {
        return StringUtils.isEmpty(value) ? null : "%" + value.toLowerCase() + "%";
    }

    public static String startLike(String value) {
        return StringUtils.isEmpty(value) ? null : "%" + value.toLowerCase();
    }

    public static String castChar(String value) {
        return StringUtils.isEmpty(value) ? null : "'" + value.trim() + "'";
    }

    public static String toChar(String field) {
        return "to_char(".concat(field).concat(", 'dd.MM.yyyy')");
    }

    public static String getDicCode(String from, String text, String nameAs) {
        StringJoiner sql = new StringJoiner(" ");
        return sql.add("(").add(from.replace("@@", text)).add(")").add(nameAs).toString();
    }
}
