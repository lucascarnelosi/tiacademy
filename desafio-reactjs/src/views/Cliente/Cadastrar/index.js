import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom"
import { Container, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap"

import { api } from "../../../config";

export const CadastrarCliente = () => {
    const [cliente, setCliente] = useState({
        nome: '',
        cidade: '',
        uf: '',
        nascimento: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setCliente({
        ...cliente, [e.target.name]: e.target.value
    })

    const cadCliente = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(`${api}/cliente`, cliente, {headers})
        .then((response) => {
            // console.log(response.data.message);
            if (response.data.error) {
                setStatus({
                    type: 'error',
                    message: response.data.message
                });
            } else {
                setStatus({
                    type: 'success',
                    message: response.data.message
                });
            }
        })
        .catch(() => {
            console.log("Erro: Sem conexão com a API.")
        })
    }

    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Cadastrar Cliente</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-clientes" className="btn btn-outline-secondary btn-sm">Clientes</Link>
                </div>
            </div>

            <hr className="m-1" />

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadCliente}>
                <FormGroup className="p-2">
                    <Label>Nome</Label>
                    <Input type="text" name="nome" placeholder="Nome do cliente" onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Cidade</Label>
                    <Input name="cidade" placeholder="Cidade do cliente" type="text" onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>UF</Label>
                    <Input name="uf" placeholder="UF do cliente" type="text" onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Nascimento</Label>
                    <Input name="nascimento" type="date" onChange={valorInput} />
                </FormGroup>
                
                <Button type="submit" outline color="success">
                    Cadastrar
                </Button>

                <Button className="m-1" type="reset" outline color="secondary">
                    Limpar
                </Button>
            </Form>
        </Container>
    )
}