package kz.mtszn.models.repository;

import kz.mtszn.models.ReportPar;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportParRepository extends JpaRepository<ReportPar, Long> {
    List<ReportPar> findAllByRepidOrderByNum(final Long repId);
}
