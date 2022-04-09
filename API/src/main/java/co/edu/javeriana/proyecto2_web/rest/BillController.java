package co.edu.javeriana.proyecto2_web.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import co.edu.javeriana.proyecto2_web.entities.Bill;
import co.edu.javeriana.proyecto2_web.services.AccountsService;
import co.edu.javeriana.proyecto2_web.services.BillsService;
import co.edu.javeriana.proyecto2_web.services.CartService;

@RestController
@RequestMapping("/api/bills")
public class BillController {
    @Autowired
    BillsService billService;
    @Autowired
    CartService cartService;
    @Autowired
    AccountsService accountService;

    @GetMapping("/get/all")
    public List<Bill> getAllBills() {
        return billService.getAllBills();
    }

    @GetMapping("/get")
    public List<Bill> getBill(@RequestParam(required = false, name = "id") Long id,
            @RequestParam(required = false, name = "email") String username) {
        if (id != null)
            return List.of(billService.getBill(id));
        else if (username != null)
            return billService.getByUser(username);
        return null;
    }

    @PostMapping("/create")
    public Bill createBill(@RequestParam(required = false, name = "cart_id") Long cartId,
            @RequestParam(required = false, name = "user_id") Long userId,
            @RequestParam(required = false, name = "user_email") String userEmail,
            @RequestBody(required = false) Bill bill) {
        if (userId != null && cartId != null)
            return billService.createBill(cartService.getCart(cartId), accountService.getUser(userId));
        else if (userEmail != null && cartId != null)
            return billService.createBill(cartService.getCart(cartId), accountService.getUser(userEmail));
        else if (bill != null)
            return billService.createBill(bill);
        return null;
    }
}
