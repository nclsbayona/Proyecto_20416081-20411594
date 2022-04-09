package co.edu.javeriana.proyecto2_web.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import co.edu.javeriana.proyecto2_web.entities.Product;

@Repository
public interface ProductRepository extends PagingAndSortingRepository<Product, Long> {
    Page<Product> findByName(String name, Pageable pageable);
    Page<Product> findAll(Pageable pageable);
    Optional<Product> findById(Long id);
    @Query("delete from Product p where p.id = ?1")
    void removeById(Long id);
}
