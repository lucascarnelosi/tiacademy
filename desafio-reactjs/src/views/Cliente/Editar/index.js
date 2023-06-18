import axios from "axios";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../../config"; 

export const EditarCliente = () => {
    const params = useParams();
    
    const [id, setId] = useState(params.id)
    const [nome, setNome] = useState();
    const [cidade, setCidade] = useState()
    const [uf, setUf] = useState()
    const [nascimento, setNascimento] = useState()

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const editCliente = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.put(`${api}/editarcliente/${id}`, {id, nome, cidade, uf, nascimento}, {headers})
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
        const getCliente = async() => {
            await axios.get(`${api}/cliente/${id}`)
            .then((response) => {
                setId(response.data.cli.id)
                setNome(response.data.cli.nome)
                setCidade(response.data.cli.cidade)
                setUf(response.data.cli.uf)
                setNascimento(response.data.cli.nascimento)
            })
            .catch(() => {
                console.log("Erro: sem conexão com a API.")
            })
        }
        getCliente();
    }, [id])

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Cliente</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-clientes" className="btn btn-outline-secondary btn-sm">
                            Clientes
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
                <Form className="p-2" onSubmit={editCliente}>
                    <FormGroup className="p-2">
                        <Label>ID</Label>
                        <Input type="number" name="id" disabled defaultValue={id} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Nome</Label>
                        <Input name="nome" placeholder="Nome do cliente" type="text" onChange={e => setNome(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Cidade</Label>
                        <Input name="cidade" placeholder="Cidade do cliente" type="text" onChange={e => setCidade(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>UF</Label>
                        <Input name="uf" placeholder="UF do cliente" type="text" onChange={e => setUf(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Nascimento</Label>
                        <Input name="nascimento" type="date" value={nascimento} onChange={e => setNascimento(e.target.value)} />
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