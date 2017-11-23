package com.uade.seminario2.service.dto;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class MessageDTO extends EntityDTO {
    private String title;

    private String message;

    private String type;

    private Instant createdDate;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }
}
