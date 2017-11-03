package com.uade.seminario2.domain;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name = "messages")
public class Message extends EntityImpl {

    @NotNull
    @OneToOne
    @JoinColumn(name = "teacher_id", referencedColumnName = "id")
    private Teacher Owner;

    @NotNull
    @Column(name = "message")
    private String message;

    public Teacher getOwner() {
        return Owner;
    }

    public void setOwner(Teacher owner) {
        Owner = owner;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
