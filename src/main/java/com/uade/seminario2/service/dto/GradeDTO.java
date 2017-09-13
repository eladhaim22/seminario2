package com.uade.seminario2.service.dto;

import com.uade.seminario2.domain.Child;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicBoolean;

public class GradeDTO extends EntityDTO {

    private List<ChildDTO> childs = new ArrayList<>();

    private List<TeacherDTO> teachers = new ArrayList<>();

    public List<ChildDTO> getChilds() {
        return childs;
    }

    public void setChilds(List<ChildDTO> childs) {
        this.childs = childs;
    }

    public List<TeacherDTO> getTeachers() {
        return teachers;
    }

    public void setTeachers(List<TeacherDTO> teachers) {
        this.teachers = teachers;
    }
}
