package co.edu.javeriana.proyecto2_web.conf.jwt;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

	public JWTAuthorizationFilter(AuthenticationManager authManager) {
		super(authManager);
	}

	@Override
	protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		String header = req.getHeader("Authorization");
		if (header == null || !header.startsWith("Bearer")) {
			chain.doFilter(req, res);
			return;
		}
		UsernamePasswordAuthenticationToken authentication = getAuthentication(req);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		chain.doFilter(req, res);
	}

	private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
		String token = request.getHeader("Authorization");
		if (token != null) {
			// Se procesa el token y se recupera el usuario.
			Claims body = Jwts.parser()
						.setSigningKey("D3vWe4r")
						.parseClaimsJws(token.replace("Bearer ", ""))
						.getBody();
			
			String user = body.getSubject();

			if (user != null) {
				final Collection<SimpleGrantedAuthority> authorities =
						Arrays.stream(body.get("Authorities").toString().split(","))
								.map(SimpleGrantedAuthority::new)
								.collect(Collectors.toList());
				
				return new UsernamePasswordAuthenticationToken(user, null, authorities);
			}
			return null;
		}
		return null;
	}
}
