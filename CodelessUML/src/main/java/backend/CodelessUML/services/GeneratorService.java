package backend.CodelessUML.services;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.CodelessUML.generators.languages.CodeFileGenerator;
import backend.CodelessUML.model.Method;
import backend.CodelessUML.model.Node;
import backend.CodelessUML.model.dto.CodeDto;
import backend.CodelessUML.model.dto.ProjectDto;

@Service
public class GeneratorService {

    @Autowired
    private final Map<String, CodeFileGenerator> fileGenerator;

    public GeneratorService(Map<String, CodeFileGenerator> fileGenerator) {
        this.fileGenerator = fileGenerator;
    }

    public List<CodeDto> generate(List<Node> nodes) {
        findConstructors(nodes);

        List<CodeDto> codeFiles = new ArrayList<>();

        for (Node node : nodes) {
            node.setType(node.getType().replaceAll("abstractClass", "abstract class"));
            // codeFiles.add(new CodeDto(node.getId(), node.getPackageName(),
            // node.getName(),
            // fileGenerator.get(node.getType()).generate(node)));
        }
        return codeFiles;
    }

    private void findConstructors(List<Node> nodes) {
        for (Node node : nodes) {

            if ("interface".equals(node.getType()) || "enum".equals(node.getType())) {
                continue;
            }

            if (node.getMethods() == null) {
                continue;
            }

            for (Method method : node.getMethods()) {
                if (method.getName().equals(node.getName())) {
                    if (node.getConstructors() == null) {
                        node.setConstructors(new ArrayList<>());
                    }
                    node.getConstructors().add(method.toConstructor());
                    node.getMethods().remove(method);
                }
            }
        }
    }

    public byte[] generateFolder(ProjectDto project) throws IOException {
        List<CodeDto> codeDtos = project.getCodeDtos();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        try (ZipOutputStream zos = new ZipOutputStream(baos)) {
            for (CodeDto codeDto : codeDtos) {
                String folderPath = codeDto.getPackageName().replace('.', '/');
                String filePath = folderPath + "/" + codeDto.getName() + "." + codeDto.getType();

                // Create a zip entry for each file
                ZipEntry zipEntry = new ZipEntry(filePath);
                zos.putNextEntry(zipEntry);

                // Write file content
                zos.write(codeDto.getCode().getBytes());

                // Close entry
                zos.closeEntry();
            }

            byte[] zipBytes = baos.toByteArray();

            return zipBytes;
        }
    }

}
