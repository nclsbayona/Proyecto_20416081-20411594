package co.edu.javeriana.proyecto2_web.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import co.edu.javeriana.proyecto2_web.entities.Bill;

@Repository
public interface BillRepository extends PagingAndSortingRepository<Bill, Long>{
    Page<Bill> findByUserId(Long id, Pageable pageable);
    List<Bill> findByUserId(Long id);
}
