package com.uade.seminario2.service.Impl;


import com.uade.seminario2.domain.Message;
import com.uade.seminario2.repository.Impl.MessageRepositoryImpl;
import com.uade.seminario2.service.IGenericService;
import com.uade.seminario2.service.dto.MessageDTO;
import com.uade.seminario2.service.mapper.Impl.MessageMapper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MessageService  extends GenericService<Message,MessageDTO> implements IGenericService<Message,MessageDTO> {
    public MessageService(MessageMapper messageMapper, MessageRepositoryImpl messageRepository) {
        super(messageMapper, messageRepository);
    }

    public MessageDTO createMessage(MessageDTO messageDTO){
        Message message = ((MessageRepositoryImpl)repository).save(((MessageMapper)entityMapper).ToModel(messageDTO));
        return ((MessageMapper)entityMapper).ToDTO(message);
    }
}
