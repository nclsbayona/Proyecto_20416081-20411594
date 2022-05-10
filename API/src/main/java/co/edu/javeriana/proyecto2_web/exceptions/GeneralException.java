package co.edu.javeriana.proyecto2_web.exceptions;

public class GeneralException extends RuntimeException {
    public GeneralException(String message) {
        super("An error happened with "+message+", please try again later");
    }
}
