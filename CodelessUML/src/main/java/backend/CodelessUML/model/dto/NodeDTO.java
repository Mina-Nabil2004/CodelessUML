// package backend.CodelessUML.model.dto;

// import java.lang.reflect.Method;
// import java.util.ArrayList;
// import java.util.List;

// import com.fasterxml.jackson.annotation.JsonIgnore;

// import backend.CodelessUML.model.Attribute;
// import backend.CodelessUML.model.Node;
// import backend.CodelessUML.model.Relation;
// import lombok.Builder;

// // @AllArgsConstructor
// // @NoArgsConstructor
// // @Data
// @Builder
// public class NodeDTO {
//    private String id;
//    private String type;          //class, interface ...
//    private String name;
//    private String packageName;       // path
//    private String scope;
//    private List<Relation> relations;
//    private List<Attribute> attributes;
//    private List<Method> methods;
//    // private List<Constructor> constructors;
   
//    @JsonIgnore
//    public Node getNode() {
//       return Node.builder()
//             .id(this.id)
//             .type(this.type)
//             .name(this.name)
//             .packageName(this.packageName)
//             .scope(this.scope)
//             .relations(new ArrayList<>(this.relations))
//             .attributes(new ArrayList<>(this.attributes))
//             .methods(new ArrayList<>(this.methods))
//             // .constructors(new ArrayList<>(this.constructors))
//             .build();
//    }
// }
