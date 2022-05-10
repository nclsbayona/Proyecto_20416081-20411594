package co.edu.javeriana.proyecto2_web.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import co.edu.javeriana.proyecto2_web.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long>{
}
