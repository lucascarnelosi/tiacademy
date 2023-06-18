const express = require('express');
const cors = require('cors');

const { Sequelize } = require('./models');

const models = require('./models');

let cliente = models.Cliente;
let cartao = models.Cartao;
let compra = models.Compra;
let empresa = models.Empresa;
let promocao = models.Promocao;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bem-vindo(a) a aplicação!')
});

// inserir
app.post('/cliente', async (req, res) => {
    await cliente.create(req.body)
    .then(cli => {
        return res.json({
            error: false,
            message: "Cliente criado com sucesso!",
            cli
        });
    })
    .catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível criar o cliente.",
            erro
        });
    });
});

app.post('/cartao', async (req, res) => {
    if (! await cliente.findByPk(req.body.ClienteId)) {
        return res.status(400).json({
            error: true,
            message: 'Cliente não existe.'
        });
    };

    await cartao.create(req.body)
    .then(card => {
        return res.json({
            error: false,
            message: "Cartão criado com sucesso!",
            card
        });
    })
    .catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível criar o cartão.",
            erro
        });
    });
});

app.post('/empresa', async (req, res) => {
    await empresa.create(req.body)
    .then(emp => {
        return res.json({
            error: false,
            message: "Empresa cadastrada com sucesso!",
            emp
        });
    })
    .catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível cadastrar a empresa.",
            erro
        });
    });
});

app.post('/promocao', async (req, res) => {
    if (! await empresa.findByPk(req.body.EmpresaId)) {
        return res.status(400).json({
            error: true,
            message: 'Empresa não existe.'
        });
    };

    await promocao.create(req.body)
    .then(promo => {
        return res.json({
            error: false,
            message: "Promoção criada com sucesso!",
            promo
        });
    })
    .catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível criar a promoção.",
            erro
        });
    });
});

app.post('/compra', async (req, res) => {
    if (! await cartao.findByPk(req.body.CartaoId)) {
        return res.status(400).json({
            error: true,
            message: "Cartão não foi encontrado."
        });
    };
    
    if (! await promocao.findByPk(req.body.PromocaoId)) {
        return res.status(400).json({
            error: true,
            message: "Promoção não foi encontrada."
        });
    };

    await compra.create(req.body)
    .then(buy => {
        return res.json({
            error: false,
            message: "Compra criada com sucesso!",
            buy
        });
    })
    .catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível criar a compra.",
            erro
        });
    });
});

// buscar
app.get('/listaclientes', async (req, res) => {
    await cliente.findAll()
    .then(cli => {
        return res.json({
            error: false,
            cli
        });
    })
    .catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível conectar.",
            erro
        });
    });
});
app.get('/cliente/:id', async (req, res) => {
    if (! await cliente.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: "Cliente não existe."
        })
    }

    await cliente.findByPk(req.params.id)
    .then(cli => {
        return res.json({
            error: false,
            cli
        })
    })
    .catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível conectar.",
            erro
        });
    });
});

app.get('/listacartoes', async (req, res) => {
    await cartao.findAll()
    .then(card => {
        return res.json({
            error: false,
            card
        });
    })
    .catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível conectar.",
            erro
        });
    });
});
app.get('/cartao/:id', async (req, res) => {
    if (! await cartao.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: "Cartão não existe."
        })
    }

    await cartao.findByPk(req.params.id)
    .then(card => {
        return res.json({
            error: false,
            card
        })
    })
    .catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível conectar.",
            erro
        });
    });
});

app.get('/listaempresas', async (req, res) => {
    await empresa.findAll()
    .then(emp => {
        return res.json({
            error: false,
            emp
        });
    })
    .catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível conectar.",
            erro
        });
    });
});
app.get('/empresa/:id', async (req, res) => {
    if (! await empresa.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: "Empresa não cadastrada."
        })
    }

    await empresa.findByPk(req.params.id)
    .then(emp => {
        return res.json({
            error: false,
            emp
        })
    })
    .catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível conectar.",
            erro
        });
    });
});

app.get('/listapromocoes', async (req, res) => {
    await promocao.findAll()
    .then(promo => {
        return res.json({
            error: false,
            promo
        });
    })
    .catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível conectar.",
            erro
        });
    });
});
app.get('/promocao/:id', async (req, res) => {
    if (! await promocao.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: "Promoção não encontrada."
        })
    }

    await promocao.findByPk(req.params.id)
    .then(promo => {
        return res.json({
            error: false,
            promo
        })
    })
    .catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível conectar.",
            erro
        });
    });
});

app.get('/listacompras', async (req, res) => {
    await compra.findAll()
    .then(buy => {
        return res.json({
            error: false,
            buy
        });
    })
    .catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível conectar.",
            erro
        });
    });
});

// editar
app.put('/editarcliente/:id', async (req, res) => {
    if (! await cliente.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: "Cliente não encontrado."
        });
    };

    await cliente.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(cli => {
        return res.json({
            error: false,
            message: "Cliente alterado com sucesso!",
            cli
        })
    })
    .catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível alterar.",
            erro
        });
    });
});

