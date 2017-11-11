package com.uade.seminario2.service.dto;

import java.util.ArrayList;
import java.util.List;

public class MessageDTO extends EntityDTO {

    private String message;

    private String type;

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
}
