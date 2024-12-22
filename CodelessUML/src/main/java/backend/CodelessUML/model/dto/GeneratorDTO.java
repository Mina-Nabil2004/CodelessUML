package backend.CodelessUML.model.dto;

import java.util.List;

import lombok.Data;

@Data
public class GeneratorDTO {
   private List<GeneratorDTO> packages;
   private List<String> files;
}


