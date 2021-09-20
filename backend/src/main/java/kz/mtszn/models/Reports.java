package kz.mtszn.models;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Data
@Entity
@Table(name = "s_reps", schema = "solidary")
public class Reports implements Serializable {
    @Id
    private Long id;
    @Column(name = "idh")
    private Long parentId;
    @Column(name = "name")
    private String nameRu;
    private String nameKz;
}
