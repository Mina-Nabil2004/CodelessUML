package backend.CodelessUML.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Method {
   private String scope;
   private boolean isAbstract;
   @JsonProperty("static")
   private boolean isStatic;
   private String returnType;
   private String name;
   private List<Parameter> parameters;

}