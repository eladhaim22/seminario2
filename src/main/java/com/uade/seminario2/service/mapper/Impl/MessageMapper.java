package com.uade.seminario2.service.mapper.Impl;

import com.uade.seminario2.domain.Message;
import com.uade.seminario2.repository.Impl.ChildRepositoryImpl;
import com.uade.seminario2.repository.Impl.MessageRepositoryImpl;
import com.uade.seminario2.service.mapper.IEntityMapper;
import com.uade.seminario2.service.dto.MessageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class MessageMapper implements IEntityMapper<Message,MessageDTO> {

    @Autowired
    private TeacherMapper teacherMapper;

    @Autowired
    private ChildMapper childMapper;

    @Autowired
    private ChildRepositoryImpl childRepository;

    @Autowired
    private MessageRepositoryImpl messageRepository;


    public MessageDTO ToDTO(Message message){
        return new MessageDTO() {{
            setId(message.getId());
            setMessage(message.getMessage());
            setOwner(teacherMapper.ToDTO(message.getOwner()));
            setTargetChildsIds(message.getTargetUsers().stream().map(child -> child.getId()).collect(Collectors.toList()));
        }};
    }

    public Message ToModel(MessageDTO messageDTO){
        Message message = messageRepository.findOne(messageDTO.getId());
        if(message == null){
            message = new Message();
        }

        message.setOwner(teacherMapper.ToModel(messageDTO.getOwner()));
        message.setTargetUsers(messageDTO.getTargetChildsIds().stream().map(childId ->
            childRepository.findOne(childId)).collect(Collectors.toList()));
        message.setMessage(messageDTO.getMessage());
        return message;
    }
}
