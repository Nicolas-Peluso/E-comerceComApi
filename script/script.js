var imagemproduto = document.querySelector(".imagemProduto")
var tituloproduto = document.querySelector(".tituloProduto")
var descricao = document.querySelector(".descricao")
var preco = document.querySelector(".preco")
var main = document.querySelector(".main")
var btn = document.querySelector(".btnComprar")
var menu = document.querySelector(".opcaoMenu")
var produtoDetailMain = document.querySelector(".produtoDetail")
var search = document.querySelector(".search")
var load = document.querySelector(".loader")

/*variaveis do cep*/ 
var cep = document.querySelector('#cep')
var rua = document.querySelector('#rua')
var ddd = document.querySelector('#ddd')
var bairro = document.querySelector('#bairro')
var estado = document.querySelector('#estado')
var cidade = document.querySelector('#cidade')
var logradouro = document.querySelector("#logradouro")
var cepContainer = document.querySelector(".cepContainer")
cepContainer.classList.add("remove")

/*variaveis cadastro*/
var email = document.querySelector(".email")
var username = document.querySelector(".username")
var pass = document.querySelector(".pass")
var firstName = document.querySelector(".firstName")
var secondName = document.querySelector(".secondName")
var cepCadastro = document.querySelector(".zipCode")
var city = document.querySelector(".city")
var street = document.querySelector(".street")
var houseNumber = document.querySelector(".HouseNumber")
var phone = document.querySelector(".numberPhone")
var button = document.querySelector("#btnCadastro")
var form = document.querySelector(".form")
var errorTexto = document.querySelector(".erroSenha")
var itemErrorMessage = document.createElement("p")
var cadastrobotao = document.querySelector(".opcaomenu")
var cadastrocontainer = document.querySelector(".containerCadastro")

/* variveis marketing e cookie */
var conteinerCookie = document.querySelector(".questioncookie")
var formCookie = document.querySelector(".formCookie")
var cookie = document.querySelector("#cookie")
var mark = document.querySelector("#mark")
var btncookie = document.querySelector(".btnCookie")



cadastrocontainer.classList.add("remove")

    cadastrobotao.addEventListener("click", r => {

    main.innerHTML = ""
    main.classList.remove("elementsPrincipalMain")

    search.classList.remove("search")
    search.classList.add("remove")

    cadastrocontainer.classList.remove("remove")
    cadastrocontainer.classList.add("containerCadastro")
    

})

pass.addEventListener("focusout", p =>{
    verify(pass.value)
})

function verify(password){

    var validaPass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

    if(!validaPass.test(password)){
        itemErrorMessage.innerHTML = "8 carcteres uma letra um numero e um caracter esspecial @$!%*#?& "
        itemErrorMessage.style.color= "red"
        errorTexto.appendChild(itemErrorMessage)
    }
    else if(validaPass.test(password) == true){
        itemErrorMessage.innerHTML = "tudo certo!"
        itemErrorMessage.style.color= "green"
        errorTexto.appendChild(itemErrorMessage)
    }
}
form.addEventListener("submit", ex => {
    e.preventDefault()
    
    fetch("https://fakestoreapi.com/users", {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(
            {
                email: email,
                username: username,
                password: pass,
                name: {
                    firstName: firstName,
                    lastname: secondName
                },
                address: {
                    city, city,
                    street: street,
                    number: houseNumber,
                    cepCadastro: cepCadastro,
                    geolocation:{
                        lat:'-00.0000',
                        long:'00.0000'
                    },
                },
                phone: phone
            }
        )
    })
    .then(request => {
        console.log(request)
        
        if(request.status != 200 || request.status != 201){
            throw Error(request.status)
        }
        else{
            return request.json()
        }
    })
    .then(json => console.log(json))

.catch(erro => {
    console.log(`algo deu errado por favor tente novament ${erro}`)
})
})

