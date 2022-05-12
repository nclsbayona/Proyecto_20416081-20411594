package co.edu.javeriana.proyecto2_web.entities.dtos;

import co.edu.javeriana.proyecto2_web.entities.BillElement;
import lombok.Getter;

@Getter
public class BillElementDTO {
    private Long id;
    private Long total;
    private ProductDTO product;

    public BillElementDTO(BillElement billElement) {
        this.id = billElement.getId();
        this.total = billElement.getTotal();
        this.product = new ProductDTO(billElement.getProduct());
    }
}
