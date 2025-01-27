# CodelessUML  

## 📖 Overview  
**CodelessUML** is a full-stack application designed to simplify the development process by enabling automatic code generation from UML class diagrams. Using a dynamic drag-and-drop interface powered by **React Flow**, developers can visually design class structures and relationships. The backend, built with **Java Spring Boot**, processes the UML diagrams and generates the corresponding source code, bridging the gap between design and implementation.

### Video link
https://www.youtube.com/watch?v=SFahSX6dnhs

## 🚀 Features  
- **Drag-and-Drop Diagram Design**: Intuitive interface to visually represent UML class diagrams.  
- **Automatic Code Generation**: Converts UML diagrams into source code with minimal effort.

## 🛠️ Tech Stack  
### Backend  
- **Java Spring Boot**: Handles business logic, processing UML diagrams, and code generation.  

### Frontend  
- **React** & **React Flow**: Enables dynamic and user-friendly diagram creation.  
- **CSS** & **JavaScript**: For enhanced styling and interactivity.    

## 💡 How It Works  
1. **Create UML Diagrams**: Use the drag-and-drop interface to design class diagrams.  
2. **Generate Code**: Submit the diagram, and the backend translates it into source code.  
3. **Export and Use**: Download the generated code and integrate it into your projects.  

## 📦 Installation  
### Prerequisites  
- **Java JDK 17+**  
- **Node.js (v18+)**  

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

## 📈 Future Enhancements  
- Add support for additional programming languages.  
- Enable real-time collaboration for multiple users.  
- Include diagram export options (e.g., PNG, PDF).  
- Integrate with GitHub for version control.  
