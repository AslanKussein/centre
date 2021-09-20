package kz.mtszn.util;

public class BooleanUtils {
    public static boolean isFalse(Boolean value) {
        return !isTrue(value);
    }

    public static boolean isTrue(Boolean value) {
        return value != null && value;
    }
}
