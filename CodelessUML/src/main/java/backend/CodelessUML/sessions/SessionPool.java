package backend.CodelessUML.sessions;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.Queue;

@Service
public class SessionPool {
   private Queue<Session> inactiveSessions = new LinkedList<>();

   public Session reuseSession(String username, String type) {
      if(inactiveSessions.isEmpty()) {
         return new Session(username, type);
      }

      Session newSession = inactiveSessions.poll();
      newSession.changeId();
      newSession.setOwnerName(username);
      newSession.setType(type);
      newSession.getWaitingList().clear();

      return newSession;
   }

   public void storeSession(Session session) {
      inactiveSessions.add(session);
   }
}
