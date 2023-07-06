import axios from "axios";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../../config"; 

export const EditarCartao = () => {
    const params = useParams();

    const [id, setId] = useState(params.id)
    const [clienteId, setClienteId] = useState()
    const [dataCartao, setDataCartao] = useState()
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

        await axios.put(`${api}/editarcartao/${id}`, {id, clienteId, dataCartao, validade}, {headers})
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
                setDataCartao(response.data.card.dataCartao)
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
                        <Input type="number" name="ClienteId" disabled defaultValue={clienteId} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Data</Label>
                        <Input type="date" name="dataCartao" value={dataCartao} onChange={e => setDataCartao(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Validade</Label>
                        <Input type="date" name="validade" value={validade} onChange={e => setValidade(e.target.value)} />
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