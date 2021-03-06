package com.uade.seminario2.service.dto;
import java.util.Date;

public class EventDTO extends EntityDTO {

    private Date start;
    private Date end;
    private String title;
    private String description;
    private boolean needsAuthorization;
    private GradeDTO grade;

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

    public String getDescription() {
        return description;
    }

    public boolean getNeedsAuthorization() {
        return needsAuthorization;
    }

    public void setNeedsAuthorization(boolean needsAuthorization) {
        this.needsAuthorization = needsAuthorization;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public GradeDTO getGrade() {
        return grade;
    }

    public void setGrade(GradeDTO grade) {
        this.grade = grade;
    }
}
