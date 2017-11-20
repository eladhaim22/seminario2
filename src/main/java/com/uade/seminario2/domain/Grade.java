package com.uade.seminario2.domain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "grades")
public class Grade extends EntityImpl {

    private String name;

    @OneToMany(cascade = CascadeType.DETACH)
    @JoinColumn(name = "grade_id")
    private List<User> users = new ArrayList<>();

    @OneToMany(cascade = CascadeType.DETACH)
    @JoinColumn(name = "grade_id")
    private List<Course> courses = new ArrayList<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }
}
