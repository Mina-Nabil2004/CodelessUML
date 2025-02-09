package backend.CodelessUML.sessions;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.Queue;

@Service
public class SessionPool {
   private Queue<Session> inactiveSessions = new LinkedList<>();

   public synchronized Session reuseSession(String username, SessionTypes type) {
      if(inactiveSessions.isEmpty()) {
         return new Session(username, type);
      }

      Session newSession = inactiveSessions.poll();
      newSession.changeId();
      newSession.setOwnerName(username);
      newSession.setType(type);
      newSession.getUsers().clear();

      return newSession;
   }

   public synchronized void storeSession(Session session) {
      inactiveSessions.add(session);
   }

   @Scheduled(cron = "0 0 */2 * * *")        // every 2 hours
   public void cleanExcess() {
      final int MAX_POOL_SIZE = 20;
      while(inactiveSessions.size() > MAX_POOL_SIZE) {
         inactiveSessions.poll();
      }
   }
}
