# CodelessUML  

## 📖 Overview  
**CodelessUML** is a full-stack application designed to simplify the development process by enabling automatic code generation from UML class diagrams. Using a dynamic drag-and-drop interface powered by **React Flow**, developers can visually design class structures and relationships. The backend, built with **Java Spring Boot**, processes the UML diagrams and generates the corresponding source code, bridging the gap between design and implementation.

### [Video link](https://www.youtube.com/watch?v=SFahSX6dnhs)
---
## 🚀 Features  

### **Drag-and-Drop Diagram Design**  
Easily create and manipulate UML class diagrams with an intuitive drag-and-drop interface. This feature ensures a seamless user experience by allowing developers to visually construct their designs without requiring manual coding.  

### **Class Addition**  
Support for adding multiple types of classes, including:  
- **Standard Classes**: Regular classes for general use.  
- **Interfaces**: Define contracts to be implemented by classes.  
- **Enums**: Represent fixed sets of constants.  
- **Abstract Classes**: Define common behavior while leaving specific implementation details for subclasses.  

Each class type is color-coded for easy identification and improved readability, ensuring a clear representation of class structures.  

### **Relationship Creation**  
Establish relationships between classes to represent dependencies and interactions. Supported relationships include:  
- **Associations**: Represent relationships between objects.  
- **Dependencies**: Indicate that one class depends on another.  
- **Implementations**: Show when a class implements an interface.  
- **Inheritance**: Illustrate class hierarchies with parent-child relationships.  

Relationship lines are dynamically adjustable, ensuring accurate representation of complex class structures.  

### **Flexible Class Management**  
- Select classes individually or in bulk to perform operations efficiently.  
- **Move**: Rearrange classes in the diagram to optimize layout and organization.  
- **Copy**: Duplicate existing classes to save time during the design process.  
- **Delete**: Remove unwanted classes or relationships with ease.  

This flexibility ensures that the design process remains smooth and adaptable to project needs.  

### **Export and Import Functionality**  
Preserve your progress with robust export and import options.  
- **Save Designs**: Export your diagram to a file for future use.  
- **Load Designs**: Reimport saved diagrams to continue working without losing progress.  

This feature promotes a consistent and collaborative design process.  

### **Real-Time Code Preview**  
A dedicated **Code Preview Page** allows you to:  
- View the automatically generated source code in real-time as you design.  
- Edit and refine the generated code directly in the interface before downloading.  
- Preview the folder structure and files to ensure the project meets your requirements.  

This functionality bridges the gap between design and implementation, reducing development time.  

### **Automatic Code Generation**  
Transform your UML class diagrams into production-ready source code with just a few clicks. The tool automatically generates:  
- Class definitions.  
- Relationships (inheritance, interfaces, etc.).  
- Properly structured code that adheres to object-oriented principles.  

This minimizes manual effort and allows developers to focus on adding business logic.  

### **Download as ZIP File**  
Export the entire project as a well-organized ZIP package, including:  
- All generated source files.  
- Predefined folder structures for immediate use in development environments.  

The ZIP file ensures the project is ready for further customization and logic implementation.  

## 🛠️ Tech Stack  
### Backend  
- **Java Spring Boot**: Handles business logic, processing UML diagrams, and code generation.  
---

### Frontend  
- **React** & **React Flow**: Enables dynamic and user-friendly diagram creation.  
- **CSS** & **JavaScript**: For enhanced styling and interactivity.    
---

## 💡 How It Works  
1. **Create UML Diagrams**: Use the drag-and-drop interface to design class diagrams.  
2. **Generate Code**: Submit the diagram, and the backend translates it into source code.  
3. **Export and Use**: Download the generated code and integrate it into your projects.  
---

## 📦 Installation  
### Prerequisites  
- **Java JDK 17+**  
- **Node.js (v18+)**  
---

### Steps  
1. Clone the repository:  
   ```bash
   git clone https://github.com/Mina-Nabil2004/CodelessUML.git
   cd CodelessUML
   ```  

2. Set up the backend:  
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```  

3. Set up the frontend:  
   ```bash
   cd ../frontend
   npm install
   npm start
   ```  

4. Access the application at `http://localhost:3000`.
---

## 📈 Future Enhancements  
- Add support for additional programming languages.  
- Enable real-time collaboration for multiple users.  
- Include diagram export options (e.g., PNG, PDF).  
- Integrate with GitHub for version control.  
---
