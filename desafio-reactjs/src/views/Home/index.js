import { Container } from "reactstrap";

export const Home = () => {
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Home</h1>
                    </div>
                    <div className="p-2">
                        <a href="/listar-clientes" className="btn btn-outline-success btn-sm">
                            Cliente
                        </a>
                    </div>
                    <div className="p-2">
                        <a href="/listar-empresas" className="btn btn-outline-success btn-sm">
                            Empresa
                        </a>
                    </div>
                    <div className="p-2">
                        <a href="/listar-cartoes" className="btn btn-outline-success btn-sm">
                            Cartão
                        </a>
                    </div>
                    <div className="p-2">
                        <a href="/listar-promocoes" className="btn btn-outline-success btn-sm">
                            Promoção
                        </a>
                    </div>
                    <div className="p-2">
                        <a href="/listar-compras" className="btn btn-outline-success btn-sm">
                            Compra
                        </a>
                    </div>
                </div>
            </Container>
        </div>
    );
};