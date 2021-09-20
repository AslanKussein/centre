package kz.mtszn.util;

import kz.mtszn.dto.ResultDto;
import lombok.extern.java.Log;

import java.util.logging.Level;

import static java.util.Objects.nonNull;

@Log
public class Utils {

    public static Boolean isNullOrEmpty(String value) {
        return (value == null || value.trim().isEmpty());
    }

    public static ResultDto<String> getStringResultExceptionDto(Exception e) {
        String cause = e.getMessage();
        if (nonNull(e.getCause())) {
            cause = e.getCause().getMessage();
        }
        log.log(Level.SEVERE, cause);
        return new ResultDto<>(Boolean.FALSE, cause);
    }
}
