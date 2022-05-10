package co.edu.javeriana.proyecto2_web.entities;

import java.util.List;

import javax.persistence.FetchType;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    private User user;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<BillElement> billElements;

    public Cart(User user, List<BillElement> billElements) {
        this.user = user;
        this.billElements = billElements;
    }

    @Override
    public String toString() {
        String ret="Cart{" +
        "id=" + id +
        ", user=" + user +
        ", billElements=[";

        for (BillElement billElement : billElements) {
            ret+=billElement.toString() + ", ";
        }
        ret+="]}";
        return ret;
    }
}