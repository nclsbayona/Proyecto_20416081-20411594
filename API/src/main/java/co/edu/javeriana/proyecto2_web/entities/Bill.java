package co.edu.javeriana.proyecto2_web.entities;

import java.sql.Date;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
public class Bill {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @Basic
    private Date date;
    @OneToOne
    private Cart cart;
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private User user;

    public Bill(Cart cart, User user) {
        this.cart = cart;
        this.user = user;
        this.date=new Date(System.currentTimeMillis());
    }

    public Bill(Cart cart, User user, Date date) {
        this.cart = cart;
        this.user = user;
        this.date=date;
    }

    @Override
    public String toString() {
        return "Bill{" +
                "id=" + id +
                ", date=" + date +
                ", cart=" + cart +
                ", user=" + user +
                '}';
    }
}