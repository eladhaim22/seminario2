package com.uade.seminario2.domain;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name="event_user")
public class EventUser extends EntityImpl{

    @OneToOne
    @JoinColumn(name="event_id")
    private Event event;

    @OneToOne
    @JoinColumn(name="user_id")
    private User user;

    private String state;

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
