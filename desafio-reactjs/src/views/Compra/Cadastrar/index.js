import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom"
import { Container, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap"

import { api } from "../../../config";

export const CadastrarCompra = () => {
    const [compra, setCompra] = useState({
        CartaoId: '',
        PromocaoId: '',
        data: '',
        quantidade: '',
        valor: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setCompra({
        ...compra, [e.target.name]: e.target.value
    })

    const cadCompra = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(`${api}/compra`, compra, {headers})
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
                    <h1>Cadastrar Compra</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-compras" className="btn btn-outline-secondary btn-sm">Compras</Link>
                </div>
            </div>

            <hr className="m-1" />

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadCompra}>
                <FormGroup className="p-2">
                    <Label>CartaoId</Label>
                    <Input type="number" name="CartaoId" placeholder="ID do cartão" onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>PromocaoId</Label>
                    <Input name="PromocaoId" placeholder="ID da promoção" type="number" onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Data</Label>
                    <Input name="data" type="date" onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Quantidade</Label>
                    <Input name="quantidade" type="number" placeholder="Quantidade da compra" onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Valor</Label>
                    <Input name="valor" type="number" placeholder="Valor da compra" onChange={valorInput} />
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