package co.edu.javeriana.proyecto2_web.entities.dtos;

import java.util.Date;

import co.edu.javeriana.proyecto2_web.entities.Bill;
import lombok.Getter;

@Getter
public class BillDTO {
    private Long id;
    private Date date;
    private CartDTO cart;

    public BillDTO(Bill bill) {
        this.id = bill.getId();
        this.date = bill.getDate();
        this.cart = new CartDTO(bill.getCart());
    }
}
