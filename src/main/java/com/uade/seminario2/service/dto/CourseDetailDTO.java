package com.uade.seminario2.service.dto;

import com.uade.seminario2.domain.Course;
import com.uade.seminario2.domain.Message;
import com.uade.seminario2.domain.Student;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

public class CourseDetailDTO extends EntityDTO{
    private StudentDTO student;
    private CourseDTO course;
    private Integer note;
    private List<MessageDTO> messages = new ArrayList<>();

    public StudentDTO getStudent() {
        return student;
    }

    public void setStudent(StudentDTO student) {
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
