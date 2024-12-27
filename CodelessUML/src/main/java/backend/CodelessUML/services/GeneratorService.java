package backend.CodelessUML.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.CodelessUML.generators.FileGenerator;
import backend.CodelessUML.model.Node;
import backend.CodelessUML.model.dto.FileDTO;

@Service
public class GeneratorService {

    private static final String BASE_PATH = "src";

    @Autowired
    private Map<String, FileGenerator> fileGenerator;

    public List<String> generate(List<Node> nodes) {
        List<String> codeFiles = new ArrayList<>();

        for (Node node : nodes) {
            codeFiles.add(fileGenerator.get(node.getType()).generate(node));
        }
        return codeFiles;
    }
    

    public File download(List<FileDTO> sourceCode) {
        // List<String> codeFiles = new ArrayList<>();
        
        //  for (String code : sourceCode) {
        //     String[] lines = code.split("\n");
        //     String packageName = lines[0].split(" ")[1];
        //     String className = lines[1].split(" ")[1];
        //     String filePath = BASE_PATH + File.separator + packageName;
        //     String fileName = className + ".java";
        //     String content = code;
        //     saveCodeToFile(filePath, fileName, content);
        // }
        
        //  return codeFiles;
        return null;
    }



   private void saveCodeToFile(String filePath, String fileName, String content) {
      try {
         Files.createDirectories(Paths.get(filePath));
         Files.writeString(Paths.get(filePath, fileName), content);
      } catch (IOException e) {
         throw new RuntimeException("Error writing file", e);
      }
   }

    
    private static File createPackage(String packageName) throws IOException {
        // Convert package name to directory path
        String packagePath = packageName.replaceAll(".", File.separator);
        Path fullPath = Paths.get(BASE_PATH, packagePath);
        
        // Create directories
        Files.createDirectories(fullPath);
        System.out.println("Created package: " + fullPath);
        
        return fullPath.toFile();
    }
    
    private static void generateJavaFile(File packageDir, String className) throws IOException {
        
    }
    
    // public Resource packageCodeAsZip(String projectPath) {
    // String zipFilePath = projectPath + ".zip";
    // try (ZipOutputStream zipOut = new ZipOutputStream(new
    // FileOutputStream(zipFilePath))) {
    // Files.walk(Paths.get(projectPath))
    // .filter(Files::isRegularFile)
    // .forEach(path -> {
    // try {
    // ZipEntry zipEntry = new ZipEntry(projectPath.relativize(path).toString());
    // zipOut.putNextEntry(zipEntry);
    // Files.copy(path, zipOut);
    // zipOut.closeEntry();
    // } catch (IOException e) {
    // throw new RuntimeException("Error creating ZIP", e);
    // }
    // });
    // } catch (IOException e) {
    // throw new RuntimeException("Error packaging ZIP", e);
    // }
    // return new FileSystemResource(zipFilePath);
    // }
}

