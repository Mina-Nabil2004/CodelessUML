package backend.CodelessUML.model;

import backend.CodelessUML.repository.NodesRepository;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Edge {
    private String name;
    @JsonProperty("target")
    private String source;
    @JsonProperty("source")
    private String target;

    @Autowired
    @JsonIgnore
    NodesRepository nodesRepository;

    @JsonIgnore
    public void connect() {
        Node sourceNode =  nodesRepository.getNodeById(this.source);
        if(sourceNode != null) {
            Relation relation =  sourceNode.getRelations();
            if(relation == null) {
                relation = new Relation();
            }
            if(name.equals( "inheritance")) {
                relation.setExtendsId(this.target);
            } else if (name.equals("implementation")) {
                List<String> implementsIds = relation.getImplementsIds();
                if(implementsIds == null) {
                    implementsIds = new ArrayList<>();
                }
                implementsIds.add(this.target);
                relation.setImplementsIds(implementsIds);
            }
            sourceNode.setRelations(relation);

            nodesRepository.addNode(sourceNode);
        }
    }
}