package co.edu.javeriana.proyecto2_web.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import co.edu.javeriana.proyecto2_web.entities.BillElement;
import co.edu.javeriana.proyecto2_web.entities.Cart;
import co.edu.javeriana.proyecto2_web.entities.User;
import co.edu.javeriana.proyecto2_web.repositories.ProductRepository;
import co.edu.javeriana.proyecto2_web.services.AccountsService;
import co.edu.javeriana.proyecto2_web.services.CartService;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    CartService cartService;

    @Autowired
    AccountsService userRepository;

    @GetMapping("/get/all")
    public List<Cart> getAll() {
        return cartService.getAllCarts();
    }

    @GetMapping("/get")
    public Cart getCart(@RequestParam(required = false, name = "username") String username,
            @RequestParam(required = false, name = "id") Long id) {
        if (username != null)
            return cartService.getCart(username);
        else if (id != null)
            return cartService.getCart(id);
        return null;

    }

    @PutMapping("/add")
    public Cart addToCart(@RequestParam(required = false, name = "productId") Long productId,
            @RequestBody(required = false) Cart cart,
            @RequestParam(required = false, name = "id") Long id,
            @RequestParam(required = false, name = "quantity") Integer quantity) {
        if (cart != null && productId != null && quantity != null)
            return cartService.addToCart(cart, productRepository.findById(productId).get(), quantity);
        else if (id != null && productId != null && quantity != null) {
            cart = cartService.getCart(id);
            if (cart != null)
                return cartService.addToCart(cart, productRepository.findById(productId).get(), quantity);
        }
        return null;
    }

    @PostMapping("/create")
    public Cart createCart(@RequestBody Cart cart) {
        return cartService.createCart(cart);
    }

    @PostMapping("/new")
    public Cart createCart(@RequestParam(required = true, name = "userId") Long userid, @RequestBody List<BillElement> billElements) {
        return cartService.createCart(userRepository.getUser(userid), billElements);
    }

    @DeleteMapping("/delete")
    public boolean deleteCart(@RequestParam(required = false, name = "email") String email,
            @RequestParam(required = false, name = "id") Long id) {
        if (email != null)
            return cartService.removeCartByOwner(userRepository.getUser(email));
        else if (id != null)
            return cartService.removeCartById(id);
        return false;
    }

    @PutMapping("/pay")
    public boolean payCart(@RequestParam(required = false, name = "id") Long id,
            @RequestParam(required = false, name = "email") String email,
            @RequestBody(required = false) Cart cart,
            @RequestParam(required = false, name = "user_id") Long user_id) {
        if (id != null)
            return cartService.payCart(id);
        else if (email != null) {
            User user = userRepository.getUser(email);
            if (user != null)
                if (cart != null)
                    return cartService.payCart(cart, user);
                else
                    return cartService.payCart(user);
        } else if (user_id != null) {
            User user = userRepository.getUser(user_id);
            if (user != null)
                if (cart != null)
                    return cartService.payCart(cart, user);
                else
                    return cartService.payCart(user);
        } else if (cart != null)
            return cartService.payCart(cart);
        return false;
    }
}
