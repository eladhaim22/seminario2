package com.uade.seminario2.service.dto;

import io.swagger.models.auth.In;

public class MaterialDTO extends EntityDTO {
    private Long course;

    private String title;

    private String videoId;

    public Long getCourse() {
        return course;
    }

    public void setCourse(Long course) {
        this.course = course;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getVideoId() {
        return videoId;
    }

    public void setVideoId(String videoId) {
        this.videoId = videoId;
    }
}
