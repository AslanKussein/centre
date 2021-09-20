package kz.mtszn.service;

import kz.mtszn.dto.auth.UserPrincipalDto;

import javax.servlet.http.HttpServletRequest;

public interface PermissionService {
    UserPrincipalDto getDataFromToken(HttpServletRequest request);

    UserPrincipalDto validateToken(String token);
}
