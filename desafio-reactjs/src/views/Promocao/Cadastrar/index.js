import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom"
import { Container, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap"

import { api } from "../../../config";

export const CadastrarPromocao = () => {
    const [promocao, setPromocao] = useState({
        nome: '',
        dataAdesao: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setPromocao({
        ...promocao, [e.target.name]: e.target.value
    })

    const cadPromocao = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(`${api}/promocao`, promocao, {headers})
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
                    <h1>Cadastrar Promoção</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-promocoes" className="btn btn-outline-secondary btn-sm">Promoções</Link>
                </div>
            </div>

            <hr className="m-1" />

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadPromocao}>
                <FormGroup className="p-2">
                    <Label>Nome</Label>
                    <Input type="text" name="nome" placeholder="Nome da promoção" onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>EmpresaId</Label>
                    <Input name="EmpresaId" placeholder="ID da empresa" type="number" onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Descrição</Label>
                    <Input name="descricao" placeholder="Descrição da promoção" type="text" onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Validade</Label>
                    <Input name="validade" placeholder="Validade da promoção" type="text" onChange={valorInput} />
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