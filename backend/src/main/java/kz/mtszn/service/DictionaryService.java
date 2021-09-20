package kz.mtszn.service;

import kz.mtszn.dto.DictionaryDto;

import java.util.List;

public interface DictionaryService {
    List<DictionaryDto> getPaymentTypes();

    List<DictionaryDto> getRfspSinglePayments();
}
