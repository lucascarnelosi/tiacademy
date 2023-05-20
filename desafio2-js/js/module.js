const searchBtn = document.querySelector('#btn');
const cep = document.querySelector('#cep');
const street = document.querySelector('#street');
const district = document.querySelector('#neighborhood');
const city = document.querySelector('#city');
const state = document.querySelector('#state');

function meAcha() {
    const api = async (cep) => {
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        const FetchData = await fetch(url);
        const JSONFetchData = await FetchData.json();
    
        for(let data in JSONFetchData) {
            if (data == "logradouro") {
                street.value = JSONFetchData[data];
            } else if (data == "bairro") {
                district.value = JSONFetchData[data];
            } else if (data == "localidade") {
                city.value = JSONFetchData[data]
            } else if (data == "uf") {
                state.value = JSONFetchData[data]
            } else if (data == "erro") {
                alert("Esse CEP não existe! Tente novamente")
            }         
        }
    }
    
    searchBtn.addEventListener('click', () => {
        api(cep.value);
    });
}

export { meAcha };
