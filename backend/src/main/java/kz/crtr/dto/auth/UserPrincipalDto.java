package kz.crtr.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserPrincipalDto {
    private Long empId;
    private String username;
    private String accessToken;
    private String refreshToken;
    private Date expiresIn;
    private Boolean active;
    private Set<String> authorities;
    private Set<String> permissions;
}
