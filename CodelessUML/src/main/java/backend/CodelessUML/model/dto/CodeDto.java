package backend.CodelessUML.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CodeDto {

    String id;
    @JsonProperty("package")
    String packageName;
    String name;
    String code;
    String type;
}
