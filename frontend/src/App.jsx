import { useState } from "react"
import UMLComponent from "./UMLComponent/UMLComponent";

function App() {
  return (
    <>
      <UMLComponent color={"aqua"} width={200} packageName={"Mail"} type={"Class"} name={"User"}/>
      <UMLComponent color={"yellow"} width={300} packageName={"Mail"} type={"Interface"} name={"Email"}/>
      <UMLComponent color={"lightpink"} width={300} packageName={"Controller"} type={"Class"} name={"Control"}/>
    </>
  )
}

export default App
