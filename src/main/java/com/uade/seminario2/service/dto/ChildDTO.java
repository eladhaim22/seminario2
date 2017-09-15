package com.uade.seminario2.service.dto;

import com.uade.seminario2.domain.Child;
import com.uade.seminario2.domain.Grade;
import com.uade.seminario2.domain.User;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ChildDTO extends EntityDTO{

    private Long gradeId;

    private String name;

    private String lastName;

    private Date birthDate;

    private Long userId;

    public Long getGradeId() {
        return gradeId;
    }

    public void setGradeId(Long gradeId) {
        this.gradeId = gradeId;
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
