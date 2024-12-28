package backend.CodelessUML.controllers;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
// import java.net.http.HttpHeaders;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.CodelessUML.model.Edge;
import backend.CodelessUML.model.dto.ClassDiagramDto;
import backend.CodelessUML.model.dto.CodeDto;
import backend.CodelessUML.model.dto.ProjectDto;
import backend.CodelessUML.repository.NodesRepository;
import backend.CodelessUML.services.GeneratorService;

@RestController
@RequestMapping("/generate")
@CrossOrigin("http://localhost:5173")
public class GenerationController {

   @Autowired
   private GeneratorService generator;

   @Autowired
   private NodesRepository nodesRepository;

   GenerationController(GeneratorService generator, NodesRepository nodesRepository) {
      this.generator = generator;
      this.nodesRepository = nodesRepository;
   }

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
   // public ResponseEntity<byte[]> generateZip(@RequestBody List<CodeDto> codeDtos) throws IOException {
   //    ByteArrayOutputStream baos = new ByteArrayOutputStream();

   //    try (ZipOutputStream zos = new ZipOutputStream(baos)) {
   //       for (CodeDto codeDto : codeDtos) {
   //          String folderPath = codeDto.getPackageName().replace('.', '/');
   //          String filePath = folderPath + "/" + codeDto.getName() + ".java";

   //          // Create a zip entry for each file
   //          ZipEntry zipEntry = new ZipEntry(filePath);
   //          zos.putNextEntry(zipEntry);

   //          // Write file content
   //          zos.write(codeDto.getCode().getBytes());

   //          // Close entry
   //          zos.closeEntry();
   //       }
   //    }

   //    // Create the response
   //    byte[] zipBytes = baos.toByteArray();
   //    HttpHeaders headers = new HttpHeaders();
   //    headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
   //    headers.setContentDispositionFormData("attachment", "CodeFiles.zip");

   //    return ResponseEntity.ok()
   //          .headers(headers)
   //          .body(zipBytes);
   // }

    @PostMapping("/download")
   public ResponseEntity<?> generateZip(@RequestBody ProjectDto project) throws IOException {
      
      try {
         List<CodeDto> codeDtos = project.getCodeDtos();
         ByteArrayOutputStream baos = new ByteArrayOutputStream();

         try (ZipOutputStream zos = new ZipOutputStream(baos)) {
            for (CodeDto codeDto : codeDtos) {
               String folderPath = codeDto.getPackageName().replace('.', '/');
               String filePath = folderPath + "/" + codeDto.getName() + ".java";

               // Create a zip entry for each file
               ZipEntry zipEntry = new ZipEntry(filePath);
               zos.putNextEntry(zipEntry);

               // Write file content
               zos.write(codeDto.getCode().getBytes());

               // Close entry
               zos.closeEntry();
            }
         }

         // Create the response
         byte[] zipBytes = baos.toByteArray();
         HttpHeaders headers = new HttpHeaders();
         headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
         headers.setContentDispositionFormData("attachment", project.getProjectName() + ".zip");

      return ResponseEntity.ok()
            .headers(headers)
            .body(zipBytes);
      } catch (Exception e) {

         return new ResponseEntity<>("Error: There are multiple files with the same name and path.", HttpStatus.BAD_REQUEST);
      }
            
   }
}
