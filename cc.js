const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")
const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button")

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option")
        newOption.innerText = currCode
        newOption.value = currCode
        if(select.name === "From" && currCode === "USD")
        {
            newOption.selected=true
        }
        if(select.name === "To" && currCode === "INR")
        {
            newOption.selected=true
        }
        select.append (newOption)
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    })
}

const updateFlag = (element) => {
    let currCode = element.value
    let countryCode = countryList[currCode]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newSrc
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault()
    updateExchangeRate()
})

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value
    console.log(amtVal);

    // console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response = await fetch(URL)
    let data = await response.json()
    let rate = data[toCurr.value.toLowerCase()]
    let finalAmt = amtVal * rate

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`; 
}

window.addEventListener("load", () => {
    updateExchangeRate();
})