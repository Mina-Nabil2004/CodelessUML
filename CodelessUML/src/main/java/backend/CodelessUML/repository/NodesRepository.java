package backend.CodelessUML.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import backend.CodelessUML.model.Node;

@Component
public class NodesRepository {
   private Map<String, Node> map = new HashMap<>();

   // NodesRepository() {
   //    this.map = new HashMap<>();
   // }

   public Node getNodeById(String id) {
      return map.get(id);
   }

   public Node addNode(Node node) {
      return map.put(node.getId(), node);
   }

   public boolean isEmpty() {
      return map.isEmpty();
   }

   public List<Node> toList() {
      return new ArrayList<>(map.values());
   }

   public void updateFromList(List<Node> nodes) {
      map = nodes.stream()
                 .collect(Collectors.toMap(Node::getId, node -> node));
   }
}