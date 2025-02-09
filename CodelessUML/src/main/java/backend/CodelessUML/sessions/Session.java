package backend.CodelessUML.sessions;

import backend.CodelessUML.model.Node;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.UUID;

@Getter
public class Session {
   @Setter
   private String ownerName;
   private UUID id;
   private SessionType type;
   private HashSet<String> users;

   public Session(String ownerName, SessionTypes type) {
      this.type = switch (type) {
         case READ_ONLY    -> new ReadOnly();
         case READ_WRITE   -> new ReadWrite();
         default           -> throw new IllegalArgumentException("Invalid type input");
      };
      this.id = UUID.randomUUID();
      this.ownerName = ownerName;
      this.users = new HashSet<>();
   }

   public void changeId() {
      this.id = UUID.randomUUID();
   }

   public boolean acceptUser(String username) {
      return this.users.add(username);
   }

   public void setType(SessionTypes type) {
      this.type = switch (type) {
         case READ_ONLY    -> new ReadOnly();
         case READ_WRITE   -> new ReadWrite();
         default           -> throw new IllegalArgumentException("Invalid type input");
      };
   }

   public boolean send(String sender, Node node) {
      if(!users.contains(sender))
            return  false;

      return this.type.send(this, sender, node);
   }

}