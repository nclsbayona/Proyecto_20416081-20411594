package co.edu.javeriana.proyecto2_web.entities;

import javax.persistence.Basic;
import javax.persistence.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
@Entity
public class Admin extends User {

    @Basic
    private final Boolean admin = true;

    public Admin(String email, String password) {
        super(email, password);
    }

    @Override
    public String toString() {
        return super.toString() + "\nAdmin{" +
                "admin=" + admin +
                '}';
    }
}