package co.edu.javeriana.proyecto2_web.exceptions;

public class ProductNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    public ProductNotFoundException(Long id) {
        super("Product with id "+id+" not found");
    }    
    public ProductNotFoundException(String name) {
        super("Product with name "+name+" not found");
    }
}
