package kz.mtszn.dto;

import kz.mtszn.models.DBranch;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long empId;
    private String username;
    private DBranch branch;
    private String fullName;
    private Set<String> availableSystems;
}
