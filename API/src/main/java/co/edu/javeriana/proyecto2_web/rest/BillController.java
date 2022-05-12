package co.edu.javeriana.proyecto2_web.rest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import co.edu.javeriana.proyecto2_web.annotations.IsAdmin;
import co.edu.javeriana.proyecto2_web.entities.Bill;
import co.edu.javeriana.proyecto2_web.entities.dtos.BillDTO;
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

    @IsAdmin
    @GetMapping("/get/all")
    public ArrayList<BillDTO> getAllBills() {
        ArrayList<BillDTO> arr = new ArrayList<BillDTO>();
        for (Bill b : billService.getAllBills()) {
            arr.add(new BillDTO(b));
        }
        return arr;
    }

    @IsAdmin
    @GetMapping("/get")
    public ArrayList<BillDTO> getBill(@RequestParam(required = false, name = "id") Long id,
            @RequestParam(required = false, name = "email") String username,
            @RequestParam(required = false, name = "start") Date start,
            @RequestParam(required = false, name = "end") Date end) {
        if (id != null) {
            try {
                List<Bill> list = List.of(billService.getBill(id));
                if (list == null || list.size() > 0)
                    return new ArrayList<BillDTO>(list.stream().map(BillDTO::new).collect(Collectors.toList()));
                throw new BillNotFoundException(id);
            } catch (Exception e) {
                throw new BillNotFoundException(id);
            }

        } else if (username != null) {
            try {
                List<Bill> list = billService.getByUser(username);
                if (list == null || list.size() > 0)
                    return new ArrayList<BillDTO>(list.stream().map(BillDTO::new).collect(Collectors.toList()));
                throw new BillNotFoundException(username);
            } catch (Exception e) {
                throw new BillNotFoundException(username);
            }
        } else if (start!=null && end!=null){
            try {
                List<Bill> list = billService.getByDate(start, end);
                if (list == null || list.size() > 0)
                    return new ArrayList<BillDTO>(list.stream().map(BillDTO::new).collect(Collectors.toList()));
                throw new GeneralException("date between "+start+" and "+end+" not found");
            } catch (Exception e) {
                throw new GeneralException("date between "+start+" and "+end+" not found");
            }
        }
        return null;
    }

    @IsAdmin
    @GetMapping("/getByLastWeek")
    public ArrayList<BillDTO> getBills() {
        return new ArrayList<BillDTO>(billService.getByLastWeek().stream().map(BillDTO::new).collect(Collectors.toList()));
    }

    @IsAdmin
    @GetMapping("/getByThisMonth")
    public ArrayList<BillDTO> getBill() {
        return new ArrayList<BillDTO>(billService.getByThisMonth().stream().map(BillDTO::new).collect(Collectors.toList()));
    }

    @IsAdmin
    @PostMapping("/create")
    public BillDTO createBill(@RequestParam(required = false, name = "cart_id") Long cartId,
            @RequestParam(required = false, name = "user_id") Long userId,
            @RequestParam(required = false, name = "user_email") String userEmail,
            @RequestBody(required = false) Bill bill) {
        if (userId != null && cartId != null)
            try {
                return new BillDTO(billService.createBill(cartService.getCart(cartId), accountService.getUser(userId)));
            } catch (Exception e) {
                throw new GeneralException("cart with id " + cartId);
            }
        else if (userEmail != null && cartId != null)
            try {
                return new BillDTO(billService.createBill(cartService.getCart(cartId), accountService.getUser(userEmail)));
            } catch (Exception e) {
                throw new GeneralException("cart with id " + cartId);
            }
        else if (bill != null)
            try {
                return new BillDTO(billService.createBill(bill));
            } catch (Exception e) {
                throw new GeneralException("cart with id " + cartId);
            }
        return null;
    }
}
