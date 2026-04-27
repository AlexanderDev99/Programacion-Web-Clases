
import {useState} from "react";
import HolaMundo from "./HolaMundo.tsx";
import HolaMundo2 from "./HolaMundo2.tsx";
import Contador from "./Contador.tsx";

type Hello2Props = {
  name: string;
  age: number;
};


function App() {

  const [text, setText] = useState("mundo!");

  const handleClick=()=>{

    if(text === "mundo!"){
      setText("React!");
    }
    else{
      setText("mundo!");
    }
  }

  const props : Hello2Props = {
    name: "Otro nombre",
    age: 77
  };

  return (
    <>
      Hola <span>{text}</span>
      <br/>
      <button onClick= {handleClick}>Click</button>
      <br/>
      <HolaMundo name={ "Juan"}/>
      <HolaMundo name={ "Pedro"}/>
      <hr/>
      <HolaMundo2 name={ "Edwin" } age={ 30 }/>

      <HolaMundo2 {...props}/>
      <HolaMundo2 name = {props.name} age = {props.age}/>
      <hr/>
      <Contador/>
    </>
  )
}

export default App
