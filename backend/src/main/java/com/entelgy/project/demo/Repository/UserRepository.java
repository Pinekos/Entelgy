package com.entelgy.project.demo.Repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.entelgy.project.demo.Entity.User;

//@CrossOrigin(origins = "http://localhost:3000")
@RepositoryRestResource(path = "users")
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    User findByEmail(String email);
}
