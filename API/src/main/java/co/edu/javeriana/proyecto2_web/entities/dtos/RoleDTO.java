package co.edu.javeriana.proyecto2_web.entities.dtos;

import co.edu.javeriana.proyecto2_web.entities.Role;
import lombok.Getter;

@Getter
public class RoleDTO {
    private Long id;
    private String name;
    public RoleDTO(Role r) {
        this.id = r.getId();
        this.name = r.getName();
    }
}
