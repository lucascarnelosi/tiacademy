import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListarCompra = () => {
    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getCompras = async() => {
        await axios.get(`${api}/listacompras`)
        .then((response) => {
            setData(response.data.buy);
        })
        .catch(() => {
            setStatus({
                type: 'error',
                message: 'Erro: sem conexão com a API.'
            })
        })
    }

    // const DelCompra = async() => {
    //     const headers = {
    //         'Content-type': 'application/json'
    //     }

    //     await axios.delete(`${api}/excluircompra`, {headers})
    //     .then((response) => {
    //         console.log(response.data.message)
    //         getCompras()
    //     })
    //     .catch(() => {
    //         setStatus({
    //             type: 'error',
    //             message: 'Erro: não foi possível conectar-se a API.'
    //         })
    //     })
    // }

    useEffect(() => {
        getCompras();
    }, [])

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações da compra</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrarcompra" className="btn btn-outline-primary btn-sm">Cadastrar +</Link>
                    </div>
                    {status.type === 'error' 
                    ? <Alert color="danger">{status.message}</Alert> 
                    : ''}
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>CartaoId</th>
                            <th>PromocaoId</th>
                            <th>Data</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(buy => (
                            <tr>
                                <td>{buy.CartaoId}</td>
                                <td>{buy.PromocaoId}</td>
                                <td>{buy.data}</td>
                                <td>{buy.quantidade}</td>
                                <td>{buy.valor}</td>
                                <td className="text-center/">
                                    <Link to={`/editar-compra/`} className="btn btn-outline-warning btn-sm">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm">Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};