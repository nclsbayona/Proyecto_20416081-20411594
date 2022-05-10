package co.edu.javeriana.proyecto2_web.conf;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import co.edu.javeriana.proyecto2_web.entities.User;
import co.edu.javeriana.proyecto2_web.repositories.UserRepository;




@Component
public class MyAuthenticationProvider implements AuthenticationProvider{

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Transactional
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String username = authentication.getName();
        String password = authentication.getCredentials().toString();
        
        User usuario = userRepository.findByUsername(username);
        
        if (usuario == null) {
			throw new UsernameNotFoundException(username);
		}
        
        if (encoder.matches(password, usuario.getPassword()) && usuario.isActivo()){
        	
        	List<SimpleGrantedAuthority> authorities = getAuthorities(usuario);

    		// Crea el objeto principal
			org.springframework.security.core.userdetails.User principal = 
					new org.springframework.security.core.userdetails.User(
							usuario.getEmail(), 
							usuario.getPassword(), 
							authorities);
    				
        	return new UsernamePasswordAuthenticationToken(principal, null, authorities);
        }
        
		return null;
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}
	
	private List<SimpleGrantedAuthority> getAuthorities(User usuario) {
		List<SimpleGrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority("ROLE_"+usuario.getRol().getName()));
		return authorities;
	}

}
