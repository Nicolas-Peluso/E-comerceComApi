var imagemproduto = document.querySelector(".imagemProduto")
var tituloproduto = document.querySelector(".tituloProduto")
var descricao = document.querySelector(".descricao")
var preco = document.querySelector(".preco")
var main = document.querySelector(".main")
var btn = document.querySelector(".btnComprar")
var menu = document.querySelector(".opcaoMenu")


fetch("https://fakestoreapi.com/products")

.then(function(response){
    console.log(response)
    return response.json()
})

.then(function(keys){
  Array.from(keys).forEach(key => {


        var div = document.createElement('div')   
       
        div.innerHTML = `
        <a href="#"><img src="`+key.image+`" alt="" class="imagemProduto">
        <p class="tituloProduto">`+key.title+`<p>
        <p class="descricao">`+key.description+`<p>
        <p class="preco">`+key.price+` R$<p></a>
        <button class="btnComprar" id="btnComprar">COMPRAR</button>
        `   
       
        main.appendChild(div)
        div.classList.add("elements")
    })

})

function showMenu(){
    menu.classList.add("showMenu")

}
