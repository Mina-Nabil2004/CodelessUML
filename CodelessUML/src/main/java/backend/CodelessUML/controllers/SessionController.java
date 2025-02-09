package backend.CodelessUML.controllers;

import backend.CodelessUML.services.SessionService;
import backend.CodelessUML.sessions.SessionTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@CrossOrigin("*")
@RequestMapping("/session")
public class SessionController {
   @Autowired
   private SessionService sessionService;

   @PutMapping("/create")
   public ResponseEntity<?> createSession(@RequestParam String ownerName, @RequestParam String type) {
      try {
         sessionService.createSession(ownerName, SessionTypes.fromString(type));
         return ResponseEntity.ok().build();

      } catch (Exception e) {
         return ResponseEntity.badRequest().body(e.getMessage());
      }
   }

   @PostMapping("/accept-user")
   public ResponseEntity<?> acceptUser(@RequestParam UUID id, @RequestParam String username) {
      try {
         sessionService.acceptUser(id, username);
         return ResponseEntity.ok().build();

      } catch (Exception e) {
         return ResponseEntity.badRequest().body(e.getMessage());
      }
   }

   @DeleteMapping("/close")
   public ResponseEntity<?> closeSession(@RequestParam UUID id) {
      try {
         sessionService.closeSession(id);
         return ResponseEntity.ok().build();

      } catch (Exception e) {
         return ResponseEntity.badRequest().body(e.getMessage());
      }
   }
}
