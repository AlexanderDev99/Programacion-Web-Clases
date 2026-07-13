import { useState, useEffect } from 'react';
import type { Estudiante } from '../types/Estudiante';
import { estudianteService } from '../services/estudianteService';
import { Button, TextField, Table, TableBody, TableCell, TableHead, TableRow, Container } from '@mui/material';

export const EstudiantesPage = () => {
    const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
    const [formulario, setFormulario] = useState<Estudiante>({ nombre: '', apellido: '', email: '', fecha: '' });

    useEffect(() => {
        cargarEstudiantes();
    }, []);

    const cargarEstudiantes = async () => {
        try {
            const data = await estudianteService.listar();
            setEstudiantes(data);
        } catch (error) {
            console.error("Error al cargar estudiantes", error);
        }
    };

    const manejarGuardar = async () => {
        try {
            if (formulario.id) {
                await estudianteService.actualizar(formulario.id, formulario);
            } else {
                await estudianteService.crear(formulario);
            }
            setFormulario({ nombre: '', apellido: '', email: '', fecha: '' });
            cargarEstudiantes();
        } catch (error) {
            console.error("Error al guardar", error);
        }
    };

    const manejarEliminar = async (id: number) => {
        await estudianteService.eliminar(id);
        cargarEstudiantes();
    };

    const seleccionarParaEditar = (est: Estudiante) => {
        setFormulario(est);
    };

    return (
        <Container>
            <h2>Gestión de Estudiantes</h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <TextField label="Nombre" value={formulario.nombre} onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })} />
                <TextField label="Apellido" value={formulario.apellido} onChange={(e) => setFormulario({ ...formulario, apellido: e.target.value })} />
                <TextField label="Email" value={formulario.email} onChange={(e) => setFormulario({ ...formulario, email: e.target.value })} />
                <TextField label="Fecha de Nacimiento" type="date" InputLabelProps={{ shrink: true }} value={formulario.fecha || ''} onChange={(e) => setFormulario({ ...formulario, fecha: e.target.value })} />
                <Button variant="contained" color="primary" onClick={manejarGuardar}>
                    {formulario.id ? 'Actualizar' : 'Guardar'}
                </Button>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Apellido</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {estudiantes.map((est) => (
                        <TableRow key={est.id}>
                            <TableCell>{est.id}</TableCell>
                            <TableCell>{est.nombre}</TableCell>
                            <TableCell>{est.apellido}</TableCell>
                            <TableCell>{est.email}</TableCell>
                            <TableCell>
                                <Button color="secondary" onClick={() => seleccionarParaEditar(est)}>Editar</Button>
                                <Button color="error" onClick={() => manejarEliminar(est.id!)}>Eliminar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};
export default EstudiantesPage;