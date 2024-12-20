import { BrowserRouter, Routes, Route } from "react-router-dom";
import UMLDiagram from "./UMLDiagram.jsx";
import CodeViewer from "./CodeViewer.jsx";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <div>
      <AnimatePresence>
        <BrowserRouter >
          <Routes>
            <Route index element={<UMLDiagram />} />
            <Route path ="/code-viewer" element={<CodeViewer/>} />
          </Routes>
        </BrowserRouter>
      </AnimatePresence>
    </div>
  )
}

export default App

