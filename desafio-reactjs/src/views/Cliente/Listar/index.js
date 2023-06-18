import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListarCliente = () => {
    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getClientes = async() => {
        await axios.get(`${api}/listaclientes`)
        .then((response) => {
            setData(response.data.cli);
        })
        .catch(() => {
            setStatus({
                type: 'error',
                message: 'Erro: sem conexão com a API.'
            })
        })
    }

    const delCliente = async(idCliente) => {
        // console.log(idCliente)

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.delete(`${api}/excluircliente/${idCliente}`, {headers})
        .then((response) => {
            console.log(response.data.message)
            getClientes()
        })
        .catch(() => {
            setStatus({
                type: 'error',
                message: 'Erro: não foi possível conectar-se a API.'
            })
        })
    }

    useEffect(() => {
        getClientes();
    }, [])

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações do cliente</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrarcliente" className="btn btn-outline-primary btn-sm">Cadastrar +</Link>
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
                            <th>Cidade</th>
                            <th>UF</th>
                            <th>Nascimento</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(cli => (
                            <tr key={cli.id}>
                                <td>{cli.id}</td>
                                <td>{cli.nome}</td>
                                <td>{cli.cidade}</td>
                                <td>{cli.uf}</td>
                                <td>{cli.nascimento}</td>
                                <td className="text-center/">
                                    <Link to={`/editar-cliente/${cli.id}`} className="btn btn-outline-warning btn-sm">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={() => delCliente(cli.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};