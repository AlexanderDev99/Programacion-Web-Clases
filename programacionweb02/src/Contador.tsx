import { useEffect, useState } from "react";

function Contador() {

 const [contador, setContador] = useState(0);


    useEffect(() => {
        console.log("Componente montado");
        //return () => {
         //   console.log('Componente desmontado ${contador}');
        //}
    })

    useEffect(() => {
        console.log('Contador actualizado: ${contador}');
    }, [contador]);


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
        </>
    );
}
export default Contador;