package com.uade.seminario2.domain;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "childs")
public class Child extends EntityImpl{

    @OneToOne
    @JoinColumn(name="grade_id")
    private Grade grade;

    @Column(name = "name")
    private String name;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "birthDate")
    private Date birthDate;

    @OneToOne
    @JoinColumn(name="user_id",referencedColumnName = "id")
    private User user;

    public Grade getGrade() {
        return grade;
    }

    public void setGrade(Grade grade) {
        this.grade = grade;
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
}
