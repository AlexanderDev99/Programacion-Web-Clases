import { useState } from "react";
import HolaMundo from "./HolaMundo";
import HolaMundo2 from "./HolaMundo2";


function Contador() {

    const [contador, setContador] = useState(0);

    function handleUp(): void {
        setContador(contador + 1);
       
    }

    function handleDown (): void  {
        setContador(contador - 1);
    }

    return (
        <>
        <div>
            <h1>Valor {contador}</h1>
        </div>
        <button onClick={handleUp}>+</button>
        <button onClick={handleDown}>-</button> 
        <br/>
        <HolaMundo2 name={"Juan"} age={contador}/>
        </>
    );
}
export default Contador;