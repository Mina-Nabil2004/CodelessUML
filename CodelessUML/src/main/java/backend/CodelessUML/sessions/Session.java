package backend.CodelessUML.sessions;

import backend.CodelessUML.model.Node;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.UUID;

@Getter
public class Session {
   private ArrayList<String> waitingList;
   @Setter
   private String ownerName;
   private UUID id;
   private SessionType type;

   public Session(String type, String ownerName) {
      this.type = switch (type) {
         case "read-only" -> new ReadOnly();
         case "read-write" -> new ReadWrite();
         default -> throw new IllegalArgumentException("Invalid type input");
      };
      this.id = UUID.randomUUID();
      this.ownerName = ownerName;
      this.waitingList = new ArrayList<>();
   }

   public boolean accept(String username) {
      return waitingList.remove(username);
   }

   public void changeId() {
      id = UUID.randomUUID();
   }

   public void setType(String type) {
      this.type = switch (type) {
         case "read-only" -> new ReadOnly();
         case "read-write" -> new ReadWrite();
         default -> throw new IllegalArgumentException("Invalid type input");
      };
   }

   public void send(Node node) {
      this.type.send(this, node);
   }

}