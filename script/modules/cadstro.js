const search = document.querySelector(".search")
const email = document.querySelector(".email")
const username = document.querySelector(".username")
const pass = document.querySelector(".pass")
const firstName = document.querySelector(".firstName")
const secondName = document.querySelector(".secondName")
const cepCadastro = document.querySelector(".zipCode")
const city = document.querySelector(".city")
const street = document.querySelector(".street")
const houseNumber = document.querySelector(".HouseNumber")
const phone = document.querySelector(".numberPhone")
const button = document.querySelector("#btnCadastro")
const form = document.querySelector(".form")
const errorTexto = document.querySelector(".erroSenha")
const itemErrorMessage = document.createElement("p")
const cadastrobotao = document.querySelector(".opcaomenu")
const cadastrocontainer = document.querySelector(".containerCadastro")
const main = document.querySelector(".main")
import cep from "../modules/cep.js"

export default function cadastro() {
    cepCadastro.addEventListener("blur", () => {
        cep()
    })
    cadastrocontainer.classList.add("remove")
    cadastrobotao.addEventListener("click", r => {

        main.innerHTML = ""
        main.classList.remove("elementsPrincipalMain")

        search.classList.remove("search")
        search.classList.add("remove")

        cadastrocontainer.classList.remove("remove")
        cadastrocontainer.classList.add("containerCadastro")
    })

    pass.addEventListener("focusout", p => {
        verify(pass.value)
    })

    function verify(password) {

        const validaPass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

        if (!validaPass.test(password)) {
            itemErrorMessage.innerHTML = "8 carcteres uma letra um numero e um caracter esspecial @$!%*#?& "
            itemErrorMessage.style.color = "red"
            errorTexto.appendChild(itemErrorMessage)
        }
        else if (validaPass.test(password) == true) {
            itemErrorMessage.innerHTML = "tudo certo!"
            itemErrorMessage.style.color = "green"
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
                        geolocation: {
                            lat: '-00.0000',
                            long: '00.0000'
                        },
                    },
                    phone: phone
                }
            )
        })
            .then(request => {
                console.log(request)

                if (request.status != 200 || request.status != 201) {
                    throw Error(request.status)
                }
                else {
                    return request.json()
                }
            })
            .then(json => console.log(json))

            .catch(erro => {
                console.log(`algo deu errado por favor tente novament ${erro}`)
            })
    })
}