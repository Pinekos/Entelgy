package com.entelgy.project.demo.Controller;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.w3c.dom.events.Event;

import com.entelgy.project.demo.Entity.User;
import com.entelgy.project.demo.Service.EventService;
import com.entelgy.project.demo.Service.UserService;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private UserService userService;

    
    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return eventService.saveEvent(event);
    }

    @PostMapping("/user/{userId}")
    public Event createEventForUser(@PathVariable Long userId, @RequestBody Event event) {
        Optional<User> user = userService.getUserById(userId);
        return user.map(value -> eventService.saveEventForUser(event, value)).orElse(null);
    }

    @PutMapping("/{eventId}/user/{userId}")
    public Event assignEventToUser(@PathVariable Long eventId, @PathVariable Long userId) {
        return eventService.assignEventToUser(eventId, userId);
    }
    
    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event event) {
        return eventService.updateEvent(id, event);
    }

    @DeleteMapping("/{id}")
    public boolean deleteEvent(@PathVariable Long id) {
        return eventService.deleteEvent(id);
    }
    
    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/user/{userId}")
    public List<Event> getEventsByUser(@PathVariable Long userId) {
        Optional<User> user = userService.getUserById(userId);
        return user.map(eventService::getEventsByUser).orElse(null);
    }

    @GetMapping("/{id}")
    public Optional<Event> getEvent(@PathVariable Long id) {
        return eventService.getEventById(id);
    }
    
}