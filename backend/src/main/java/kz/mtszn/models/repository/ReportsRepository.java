package kz.mtszn.models.repository;

import kz.mtszn.models.Reports;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportsRepository extends JpaRepository<Reports, Long> {

    List<Reports> findAllByOrderById();
}
