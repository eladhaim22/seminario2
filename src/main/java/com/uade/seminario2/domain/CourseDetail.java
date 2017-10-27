package com.uade.seminario2.domain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "courseDetail")
public class CourseDetail extends EntityImpl{

    @Column(name="note")
    private Integer note;

    @OneToMany
    @JoinColumn(name="courseDetail_id")
    private List<Message> messages = new ArrayList<>();

    public Integer getNotes() {
        return note;
    }

    public List<Message> getMessages() {
        return messages;
    }
}
