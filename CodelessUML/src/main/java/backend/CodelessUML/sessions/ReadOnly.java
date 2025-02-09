package backend.CodelessUML.sessions;

import backend.CodelessUML.model.Node;

public class ReadOnly extends SessionType {
   /**
    * send to all users subscribed in sessions
    * checks if sender is the owner only, otherwise return
    * @param node to be sent to all subscribers in session
    * @param current session to send
    * @param sender Name of user that sends node
    */
   @Override
   public boolean send(Session current, String sender, Node node) {
      if(node == null || !sender.equalsIgnoreCase(current.getOwnerName()))
         return false;

      // send by websocket controller
      wsSender.updateNode(current.getId(), node);
      return true;
   }
}
