import axios from 'axios';
import type { Matricula } from '../types/Matricula.tsx';

const API_URL = 'http://localhost:8080/api/matriculas';

export const matriculaService = {
    listar: async () => {
        const respuesta = await axios.get<Matricula[]>(API_URL);
        return respuesta.data;
    },
    crear: async (matricula: Matricula) => {
        const respuesta = await axios.post(API_URL, matricula);
        return respuesta.data;
    },
    actualizar: async (id: number, matricula: Matricula) => {
        const respuesta = await axios.put(`${API_URL}/${id}`, matricula);
        return respuesta.data;
    },
    eliminar: async (id: number) => {
        await axios.delete(`${API_URL}/${id}`);
    }
};
