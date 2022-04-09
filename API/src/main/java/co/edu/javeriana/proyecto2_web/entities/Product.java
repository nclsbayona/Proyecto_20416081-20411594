package co.edu.javeriana.proyecto2_web.entities;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @Basic
    private String name;
    @Basic
    private Double price;
    @Basic
    private String imageUrl;
    @Basic
    private String description;
    @Basic
    private String specials;


    public Product(String name, String description, double price, String image, String specials) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = image;
        this.specials = specials;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", imageUrl='" + imageUrl + '\'' +
                ", description='" + description + '\'' +
                ", specials='" + specials + '\'' +
                '}';
    }
}