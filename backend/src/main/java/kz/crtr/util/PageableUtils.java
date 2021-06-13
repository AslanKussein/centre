package kz.crtr.util;

import kz.crtr.dto.PageableDTO;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;

@Slf4j
@UtilityClass
public class PageableUtils {
    public static PageRequest createPageRequest(PageableDTO dto) {
//        if (StringUtils.isNotEmpty(dto.getSortBy()) && !dto.getSortBy().equals("10")) {
//            Sort sort;
//            if (dto.getDirection().isAscending()) {
//                sort = Sort.by(dto.getSortBy()).ascending();
//            } else {
//                sort = Sort.by(dto.getSortBy()).descending();
//            }
//            return PageRequest.of(dto.getPageNumber(), dto.getPageSize(), sort);
//        }
        return PageRequest.of(dto.getPageNumber(), dto.getPageSize());
    }
}
