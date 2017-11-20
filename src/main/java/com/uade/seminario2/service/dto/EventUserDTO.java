package com.uade.seminario2.service.dto;

import com.uade.seminario2.domain.EntityImpl;
import com.uade.seminario2.domain.Event;
import com.uade.seminario2.domain.User;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

public class EventUserDTO extends EntityDTO{
    private EventDTO event;

    private Long userId;

    private String state;

    public EventDTO getEvent() {
        return event;
    }

    public void setEvent(EventDTO event) {
        this.event = event;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUser(Long userId) {
        this.userId = userId;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
