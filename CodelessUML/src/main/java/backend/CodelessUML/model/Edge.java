package backend.CodelessUML.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import backend.CodelessUML.repository.NodesRepository;
import lombok.Data;

@Data
public class Edge {

    private String name;
    
    @JsonProperty("target")
    private String source;
    
    @JsonProperty("source")
    private String target;
    
    @JsonIgnore
    private NodesRepository nodesRepository;


    @JsonIgnore
    public void connect(NodesRepository nodesRepository) throws IllegalArgumentException {
        Node sourceNode =  nodesRepository.getNodeById(this.source);
        Node targetNode =  nodesRepository.getNodeById(this.target);
        
        if(sourceNode == null || targetNode == null) return;
        
        Relation relation =  sourceNode.getRelations();
        if(relation == null) {
            relation = new Relation();
        }
        
        if(name.equals( "inheritance")) {
            if(relation.getExtendsId() != null) {
                throw new IllegalArgumentException("Multiple inheritance is not allowed");
            }
            // abstract class inheritance in version 2
            if(sourceNode.getType().equals("class") && targetNode.getType().equals("class")
                || sourceNode.getType().equals("interface") && targetNode.getType().equals("interface")) {
                relation.setExtendsId(this.target);
            }
            relation.setExtendsId(targetNode.getId());

        } else if (name.equals("implementation")) {
            List<String> implementsIds = relation.getImplementsIds();
            if(implementsIds == null) {
                implementsIds = new ArrayList<>();
            }
            
            if(("class".equals(sourceNode.getType()) || "abstract class".equals(sourceNode.getType())) && 
                "interface".equals(targetNode.getType())) {
                implementsIds.add(this.target);
                relation.setImplementsIds(implementsIds);
            }
        }

        sourceNode.setRelations(relation);
        nodesRepository.addNode(sourceNode);
    }
}