package co.edu.javeriana.proyecto2_web.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import co.edu.javeriana.proyecto2_web.entities.User;
import co.edu.javeriana.proyecto2_web.services.AccountsService;

@RestController
@RequestMapping("/api/accounts")
public class AccountsController {
    @Autowired
    AccountsService userRepository;

    @GetMapping("/get/all")
    public List<User> getAll() {
        return userRepository.getAllUsers();
    }

    @GetMapping("/get")
    public User getUser(@RequestParam(required = false, name = "email") String username,
            @RequestParam(required = false, name = "id") Long id) {
        if (username != null)
            return userRepository.getUser(username);
        else if (id != null)
            return userRepository.getUser(id);
        return null;
    }

    //La contra se pasa como una cadena de caracteres sin comillas ni nada
    @PostMapping("/add")
    public User addUser(@RequestParam(required = false, name = "email") String username,
            @RequestBody(required = false) String password) {
        if (username != null && password != null)
            return userRepository.addUser(username, password);
        return null;
    }
}
