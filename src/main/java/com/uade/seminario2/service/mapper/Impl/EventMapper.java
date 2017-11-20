package com.uade.seminario2.service.mapper.Impl;

import com.uade.seminario2.domain.Course;
import com.uade.seminario2.domain.Event;
import com.uade.seminario2.repository.Impl.CourseRepositoryImpl;
import com.uade.seminario2.repository.Impl.EventRepositoryImpl;
import com.uade.seminario2.repository.UserRepository;
import com.uade.seminario2.service.dto.CourseDTO;
import com.uade.seminario2.service.dto.EventDTO;
import com.uade.seminario2.service.mapper.IEntityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class EventMapper implements IEntityMapper<Event,EventDTO>{

    @Autowired
    private EventRepositoryImpl eventRepository;

    @Autowired
    private UserRepository userRepository;

    public EventDTO ToDTO(Event entity) {
        return new EventDTO(){{
            setId(entity.getId());
            setDescription(entity.getDescription());
            setEnd(entity.getEnd());
            setNeedsAuthorization(entity.getNeedsAuthorization());
            setStart(entity.getStart());
            setTitle(entity.getTitle());
            setGrade(entity.getGrade());
        }};
    }

    public Event ToModel(EventDTO model) {
        Event event = null;
        if (model.getId() == null) {
            event = new Event();
        }
        else {
            event = eventRepository.findOne(model.getId());
        }
        event.setEnd(model.getEnd());
        event.setNeedsAuthorization(model.getNeedsAuthorization());
        event.setStart(model.getStart());
        event.setTitle(model.getTitle());
        event.setGrade(model.getGrade());
        return event;
    }
}
