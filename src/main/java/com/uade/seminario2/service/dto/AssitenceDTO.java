package com.uade.seminario2.service.dto;

import java.util.Date;

public class AssitenceDTO extends EntityDTO {
    private Date date;
    private boolean present;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public boolean isPresent() {
        return present;
    }

    public void setPresent(boolean present) {
        this.present = present;
    }
}
