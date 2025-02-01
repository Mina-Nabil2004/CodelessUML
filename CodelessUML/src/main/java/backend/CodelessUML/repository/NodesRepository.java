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
      System.out.println("---------------------------------");
      System.out.println(id);
      System.out.println("-----------------------------------");
      return map.get(id);
   }

   public Node addNode(Node node) {
      System.out.println("--------------------------------------------###################-----------------");
      System.out.println(node.toString());
      System.out.println("--------------------------------------------###################3-------");
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

   public String getNodeNameById(String id) {
      if (id == null || id.isEmpty()) {
         throw new IllegalArgumentException("Node ID cannot be null or empty.");
      }
      Node node = this.getNodeById(id);
      if (node == null) {
         throw new IllegalArgumentException("No node found with ID: " + id);
      }
      return node.getName();
   }
}