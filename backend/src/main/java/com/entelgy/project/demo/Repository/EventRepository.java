package com.entelgy.project.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.entelgy.project.demo.Entity.Event;
import com.entelgy.project.demo.Entity.User;

//@CrossOrigin(origins = "http://localhost:3000")
@RepositoryRestResource(path = "events")
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByUser(User user);
}