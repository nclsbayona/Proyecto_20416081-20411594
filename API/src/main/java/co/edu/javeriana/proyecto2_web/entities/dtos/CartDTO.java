package co.edu.javeriana.proyecto2_web.entities.dtos;

import java.util.ArrayList;

import co.edu.javeriana.proyecto2_web.entities.BillElement;
import co.edu.javeriana.proyecto2_web.entities.Cart;
import lombok.Getter;

@Getter
public class CartDTO {
    public CartDTO(Cart cart) {
        this.id = cart.getId();
        this.user = new UserDTO(cart.getUser());
        this.billElements = new ArrayList<BillElementDTO>();
        for (BillElement billElement : cart.getBillElements()) {
            this.billElements.add(new BillElementDTO(billElement));
        }
    }
    private Long id;
    private UserDTO user;
    private ArrayList<BillElementDTO> billElements;
}
