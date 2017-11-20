package com.uade.seminario2.domain;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="events")
public class Event extends EntityImpl{
    private Date start;
    private Date end;
    private String title;
    private String description;
    private boolean needsAuthorization;
    private String grade;

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public boolean getNeedsAuthorization() {
        return needsAuthorization;
    }

    public void setNeedsAuthorization(boolean needsAuthorization) {
        this.needsAuthorization = needsAuthorization;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }
}
