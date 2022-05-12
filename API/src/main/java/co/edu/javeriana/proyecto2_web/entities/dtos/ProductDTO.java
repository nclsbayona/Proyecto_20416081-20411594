package co.edu.javeriana.proyecto2_web.entities.dtos;

import co.edu.javeriana.proyecto2_web.entities.Product;
import lombok.Getter;

@Getter
public class ProductDTO {
    public ProductDTO(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.imageUrl = product.getImageUrl();
        this.specials= product.getSpecials();
    }
    private Long id;
    private String name;
    private Double price;
    private String imageUrl;
    private String description;
    private String specials;
}
