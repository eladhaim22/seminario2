package com.uade.seminario2.service.dto;

import com.uade.seminario2.domain.Grade;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotNull;
import java.util.*;

public class TeacherDTO extends EntityDTO {

    private List<Long> gradeIds = new ArrayList<>();

    private String name;

    private String lastName;

    private Long userId;

    public List<Long> getGradeIds() {
        return gradeIds;
    }

    public void setGradeIds(List<Long> gradeIds) {
        this.gradeIds = gradeIds;
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
