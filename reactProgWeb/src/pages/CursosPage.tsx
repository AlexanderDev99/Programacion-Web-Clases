import { useState, useEffect } from 'react';
import type { Curso } from '../types/Curso.tsx';
import { cursoService } from '../services/cursoService.tsx';
import { Button, TextField, Table, TableBody, TableCell, TableHead, TableRow, Container } from '@mui/material';

export const CursosPage = () => {
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [formulario, setFormulario] = useState<Curso>({ nombre: '', descripcion: '', cupo: 0 });

    useEffect(() => {
        cargarCursos();
    }, []);

    const cargarCursos = async () => {
        try {
            const data = await cursoService.listar();
            setCursos(data);
        } catch (error) {
            console.error("Error al cargar cursos", error);
        }
    };

    const manejarGuardar = async () => {
        try {
            if (formulario.id) {
                await cursoService.actualizar(formulario.id, formulario);
            } else {
                await cursoService.crear(formulario);
            }
            setFormulario({ nombre: '', descripcion: '', cupo: 0 });
            cargarCursos();
        } catch (error) {
            console.error("Error al guardar", error);
        }
    };

    const manejarEliminar = async (id: number) => {
        await cursoService.eliminar(id);
        cargarCursos();
    };

    const seleccionarParaEditar = (curso: Curso) => {
        setFormulario(curso);
    };

    return (
        <Container>
            <h2>Gestión de Cursos</h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <TextField label="Nombre" value={formulario.nombre} onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })} />
                <TextField label="Descripción" value={formulario.descripcion} onChange={(e) => setFormulario({ ...formulario, descripcion: e.target.value })} />
                <TextField label="Cupo Máximo" type="number" value={formulario.cupo} onChange={(e) => setFormulario({ ...formulario, cupo: Number(e.target.value) })} />
                <Button variant="contained" color="primary" onClick={manejarGuardar}>
                    {formulario.id ? 'Actualizar' : 'Guardar'}
                </Button>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Cupo</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cursos.map((c) => (
                        <TableRow key={c.id}>
                            <TableCell>{c.id}</TableCell>
                            <TableCell>{c.nombre}</TableCell>
                            <TableCell>{c.descripcion}</TableCell>
                            <TableCell>{c.cupo}</TableCell>
                            <TableCell>
                                <Button color="secondary" onClick={() => seleccionarParaEditar(c)}>Editar</Button>
                                <Button color="error" onClick={() => manejarEliminar(c.id!)}>Eliminar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};
export default CursosPage;
