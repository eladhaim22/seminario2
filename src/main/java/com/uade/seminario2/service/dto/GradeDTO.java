package com.uade.seminario2.service.dto;

import java.util.ArrayList;
import java.util.List;

public class GradeDTO extends EntityDTO {

    private List<StudentDTO> childs = new ArrayList<>();

    private List<TeacherDTO> teachers = new ArrayList<>();

    public List<StudentDTO> getChilds() {
        return childs;
    }

    public void setChilds(List<StudentDTO> childs) {
        this.childs = childs;
    }

    public List<TeacherDTO> getTeachers() {
        return teachers;
    }

    public void setTeachers(List<TeacherDTO> teachers) {
        this.teachers = teachers;
    }
}
