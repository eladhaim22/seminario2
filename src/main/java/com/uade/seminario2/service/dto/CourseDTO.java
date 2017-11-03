package com.uade.seminario2.service.dto;

import java.util.ArrayList;
import java.util.List;

public class CourseDTO extends EntityDTO{
    private String name;

    private List<MessageDTO> messages = new ArrayList<>();;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<MessageDTO> getMessages() {
        return messages;
    }

    public void setMessages(List<MessageDTO> messages) {
        this.messages = messages;
    }
}
