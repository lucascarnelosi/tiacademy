import axios from "axios";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../../config"; 

export const EditarCartao = () => {
    const params = useParams();

    const [id, setId] = useState(params.id)
    const [clienteId, setClienteId] = useState();
    const [data, setData] = useState()
    const [validade, setValidade] = useState()

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const editCartao = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.put(`${api}/editarcartao/${id}`, {id, clienteId, data, validade}, {headers})
        .then((response) => {
            setStatus({
                type: 'success',
                message: 'Alteração realizada com sucesso.'
            })
            console.log(response.data.message);
        })
        .catch(() => {
            setStatus({
                type: 'error',
                message: 'Erro: não foi possível alterar.'
            })
        })
    }

    useEffect(() => {
        const getCartao = async() => {
            await axios.get(`${api}/cartao/${id}`)
            .then((response) => {
                setId(response.data.card.id)
                setClienteId(response.data.card.ClienteId)
                setData(response.data.card.dataCartao)
                setValidade(response.data.card.validade)
            })
            .catch(() => {
                console.log("Erro: sem conexão com a API.")
            })
        }
        getCartao();
    }, [id])

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Cartão</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-cartoes" className="btn btn-outline-secondary btn-sm">
                            Cartões
                        </Link>
                    </div>
                </div>
                <div>
                    <hr className="m-1"></hr>

                    {status.type === 'error'
                    ? <Alert color="danger">{status.message}</Alert>
                    : ''}

                    {status.type === 'success'
                    ? <Alert color="success">{status.message}</Alert>
                    : ''}
                </div>
                <Form className="p-2" onSubmit={editCartao}>
                    <FormGroup className="p-2">
                        <Label>ID</Label>
                        <Input type="number" name="id" disabled defaultValue={id}  />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>ClienteId</Label>
                        <Input name="ClienteId" type="number" disabled defaultValue={clienteId} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Data</Label>
                        <Input name="dataCartao" type="date" value={data} onChange={e => setData(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Validade</Label>
                        <Input name="validade" type="date" value={validade} onChange={e => setValidade(e.target.value)} />
                    </FormGroup>
                    
                    <Button className="m-1" type="submit" outline color="warning">
                        Salvar
                    </Button>

                    <Button type="reset" outline color="secondary">
                        Limpar
                    </Button>
                </Form>
            </Container>
        </div>
    );
};