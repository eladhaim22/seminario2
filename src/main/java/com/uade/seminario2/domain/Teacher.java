package com.uade.seminario2.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "teachers")
public class Teacher extends EntityImpl{

    @ManyToMany
    @JoinTable(name = "grades_teachers",
        joinColumns = {@JoinColumn(name = "teacher_id", referencedColumnName = "id")},
        inverseJoinColumns = {@JoinColumn(name = "grade_id", referencedColumnName = "id")})
    private List<Grade> grades = new ArrayList<>();

    @OneToOne
    @JoinColumn(name="user_id",referencedColumnName = "id")
    private User user;

    @NotNull
    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "lastName")
    private String lastName;

    public List<Grade> getGrades() {
        return grades;
    }

    public void setGrades(List<Grade> grades) {
        this.grades = grades;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
