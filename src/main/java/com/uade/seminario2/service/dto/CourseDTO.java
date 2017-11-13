package com.uade.seminario2.service.dto;

import java.util.ArrayList;
import java.util.List;

public class CourseDTO extends EntityDTO{
    private String name;

    private List<Long> usersIds = new ArrayList<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Long> getUsers() {
        return usersIds;
    }

    public void setUsers(List<Long> courses) {
        this.usersIds = courses;
    }
}
