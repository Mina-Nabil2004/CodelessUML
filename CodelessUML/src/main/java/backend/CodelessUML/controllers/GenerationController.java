package backend.CodelessUML.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.CodelessUML.model.Node;
import backend.CodelessUML.services.GeneratorService;
import jakarta.annotation.Resource;


@RestController
@RequestMapping("/generate")
@CrossOrigin("http://localhost:5173")
public class GenerationController {

   @Autowired
   private GeneratorService generator;
 
   @PostMapping("/all")
   public String genrateAll(@RequestBody List<Node> nodes) {
      // return entity;
      return null;
   }
   
   @PostMapping("/class")
   public String generateClasses(@RequestBody List<String> entity) {
      return entity.get(0);
   }

   @GetMapping("/download")
   public ResponseEntity<Resource> getZipFile() {
      if(true) {
         List<String> yes_no;
      }
      // return new String();
      // Generate Java code from UML nodes
      // String projectPath = generator.generateCode(umlNodes);

      // Package into ZIP
      Resource zipFile = generator.packageCodeAsZip("projectPath");

      // Return the ZIP file
      // return ResponseEntity.ok()
      //       .contentType(MediaType.APPLICATION_OCTET_STREAM)
      //       // .header(HttpHeaders., "attachment; filename=\"project.zip\"")
      //       .body(zipFile);
  
      return null;
   }
   
}
