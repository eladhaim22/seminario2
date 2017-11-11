package com.uade.seminario2.domain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "courseDetail")
public class CourseDetail extends EntityImpl{

    @ManyToOne
    @JoinColumn(name ="student_id")
    private User student;

    @ManyToOne
    @JoinColumn(name ="course_id")
    private Course course;

    @Column(name="note")
    private Integer note;

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Integer getNote() {
        return note;
    }

    public void setNote(Integer note) {
        this.note = note;
    }

}
