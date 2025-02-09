package backend.CodelessUML.generators.languages;

import lombok.Getter;

@Getter
public enum Language {
    CPP("cpp"),
    JAVA("java"),
    C_SHARP("cs");

    private final String filetype;

    Language(String filetype) {
        this.filetype = filetype;
    }
}
