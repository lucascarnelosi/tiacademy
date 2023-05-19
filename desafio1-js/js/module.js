const productsList = document.querySelector('#produtos');
const clientBasket = document.querySelector('#cestaDoCliente');
const showTotal = document.querySelector('#mostraTotalCompra');

const productsArray = [
    {
        "produto": "Maçã",
        "preço": 3.20 
    },
    {
        "produto": "Banana",
        "preço": 3.90
    },
    {
        "produto": "Mamão",
        "preço": 7.90
    },
    {
        "produto": "Melão",
        "preço": 6.50
    },
    {
        "produto": "Abacate",
        "preço": 3.60
    },
];

function kitanda() {
    for (let products of productsArray) {
        const createLi = document.createElement('li'); 

        for (let productValue in products) {
            if (typeof products[productValue] == 'string') {
                productsList.appendChild(createLi).textContent = products[productValue];
            } else {
                const productsPrices = products[productValue]
                productsList.appendChild(createLi).setAttribute('data-preco', productsPrices);
            };
        };
    };

    const listProd = document.querySelectorAll('li');
    
    listProd.forEach((prod) => {
        const createLi = document.createElement('li');

        prod.addEventListener('click', () => {
            const child = clientBasket.appendChild(createLi);

            if (child.innerHTML != prod.innerHTML) {
                child.innerHTML = prod.innerHTML
                calculate(prod.dataset.preco)
            } else {
                alert("O produto já foi adicionado na cesta!")
            }
        })
    })

    let total = 0

    function calculate(productPrice) {
        total = Number(total) + Number(productPrice);
        
        if (showTotal != productPrice) {
            showTotal.value = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(total)
        } 
    }
};

export { kitanda };