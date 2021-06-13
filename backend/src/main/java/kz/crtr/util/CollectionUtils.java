package kz.crtr.util;

import java.util.Arrays;
import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Stream;

public class CollectionUtils {

    public static boolean isEmpty(Collection col) {
        return col == null || col.isEmpty();
    }

    public static boolean isNotEmpty(Collection col) {
        return !isEmpty(col);
    }

    public static <T> boolean contains(Collection<T> col, T element) {
        return isNotEmpty(col) && col.contains(element);
    }

    public static <T> Stream<T> getStream(Collection<T> col) {
        return isNotEmpty(col) ? col.stream() : Stream.empty();
    }

    public static boolean equals(Set<?> set1, Set<?> set2) {
        if (set1 == null || set2 == null) {
            return false;
        }
        if (set1.size() != set2.size()) {
            return false;
        }
        return set1.containsAll(set2);
    }

    public static <T> boolean equals(Set<T> set1, T... arr) {
        Set<T> set2 = new LinkedHashSet<>(Arrays.asList(arr));
        if (set1 == null) {
            return false;
        }
        if (set1.size() != set2.size()) {
            return false;
        }
        return set1.containsAll(set2);
    }

    public static <T> T getFirst(Collection<T> collections) {
        return collections.iterator().next();
    }

}
