package co.edu.javeriana.proyecto2_web.exceptions;

public class UserExistsException extends RuntimeException {
    public static final long serialVersionUID = 1L;
    public UserExistsException(String email) {
        super("User with email "+email+" already exists");
    }
}
