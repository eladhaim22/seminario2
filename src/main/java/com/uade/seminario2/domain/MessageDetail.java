package com.uade.seminario2.domain;


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

    @OneToOne
    @JoinColumn(name="message_id",referencedColumnName = "id")
    private Message message;

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
        owner = owner;
    }

    public void setTargetUser(User targetUser) {
        targetUser = targetUser;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public void setMessage(Message message) {
        this.message = message;
    }
}
