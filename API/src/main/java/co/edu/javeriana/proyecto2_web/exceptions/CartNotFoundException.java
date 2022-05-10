package co.edu.javeriana.proyecto2_web.exceptions;

public class CartNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    public CartNotFoundException(Long id) {
        super("Cart with id "+id+" not found");
    }
    public CartNotFoundException(String email) {
        super("Carts for username "+email+" not found");
    }
}
