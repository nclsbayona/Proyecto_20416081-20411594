package co.edu.javeriana.proyecto2_web.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import co.edu.javeriana.proyecto2_web.entities.BillElement;

@Repository
public interface BillElementRepository extends CrudRepository<BillElement, Long> {
}
