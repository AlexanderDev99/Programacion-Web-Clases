interface Hello2Props{
    name:string,
    age?:number
}

//usando props
function HolaMundo2(props:Hello2Props){
    const handleClick= () => {
        alert(`click componente  ${props.name}`);
    }
    return(
        <>
        <h4>Hola Mundo {props.name}</h4>
        {/*props.age ? <h4>Edad: {props.age}</h4> : <h4>Edad no proporcionada</h4>*/}
        {props.age && <h4>Edad: {props.age}</h4>}
        <h4>Edad: {props.age}</h4>
        </>
    )
}

function HolaMundo3({name, age}:Hello2Props){
    
    return(
        <>
        <h4>Hola Mundo {name}</h4>
        <h4>Edad: {age}</h4>
        </>
    )
}


export default HolaMundo2;