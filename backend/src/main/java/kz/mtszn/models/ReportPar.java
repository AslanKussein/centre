package kz.mtszn.models;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "s_rep_par_version_2", schema = "solidary")
public class ReportPar implements Serializable {
    @Id
    private Long num;
    private Long repid;
    private String lev;
    private String name;
    private String tip;
    private Long required;
    private String defval;
    private Long maxval;
    private Long minval;
    private Long length;
    private String precision;
    private String fieldname;
    private String formatmask;
    private String lovNew;
    private String nameKz;
    private String formName;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ReportPar reportPar = (ReportPar) o;
        return Objects.equals(repid, reportPar.repid);
    }

    @Override
    public int hashCode() {
        return 0;
    }
}
