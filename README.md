![Screenshot_1](https://user-images.githubusercontent.com/37051222/148113575-61cb959e-058a-496b-8dc6-212e675dca69.png)


# html
```
<div class="container my-4">         
        
        <div class="calculator card shadow">
        
            <input type="text" id="input" class="calculator-input" placeholder="0" disabled />
        
            <div class="calculator-keys mt-2">
        
              <button type="button" class="operator btn " value="+">+</button>
              <button type="button" class="operator btn " value="-">-</button>
              <button type="button" class="operator btn " value="*">&times;</button>
              <button type="button" class="operator btn " value="/">&divide;</button>
     
              <button type="button" value="7" class="btn btn-number-color">7</button>
              <button type="button" value="8" class="btn btn-number-color ">8</button>
              <button type="button" value="9" class="btn btn-number-color ">9</button>       
              <button type="button" value="4" class="btn btn-number-color ">4</button>
              <button type="button" value="5" class="btn btn-number-color ">5</button>
              <button type="button" value="6" class="btn btn-number-color ">6</button>     
              <button type="button" value="1" class="btn btn-number-color">1</button>
              <button type="button" value="2" class="btn btn-number-color">2</button>
              <button type="button" value="3" class="btn btn-number-color">3</button>
              <button type="button" value="0" class="btn btn-number-color">0</button>

              <button type="button" class="decimal btn btn-number-color" value=".">.</button>
              <button type="button" class="clear btn btn-danger btn-sm" value="c">C</button>
        
              <button type="button" class="btn-equal btn operator" value="=">=</button>
        
            </div>
          </div>
        </div>
```

# js
```
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
```

# css
```
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;  /* kenarlık yok */
}

html{
  font-size: 30px;
}

body{
  font-size: 1.2rem;
}

.calculator{
  border-radius: 5px;
  width: 400px;
  position: absolute; /* tam ortalıyor */
  top: 50%; 
  left: 50%;
  transform: translate(-50%,-50%); /**/
  background-color: #F7F7F7;
}

.calculator-input{
  font-size: 50px;
  height: 140px;
  border: none;
  border-radius: 2px;
  background-color: #1A374D;
  color: #fff;
  text-align: right;
  padding-right: 10px;
  padding-left: 10px;
}

.btn-number-color{
  background-color: #334756;
  color: #fff;
}

.operator{
  background-color: #FF4C29;
  color: #fff;
  
}

.btn-equal{
  grid-area: 2/4/6;  /* 2. satırın 4. sütunundan başla 6. satıra kadar git*/
}

.calculator-keys{
  display: grid;
  grid-template-columns: repeat(4,1fr); /* bir satırda 4 elaman ve 1fr eşit yer kaplayacak */
  grid-gap: 10px;
  padding: 10px;
  padding-bottom: 20px;
}



```
