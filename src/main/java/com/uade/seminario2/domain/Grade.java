package com.uade.seminario2.domain;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "grades")
public class Grade extends EntityImpl {

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "grade_id",referencedColumnName = "id" )
    private List<Child> childs = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "grades_teachers",
        joinColumns = {@JoinColumn(name = "grade_id", referencedColumnName = "id")},
        inverseJoinColumns = {@JoinColumn(name = "teacher_id", referencedColumnName = "id")})
    private List<Teacher> teachers = new ArrayList<>();

    @Column(name = "name")
    private String name;

    public List<Child> getChilds() {
        return childs;
    }

    public void setChilds(List<Child> childs) {
        this.childs = childs;
    }

    public List<Teacher> getTeachers() {
        return teachers;
    }

    public void setTeachers(List<Teacher> teachers) {
        this.teachers = teachers;
    }
}
