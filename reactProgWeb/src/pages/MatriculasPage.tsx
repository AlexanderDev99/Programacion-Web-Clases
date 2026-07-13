import { useState, useEffect } from 'react';
import type { Matricula } from '../types/Matricula.tsx';
import type{ Estudiante } from '../types/Estudiante';
import type { Curso } from '../types/Curso.tsx';
import { matriculaService } from '../services/matriculaService.tsx';
import { estudianteService } from '../services/estudianteService';
import { cursoService } from '../services/cursoService.tsx';
import { Button, TextField, Table, TableBody, TableCell, TableHead, TableRow, Container, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

export const MatriculasPage = () => {
    const [matriculas, setMatriculas] = useState<Matricula[]>([]);
    const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
    const [cursos, setCursos] = useState<Curso[]>([]);
    
    const [formulario, setFormulario] = useState<Matricula>({ estado: 'ACTIVA', inscripcion: '', estudiante: null, curso: null });

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            setMatriculas(await matriculaService.listar());
            setEstudiantes(await estudianteService.listar());
            setCursos(await cursoService.listar());
        } catch (error) {
            console.error("Error al cargar datos", error);
        }
    };

    const manejarGuardar = async () => {
        try {
            if (formulario.id) {
                await matriculaService.actualizar(formulario.id, formulario);
            } else {
                await matriculaService.crear(formulario);
            }
            setFormulario({ estado: 'ACTIVA', inscripcion: '', estudiante: null, curso: null });
            cargarDatos();
        } catch (error) {
            console.error("Error al guardar", error);
        }
    };

    const manejarEliminar = async (id: number) => {
        await matriculaService.eliminar(id);
        cargarDatos();
    };

    return (
        <Container>
            <h2>Gestión de Matrículas</h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', alignItems: 'center' }}>
                <TextField 
                    label="Fecha Inscripción" 
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formulario.inscripcion ? new Date(formulario.inscripcion).toISOString().split('T')[0] : ''} 
                    onChange={(e) => setFormulario({ ...formulario, inscripcion: e.target.value })} 
                />
                
                <FormControl style={{ minWidth: 150 }}>
                    <InputLabel>Estado</InputLabel>
                    <Select value={formulario.estado} label="Estado" onChange={(e) => setFormulario({ ...formulario, estado: e.target.value })}>
                        <MenuItem value="ACTIVA">ACTIVA</MenuItem>
                        <MenuItem value="CANCELADA">CANCELADA</MenuItem>
                    </Select>
                </FormControl>

                <FormControl style={{ minWidth: 200 }}>
                    <InputLabel>Estudiante</InputLabel>
                    <Select value={formulario.estudiante?.id || ''} label="Estudiante" onChange={(e) => {
                        const est = estudiantes.find(s => s.id === Number(e.target.value)) || null;
                        setFormulario({ ...formulario, estudiante: est });
                    }}>
                        {estudiantes.map((est) => (
                            <MenuItem key={est.id} value={est.id}>{est.nombre} {est.apellido}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl style={{ minWidth: 200 }}>
                    <InputLabel>Curso</InputLabel>
                    <Select value={formulario.curso?.id || ''} label="Curso" onChange={(e) => {
                        const cur = cursos.find(c => c.id === Number(e.target.value)) || null;
                        setFormulario({ ...formulario, curso: cur });
                    }}>
                        {cursos.map((c) => (
                            <MenuItem key={c.id} value={c.id}>{c.nombre}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button variant="contained" color="primary" onClick={manejarGuardar}>
                    {formulario.id ? 'Actualizar' : 'Guardar'}
                </Button>
            </div>
            
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Estudiante</TableCell>
                        <TableCell>Curso</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {matriculas.map((m) => (
                        <TableRow key={m.id}>
                            <TableCell>{m.id}</TableCell>
                            <TableCell>{m.inscripcion}</TableCell>
                            <TableCell>{m.estado}</TableCell>
                            <TableCell>{m.estudiante?.nombre} {m.estudiante?.apellido}</TableCell>
                            <TableCell>{m.curso?.nombre}</TableCell>
                            <TableCell>
                                <Button color="secondary" onClick={() => setFormulario(m)}>Editar</Button>
                                <Button color="error" onClick={() => manejarEliminar(m.id!)}>Eliminar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};
export default MatriculasPage;