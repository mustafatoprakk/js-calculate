const input=document.querySelector(".calculator-input")
const keys=document.querySelector(".calculator-keys")

let displayValue="0"
let firstValue=null
let operator=null
let waitingForSecondValue=false

updateDisplay()

// update value
function updateDisplay(){
    input.value=displayValue
}

keys.addEventListener("click",function(e){
    const element=e.target

    // click button
    if(!element.matches('button')){ // matches button olup olmadığını kontrol ediyor
        return
    }
    // click operator
    if(element.classList.contains("operator")){
        handleOperator(element.value)
        updateDisplay()
        return
    }
    // clear operator
    if(element.classList.contains("clear")){
        clear()
        updateDisplay()
        return
    }
    // dot operator
    if(element.classList.contains("decimal")){
        inputDecimal()
        updateDisplay()
        return
    }

    inputNumber(element.value)
    updateDisplay()
})

// get value calculate
function handleOperator(nextOperator){
    const value=parseFloat(displayValue)

    if(operator && waitingForSecondValue){
        operator=nextOperator
        return
    }

    if(firstValue===null){
        firstValue=value
    }else if(operator){
        const result=calculate(firstValue,value,operator)
        displayValue=`${parseFloat(result.toFixed(9))}` // 7 karakter ile sınırlandırıyor
        firstValue=result
    }
    waitingForSecondValue=true
    operator=nextOperator
}

// calculate
function calculate(first,second,operator){
    if(operator==="+"){
        return first+second;
    }else if(operator==="-"){
        return first-second;
    }else if(operator==="*"){
        return first*second;
    }else if(operator==="/"){
        return first/second;
    }
    return second; // eşittir butonuna basıldığında
}

// get input
function inputNumber(num){
    if(waitingForSecondValue){
        displayValue=num
        waitingForSecondValue=false
    }else{
        displayValue=displayValue === "0" ? num: displayValue + num // yan yana yazılması sağlanıyor
    }
}

// float number
function inputDecimal(){
    if(!displayValue.includes(".")){
        displayValue+="."
    }
}

function clear(){
    displayValue="0"
}