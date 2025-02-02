package backend.CodelessUML.generators.languages;

public enum Langauge {
    CPP("cpp"),
    JAVA("java"),
    C_SHARP("cs");

    private final String filetype;

    Langauge(String filetype) {
        this.filetype = filetype;
    }

    public String getFiletype() {
        return filetype;
    }
}
