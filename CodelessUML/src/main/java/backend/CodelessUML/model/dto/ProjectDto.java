package backend.CodelessUML.model.dto;


import java.util.List;

import lombok.Data;

@Data
public class ProjectDto {
   private String projectName;
   private List<CodeDto> codeDtos;
}