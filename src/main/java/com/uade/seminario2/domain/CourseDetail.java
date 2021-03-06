package com.uade.seminario2.domain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "courseDetail")
public class CourseDetail extends EntityImpl{

    @ManyToOne
    @JoinColumn(name ="user_id")
    private User student;

    @ManyToOne
    @JoinColumn(name ="course_id")
    private Course course;

    @Column(name="note")
    private Integer note;

    private Integer finalNote;

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

    public Integer getFinalNote() {
        return finalNote;
    }

    public void setFinalNote(Integer finalNote) {
        this.finalNote = finalNote;
    }
}
