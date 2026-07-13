import axios from 'axios';
import type {Estudiante} from '../types/Estudiante';

const API_URL = 'http://localhost:8080/api/estudiantes';

export const estudianteService = {
    listar: async () => {
        const respuesta = await axios.get<Estudiante[]>(API_URL);
        return respuesta.data;
    },
    crear: async (estudiante: Estudiante) => {
        const respuesta = await axios.post(API_URL, estudiante);
        return respuesta.data;
    },
    actualizar: async (id: number, estudiante: Estudiante) => {
        const respuesta = await axios.put(`${API_URL}/${id}`, estudiante);
        return respuesta.data;
    },
    eliminar: async (id: number) => {
        await axios.delete(`${API_URL}/${id}`);
    }
};
