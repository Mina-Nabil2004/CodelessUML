package backend.CodelessUML.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.CodelessUML.generators.FileGenerator;
import backend.CodelessUML.model.Node;

@Service
public class GeneratorService {

   @Autowired
   private Map<String, FileGenerator> fileGenerator;

   public List<String> generate(List<Node> nodes) {
      List<String> codeFiles = new ArrayList<>();

      for(Node node : nodes) {
         codeFiles.add(fileGenerator.get(node.getType()).generate(node));
      }
      return codeFiles;
   }

   // public Resource packageCodeAsZip(String filePath) {
   //    return null;
   // }

   private void saveCodeToFile(String filePath, String fileName, String content) {
      try {
         Files.createDirectories(Paths.get(filePath));
         Files.writeString(Paths.get(filePath, fileName), content);
      } catch (IOException e) {
         throw new RuntimeException("Error writing file", e);
      }
   }

   // public Resource packageCodeAsZip(String projectPath) {
   //    String zipFilePath = projectPath + ".zip";
   //    try (ZipOutputStream zipOut = new ZipOutputStream(new FileOutputStream(zipFilePath))) {
   //       Files.walk(Paths.get(projectPath))
   //             .filter(Files::isRegularFile)
   //             .forEach(path -> {
   //                try {
   //                   ZipEntry zipEntry = new ZipEntry(projectPath.relativize(path).toString());
   //                   zipOut.putNextEntry(zipEntry);
   //                   Files.copy(path, zipOut);
   //                   zipOut.closeEntry();
   //                } catch (IOException e) {
   //                   throw new RuntimeException("Error creating ZIP", e);
   //                }
   //             });
   //    } catch (IOException e) {
   //       throw new RuntimeException("Error packaging ZIP", e);
   //    }
   //    return new FileSystemResource(zipFilePath);
   // }

}
