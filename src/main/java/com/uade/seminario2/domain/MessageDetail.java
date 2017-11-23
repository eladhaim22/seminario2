package com.uade.seminario2.domain;


import org.hibernate.engine.internal.Cascade;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name = "message_details")
public class MessageDetail extends EntityImpl {

    @OneToOne
    @JoinColumn(name="owner_id",referencedColumnName = "id")
    private User owner;

    @OneToOne
    @JoinColumn(name="target_id",referencedColumnName = "id")
    private User targetUser;

    @OneToOne
    @JoinColumn(name="course_id",referencedColumnName = "id")
    private Course course;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="message_id",referencedColumnName = "id")
    private Message message;

    @Column(name = "isnew")
    private boolean isNew;

    private boolean active;

    public User getOwner() {
        return owner;
    }

    public User getTargetUser() {
        return targetUser;
    }

    public Course getCourse() {
        return course;
    }

    public Message getMessage() {
        return message;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public void setTargetUser(User targetUser) {
        this.targetUser = targetUser;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public void setMessage(Message message) {
        this.message = message;
    }

    public boolean isNew() {
        return isNew;
    }

    public void setNew(boolean aNew) {
        isNew = aNew;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
