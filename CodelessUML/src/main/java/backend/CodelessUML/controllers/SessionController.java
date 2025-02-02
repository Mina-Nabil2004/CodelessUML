package backend.CodelessUML.controllers;

import backend.CodelessUML.model.Node;
import backend.CodelessUML.services.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

// Uncompleted

@RestController
@CrossOrigin("*")
@RequestMapping("/session")
public class SessionController {
   @Autowired
   private SessionService sessionService;

   @PostMapping("/update")
   public ResponseEntity<?> updateDiagram(@RequestParam UUID id, @RequestBody Node node) {
      sessionService.updateDiagram(id, node);
      return ResponseEntity.ok().build();
   }

   @PutMapping("/create")
   public ResponseEntity<?> createSession(String ownerName, String type) {
      try {
         sessionService.createSession(ownerName, type);
         return (ResponseEntity<?>) ResponseEntity.ok();

      } catch (Exception e) {
         return ResponseEntity.badRequest().body(e.getMessage());
      }
   }

   @DeleteMapping("/close")
   public ResponseEntity<?> closeSession(@RequestBody UUID id) {
      sessionService.closeSession(id);
      return (ResponseEntity<?>) ResponseEntity.ok();
   }
}
