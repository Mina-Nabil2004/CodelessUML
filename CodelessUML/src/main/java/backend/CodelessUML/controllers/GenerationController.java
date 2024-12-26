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

import backend.CodelessUML.model.Node;
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
   public ResponseEntity<?> generateAll(@RequestBody List<Node> nodes) {
      nodesRepository.updateFromList(nodes);
      return new ResponseEntity<>(generator.generate(nodes).get(0), HttpStatus.OK);
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
