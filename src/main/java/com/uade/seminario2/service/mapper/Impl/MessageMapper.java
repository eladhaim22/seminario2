package com.uade.seminario2.service.mapper.Impl;

import com.uade.seminario2.domain.Message;
import com.uade.seminario2.repository.Impl.MessageRepositoryImpl;
import com.uade.seminario2.service.mapper.IEntityMapper;
import com.uade.seminario2.service.dto.MessageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class MessageMapper implements IEntityMapper<Message,MessageDTO> {

    @Autowired
    private MessageRepositoryImpl messageRepository;

    public MessageDTO ToDTO(Message message){
        return new MessageDTO() {{
            setId(message.getId());
            setMessage(message.getMessage());
            setType(message.getType());
            setTitle(message.getTitle());
            setCreatedDate(message.getCreatedDate());
        }};
    }

    public Message ToModel(MessageDTO messageDTO){
        Message message = null;
        if(message == null){
            message = new Message();
        }
        else{
            message = messageRepository.findOne(messageDTO.getId());
        }

        message.setMessage(messageDTO.getMessage());
        message.setType(messageDTO.getType());
        message.setTitle(messageDTO.getTitle());
        return message;
    }
}
