package kz.mtszn.controller.cache;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;


/**
 * Ресурс для кэширования
 */
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/cache", produces = MediaType.APPLICATION_JSON_VALUE)
public class CacheResource {

    private final SliceCacheManager sliceCacheManager;

    @GetMapping("/getAllCaches")
    public ResponseEntity<Collection<?>> getAllCaches() {
        return ResponseEntity.ok(sliceCacheManager.getAllCaches());
    }

    @GetMapping("/clearAll/{cacheName}")
    public ResponseEntity<String> clearAll(@PathVariable String cacheName) {
        return ResponseEntity.ok(sliceCacheManager.clearCache(cacheName));
    }
}
