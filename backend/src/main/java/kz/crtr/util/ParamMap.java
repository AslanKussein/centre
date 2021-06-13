package kz.crtr.util;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Set;

import static java.util.Objects.nonNull;

public class ParamMap<K, V> extends HashMap<K, V> {

    public Integer getInteger(K key) {
        V v = get(key);
        return v == null ? null : ((Integer) v);
    }

    public void putIfNonNull(ParamMap<K, V> map, K key, V data) {
        if (nonNull(data) && data.toString().length() > 0) {
            map.put(key, data);
        }
    }

    public Long getLong(K key) {
        V v = get(key);
        return v == null ? null : ((Long) v);
    }

    public String getString(K key) {
        V v = get(key);
        return v == null ? null : ((String) v);
    }

    public Boolean getBoolean(K key) {
        V v = get(key);
        return v == null ? null : ((Boolean) v);
    }

    public Date getDate(K key) {
        V v = get(key);
        return v == null ? null : ((Date) v);
    }

    public BigDecimal getBigDecimal(K key) {
        V v = get(key);
        return v == null ? null : ((BigDecimal) v);
    }

    public Set<String> getSet(K key) {
        V v = get(key);
        return v == null ? null : ((Set) v);
    }

    public <T extends Enum<T>> T getEnum(Class<T> enumType, K key) {
        return EnumUtils.valueOfOrNull(enumType, getString(key));
    }

    public boolean isNotEmptyString(K key) {
        return StringUtils.isNotEmpty(getString(key));
    }

    public boolean isNotNull(K key) {
        return nonNull(get(key));
    }

    public boolean isFalse(K key) {
        return BooleanUtils.isFalse(getBoolean(key));
    }

    public boolean isTrue(K key) {
        return BooleanUtils.isTrue(getBoolean(key));
    }

    public boolean isNotEmptyCollection(K key) {
        V v = get(key);
        return v != null && CollectionUtils.isNotEmpty((Collection) v);
    }

}
