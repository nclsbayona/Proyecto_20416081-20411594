package co.edu.javeriana.proyecto2_web.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import co.edu.javeriana.proyecto2_web.annotations.IsAdmin;
import co.edu.javeriana.proyecto2_web.entities.Product;
import co.edu.javeriana.proyecto2_web.entities.dtos.ProductDTO;
import co.edu.javeriana.proyecto2_web.exceptions.GeneralException;
import co.edu.javeriana.proyecto2_web.exceptions.ProductNotFoundException;
import co.edu.javeriana.proyecto2_web.services.ProductsService;

@RestController
@RequestMapping("/api/products")
public class ProductsController {

    @Autowired
    ProductsService productsService;

    @GetMapping("/get/all")
    public ArrayList<ProductDTO> getAll() {
        return new ArrayList<ProductDTO>(productsService.getAll().stream().map(ProductDTO::new).collect(Collectors.toList()));
    }
    
    @GetMapping("/get")
    public ArrayList<ProductDTO> getProduct(@RequestParam(required = false, name = "id") Long id,
            @RequestParam(required = false, name = "name") String name) {
        if (id != null) {
            try {
                List<Product> list = List.of(productsService.getProduct(id));
                if (list == null || list.size() > 0)
                return new ArrayList<ProductDTO>(list.stream().map(ProductDTO::new).collect(Collectors.toList()));
                throw new ProductNotFoundException(id);
            } catch (Exception e) {
                throw new ProductNotFoundException(id);
            }
        } else if (name != null) {
            try {
                List<Product> list = productsService.getByName(name);
                if (list == null || list.size() > 0)
                    return new ArrayList<ProductDTO>(list.stream().map(ProductDTO::new).collect(Collectors.toList()));

                throw new ProductNotFoundException(name);
            } catch (Exception e) {
                throw new ProductNotFoundException(name);
            }
        }
        return null;
    }

    @IsAdmin
    // Se manda el producto sin id como json
    @PostMapping("/create")
    public ProductDTO createProduct(@RequestBody Product product) {
        try {
            return new ProductDTO(productsService.addProduct(product));
        } catch (Exception e) {
            throw new GeneralException("product " + product.getName());
        }
    }

    @IsAdmin
    // Parametros
    @PostMapping("/new")
    public ProductDTO createProduct(@RequestParam(name = "name") String name,
            @RequestParam(name = "description") String description,
            @RequestParam(name = "imageUrl") String imageUrl, @RequestParam(name = "price") Double price,
            @RequestParam(name = "specials") String specials) {
        try {
            return new ProductDTO(productsService.addProduct(name, description, imageUrl, price, specials));
        } catch (Exception e) {
            throw new GeneralException("product " + name);
        }
    }

    @IsAdmin
    // Se manda el producto con id como json o se envian los parametros completos
    @PutMapping("/update")
    public ProductDTO updateProduct(@RequestBody(required = false) Product product,
            @RequestParam(required = false, name = "id") Long id,
            @RequestParam(required = false, name = "name") String name,
            @RequestParam(required = false, name = "description") String description,
            @RequestParam(required = false, name = "imageUrl") String imageUrl,
            @RequestParam(required = false, name = "price") Double price,
            @RequestParam(required = false, name = "specials") String specials) {
        if (product != null)
            try {
                return new ProductDTO(productsService.updateProduct(product));
            } catch (Exception e) {
                throw new GeneralException("product with id " + product.getId());
            }
        else if (id != null && name != null && description != null && imageUrl != null && price != null
                && specials != null)
            try {
                return new ProductDTO(productsService.updateProduct(id, name, description, imageUrl, price, specials));
            } catch (Exception e) {
                throw new GeneralException("product with id " + id);
            }
        return null;
    }

    @IsAdmin
    @DeleteMapping("/delete")
    public boolean deleteProduct(
            @RequestParam(name = "id") Long id) {
        try {
        if (id != null)
            return productsService.removeProduct(id);
        } catch (Exception e) {
            throw new GeneralException("product with id " + id);
        }
        return false;
    }
}
