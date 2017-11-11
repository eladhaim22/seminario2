package com.uade.seminario2.service.dto;

import java.util.ArrayList;
import java.util.List;

public class CourseDetailDTO extends EntityDTO{
    private UserDTO student;
    private CourseDTO course;
    private Integer note;
    private List<MessageDTO> messages = new ArrayList<>();

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

    public List<MessageDTO> getMessages() {
        return messages;
    }

    public void setMessages(List<MessageDTO> messages) {
        this.messages = messages;
    }
}
