import { useState } from "react";

function MyForm() {

    //manejamos el estado del componente
const [name, setName] = useState("");

/*
const handleClick = () => {
    alert("click");
};*/

//manejamos el evento submit del formulario
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`Texto ingresado: ${name}`);
}

// manejamos el evento change del input
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
}

return (
    <>
    <form onSubmit={handleSubmit}>
        <div>
        Nombre: <input type="text" value={name} onChange={handleChange} />
        </div>

        <input type="submit" value="Enviar1" />
        <input type="submit" value="Enviar2" />
        <input type="button" value="Button" onClick={() => alert(`Error no se envio el nombre: ${name}`)} />

        <br />
        <div>
        {name}
        </div>
    </form>
    </>
)
}
export default MyForm;