package kz.crtr.configs;

import kz.crtr.dto.LocalValue;
import kz.crtr.dto.auth.UserPrincipalDto;
import kz.crtr.exception.BadRequestException;
import kz.crtr.exception.NotFoundException;
import kz.crtr.security.UserDetailsServiceImpl;
import kz.crtr.service.PermissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static java.util.Objects.isNull;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RequiredArgsConstructor
@Component
public class JwtTokenFilter extends OncePerRequestFilter {

    private final PermissionService permissionService;
    private static final String BEARER = "Bearer ";
    private final UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws IOException, ServletException {

        String authorizationHeader = httpServletRequest.getHeader(AUTHORIZATION);
        if (isNull(authorizationHeader)) {
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }

        if (authorizationHeaderIsInvalid(authorizationHeader)) {
            httpServletResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED,
                    "jwt token is invalid or incorrect");
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            SecurityContextHolder.getContext().setAuthentication(null);
            return;
        }

        Authentication authentication;
        try {
            authentication = createToken(httpServletRequest);
        } catch (Exception e) {
            httpServletResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED,
                    "jwt token is invalid or incorrect");

            SecurityContextHolder.getContext().setAuthentication(null);
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    private UsernamePasswordAuthenticationToken createToken(HttpServletRequest httpServletRequest) {
        UserPrincipalDto userPrincipal = parseToken(httpServletRequest);

        UserDetails userDetails = getUserDetails(LocalValue.ru, userPrincipal.getUsername());

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    private UserDetails getUserDetails(final LocalValue language, final String username) {
        try {
            return loadUserByUsername(language, username);
        } catch (Exception e) {
            throw BadRequestException.notCorrectUserException(language);
        }
    }

    private UserDetails loadUserByUsername(final LocalValue localValue, final String username) {
        final UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        if (isNull(userDetails)) {
            throw NotFoundException.userNotFound(localValue, username);
        }
        return userDetails;
    }

    private boolean authorizationHeaderIsInvalid(String authorizationHeader) {
        return isNull(authorizationHeader) || !authorizationHeader.startsWith(BEARER);
    }

    public UserPrincipalDto parseToken(HttpServletRequest httpServletRequest) {
        return permissionService.getDataFromToken(httpServletRequest);
    }
}
