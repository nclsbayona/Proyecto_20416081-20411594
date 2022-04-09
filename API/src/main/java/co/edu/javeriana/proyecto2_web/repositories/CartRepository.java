package co.edu.javeriana.proyecto2_web.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import co.edu.javeriana.proyecto2_web.entities.Cart;

@Repository
public interface CartRepository extends PagingAndSortingRepository<Cart, Long>{
    Page<Cart> findByUserId(Long userId, Pageable pageable);
    @Query("delete from Cart c where c.user.id = ?1")
    void removeByUserId(Long userId);
    @Query("delete from Cart c where c.id = ?1")
    void removeById(Long id);
}
