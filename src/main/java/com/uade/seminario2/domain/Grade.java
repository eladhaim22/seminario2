package com.uade.seminario2.domain;

import com.uade.seminario2.repository.CascadeSupport.CascadeSave;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Document(collection = "grade")
public class Grade extends Entity {

    @DBRef
    @CascadeSave
    private List<Child> childs = new ArrayList<>();

    @DBRef
    @CascadeSave
    private List<Teacher> teachers = new ArrayList<>();


    public List<Child> getChilds() {
        return childs;
    }

    public void setChilds(List<Child> childs) {
        this.childs = childs;
    }

    public List<Teacher> getTeachers() {
        return teachers;
    }

    public void setTeachers(List<Teacher> teachers) {
        this.teachers = teachers;
    }
}
