package com.entelgy.project.demo.Service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entelgy.project.demo.Entity.Event;
import com.entelgy.project.demo.Entity.User;
import com.entelgy.project.demo.Repository.EventRepository;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event event) {
        Optional<Event> existingEvent = eventRepository.findById(id);
        if (existingEvent.isPresent()) {
            Event updatedEvent = existingEvent.get();
            updatedEvent.setTitle(event.getTitle());
            updatedEvent.setMessage(event.getMessage());
            updatedEvent.setStartDate(event.getStartDate());
            updatedEvent.setEndDate(event.getEndDate());
            updatedEvent.setStart(event.getStart());
            updatedEvent.setEnd(event.getEnd());
            return eventRepository.save(updatedEvent);
        }
        return null;
    }
    
    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public List<Event> getEventsByUser(User user) {
        return eventRepository.findByUser(user);
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }
}
