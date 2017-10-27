package com.uade.seminario2.domain;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

@Entity
@Table(name = "courses")
public class Course extends EntityImpl{

    @JoinColumn(name="name")
    private String name;
}
