function MyForm2() { 


    const buscar = (formData: FormData) => {
        const name = formData.get("name");
        const edad = formData.get("edad");

        alert(`Nombre: ${name} Edad: ${edad}`);
    }

return (

    <>
    <form action={buscar}>

        <div>
        Nombre: <input type="text" name="name"/>
        <br />
        Edad : <input type="text" name="edad"/>
        </div>

        <input type="submit" value="Enviar" />
    </form>
    </>

)
}

export default MyForm2;