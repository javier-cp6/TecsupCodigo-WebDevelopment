import { useState } from "react"
import { crearCategoria } from "../services/categoriasService"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2";

export default function CrearCategoriaView() {
    const [input, setInput] = useState({
        cat_nom:"",
        cat_desc:""
    })

    //   similar a un new Navigate()
    const navigate = useNavigate()

    const manejarInput = (e) => {
        console.log("NAME", e.target.name, "VALUE", e.target.value)
        setInput({
            // spread operator para modificar propiedades del objeto input
            ...input,
            // [e.target.name]:e.target.value es un truco para trabajar con varios estados (input)
            // p. ej. e.target.name = "cat_nom" modifica el valor de "cat_nom"
            [e.target.name]:e.target.value
        })
    }

    const manejarSubmit = async (e) => {
        e.preventDefault();
        try {
            await crearCategoria(input)
            // reemplazar alert por sweetalert
            // alert("Categoria creada")
            Swal.fire({
                icon:"success",
                title:"Categoría creada!"
            })
            // setInput (para borrar propiedades del estado). Ya no es necesario al incluir el navigate
            // setInput({
            //     cat_nom:"",
            //     cat_desc:""
            // })
            // navegar al home
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h1>Crear Categoria</h1>
            <form onSubmit={(e) => {manejarSubmit(e)}}>
                <div className="mb-3">
                    <label className="form-label">
                        Nombre categoria
                    </label>
                    <input 
                        className="form-control"
                        type="text"
                        placeholder="Ej. Cafés"
                        name="cat_nom"
                        value={input.cat_nom}
                        onChange={(e)=> {manejarInput(e)}}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        Descripción categoria
                    </label>
                    <input 
                        className="form-control"
                        type="text"
                        placeholder="Indique una descripción larga de la categoría"
                        name="cat_desc"
                        value={input.cat_desc}
                        onChange={(e)=> {manejarInput(e)}}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Guardar
                </button>
            </form>
        </>
    )
}
