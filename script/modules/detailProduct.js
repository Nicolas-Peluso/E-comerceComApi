const cepContainer = document.querySelector(".cepContainer")
cepContainer.classList.add("remove")

const produtoDetailMain = document.querySelector(".produtoDetail")
const main = document.querySelector(".main")
const search = document.querySelector(".search")

export default function carregaProdutoDetail(id) {

    fetch(`https://fakestoreapi.com/products/` + id + ``)

        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw Error(response.status)
            }
            return response.json()

        })
        .catch(statusCode => {
            console.log(statusCode, "conexão instavel ou perda de pacotes tente novamente mais tarde")
        })
        .then(json => {

            cepContainer.classList.remove("remove")
            cepContainer.classList.add("cepContainer")

            main.innerHTML = ""
            main.classList.remove("elementsPrincipalMain")

            search.classList.remove("search")
            search.classList.add("remove")

            var productDetail = document.createElement("div")
            productDetail.innerHTML = `
        
        <img src="`+ json.image + `" alt="" class="imagemProdutoDetail">
        <p class="tituloDetail">`+ json.title + `<p>
        <p class="descricaoDetail">`+ json.description + `<p>
        <p class="precoDetail">`+ json.price + ` R$<p>
        <button class="btnComprarDetail" id="btnComprar">COMPRAR</button>
        
        `
            produtoDetailMain.appendChild(productDetail)
            productDetail.classList.add("containerProductDetail")

        })

}
