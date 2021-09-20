package kz.mtszn.service.impl;

import kz.mtszn.adapters.Adapters;
import kz.mtszn.dto.DictionaryDto;
import kz.mtszn.service.DictionaryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.StringJoiner;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Log
public class DictionaryServiceImpl implements DictionaryService {

    private final JdbcTemplate jdbcTemplate;

    @Cacheable("getPaymentTypes")
    @Override
    public List<DictionaryDto> getPaymentTypes() {
        String query = new StringJoiner(" ")
                .add("select ridt_id id, ridt_id as code, ridt_id||' '||name NAMERU, ridt_id||' '||NAME_KZ NAME_KZ from solidary.ridt_doc_type order by ridt_id")
                .toString();

        return jdbcTemplate.queryForList(query).stream().map(Adapters::toDictionaryDto).collect(Collectors.toList());
    }

    @Cacheable("getRfspSinglePayments")
    @Override
    public List<DictionaryDto> getRfspSinglePayments() {
        String query = new StringJoiner(" ")
                .add("select id, rfpm_id as code, name as NAMERU, NAME_KZ  from solidary.RFSP_SINGLE_PAYMENTS order by id")
                .toString();

        return jdbcTemplate.queryForList(query).stream().map(Adapters::toDictionaryDto).collect(Collectors.toList());
    }
}
