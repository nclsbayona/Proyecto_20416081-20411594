package co.edu.javeriana.proyecto2_web.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import co.edu.javeriana.proyecto2_web.entities.Product;
import co.edu.javeriana.proyecto2_web.services.ProductsService;

@RestController
@RequestMapping("/api/products")
public class ProductsController {

    @Autowired
    ProductsService productsService;

    @GetMapping("/get/all")
    public List<Product> getAll() {
        return productsService.getAll();
    }

    @GetMapping("/get")
    public List<Product> getProduct(@RequestParam(required = false, name = "id") Long id,
            @RequestParam(required = false, name = "name") String name) {
        if (id != null)
            return List.of(productsService.getProduct(id));
        else if (name != null)
            return productsService.getByName(name);
        return null;
    }

    @PostMapping("/create")
    public Product createProduct(@RequestBody Product product) {
        return productsService.addProduct(product);
    }

    @PostMapping("/new")
    public Product createProduct(@RequestParam(name = "name") String name, @RequestParam(name = "description") String description,
    @RequestParam(name = "imageUrl") String imageUrl, @RequestParam(name = "price") Double price, @RequestParam(name = "specials") String specials) {
        return productsService.addProduct(name, description, imageUrl, price, specials);
    }

    @PutMapping("/update")
    public Product updateProduct(@RequestBody(required = false) Product product,
            @RequestParam(required = false, name = "id") Long id,
            @RequestParam(required = false, name = "name") String name,
            @RequestParam(required = false, name = "description") String description,
            @RequestParam(required = false, name = "imageUrl") String imageUrl,
            @RequestParam(required = false, name = "price") Double price,
            @RequestParam(required = false, name = "specials") String specials) {
        if (product != null)
            return productsService.updateProduct(product);
        else if (id != null && name != null && description != null && imageUrl != null && price != null
                && specials != null)
            productsService.updateProduct(id, name, description, imageUrl, price, specials);
        return null;
    }

    @DeleteMapping("/delete")
    public boolean deleteProduct(@RequestBody(required = false) Product product,
            @RequestParam(required = false, name = "id") Long id) {
        if (id != null)
            return productsService.removeProduct(id);
        else if (product != null)
            productsService.removeProduct(product);
        return false;
    }
}
