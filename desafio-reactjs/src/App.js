import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import { Home } from './views/Home';
import { Menu } from './components/Menu';

import { ListarCliente } from './views/Cliente/Listar';
import { ListarEmpresa } from './views/Empresa/Listar';
import { ListarCartao } from './views/Cartao/Listar';
import { ListarPromocao } from './views/Promocao/Listar';
import { ListarCompra } from './views/Compra/Listar';
import { CadastrarCliente } from './views/Cliente/Cadastrar';
import { CadastrarEmpresa } from './views/Empresa/Cadastrar';
import { CadastrarCartao } from './views/Cartao/Cadastrar';
import { CadastrarPromocao } from './views/Promocao/Cadastrar';
import { CadastrarCompra } from './views/Compra/Cadastrar';
import { EditarCliente } from './views/Cliente/Editar';
import { EditarEmpresa } from './views/Empresa/Editar';
import { EditarCartao } from './views/Cartao/Editar';
import { EditarPromocao } from './views/Promocao/Editar';
import { CartoesCliente } from './views/Cliente/CartaoCli';
import { PromocoesEmpresa } from './views/Empresa/PromoEmp';

function App() {
  return (
    <div>
      <Menu />
      <Router>
        <Routes>
          <Route path="/" Component={ Home } />

          <Route path="/listar-clientes" Component={ ListarCliente } />
          <Route path="/listar-empresas" Component={ ListarEmpresa } />
          <Route path="/listar-cartoes" Component={ ListarCartao } />
          <Route path="/listar-promocoes" Component={ ListarPromocao } />
          <Route path="/listar-compras" Component={ ListarCompra } />

          <Route path="/listar-cartoes/:id" Component={ CartoesCliente } />
          <Route path="/listar-promocoes/:id" Component={ PromocoesEmpresa } />

          <Route path="/cadastrarcliente" Component={ CadastrarCliente } />
          <Route path="/cadastrarempresa" Component={ CadastrarEmpresa } />
          <Route path="/cadastrarcartao" Component={ CadastrarCartao } />
          <Route path="/cadastrarpromocao" Component={ CadastrarPromocao } />
          <Route path="/cadastrarcompra" Component={ CadastrarCompra } />

          <Route path="editar-cliente/:id" Component={ EditarCliente } />
          <Route path="editar-empresa/:id" Component={ EditarEmpresa } />
          <Route path="editar-cartao/:id" Component={ EditarCartao } />
          <Route path="editar-promocao/:id" Component={ EditarPromocao } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;