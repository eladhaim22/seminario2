package com.uade.seminario2.service.dto;

import com.uade.seminario2.domain.Grade;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotNull;
import java.util.*;

public class TeacherDTO extends EntityDTO {

    private List<String> gradeIds = new ArrayList<>();

    private String name;

    private String lastName;

    public List<String> getGradeIds() {
        return gradeIds;
    }

    public void setGradeIds(List<String> gradeIds) {
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
}
