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
import co.edu.javeriana.proyecto2_web.exceptions.CartNotFoundException;
import co.edu.javeriana.proyecto2_web.exceptions.GeneralException;
import co.edu.javeriana.proyecto2_web.repositories.ProductRepository;
import co.edu.javeriana.proyecto2_web.services.AccountsService;
import co.edu.javeriana.proyecto2_web.services.CartService;

@RestController
@RequestMapping("/api/carts")
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
        if (username != null) {
            try {
                Cart c = cartService.getCart(username);
                if (c != null)
                    return c;
                throw new CartNotFoundException(username);
            } catch (Exception e) {
                throw new CartNotFoundException(username);
            }
        } else if (id != null) {
            try {
                Cart c = cartService.getCart(id);
                if (c != null)
                    return c;
                throw new CartNotFoundException(id);
            } catch (Exception e) {
                throw new CartNotFoundException(id);
            }
        }
        return null;
    }

    @PutMapping("/add")
    public Cart addToCart(@RequestParam(required = true, name = "productId") Long productId,
            @RequestBody(required = false) Cart cart,
            @RequestParam(required = false, name = "id") Long id,
            @RequestParam(required = true, name = "quantity") Integer quantity) {

        if (cart != null && productId != null && quantity != null)
            try {
                return cartService.addToCart(cart, productRepository.findById(productId).get(), quantity);
            } catch (Exception e) {
                throw new GeneralException("cart with id " + cart.getId());
            }
        else if (id != null && productId != null && quantity != null) {
            try {
                cart = cartService.getCart(id);
                if (cart != null)
                    return cartService.addToCart(cart, productRepository.findById(productId).get(), quantity);
            } catch (Exception e) {
                throw new GeneralException("cart with id " + id);
            }
        }
        return null;
    }

    @PostMapping("/create")
    public Cart createCart(@RequestBody Cart cart) {
        try {
            return cartService.createCart(cart);
        } catch (Exception e) {
            throw new GeneralException("cart with id " + cart.getId());
        }
    }

    @PostMapping("/new")
    public Cart createCart(@RequestParam(required = true, name = "userId") Long userid,
            @RequestBody List<BillElement> billElements) {
        try {
            return cartService.createCart(userRepository.getUser(userid), billElements);
        } catch (Exception e) {
            throw new GeneralException("cart for user with id " + userid);
        }
    }

    @DeleteMapping("/delete")
    public boolean deleteCart(@RequestParam(required = false, name = "email") String email,
            @RequestParam(required = false, name = "id") Long id) {
        if (email != null)
            try {
                User u=userRepository.getUser(email);
                System.out.println("The user is "+u);
                return cartService.removeCartByOwner(u);
            } catch (Exception e) {
                throw new GeneralException("cart for user with email " + email+ e.getMessage());
            }
        else if (id != null)
            try {
                return cartService.removeCartById(id);
            } catch (Exception e) {
                throw new GeneralException("cart with id" + id);
            }
        return false;
    }

    @PutMapping("/pay")
    public boolean payCart(@RequestParam(required = false, name = "id") Long id,
            @RequestParam(required = false, name = "email") String email,
            @RequestBody(required = false) Cart cart,
            @RequestParam(required = false, name = "user_id") Long user_id) {
        if (id != null)
            try {
                return cartService.payCart(id)!=null;
            } catch (Exception e) {
                throw new GeneralException("cart with id " + id+" "+e.getMessage());
            }
        else if (email != null) {
            try {
                User user = userRepository.getUser(email);
                if (user != null)
                    if (cart != null)
                        return cartService.payCart(cart, user);
                    else
                        return cartService.payCart(user);
            } catch (Exception e) {
                throw new GeneralException("cart for user with email" + email);
            }
        } else if (user_id != null) {
            try {
                User user = userRepository.getUser(user_id);
                if (user != null)
                    if (cart != null)
                        return cartService.payCart(cart, user);
                    else
                        return cartService.payCart(user);
            } catch (Exception e) {
                throw new GeneralException("cart for user with id" + user_id);
            }
        } else if (cart != null)
            try {
                return cartService.payCart(cart);
            } catch (Exception e) {
                throw new GeneralException("cart with id" + cart.getId());
            }
        return false;
    }
}
