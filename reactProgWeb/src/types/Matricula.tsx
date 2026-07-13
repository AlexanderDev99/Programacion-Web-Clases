import type { Estudiante } from './Estudiante';
import type { Curso } from './Curso.tsx';

export interface Matricula {
    id?: number;
    inscripcion: string;
    estado: string;
    estudiante: Estudiante | null;
    curso: Curso | null;
}
