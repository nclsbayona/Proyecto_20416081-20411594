package co.edu.javeriana.proyecto2_web.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import co.edu.javeriana.proyecto2_web.entities.User;
import co.edu.javeriana.proyecto2_web.repositories.UserRepository;

@Service
public class AccountsService {
    @Autowired
    private UserRepository uRepository;

    public List<User> getAllUsers() {
        return (List<User>) uRepository.findAll();
    }
    
    public User getUser(String email) {
        for (User u:uRepository.findByEmail(email, PageRequest.of(0, 10)))
            return u;
        return null;
    }

    public User getUser(Long id) {
        return uRepository.findById(id).get();
    }

    public User addUser(User newUser) {
        if (this.getUser(newUser.getEmail()) != null) 
            return null;
        return uRepository.save(newUser);
    }
}
