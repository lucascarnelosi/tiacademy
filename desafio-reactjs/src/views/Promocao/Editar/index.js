import axios from "axios";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../../config"; 

export const EditarPromocao = () => {
    const params = useParams();

    const [id, setId] = useState(params.id)
    const [empresaId, setEmpresaId] = useState();
    const [nome, setNome] = useState()
    const [descricao, setDescricao] = useState()
    const [validade, setValidade] = useState()

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const editPromocao = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.put(`${api}/editarpromocao/${id}`, {id, empresaId, nome, descricao, validade}, {headers})
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
        const getPromocao = async() => {
            await axios.get(`${api}/promocao/${id}`)
            .then((response) => {
                setId(response.data.promo.id)
                setEmpresaId(response.data.promo.EmpresaId)
                setNome(response.data.promo.nome)
                setDescricao(response.data.promo.descricao)
                setValidade(response.data.promo.validade)
            })
            .catch(() => {
                console.log("Erro: sem conexão com a API.")
            })
        }
        getPromocao();
    }, [id])

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Promoção</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-promocoes" className="btn btn-outline-secondary btn-sm">
                            Promoções
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
                <Form className="p-2" onSubmit={editPromocao}>
                    <FormGroup className="p-2">
                        <Label>ID</Label>
                        <Input type="number" name="id" disabled defaultValue={id}  />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>EmpresaId</Label>
                        <Input name="EmpresaId" type="number" disabled defaultValue={empresaId} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Nome</Label>
                        <Input name="nome" type="text" placeholder="Nome da promoção" onChange={e => setNome(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Descrição</Label>
                        <Input name="descricao" type="text" placeholder="Descrição da promoção" onChange={e => setDescricao(e.target.value)} />
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