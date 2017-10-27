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

    @ManyToMany
    @JoinTable(name = "messages_students",
        joinColumns = {@JoinColumn(name = "message_id", referencedColumnName = "id")},
        inverseJoinColumns = {@JoinColumn(name = "student_id", referencedColumnName = "id")})
    private List<Student> targetStudents;

    @NotNull
    @Column(name = "message")
    private String message;

    public Teacher getOwner() {
        return Owner;
    }

    public void setOwner(Teacher owner) {
        Owner = owner;
    }

    public List<Student> getTargetUsers() {
        return targetStudents;
    }

    public void setTargetUsers(List<Student> targetUsers) {
        this.targetStudents = targetUsers;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
