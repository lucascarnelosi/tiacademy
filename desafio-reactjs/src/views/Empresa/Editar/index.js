import axios from "axios";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../../config"; 

export const EditarEmpresa = () => {
    const params = useParams();

    const [id, setId] = useState(params.id)
    const [nome, setNome] = useState();
    const [dataAdesao, setDataAdesao] = useState()

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const editEmpresa = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.put(`${api}/editarempresa/${id}`, {id, nome, dataAdesao}, {headers})
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
        const getEmpresa = async() => {
            await axios.get(`${api}/empresa/${id}`)
            .then((response) => {
                setId(response.data.emp.id)
                setNome(response.data.emp.nome)
                setDataAdesao(response.data.emp.dataAdesao)
            })
            .catch(() => {
                console.log("Erro: sem conexão com a API.")
            })
        }
        getEmpresa();
    }, [id])

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Empresa</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-empresas" className="btn btn-outline-secondary btn-sm">
                            Empresas
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
                <Form className="p-2" onSubmit={editEmpresa}>
                    <FormGroup className="p-2">
                        <Label>ID</Label>
                        <Input type="number" name="id" disabled defaultValue={id}  />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Nome</Label>
                        <Input name="nome" placeholder="Nome da empresa" type="text" onChange={e => setNome(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Data de Adesão</Label>
                        <Input name="dataAdesao" type="date" value={dataAdesao} onChange={e => setDataAdesao(e.target.value)} />
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