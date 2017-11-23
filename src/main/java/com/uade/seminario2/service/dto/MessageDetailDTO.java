package com.uade.seminario2.service.dto;


import com.uade.seminario2.domain.Course;
import com.uade.seminario2.domain.EntityImpl;
import com.uade.seminario2.domain.Message;
import com.uade.seminario2.domain.User;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

public class MessageDetailDTO extends EntityDTO {

    private UserDTO Owner;

    private UserDTO TargetUser;

    private CourseDTO course;

    private MessageDTO message;

    private boolean isNew;

    private boolean active;

    public UserDTO getOwner() {
        return Owner;
    }

    public void setOwner(UserDTO owner) {
        Owner = owner;
    }

    public UserDTO getTargetUser() {
        return TargetUser;
    }

    public void setTargetUser(UserDTO targetUser) {
        TargetUser = targetUser;
    }

    public CourseDTO getCourse() {
        return course;
    }

    public void setCourse(CourseDTO course) {
        this.course = course;
    }

    public MessageDTO getMessage() {
        return message;
    }

    public void setMessage(MessageDTO message) {
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
