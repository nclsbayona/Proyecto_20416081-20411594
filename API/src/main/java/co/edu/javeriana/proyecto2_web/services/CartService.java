package co.edu.javeriana.proyecto2_web.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import co.edu.javeriana.proyecto2_web.entities.BillElement;
import co.edu.javeriana.proyecto2_web.entities.Cart;
import co.edu.javeriana.proyecto2_web.entities.Product;
import co.edu.javeriana.proyecto2_web.entities.User;
import co.edu.javeriana.proyecto2_web.repositories.CartRepository;
import co.edu.javeriana.proyecto2_web.repositories.UserRepository;

@Service
public class CartService {
    @Autowired
    CartRepository cartRepository;

    @Autowired
    UserRepository userRepository;

    BillsService billService=new BillsService();

    public List<Cart> getAllCarts() {
        return (List<Cart>) cartRepository.findAll();
    }

    public Cart getCart(String username) {
        User user = userRepository.findByEmail(username, PageRequest.of(0,1)).getContent().get(0);
        return cartRepository.findByUserId(user.getId(), PageRequest.of(0, 1)).getContent().get(0);
    }

    public Cart getCart(Long id) {
        return cartRepository.findById(id).get();
    }

    public Cart addToCart(Cart cart, Product product, int quantity) {
        cart.getBillElements().add(new BillElement(product, quantity));
        return cartRepository.save(cart);
    }

    public Cart removeFromCart(Cart cart, Product product, Long quantity) {
        List<BillElement> l = cart.getBillElements();
        for (BillElement b : l) {
            if (b.getProduct().getId() == product.getId() && b.getTotal() >= quantity) {
                b.setTotal(b.getTotal() - quantity);
                if (b.getTotal() <= 0) {
                    l.remove(b);
                    return cartRepository.save(cart);
                }
            }
        }
        return null;
    }

    public Cart createCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public Cart createCart(User user, List<BillElement> billElements) {
        return cartRepository.save(new Cart(user, billElements));
    }

    public boolean removeCartByOwner(User user) {
        cartRepository.removeByUserId(user.getId());
        return true;
    }

    public boolean removeCartById(Long id) {
        cartRepository.deleteById(id);
        return true;
    } 

    public boolean payCart(Cart cart, User user) {
        billService.createBill(cart, user);
        cartRepository.deleteById(cart.getId());
        return true;
    }

    public boolean payCart(Cart cart) {
        billService.createBill(cart, cart.getUser());
        cartRepository.deleteById(cart.getId());
        return true;
    }

    public boolean payCart(Long id) {
        Cart cart = cartRepository.findById(id).get();
        billService.createBill(cart, cart.getUser());
        cartRepository.deleteById(cart.getId());
        return true;
    }

    public boolean payCart(Long id, User user) {
        Cart cart = cartRepository.findById(id).get();
        billService.createBill(cart, user);
        cartRepository.deleteById(cart.getId());
        return true;
    }

    public boolean payCart(User user) {
        Cart cart = cartRepository.findByUserId(user.getId(),PageRequest.of(0, 10)).getContent().get(0);
        billService.createBill(cart, user);
        cartRepository.deleteById(cart.getId());
        return true;
    }
}
