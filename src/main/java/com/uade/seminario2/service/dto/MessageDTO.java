package com.uade.seminario2.service.dto;

import java.util.ArrayList;
import java.util.List;

public class MessageDTO extends EntityDTO {

    private TeacherDTO Owner;

    private List<Long> targetChildsIds = new ArrayList<>();

    private String message;

    public TeacherDTO getOwner() {
        return Owner;
    }

    public void setOwner(TeacherDTO owner) {
        Owner = owner;
    }

    public List<Long> getTargetChildsIds() {
        return targetChildsIds;
    }

    public void setTargetChildsIds(List<Long> targetChildsIds) {
        this.targetChildsIds = targetChildsIds;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
