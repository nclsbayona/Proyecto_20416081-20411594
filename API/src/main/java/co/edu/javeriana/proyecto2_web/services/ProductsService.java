package co.edu.javeriana.proyecto2_web.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import co.edu.javeriana.proyecto2_web.entities.Product;
import co.edu.javeriana.proyecto2_web.repositories.ProductRepository;

@Service
public class ProductsService {
    @Autowired
    ProductRepository productRepository;

    public Product addProduct(Product product) {
       return productRepository.save(product);
    }

    public Product addProduct(String name, String description, String imageUrl, double price, String specials) {
        return productRepository.save(new Product(name, description, price, imageUrl, specials));
    }

    public boolean removeProduct(Product product) {
        productRepository.delete(product);
        return true;
    }

    public boolean removeProduct(Long id) {
        productRepository.deleteById(id);
        return true;
    }

    public Product getProduct(Long id) {
        return productRepository.findById(id).get();
    }

    public List<Product> getAll(){
        return (List<Product>) productRepository.findAll();
    }

    public List<Product> getByName(String name){
        
        return productRepository.findByName(name, PageRequest.of(0,10)).getContent();
    }

    public Product updateProduct(Product product){
        if (productRepository.findById(product.getId()).isPresent()) {
            return productRepository.save(product);
        }
        return null;
    }

    public Product updateProduct(Long id, String name, String description, String imageUrl, Double price, String specials){
        Product product=productRepository.findById(id).get();
        if (product!=null){
            product.setName(name);
            product.setDescription(description);
            product.setImageUrl(imageUrl);
            product.setPrice(price);
            product.setSpecials(specials);
            return productRepository.save(product);
        }
        return null;
    }
}
