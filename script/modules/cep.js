export default function Cep() {
    const cep = document.querySelector('#cep')
    const rua = document.querySelector('#rua')
    const ddd = document.querySelector('#ddd')
    const bairro = document.querySelector('#bairro')
    const estado = document.querySelector('#estado')
    const cidade = document.querySelector('#cidade')
    const logradouro = document.querySelector("#logradouro")

    function zeraOsCampos() {
        cep.value = ""
        estado.value = ""
        cidade.value = ""
        rua.value = ""
        ddd.value = ""
        bairro.value = ""
    }
    function adicionaOsCampos() {
        estado.value = "..."
        cidade.value = "..."
        ddd.value = "..."
        bairro.value = "..."
        logradouro.value = "..."
    }

    cep.addEventListener("focusout", ex =>
        validacao(cep.value))

    function validacao(cep) {

        var valida_cep = /[0-9]{5}-[\d]{3}/

        if (valida_cep.test(cep)) {
            buscaJson()
        }
        else {
            alert('verifique se voce digitou o cep corrtamente com o traço EX:00000-000 são 8 numeros e um -(apóstrofe)')
            zeraOsCampos()
        }
    }


    function buscaJson() {

        adicionaOsCampos()

        fetch(`https://viacep.com.br/ws/` + cep.value + `/json`)

            .then(function (response) {

                if (!response.ok) {

                    throw Error(response.statusText)
                }
                return response.json()
            })
            .catch(e => {
                console.log("algo deu errado com a conexão com o servidor", e)
            })
            .then(function (json) {
                console.log(json)
                cep.value = json.cep
                estado.value = json.uf
                cidade.value = json.localidade
                ddd.value = json.ddd
                bairro.value = json.bairro
                logradouro.value = json.logradouro


            })
    }
}