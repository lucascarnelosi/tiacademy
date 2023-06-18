import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListarPromocao = () => {
    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getPromocoes = async() => {
        await axios.get(`${api}/listapromocoes`)
        .then((response) => {
            setData(response.data.promo);
        })
        .catch(() => {
            setStatus({
                type: 'error',
                message: 'Erro: sem conexão com a API.'
            })
        })
    }

    const DelPromocao = async(idPromo) => {
        // console.log(idPromo)
    
        const headers = {
            'Content-type': 'application/json'
        }
    
        await axios.delete(`${api}/excluirpromocao/${idPromo}`, {headers})
        .then((response) => {
            console.log(response.data.message)
            getPromocoes()
        })
        .catch(() => {
            setStatus({
                type: 'error',
                message: 'Erro: não foi possível conectar-se a API.'
            })
        })
    }

    useEffect(() => {
        getPromocoes();
    }, [])

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações da promoção</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrarpromocao" className="btn btn-outline-primary btn-sm">Cadastrar +</Link>
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
                            <th>Descrição</th>
                            <th>Validade</th>
                            <th>EmpresaId</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(promo => (
                            <tr key={promo.id}>
                                <td>{promo.id}</td>
                                <td>{promo.nome}</td>
                                <td>{promo.descricao}</td>
                                <td>{promo.validade}</td>
                                <td>{promo.EmpresaId}</td>
                                <td className="text-center/">
                                    <Link to={`/editar-promocao/${promo.id}`} className="btn btn-outline-warning btn-sm">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={() => DelPromocao(promo.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};