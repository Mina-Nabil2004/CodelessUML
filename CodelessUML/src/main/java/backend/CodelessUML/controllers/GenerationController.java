package backend.CodelessUML.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.CodelessUML.model.Edge;
import backend.CodelessUML.model.dto.ClassDiagramDto;
import backend.CodelessUML.repository.NodesRepository;
import backend.CodelessUML.services.GeneratorService;
import jakarta.annotation.Resource;


@RestController
@RequestMapping("/generate")
@CrossOrigin("http://localhost:5173")
public class GenerationController {

   @Autowired
   private GeneratorService generator;
   
   @Autowired
   private NodesRepository nodesRepository;
 
   @PostMapping(value = "/all")         // requested on opening the code viewer page
   public ResponseEntity<?> generateAll(@RequestBody ClassDiagramDto classDiagramDto) {
      nodesRepository.updateFromList(classDiagramDto.getNodes());
      for(Edge edge :  classDiagramDto.getEdges()){
         edge.connect();
      }
      // ResponseEntity.status(HttpStatus.OK)
      //       .body(generator.generate(classDiagramDto.getNodes()));
      return new ResponseEntity<>(generator.generate(classDiagramDto.getNodes()), HttpStatus.OK);
   }
   
   @PostMapping("/class")        // when i want to generate a single class
   public String generateClasses(@RequestBody List<String> entity) {
      return entity.get(0);
   }

   @GetMapping("/download")
   public ResponseEntity<Resource> getZipFile() {
      // return new String();
      // Generate Java code from UML nodes
      // String projectPath = generator.generateCode(umlNodes);

      // Package into ZIP
      // Resource zipFile = generator.packageCodeAsZip("projectPath");

      // Return the ZIP file
      // return ResponseEntity.ok()
      //       .contentType(MediaType.APPLICATION_OCTET_STREAM)
      //       // .header(HttpHeaders., "attachment; filename=\"project.zip\"")
      //       .body(zipFile);
  
      return null;
   }
   
}
