package com.uade.seminario2.domain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "students")
public class Student extends EntityImpl{

    @Column(name = "birthDate")
    private Date birthDate;

    @OneToOne
    @JoinColumn(name="user_id",referencedColumnName = "id")
    private User user;

    @ManyToMany
    @JoinTable(name = "user_courses",
        joinColumns = {@JoinColumn(name = "student_id", referencedColumnName = "id")},
        inverseJoinColumns = {@JoinColumn(name = "course_id", referencedColumnName = "id")})
    private List<Course> courses =new ArrayList<>();

    @OneToMany
    @JoinColumn(name ="student_id")
    private List<CourseDetail> coursesDetail = new ArrayList<>();

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<CourseDetail> getCoursesDetail() {
        return coursesDetail;
    }
}
