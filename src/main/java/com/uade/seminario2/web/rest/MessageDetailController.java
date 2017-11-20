package com.uade.seminario2.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.uade.seminario2.security.SecurityUtils;
import com.uade.seminario2.service.IGenericService;
import com.uade.seminario2.service.Impl.MessageDetailService;
import com.uade.seminario2.service.Impl.UserService;
import com.uade.seminario2.service.dto.MessageDetailDTO;
import com.uade.seminario2.service.dto.UserDTO;
import com.uade.seminario2.service.mapper.Impl.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
    protected ResponseEntity CreateOverride(@RequestBody MessageDetailDTO entityDTO){
        UserDTO owner = userMapper.userToUserDTO(
            userService.getUserWithAuthoritiesByLogin(SecurityUtils.getCurrentUserLogin()).get());
        entityDTO.setOwner(owner);
        this.Create(entityDTO);
        return new ResponseEntity(entityDTO,HttpStatus.OK);
    }
}

