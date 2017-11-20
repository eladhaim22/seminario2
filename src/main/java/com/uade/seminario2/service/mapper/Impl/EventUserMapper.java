package com.uade.seminario2.service.mapper.Impl;

import com.uade.seminario2.domain.Event;
import com.uade.seminario2.domain.EventUser;
import com.uade.seminario2.repository.Impl.EventRepositoryImpl;
import com.uade.seminario2.repository.Impl.EventUserRepositoryImpl;
import com.uade.seminario2.repository.UserRepository;
import com.uade.seminario2.service.dto.EventDTO;
import com.uade.seminario2.service.dto.EventUserDTO;
import com.uade.seminario2.service.mapper.IEntityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class EventUserMapper implements IEntityMapper<EventUser,EventUserDTO>{

    @Autowired
    private EventUserRepositoryImpl eventUserRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventMapper eventMapper;

    public EventUserDTO ToDTO(EventUser entity) {
        return new EventUserDTO(){{
            setId(entity.getId());
            setState(entity.getState());
            setEvent(eventMapper.ToDTO(entity.getEvent()));
            setUser(entity.getUser().getId());
        }};
    }

    public EventUser ToModel(EventUserDTO model) {
        EventUser eventUser = null;
        if (model.getId() == null) {
            eventUser = new EventUser();
        }
        else {
            eventUser = eventUserRepository.findOne(model.getId());
        }
        eventUser.setEvent(eventMapper.ToModel(model.getEvent()));
        eventUser.setState(model.getState());
        eventUser.setUser(userRepository.getOne(model.getUserId()));
        return eventUser;
    }
}
