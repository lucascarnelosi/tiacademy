import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Table } from "reactstrap";
import { api } from "../../../config";

export const PromocoesEmpresa = () => {

    const params = useParams();

    const [data, setData] = useState([]);
    const [id] = useState(params.id);

    useEffect(() => {
        const getPromocoes = async() => {
            await axios.get(`${api}/empresa/${id}/promocoes`)
            .then((response) => {
                // console.log(response.data.promo);
                setData(response.data.promo)
            })
            .catch(() => {
                console.log("Erro: sem conexão com a API.")
            })
        }
        getPromocoes();
    }, [id])

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Promoções da Empresa</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-empresas" className="m-auto btn btn-outline-success btn-sm">Empresas</Link>
                    </div>
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Validade</th>
                            <th>EmpresaId</th>
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
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};