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

cep.addEventListener("focusout", validacao)

function validacao(){

var valida_cep = /[0-9]{5}-[\d]{3}/

if(valida_cep.test(cep.value)){

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
            
            console.log("deu pau", e)
    
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


