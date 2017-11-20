package com.uade.seminario2.service.Impl;


import com.uade.seminario2.domain.Course;
import com.uade.seminario2.domain.Event;
import com.uade.seminario2.domain.EventUser;
import com.uade.seminario2.domain.User;
import com.uade.seminario2.repository.Impl.CourseRepositoryImpl;
import com.uade.seminario2.repository.Impl.EventRepositoryImpl;
import com.uade.seminario2.repository.Impl.EventUserRepositoryImpl;
import com.uade.seminario2.repository.UserRepository;
import com.uade.seminario2.service.IGenericService;
import com.uade.seminario2.service.dto.CourseDTO;
import com.uade.seminario2.service.dto.EventDTO;
import com.uade.seminario2.service.dto.EventUserDTO;
import com.uade.seminario2.service.mapper.Impl.CourseMapper;
import com.uade.seminario2.service.mapper.Impl.EventMapper;
import com.uade.seminario2.service.mapper.Impl.EventUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService extends GenericService<Event,EventDTO> implements IGenericService<Event,EventDTO> {
    public EventService(EventMapper eventMapper, EventRepositoryImpl eventRepository) {
        super(eventMapper, eventRepository);
    }

    @Autowired
    private EventUserMapper eventUserMapper;

    @Autowired
    private EventUserRepositoryImpl eventUserRepository;

    public List<EventUserDTO> getEventsByUserId(Long id){
        return eventUserRepository.findAllByUser_Id(id).stream().map(
            eventUser -> eventUserMapper.ToDTO(eventUser)).collect(Collectors.toList());
    }

    public EventUserDTO authorize(EventUserDTO eventUserDTO){
        EventUser eventUserToChange = eventUserRepository.findOne(eventUserDTO.getId());
        eventUserToChange.setState(eventUserDTO.getState());
        eventUserRepository.save(eventUserToChange);
        return eventUserMapper.ToDTO(eventUserToChange);
    }

    public EventDTO saveEvent(EventDTO eventDTO){
        Event event = ((EventRepositoryImpl)repository).save(((EventMapper)entityMapper).ToModel(eventDTO));
        eventDTO.setId(event.getId());
        return eventDTO;
    }

    public void saveEventUser(EventUserDTO eventUserDTO){
        EventUser eventUser = eventUserMapper.ToModel(eventUserDTO);
        eventUserRepository.save(eventUser);
    }

    @Transactional
    public EventUserDTO getEventUserById(Long id){
        EventUser eventUser = eventUserRepository.getOne(id);
        EventUserDTO eventUserDTO = eventUserMapper.ToDTO(eventUser);
        return eventUserDTO;
    }
}
