package co.edu.javeriana.proyecto2_web.entities;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
public class BillElement {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @Basic
    private Long total;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Product product;


    public BillElement(Product product, Long quantity) {
        this.product = product;
        this.total = quantity;
    }

    @Override
    public String toString() {
        return "BillElement{" +
                "id=" + id +
                ", total=" + total +
                ", product=" + product +
                '}';
    }

    public BillElement(Product product, int quantity) {
        this.product = product;
        this.total = (long) quantity;
    }
}