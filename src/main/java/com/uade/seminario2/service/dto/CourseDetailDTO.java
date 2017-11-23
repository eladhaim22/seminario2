package com.uade.seminario2.service.dto;

import java.util.ArrayList;
import java.util.List;

public class CourseDetailDTO extends EntityDTO{
    private UserDTO student;
    private CourseDTO course;
    private Integer note;

    private Integer finalNote;

    public UserDTO getStudent() {
        return student;
    }

    public void setStudent(UserDTO student) {
        this.student = student;
    }

    public CourseDTO getCourse() {
        return course;
    }

    public void setCourse(CourseDTO course) {
        this.course = course;
    }

    public Integer getNote() {
        return note;
    }

    public void setNote(Integer note) {
        this.note = note;
    }

    public Integer getFinalNote() {
        return finalNote;
    }

    public void setFinalNote(Integer finalNote) {
        this.finalNote = finalNote;
    }
}
