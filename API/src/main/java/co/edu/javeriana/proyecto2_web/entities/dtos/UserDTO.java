package co.edu.javeriana.proyecto2_web.entities.dtos;

import java.util.ArrayList;

import co.edu.javeriana.proyecto2_web.entities.Admin;
import co.edu.javeriana.proyecto2_web.entities.Bill;
import co.edu.javeriana.proyecto2_web.entities.User;
import lombok.Getter;

@Getter
public class UserDTO {
    public UserDTO(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        /* No se */
        this.password = user.getPassword();
        this.rol= new RoleDTO(user.getRol());
        this.bills= new ArrayList<BillDTO>();
        for (Bill bill : user.getBills()) {
            this.bills.add(new BillDTO(bill));
        }
        this.admin=(user instanceof Admin);
    }
    private Long id;
    private String email;
    private String password;
    private ArrayList<BillDTO> bills;
	private RoleDTO rol;
    private boolean admin;

}
