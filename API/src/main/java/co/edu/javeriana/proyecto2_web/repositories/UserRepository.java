package co.edu.javeriana.proyecto2_web.repositories;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import co.edu.javeriana.proyecto2_web.entities.User;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User, Long> {
    Optional<User> findById(Long id);
    Page<User> findByEmail(String email, Pageable pageable);
    Page<User> findByEmailEndingWith(String domain, Pageable pageable);
    @Query("select u from User u where u.email = ?1")
    User findByUsername(String username);
    @Query("delete from User u where u.id = ?1")
    void removeById(Long id);
}
