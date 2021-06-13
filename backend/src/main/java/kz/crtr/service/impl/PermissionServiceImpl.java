package kz.crtr.service.impl;

import com.google.gson.Gson;
import kz.crtr.dto.auth.TokenRequestDto;
import kz.crtr.dto.auth.UserPrincipalDto;
import kz.crtr.service.PermissionService;
import kz.crtr.util.BooleanUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.util.Set;

import static java.util.Objects.nonNull;


@RequiredArgsConstructor
@Slf4j
@Component
public class PermissionServiceImpl implements PermissionService {

    @Value("${auth.host}")
    private String authorizationHost;
    @Value("${auth.permissions}")
    private String permissions;
    @Value("${auth.roles}")
    private String roles;
    @Value("${auth.valid}")
    private String valid;

    private static final String AUTHORIZATION = "Authorization";
    private static final String BEARER = "Bearer ";
    private static final String BASIC = "Basic QUM6MQ==";

    @Override
    public UserPrincipalDto getAllPermissionList(HttpServletRequest request) {
        String token = request.getHeader(AUTHORIZATION);
        token = token.replace(BEARER, "");

        final String uri = authorizationHost + permissions;

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set(AUTHORIZATION, BEARER.concat(token));

//        HttpEntity<?> entity = new HttpEntity<>(headers);
//        ResponseEntity<AuthorityResultDto> responseEntity = restTemplate
//                .exchange(uri, HttpMethod.GET, entity, AuthorityResultDto.class);
//        AuthorityResultDto body = responseEntity.getBody();
//        assert nonNull(body);

//        return insertSessionData(null, request);
        return null;
    }

    @Override
    public Set<String> getRoles(HttpServletRequest request) {
        String token = request.getHeader(AUTHORIZATION);
        token = token.replace(BEARER, "");

        final String uri = authorizationHost + roles;

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set(AUTHORIZATION, BEARER.concat(token));

        HttpEntity<?> entity = new HttpEntity<>(headers);
//        ResponseEntity<RolesDto> responseEntity = restTemplate
//                .exchange(uri, HttpMethod.GET, entity, RolesDto.class);
//        RolesDto body = responseEntity.getBody();
//        assert nonNull(body);
//        return body.getRoles();
        return null;
    }

//    private UserPrincipalDto insertSessionData(AuthorityResultDto dto, HttpServletRequest request) {
////        HashOperations hashOperations = redisTemplate.opsForHash();
//
////        UserPrincipalDto gson = UserPrincipalDto.builder()
////                .id(dto.getUserId())
////                .username(dto.getLogin())
////                .fullName(dto.getFullName())
////                .iin(dto.getIdn())
////                .permissions(getRoles(request))
////                .orgCode(dto.getOrgCode())
////                .build();
////
//////        hashOperations.put("userData", "userData", new Gson().toJson(gson));
////
////        return gson;
//        return null;
//    }

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
