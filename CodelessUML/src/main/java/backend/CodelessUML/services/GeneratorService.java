package backend.CodelessUML.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.CodelessUML.generators.FileGenerator;
import jakarta.annotation.Resource;

@Service
public class GeneratorService {
   @Autowired
   private FileGenerator generator;

   public String generate() {
      return null;
   }

   public Resource packageCodeAsZip(String filePath) {
      return null;
   }
}
