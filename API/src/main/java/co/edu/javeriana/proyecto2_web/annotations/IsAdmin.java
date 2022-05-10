package co.edu.javeriana.proyecto2_web.annotations;

import java.lang.annotation.Retention;
import java.lang.annotation.ElementType;
import java.lang.annotation.Target;
import java.lang.annotation.RetentionPolicy;

import org.springframework.security.access.annotation.Secured;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Secured("ROLE_ADMIN")
public @interface IsAdmin {
    
}
