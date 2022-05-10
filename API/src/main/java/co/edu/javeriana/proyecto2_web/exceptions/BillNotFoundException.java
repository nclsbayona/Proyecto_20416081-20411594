package co.edu.javeriana.proyecto2_web.exceptions;

public class BillNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public  BillNotFoundException(Long id) {
        super("Bill with id "+id+" not found");
    }
    public BillNotFoundException(String email) {
        super("Bills for username "+email+" not found");
    }
}
