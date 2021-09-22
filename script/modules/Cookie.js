const conteinerCookie = document.querySelector(".questioncookie")
const cookie = document.querySelector("#cookie")
const mark = document.querySelector("#mark")
const btncookie = document.querySelector(".btnCookie")

export default function MarkAndCookie() {
    btncookie.addEventListener("click", ex => {
        if (cookie.checked == true) {
            cookiefun("ativo")
        } else {
            cookiefun("nao ativo")
        }
        if (mark.checked == true) {
            markfun("ativo")
        } else {
            markfun("nao ativo")
        }
        conteinerCookie.classList.remove("questioncookie")
    })

    function cookiefun(taAtivo) {
        sessionStorage.setItem("cookie", taAtivo)
    }

    function markfun(taAtivo) {
        sessionStorage.setItem("marketing", taAtivo)
    }
    sessionStorage.getItem("cookie") ? conteinerCookie.classList.remove("questioncookie") : MarkAndCookie()
}
