package kz.crtr.service;

import kz.crtr.dto.auth.UserPrincipalDto;

import javax.servlet.http.HttpServletRequest;
import java.util.Set;

public interface PermissionService {
    UserPrincipalDto getAllPermissionList(HttpServletRequest request);

    Set<String> getRoles(HttpServletRequest request);

    UserPrincipalDto validateToken(String token);
}
