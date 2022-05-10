package co.edu.javeriana.proyecto2_web.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import co.edu.javeriana.proyecto2_web.entities.Bill;
import co.edu.javeriana.proyecto2_web.entities.Cart;
import co.edu.javeriana.proyecto2_web.entities.User;
import co.edu.javeriana.proyecto2_web.repositories.BillRepository;
import co.edu.javeriana.proyecto2_web.repositories.CartRepository;
import co.edu.javeriana.proyecto2_web.repositories.UserRepository;

@Service
public class BillsService {
    @Autowired
    private BillRepository bRepository;

    @Autowired
    private UserRepository uRepository;

    @Autowired
    private CartRepository cRepository;

    public List<Bill> getAllBills() {
        return (List<Bill>) bRepository.findAll();
    }

    public Bill getBill(Long id) {
        return bRepository.findById(id).get();
    }

    public List<Bill> getByUser(User u) {
        return bRepository.findByUserId(u.getId());
    }

    public List<Bill> getByUser(String email) {
        return bRepository.findByUserId(uRepository.findByEmail(email, PageRequest.of(0, 10)).getContent().get(0).getId());
    }

    public Bill createBill(Bill b) {
        cRepository.removeById(b.getCart().getId());
        return bRepository.save(b);
    }

    public Bill createBill(Cart cart, User user){
        return bRepository.save(new Bill(cart, user));
    }
}