app.put('/editarcartao/:id', async (req, res) => {
    if (! await cartao.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: "Cartão não foi encontrado."
        });
    };

    // if (! await cliente.findByPk(req.body.ClienteId)) {
    //     return res.status(400).json({
    //         error: true,
    //         message: "Cliente correspondente não encontrado."
    //     });
    // };

    await cartao.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(card => {
        return res.json({
            error: false,
            message: "Cartão alterado com sucesso!",
            card
        })
    })
    .catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível alterar.",
            erro
        });
    });
});

app.put('/editarempresa/:id', async (req, res) => {
    if (! await empresa.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: "Empresa não encontrada."
        });
    };

    await empresa.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(emp => {
        return res.json({
            error: false,
            message: "Empresa alterada com sucesso!",
            emp
        })
    })
    .catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível alterar.",
            erro
        });
    });
});

app.put('/editarpromocao/:id', async (req, res) => {
    if (! await promocao.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: "Promoção não foi encontrada."
        });
    };

    // if (! await empresa.findByPk(req.body.EmpresaId)) {
    //     return res.status(400).json({
    //         error: true,
    //         message: "Empresa correspondente não encontrada."
    //     });
    // };

    await promocao.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(promo => {
        return res.json({
            error: false,
            message: "Promoção alterada com sucesso!",
            promo
        })
    })
    .catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível alterar.",
            erro
        });
    });
});

app.put('/promocard/:id/editarcompra', async (req, res) => {
    const compraDados = {
        data: req.body.data,
        quantidade: req.body.quantidade,
        valor: req.body.valor,
    }
    
    if (! await cartao.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: "Cartão não foi encontrado."
        });
    };
    
    if (! await promocao.findByPk(req.body.PromocaoId)) {
        return res.status(400).json({
            error: true,
            message: "Promoção não foi encontrada."
        });
    };

    await compra.update(compraDados, {
        where: Sequelize.and(
            {PromocaoId: req.body.PromocaoId},
            {CartaoId: req.params.id}
        )
    })
    .then(buy => {
        return res.json({
            error: false,
            message: "Compra alterada com sucesso!",
            buy
        })
    })
    .catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível alterar.",
            erro
        });
    });
});

// excluir
app.delete('/excluircliente/:id', async (req, res) => {
    if (! await cliente.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: "Cliente não encontrado."
        });
    };

    await cliente.destroy({
        where: { id: req.params.id }
    })
    .then(() => {
        return res.json({
            error: false,
            message: "Cliente excluído com êxito."
        });
    })
    .catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível excluir.",
            erro
        });
    });
});

app.delete('/excluircartao/:id', async (req, res) => {
    if (! await cartao.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: "Cartão não encontrado."
        });
    };

    await cartao.destroy({
        where: { id: req.params.id }
    })
    .then(() => {
        return res.json({
            error: false,
            message: "Cartão excluído com êxito."
        });
    })
    .catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível excluir.",
            erro
        });
    });
});

app.delete('/excluirempresa/:id', async (req, res) => {
    if (! await empresa.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: "Empresa não encontrada."
        });
    };

    await empresa.destroy({
        where: { id: req.params.id }
    })
    .then(() => {
        return res.json({
            error: false,
            message: "Empresa excluída com êxito."
        });
    })
    .catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível excluir.",
            erro
        });
    });
});

app.delete('/excluirpromocao/:id', async (req, res) => {
    if (! await promocao.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: "Promoção não encontrada."
        });
    };

    await promocao.destroy({
        where: { id: req.params.id }
    })
    .then(() => {
        return res.json({
            error: false,
            message: "Promoção excluída com êxito."
        });
    })
    .catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível excluir.",
            erro
        });
    });
});

app.delete('/promocard/:id/excluircompra', async (req, res) => {
    if (! await cartao.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: "Cartão não foi encontrado."
        });
    };
    
    if (! await promocao.findByPk(req.body.PromocaoId)) {
        return res.status(400).json({
            error: true,
            message: "Promoção não foi encontrada."
        });
    };

    if (! await compra.destroy({
        where: Sequelize.and(
            { CartaoId: req.params.id },
            { PromocaoId: req.body.PromocaoId }
        )
    })) {
        return res.status(400).json({
            error: true,
            message: "Compra não foi encontrada."
        });
    }

    await compra.destroy({
        where: Sequelize.and(
            { CartaoId: req.params.id },
            { PromocaoId: req.body.PromocaoId }
        )
    })
    .then(() => {
        return res.json({
            error: false,
            message: "Compra excluída com êxito."
        });
    })
    .catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível excluir.",
            erro
        });
    });
});

let port = process.env.PORT || 3001;

app.listen(port, (req, res) => {
    console.log('Servidor ativo: http://localhost:3001');
});