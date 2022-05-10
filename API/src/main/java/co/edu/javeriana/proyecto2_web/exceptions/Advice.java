package co.edu.javeriana.proyecto2_web.exceptions;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class Advice {
    @ResponseBody
    @ExceptionHandler({GeneralException.class, BillNotFoundException.class, UserNotFoundException.class, UserExistsException.class, ProductNotFoundException.class, CartNotFoundException.class})
    @ResponseStatus(value = org.springframework.http.HttpStatus.NOT_FOUND)
    String handler(Exception ex) {
        return ex.getMessage();
    }
}
