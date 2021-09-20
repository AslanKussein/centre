package kz.mtszn.util;

public class EnumUtils {

    public static <T extends Enum<T>> T valueOfOrNull(Class<T> enumType, String name) {
        try {
            return Enum.valueOf(enumType, name);
        } catch (NullPointerException npe) {
            return null;
        }
    }

}
