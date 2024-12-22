package backend.CodelessUML.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Node {

   private String id;
   private String type;
   private String name;
   private String scope;
   private Relation relations;

   @JsonProperty("package")
   private String packageName;

   private List<Attribute> attributes;
   private List<Method> methods;
   private List<Constructor> constructors;
}