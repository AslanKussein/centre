package kz.mtszn.util;

import lombok.extern.java.Log;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.logging.Level;

import static java.util.Objects.nonNull;
import static kz.mtszn.util.Utils.isNullOrEmpty;

@Component
@Log
public class JwtTokenUtil {

    public String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader(HttpHeaders.AUTHORIZATION);
        String BEARER = "Bearer ";
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER)) {
            return bearerToken.substring(7);
        }

        String ACCESS_TOKEN = "access_token";
        String access_token = request.getParameter(ACCESS_TOKEN);
        if (!isNullOrEmpty(access_token)) {
            return access_token;
        }

        Map<String, String[]> map = request.getParameterMap();
        String[] token = map.get(ACCESS_TOKEN);
        if (nonNull(token) && token.length > 0 && !isNullOrEmpty(token[0])) {
            return token[0];
        }

        if (!isNullOrEmpty(access_token)) {
            log.log(Level.SEVERE, "Responding with unauthorized error. Message - {access_token = " + access_token + "}");
        }

        if (!isNullOrEmpty(bearerToken)) {
            log.log(Level.SEVERE, "Responding with unauthorized error. Message - {bearerToken = " + bearerToken + "}");
        }
        return null;
    }

}
