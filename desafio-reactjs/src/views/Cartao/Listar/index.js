import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListarCartao = () => {
    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getCartoes = async() => {
        await axios.get(`${api}/listacartoes`)
        .then((response) => {
            setData(response.data.card);
        })
        .catch(() => {
            setStatus({
                type: 'error',
                message: 'Erro: sem conexão com a API.'
            })
        })
    }

    const DelCartao = async(idCard) => {
        // console.log(idCard)
    
        const headers = {
            'Content-type': 'application/json'
        }
    
        await axios.delete(`${api}/excluircartao/${idCard}`, {headers})
        .then((response) => {
            console.log(response.data.message)
            getCartoes()
        })
        .catch(() => {
            setStatus({
                type: 'error',
                message: 'Erro: não foi possível conectar-se a API.'
            })
        })
    }

    useEffect(() => {
        getCartoes();
    }, [])

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações do cartão</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrarcartao" className="btn btn-outline-primary btn-sm">Cadastrar +</Link>
                    </div>
                    {status.type === 'error' 
                    ? <Alert color="danger">{status.message}</Alert> 
                    : ''}
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ClienteId</th>
                            <th>Data</th>
                            <th>Validade</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(card => (
                            <tr key={card.id}>
                                <td>{card.id}</td>
                                <td>{card.ClienteId}</td>
                                <td>{card.dataCartao}</td>
                                <td>{card.validade}</td>
                                <td className="text-center/">
                                    <Link to={"/listar-compras"} className="btn btn-outline-primary btn-sm">Consultar</Link>
                                    <Link to={`/editar-cartao/${card.id}`} className="btn btn-outline-warning btn-sm">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={() => DelCartao(card.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};