package kz.crtr.util;

import io.jsonwebtoken.*;
import kz.crtr.dto.UserTokenState;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.Map;
import java.util.logging.Level;

import static java.util.Objects.nonNull;
import static kz.crtr.util.Utils.isNullOrEmpty;

@Component
@Log
public class JwtTokenUtil {

    public String SECRET;

    public String getUserName(String token) {
        Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException expEx) {
            log.severe("Token expired");
        } catch (UnsupportedJwtException unsEx) {
            log.severe("Unsupported jwt");
        } catch (MalformedJwtException mjEx) {
            log.severe("Malformed jwt");
        } catch (SignatureException sEx) {
            log.severe("Invalid signature");
        } catch (Exception e) {
            log.severe("invalid token");
        }
        return false;
    }

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

    public String getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody();

        return claims.getId();
    }

    private Claims getAllClaimsFromToken(String token) {
        Claims claims;
        try {
            claims = Jwts.parser()
                    .setSigningKey(SECRET)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            claims = null;
        }
        return claims;
    }
}
