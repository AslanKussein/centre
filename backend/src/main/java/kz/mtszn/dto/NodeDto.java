package kz.mtszn.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NodeDto implements Serializable {
    private Long id;
    private Long parentId;
    private String nameRu;
    private String nameKz;
    private List<NodeDto> children;
}
