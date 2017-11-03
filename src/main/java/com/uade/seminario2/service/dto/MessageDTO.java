package com.uade.seminario2.service.dto;

import java.util.ArrayList;
import java.util.List;

public class MessageDTO extends EntityDTO {

    private TeacherDTO Owner;

    private String message;

    public TeacherDTO getOwner() {
        return Owner;
    }

    public void setOwner(TeacherDTO owner) {
        Owner = owner;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
