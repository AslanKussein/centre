package kz.crtr.configs;

import kz.crtr.dto.auth.UserPrincipalDto;
import kz.crtr.service.PermissionService;
import kz.crtr.util.BooleanUtils;
import kz.crtr.util.CollectionUtils;
import kz.crtr.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RequiredArgsConstructor
@Component
public class JwtTokenFilter extends OncePerRequestFilter {

    private final PermissionService permissionService;
    private final JwtTokenUtil tokenUtil;
    private static final String BEARER = "Bearer ";

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws IOException, ServletException {

        String authorizationHeader = httpServletRequest.getHeader(AUTHORIZATION);
        if (isNull(authorizationHeader)) {
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }
        String bearer = authorizationHeader.replace(BEARER, "");

        if (!tokenUtil.validateToken(bearer) && authorizationHeaderIsInvalid(authorizationHeader)) {
            httpServletResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED,
                    "jwt token is invalid or incorrect");
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }

        UsernamePasswordAuthenticationToken token = createToken(authorizationHeader, httpServletRequest);
        if (isNull(token)) {
            httpServletResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED,
                    "jwt token is invalid or incorrect");
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }
        SecurityContextHolder.getContext().setAuthentication(token);
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    private UsernamePasswordAuthenticationToken createToken(String authorizationHeader, HttpServletRequest httpServletRequest) {
        String token = authorizationHeader.replace(BEARER, "");
        UserPrincipalDto userPrincipal = parseToken(token, httpServletRequest);
        List<GrantedAuthority> authorities = new ArrayList<>();
//        if (nonNull(userPrincipal) && CollectionUtils.isNotEmpty(userPrincipal.getPermissions())) {
//            for (String authority : userPrincipal.getPermissions()) {
//                authorities.add(new SimpleGrantedAuthority(authority.toUpperCase()));
//            }
//            return new UsernamePasswordAuthenticationToken(userPrincipal, null, authorities);
//        }
        return new UsernamePasswordAuthenticationToken(userPrincipal, null, authorities);
    }

    private boolean authorizationHeaderIsInvalid(String authorizationHeader) {
        return isNull(authorizationHeader) || !authorizationHeader.startsWith(BEARER);
    }

    public UserPrincipalDto parseToken(String token, HttpServletRequest httpServletRequest) {
        UserPrincipalDto dto = permissionService.validateToken(token);
        if (nonNull(dto) && BooleanUtils.isTrue(dto.getActive())) {
            return permissionService.getAllPermissionList(httpServletRequest);
        }
        return null;
    }
}
