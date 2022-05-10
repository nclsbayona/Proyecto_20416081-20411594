package co.edu.javeriana.proyecto2_web.rest;

import java.util.List;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import co.edu.javeriana.proyecto2_web.entities.User;
import co.edu.javeriana.proyecto2_web.exceptions.UserExistsException;
import co.edu.javeriana.proyecto2_web.exceptions.UserNotFoundException;
import co.edu.javeriana.proyecto2_web.services.AccountsService;

@RestController
@RequestMapping("/api/accounts")
public class AccountsController {
    @Autowired
    AccountsService userRepository;

    @RolesAllowed({ "ADMIN" })
    @GetMapping("/get/all")
    public List<User> getAll() {
        return userRepository.getAllUsers();
    }

    @RolesAllowed({ "ADMIN", "USER" })
    @GetMapping("/get")
    public User getUser(@RequestParam(required = false, name = "email") String username,
            @RequestParam(required = false, name = "id") Long id) {
        if (username != null) {
            try {
                User u = userRepository.getUser(username);
                if (u != null)
                    return u;

                throw new UserNotFoundException(username);
            } catch (Exception e) {
                throw new UserNotFoundException(username);
            }
        } else if (id != null) {
            try {
                User u = userRepository.getUser(id);
                if (u != null)
                    return u;

                throw new UserNotFoundException(id);
            } catch (Exception e) {
                throw new UserNotFoundException(id);
            }
        }
        return null;
    }

    // La contra se pasa como una cadena de caracteres sin comillas ni nada
    @RolesAllowed({ "ADMIN" })
    @PostMapping("/add")
    public User addUser(@RequestParam(required = true, name = "email") String username,
            @RequestBody(required = true) String password) {
        if (username != null && password != null) {
            try {
                User u = userRepository.addUser(username, password);
                if (u != null)
                    return u;
                throw new UserExistsException(username);
            } catch (Exception e) {
                throw new UserExistsException(username);
            }
        }
        return null;
    }
}
