package kz.mtszn.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import kz.mtszn.dto.auth.DecodeTokenDto;
import kz.mtszn.dto.auth.PublicKeyDto;
import kz.mtszn.dto.auth.TokenRequestDto;
import kz.mtszn.dto.auth.UserPrincipalDto;
import kz.mtszn.service.PermissionService;
import kz.mtszn.util.BooleanUtils;
import kz.mtszn.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;

import static java.util.Objects.nonNull;


@RequiredArgsConstructor
@Slf4j
@Component
public class PermissionServiceImpl implements PermissionService {

    @Value("${auth.host}")
    private String authorizationHost;
    @Value("${auth.valid}")
    private String valid;
    @Value("${auth.publicKey}")
    private String publicKey;

    private final JwtTokenUtil tokenUtil;

    private static final String AUTHORIZATION = "Authorization";
    private static final String BEARER = "Bearer ";

    public PublicKeyDto getPublicKey(HttpServletRequest request) {
        final String uri = authorizationHost + publicKey;
        HttpHeaders headers = getHttpHeaders(request);
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<PublicKeyDto> responseEntity = restTemplate
                .exchange(uri, HttpMethod.POST, entity, PublicKeyDto.class);

        return responseEntity.getBody();
    }

    @Override
    public UserPrincipalDto getDataFromToken(HttpServletRequest request) {
        final ObjectMapper mapper = new ObjectMapper();
        Claims claims = Jwts.parser().setSigningKey(getPublicKey(request).getKey()).parseClaimsJws(tokenUtil.getJwtFromRequest(request)).getBody();
        DecodeTokenDto tokenDto = mapper.convertValue(claims, DecodeTokenDto.class);
        return UserPrincipalDto.builder()
                .empId(Long.parseLong(tokenDto.getJti()))
                .username(tokenDto.getSub())
                .active(Boolean.TRUE)
                .build();
    }

    private HttpHeaders getHttpHeaders(HttpServletRequest request) {
        String token = request.getHeader(AUTHORIZATION);
        token = token.replace(BEARER, "");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set(AUTHORIZATION, BEARER.concat(token));
        return headers;
    }

    @Override
    public UserPrincipalDto validateToken(String token) {
        try {
            final String uri = authorizationHost + valid;
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
//            headers.set(AUTHORIZATION, BASIC);

            RestTemplate restTemplate = new RestTemplate();

            TokenRequestDto dto = new TokenRequestDto();
            dto.setToken(token);
            Gson gson = new Gson();

            HttpEntity<?> entity = new HttpEntity<>(gson.toJson(dto), headers);
            ResponseEntity<UserPrincipalDto> responseEntity = restTemplate.exchange(uri, HttpMethod.POST, entity, UserPrincipalDto.class);
            UserPrincipalDto body = responseEntity.getBody();
            if (nonNull(body) && BooleanUtils.isFalse(body.getActive())) {
                return null;
            }
            return body;
        } catch (Exception e) {
            log.error(e.getLocalizedMessage());
        }
        return null;
    }
}
