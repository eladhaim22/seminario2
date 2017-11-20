package com.uade.seminario2.web.rest;

import com.uade.seminario2.domain.Event;
import com.uade.seminario2.domain.User;
import com.uade.seminario2.security.AuthoritiesConstants;
import com.uade.seminario2.security.SecurityUtils;
import com.uade.seminario2.service.Impl.CourseService;
import com.uade.seminario2.service.Impl.EventService;
import com.uade.seminario2.service.Impl.UserService;
import com.uade.seminario2.service.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.PathParam;
import java.util.List;

@RequestMapping("api/event")
@Controller
public class EventController extends GenericController<EventDTO> {

    public EventController(EventService entityService) {
        super(entityService);
    }

    @Autowired
    private UserService userService;

    @GetMapping("/byUser/")
    public ResponseEntity<List<EventUserDTO>> getEventsByUserId(){
        User user = userService.getUserWithAuthoritiesByLogin(SecurityUtils.getCurrentUserLogin()).get();
        return new ResponseEntity<List<EventUserDTO>>(((EventService)entityService).getEventsByUserId(user.getId()),HttpStatus.OK);
    }


    @GetMapping("/eventUser/{id}")
    public ResponseEntity<EventUserDTO> getEventUserById(@PathVariable Long id){
        return new ResponseEntity<EventUserDTO>(((EventService)entityService).getEventUserById(id),HttpStatus.OK);
    }

    @PostMapping("/authorize/")
    public ResponseEntity<EventUserDTO> setAuthorize(@RequestBody EventUserDTO eventUserDTO){
        return new ResponseEntity<EventUserDTO>(((EventService)entityService).authorize(eventUserDTO),HttpStatus.OK);
    }


    @PostMapping("/saveWithUsers/")
    public ResponseEntity saveWithUsers(@RequestBody  EventDTO eventDTOParam){
        EventDTO eventDTO = ((EventService)entityService).saveEvent(eventDTOParam);
        List<UserDTO> users = userService.getAllByGrade(eventDTOParam.getGrade());
        for(UserDTO user : users){
            EventUserDTO eventUserDTO = new EventUserDTO();
            eventUserDTO.setEvent(eventDTO);
            eventUserDTO.setUser(user.getId());
            eventUserDTO.setState(eventDTO.getNeedsAuthorization() ? "pending" : "accepted");
            ((EventService)entityService).saveEventUser(eventUserDTO);
        }
        return new ResponseEntity(HttpStatus.OK);
    }
}
