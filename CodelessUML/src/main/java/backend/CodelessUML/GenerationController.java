package backend.CodelessUML;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/generate")
@CrossOrigin("http://localhost:5173")
public class GenerationController {
 
   @PostMapping("/all")
   public String genrateAll(@RequestBody String entity) {
      //TODO: process POST request
      return entity;
   }
   
   @PostMapping("/class")
   public String generateClasses(@RequestBody List<String> entity) {
      //TODO: process POST request
      return entity.get(0);
   }
   
   
}
