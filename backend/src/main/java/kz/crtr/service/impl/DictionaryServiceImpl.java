package kz.crtr.service.impl;

import kz.crtr.adapters.Adapters;
import kz.crtr.dto.DictionaryDto;
import kz.crtr.service.DictionaryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
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

    @Override
    public List<DictionaryDto> getPaymentTypes() {
        String query = new StringJoiner(" ")
                .add("select ridt_id id, ridt_id||' '||name NAMERU, ridt_id||' '||NAME_KZ NAME_KZ from ridt_doc_type order by ridt_id")
                .toString();

        return jdbcTemplate.queryForList(query).stream().map(Adapters::toDictionaryDto).collect(Collectors.toList());
    }
}
