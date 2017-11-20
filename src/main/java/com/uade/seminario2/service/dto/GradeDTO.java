package com.uade.seminario2.service.dto;

import java.util.ArrayList;
import java.util.List;

public class GradeDTO extends EntityDTO{
    private String name;
    private List<CourseDTO> courses = new ArrayList<>();
    private List<Long> users = new ArrayList<>();


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<CourseDTO> getCourses() {
        return courses;
    }

    public void setCourses(List<CourseDTO> courses) {
        this.courses = courses;
    }

    public List<Long> getUsers() {
        return users;
    }

    public void setUsers(List<Long> users) {
        this.users = users;
    }
}
