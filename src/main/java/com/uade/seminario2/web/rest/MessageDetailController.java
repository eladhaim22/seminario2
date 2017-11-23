package com.uade.seminario2.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.uade.seminario2.domain.Message;
import com.uade.seminario2.domain.MessageDetail;
import com.uade.seminario2.domain.User;
import com.uade.seminario2.security.SecurityUtils;
import com.uade.seminario2.service.IGenericService;
import com.uade.seminario2.service.Impl.MessageDetailService;
import com.uade.seminario2.service.Impl.MessageService;
import com.uade.seminario2.service.Impl.UserService;
import com.uade.seminario2.service.dto.MessageDTO;
import com.uade.seminario2.service.dto.MessageDetailDTO;
import com.uade.seminario2.service.dto.UserDTO;
import com.uade.seminario2.service.mapper.Impl.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("api/messageDetail")
@Controller
public class MessageDetailController extends GenericController<MessageDetailDTO> {

    public MessageDetailController(MessageDetailService entityService) {
        super(entityService);
    }

    @Autowired
    private UserService userService;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private MessageService messageService;

    @GetMapping("/inbox/")
    public  ResponseEntity<List<MessageDetailDTO>> getInbox(){
        return new ResponseEntity<List<MessageDetailDTO>>
            (((MessageDetailService)this.entityService).getMessageByTargerUser(),HttpStatus.OK);
    }


    @GetMapping("/outbox/")
    public ResponseEntity<List<MessageDetailDTO>> getShipped(){
        return new ResponseEntity<List<MessageDetailDTO>>
            (((MessageDetailService)entityService).getMessageByOwnerUser(), HttpStatus.OK);
    }

    @GetMapping("/inbox/{courseId}")
    public  ResponseEntity<List<MessageDetailDTO>> getInboxByCourseId(@PathVariable Long  courseId){
        return new ResponseEntity<List<MessageDetailDTO>>
            (((MessageDetailService)this.entityService).getMessageByTargerUserAndCourseId(courseId),HttpStatus.OK);
    }

    @GetMapping("/outbox/{courseId}")
    public ResponseEntity<List<MessageDetailDTO>> getShippedByCourseId(@PathVariable Long  courseId){
        return new ResponseEntity<List<MessageDetailDTO>>
            (((MessageDetailService)entityService).getMessageByOwnerUserAndCourseId(courseId), HttpStatus.OK);
    }

    @PostMapping("/create")
    protected ResponseEntity CreateOverride(@RequestBody MessageDetailWrapper entityDTO) {
        MessageDTO messageDTO = messageService.createMessage(entityDTO.getMessageDetail().getMessage());
        UserDTO userDTO = userService.getUserWithAuthorities();
        List<MessageDetailDTO> messageDetails = new ArrayList<>();
        for(UserDTO u : entityDTO.getUsers()){
           MessageDetailDTO messageDetailDTO = new MessageDetailDTO(){{
                setActive(true);
                setNew(true);
                setOwner(userDTO);
                setMessage(messageDTO);
                setCourse(entityDTO.getMessageDetail().getCourse());
                setTargetUser(u);
            }};
            messageDetails.add(messageDetailDTO);
        }
        ((MessageDetailService)entityService).CreateAll(messageDetails);
        return new ResponseEntity(HttpStatus.OK);
    }


    @GetMapping("/delete/{messageId}")
    public ResponseEntity deleteMessage(@PathVariable Long messageId){
        MessageDetailDTO messageDetailDTO = ((MessageDetailService)entityService).GetById(messageId);
        messageDetailDTO.setActive(false);
        ((MessageDetailService)entityService).Update(messageDetailDTO);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/visited/{messageId}")
    public ResponseEntity setMessageNewFalse(@PathVariable Long messageId){
        MessageDetailDTO messageDetailDTO = ((MessageDetailService)entityService).GetById(messageId);
        messageDetailDTO.setNew(false);
        ((MessageDetailService)entityService).Update(messageDetailDTO);
        return new ResponseEntity(HttpStatus.OK);
    }
}

