package com.uade.seminario2.domain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "courses")
public class Course extends EntityImpl{

    @Column(name="name")
    private String name;

    /*@OneToMany
    @JoinColumn(name="course_id")
    private List<Message> message = new ArrayList<>();*/

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    /*public List<Message> getMessages() {
        return message;
    }*/
}
