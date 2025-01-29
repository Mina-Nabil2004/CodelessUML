package backend.CodelessUML.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.CodelessUML.model.Edge;
import backend.CodelessUML.model.dto.ClassDiagramDto;
import backend.CodelessUML.repository.NodesRepository;
import backend.CodelessUML.services.GeneratorService;

@RestController
@RequestMapping("/generate")
@CrossOrigin
public class GenerationController {

    @Autowired
    private GeneratorService generator;

    @Autowired
    private NodesRepository nodesRepository;

    @PostMapping(value = "/all") // requested on opening the code viewer page
    public ResponseEntity<?> generateAll(@RequestBody ClassDiagramDto classDiagramDto) {
        nodesRepository.updateFromList(classDiagramDto.getNodes());

        for (Edge edge : classDiagramDto.getEdges()) {
            edge.connect(nodesRepository);
        }
        // ResponseEntity.status(HttpStatus.OK)
        // .body(generator.generate(classDiagramDto.getNodes()));
        return new ResponseEntity<>(generator.generate(classDiagramDto.getNodes()), HttpStatus.OK);
    }

    @PostMapping("/class") // when i want to generate a single class
    public String generateClasses(@RequestBody List<String> entity) {
        return entity.get(0);
    }

    // @PostMapping("/download")
    // public ResponseEntity<?> generateZip(@RequestBody ProjectDto project) throws
    // IOException {
    // try {
    // HttpHeaders headers = new HttpHeaders();
    // headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
    // System.out.println(project.getProjectName());
    // headers.setContentDispositionFormData("attachment", project.getProjectName()
    // + ".zip");

    // byte[] zip = generator.generateFolder(project); // return new
    // ResponseEntity<>(, HttpStatus.OK);
    // return ResponseEntity.ok()
    // .headers(headers)
    // .body(zip);
    // } catch (Exception e) {

    // return ResponseEntity.status(HttpStatus.BAD_REQUEST)
    // .body("Error: There are multiple files with the same name and path.");
    // }

    // }
}
