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
public class Relation {
   private String extendsId;
   
   @JsonProperty("implements")
   private List<String> implementsIds;
}