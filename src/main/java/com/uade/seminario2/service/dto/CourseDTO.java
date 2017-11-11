package com.uade.seminario2.service.dto;

import java.util.ArrayList;
import java.util.List;

public class CourseDTO extends EntityDTO{
    private String name;

    private List<UserDTO> users;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<UserDTO> getUsers() {
        return users;
    }

    public void setUsers(List<UserDTO> courses) {
        this.users = courses;
    }
}
