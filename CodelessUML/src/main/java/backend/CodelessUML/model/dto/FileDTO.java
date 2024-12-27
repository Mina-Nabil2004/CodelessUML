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
public class FileDTO {
    
    private String code;
    
    private String name;

    @JsonProperty("package") // folder1.folder2
    private String packagePath;
    
    @Builder.Default
    private String type = "java";
}