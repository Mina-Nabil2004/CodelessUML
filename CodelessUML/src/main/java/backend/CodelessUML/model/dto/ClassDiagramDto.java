package backend.CodelessUML.model.dto;


import backend.CodelessUML.model.Edge;
import backend.CodelessUML.model.Node;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ClassDiagramDto {
    private List<Node> nodes;
    private List<Edge> edges;
}
