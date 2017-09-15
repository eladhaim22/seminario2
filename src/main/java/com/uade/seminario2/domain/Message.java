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
    @JoinTable(name = "messages_childs",
        joinColumns = {@JoinColumn(name = "message_id", referencedColumnName = "id")},
        inverseJoinColumns = {@JoinColumn(name = "child_id", referencedColumnName = "id")})
    private List<Child> targetChilds;

    @NotNull
    @Column(name = "message")
    private String message;

    public Teacher getOwner() {
        return Owner;
    }

    public void setOwner(Teacher owner) {
        Owner = owner;
    }

    public List<Child> getTargetUsers() {
        return targetChilds;
    }

    public void setTargetUsers(List<Child> targetUsers) {
        this.targetChilds = targetUsers;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
