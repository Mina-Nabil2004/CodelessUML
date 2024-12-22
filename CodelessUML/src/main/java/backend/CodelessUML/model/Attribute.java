package backend.CodelessUML.model;


import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Attribute {
    private String scope;
    private String type;
    private boolean isStatic;
    private String name;
    private boolean getter;
    private boolean setter;

    @JsonProperty("final")
    private boolean isFinal;
}
