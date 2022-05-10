package co.edu.javeriana.proyecto2_web.exceptions;

public class UserNotFoundException extends RuntimeException {
    public static final long serialVersionUID = 1L;
    public UserNotFoundException(Long id) {
        super("User with id "+id+" not found");
    }

    public UserNotFoundException(String email) {
        super("User with email "+email+" not found");
    }
}
