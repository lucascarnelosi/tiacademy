import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListarEmpresa = () => {
    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getEmpresas = async() => {
        await axios.get(`${api}/listaempresas`)
        .then((response) => {
            setData(response.data.emp);
        })
        .catch(() => {
            setStatus({
                type: 'error',
                message: 'Erro: sem conexão com a API.'
            })
        })
    }

    const DelEmpresa = async(idEmpresa) => {
        // console.log(idEmpresa)
    
        const headers = {
            'Content-type': 'application/json'
        }
    
        await axios.delete(`${api}/excluirempresa/${idEmpresa}`, {headers})
        .then((response) => {
            console.log(response.data.message)
            getEmpresas()
        })
        .catch(() => {
            setStatus({
                type: 'error',
                message: 'Erro: não foi possível conectar-se a API.'
            })
        })
    }

    useEffect(() => {
        getEmpresas();
    }, [])

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações da empresa</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrarempresa" className="btn btn-outline-primary btn-sm">Cadastrar +</Link>
                    </div>
                    {status.type === 'error' 
                    ? <Alert color="danger">{status.message}</Alert> 
                    : ''}
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Data de Adesão</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(emp => (
                            <tr key={emp.id}>
                                <td>{emp.id}</td>
                                <td>{emp.nome}</td>
                                <td>{emp.dataAdesao}</td>
                                <td className="text-center/">
                                    <Link to={`/listar-promocoes/${emp.id}`} className="btn btn-outline-info btn-sm">Consultar</Link>
                                    <Link to={`/editar-empresa/${emp.id}`} className="btn btn-outline-warning btn-sm">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={() => DelEmpresa(emp.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};