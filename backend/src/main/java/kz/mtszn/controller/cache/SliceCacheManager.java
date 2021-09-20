package kz.mtszn.controller.cache;

import kz.mtszn.util.StringUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

import static java.util.Objects.nonNull;

@RequiredArgsConstructor
@Slf4j
@Component
@Configuration
@EnableCaching
public class SliceCacheManager {

    private final CacheManager cacheManager;

    public void clearAll() {
        cacheManager.getCacheNames().forEach(cacheName -> {
            log.info("clearing cache name {}", cacheName);
            Objects.requireNonNull(getCacheByName(cacheName)).clear();
        });
    }

    @Async
    public void clear(String cacheName, String key) {
        if (nonNull(getCacheByName(cacheName))) {
            if (StringUtils.isNotEmpty(key)) {
                Objects.requireNonNull(getCacheByName(cacheName)).evict(key);
            } else {
                Objects.requireNonNull(getCacheByName(cacheName)).clear();
            }
        }
    }

    public void put(String cacheName, String key, Object object) {
        if (nonNull(getCacheByName(cacheName))) {
            Objects.requireNonNull(getCacheByName(cacheName)).putIfAbsent(key, object);
        }
    }

    private Cache getCacheByName(String cacheName) {
        Cache cache = cacheManager.getCache(cacheName);
        if (nonNull(cache)) {
            return cache;
        }
        return null;
    }

    public List<String> caches() {
        return new ArrayList<>(cacheManager.getCacheNames());
    }

    public String clearCache(String cacheName) {
        Cache cache = cacheManager.getCache(cacheName);
        Objects.requireNonNull(cache).clear();
        return "success";
    }

    public Collection<String> getAllCaches() {
        return cacheManager.getCacheNames();
    }
}
