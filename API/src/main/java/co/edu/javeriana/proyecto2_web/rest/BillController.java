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

import co.edu.javeriana.proyecto2_web.entities.Bill;
import co.edu.javeriana.proyecto2_web.exceptions.BillNotFoundException;
import co.edu.javeriana.proyecto2_web.exceptions.GeneralException;
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

    @RolesAllowed({"ADMIN"})
    @GetMapping("/get/all")
    public List<Bill> getAllBills() {
        return billService.getAllBills();
    }


    @RolesAllowed({"ADMIN"})
    @GetMapping("/get")
    public List<Bill> getBill(@RequestParam(required = false, name = "id") Long id,
            @RequestParam(required = false, name = "email") String username) {
        if (id != null) {
            try {
                List<Bill> list = List.of(billService.getBill(id));
                if (list == null || list.size() > 0)
                    return list;
                throw new BillNotFoundException(id);
            } catch (Exception e) {
                throw new BillNotFoundException(id);
            }

        } else if (username != null) {
            try {
                List<Bill> list = billService.getByUser(username);
                if (list == null || list.size() > 0)
                    return list;
                throw new BillNotFoundException(username);
            } catch (Exception e) {
                throw new BillNotFoundException(username);
            }
        }
        return null;
    }

    @RolesAllowed({"ADMIN"})
    @PostMapping("/create")
    public Bill createBill(@RequestParam(required = false, name = "cart_id") Long cartId,
            @RequestParam(required = false, name = "user_id") Long userId,
            @RequestParam(required = false, name = "user_email") String userEmail,
            @RequestBody(required = false) Bill bill) {
        if (userId != null && cartId != null)
            try {
                return billService.createBill(cartService.getCart(cartId), accountService.getUser(userId));
            } catch (Exception e) {
                throw new GeneralException("cart with id " + cartId);
            }
        else if (userEmail != null && cartId != null)
            try {
                return billService.createBill(cartService.getCart(cartId), accountService.getUser(userEmail));
            } catch (Exception e) {
                throw new GeneralException("cart with id " + cartId);
            }
        else if (bill != null)
            try {
                return billService.createBill(bill);
            } catch (Exception e) {
                throw new GeneralException("cart with id " + cartId);
            }
        return null;
    }
}
