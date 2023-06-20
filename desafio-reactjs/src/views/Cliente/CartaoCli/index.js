import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Table } from "reactstrap";
import { api } from "../../../config";

export const CartoesCliente = () => {

    const params = useParams();

    const [data, setData] = useState([]);
    const [id] = useState(params.id);

    useEffect(() => {
        const getCartoes = async() => {
            await axios.get(`${api}/cliente/${id}/cartoes`)
            .then((response) => {
                // console.log(response.data.card);
                setData(response.data.card)
            })
            .catch(() => {
                console.log("Erro: sem conexão com a API.")
            })
        }
        getCartoes();
    }, [id])

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Cartões do Cliente</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-clientes" className="m-auto btn btn-outline-success btn-sm">Clientes</Link>
                    </div>
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ClienteId</th>
                            <th>Data do cartão</th>
                            <th>Validade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(card => (
                            <tr key={card.id}>
                                <td>{card.id}</td>
                                <td>{card.ClienteId}</td>
                                <td>{card.dataCartao}</td>
                                <td>{card.validade}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};