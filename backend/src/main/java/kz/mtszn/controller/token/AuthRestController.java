package kz.mtszn.controller.token;

import kz.mtszn.dto.auth.UserPrincipalDto;
import kz.mtszn.security.IAuthenticationFacade;
import kz.mtszn.service.PermissionService;
import kz.mtszn.service.UserService;
import kz.mtszn.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping(value = "/open-api/token", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthRestController {

    private final UserService userService;
    private final IAuthenticationFacade auth;
    private final JwtTokenUtil tokenUtil;
    private final PermissionService service;

//    @ApiOperation(value = "", notes = "список всех систем", response = UserDto.class, authorizations = {
//            @Authorization(value = "bearer-key")}, tags = {})
//    @ApiResponses(value = {
//            @ApiResponse(code = 200, message = "OK", response = UserDto.class),
//            @ApiResponse(code = 500, message = "Internal Server Error", response = ErrorDto.class)})
    @PostMapping("/authUser")
    public ResponseEntity<UserPrincipalDto> authUser(HttpServletRequest httpServletRequest) {
        String token = tokenUtil.getJwtFromRequest(httpServletRequest);
        return ResponseEntity.ok(service.validateToken(token));
    }

}
