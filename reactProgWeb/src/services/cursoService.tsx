import axios from 'axios';
import type { Curso } from '../types/Curso.tsx';

const API_URL = 'http://localhost:8080/api/cursos';

export const cursoService = {
    listar: async () => {
        const respuesta = await axios.get<Curso[]>(API_URL);
        return respuesta.data;
    },
    crear: async (curso: Curso) => {
        const respuesta = await axios.post(API_URL, curso);
        return respuesta.data;
    },
    actualizar: async (id: number, curso: Curso) => {
        const respuesta = await axios.put(`${API_URL}/${id}`, curso);
        return respuesta.data;
    },
    eliminar: async (id: number) => {
        await axios.delete(`${API_URL}/${id}`);
    }
};