function loaderoff(){
    load.classList.remove("loader")
}
function zeraOsCampos(){
    cep.value = ""
    estado.value = ""
    cidade.value= ""
    rua.value = ""
    ddd.value = ""
    bairro.value = ""
}
function adicionaOsCampos(){
    estado.value = "..."
    cidade.value= "..."
    ddd.value = "..."
    bairro.value = "..."
    logradouro.value = "..."
}

cep.addEventListener("focusout", ex => 
validacao(cep.value))

function validacao(cep){

var valida_cep = /[0-9]{5}-[\d]{3}/

if(valida_cep.test(cep)){
    buscaJson()
}
else{
    alert('verifique se voce digitou o cep corrtamente com o traço EX:00000-000 são 8 numeros e um -(apóstrofe)')
    zeraOsCampos()
}
}


function buscaJson(){

    adicionaOsCampos()

    fetch(`https://viacep.com.br/ws/`+cep.value+`/json`)

    .then(function (response){

    if(!response.ok){

        throw Error(response.statusText)
}
  return response.json()
 })
        .catch(e => {      
            console.log("algo deu errado com a conexão com o servidor", e)
        })
    .then(function(json){
        console.log(json)
        cep.value = json.cep
        estado.value = json.uf
        cidade.value= json.localidade
        ddd.value = json.ddd
        bairro.value = json.bairro
        logradouro.value = json.logradouro
    

})
}

fetch("https://fakestoreapi.com/products")

.then(function(response){
    console.log(response)
    
    if(response.ok != true){
        throw Error(response.status)
    }
    else{
        return response.json()

    }
})
.catch(erro => {
    console.log("conexão instavel ou perda de pacotes tente novamente mais tarde", erro)
})

.then(function(keys){
  Array.from(keys).forEach(key => {
        var div = document.createElement('div')   
        div.innerHTML = `
        
        <img src="`+key.image+`" alt="" class="imagemProduto">
        <p class="tituloProduto">`+key.title+`<p>
        <p class="descricao">`+key.description+`<p>
        <p class="preco">`+key.price+` R$<p>
        <button class="btnComprar" id="btnComprar">COMPRAR</button>
        
        `   
        loaderoff()
        main.appendChild(div)
        div.classList.add("elementsPrincipalMain")
        div.addEventListener("click", call => {
            
            carregaProdutoDetail(key.id)
        })
    })
})

function carregaProdutoDetail(id){

fetch(`https://fakestoreapi.com/products/`+id+``)

.then(response => {
  console.log(response)
    if(!response.ok){
        throw Error(response.status)
    }
    return response.json()

})
.catch(statusCode => {
    console.log(statusCode, "conexão instavel ou perda de pacotes tente novamente mais tarde")
})
.then(json =>{
    
    cepContainer.classList.remove("remove")
    cepContainer.classList.add("cepContainer")

    main.innerHTML = ""
    main.classList.remove("elementsPrincipalMain")

    search.classList.remove("search")
    search.classList.add("remove")

    var productDetail = document.createElement("div")
    productDetail.innerHTML = `
        
        <img src="`+json.image+`" alt="" class="imagemProdutoDetail">
        <p class="tituloDetail">`+json.title+`<p>
        <p class="descricaoDetail">`+json.description+`<p>
        <p class="precoDetail">`+json.price+` R$<p>
        <button class="btnComprarDetail" id="btnComprar">COMPRAR</button>
        
        ` 
        produtoDetailMain.appendChild(productDetail)
        productDetail.classList.add("containerProductDetail")

})

}


/*cookie mark*/

btncookie.addEventListener("click", ex => {
        if(cookie.checked == true){
            cookiefun()
        }
        if(mark.checked == true){
            markfun()
        }  
        conteinerCookie.classList.remove("questioncookie")
        conteinerCookie.classList.add("remove")
})


function cookiefun(){
    console.log("ativou cookie")
}

function markfun(){
    console.log("ativou mark")
}
