$(document).ready(function() {
  const calculator = {
    current: 0,
    operator: null,
    x: null,
    hasY: true,
    containsDec: false
  };
  
  function updateDisplay() {
    const d = document.getElementById("display");
    d.textContent = calculator.current;
  };
  
  function resetCalc() {
    calculator.current = 0;
    calculator.operator = null;
    calculator.x = null;
    calculator.hasY = true;
    calculator.containsDec = false;
  };
 
  
  function newNum(item) {
      if (!calculator.hasY && calculator.current == "-") {
          calculator.hasY = true;
          calculator.current += item;
      }
      else if (!calculator.hasY && calculator.current !== "-") {
          calculator.hasY = true;
          calculator.current = item;
      }
      else if (calculator.current == 0) {
          calculator.current = item;
      }
      else {
          calculator.current += item;
      }
    };
  
    function addDec(item) {
      if (!calculator.containsDec) {
        if (calculator.current === 0) {
          calculator.current = "0.";
        }
        else {
        calculator.current += item;
        calculator.containsDec = true;
        }
      }
    };
  
  function calculate(x, y, z) {
          if (y == "+") {
            return x + z;
          }
          else if (y == "-") {
            return x - z;
          }
          else if (y == "*") {
            return x * z;
          }
          else if (y == "/") {
            return x / z;
          }
        return x;
    };
  
    function addOp(item) {
      console.log(calculator);
      const num = parseFloat(calculator.current);
      calculator.containsDec = false;
            if (calculator.x == null) {
                calculator.x = num;
                calculator.operator = item;
                calculator.hasY = false;
            }
            if (calculator.operator !== null && !calculator.hasY) {
                calculator.operator = item;
            }
            if (calculator.hasY) {
              const result = calculate(calculator.x, calculator.operator, num);
              calculator.operator = item;
              calculator.current = result;
              calculator.x = parseFloat(result);
              calculator.hasY = false;
            }
    };
  
    
  
  $("button").click((event) => {
    const e = event.target.value;
    switch (e){
      case "-":
        if (calculator.operator !== null && calculator.hasY === false) {
          calculator.current = e;
        }
        else if (calculator.current !== e){
          addOp(e);
        }
        break;
      case "+":
      case "*":
      case "/":
      case "=":
        if (calculator.current == "-") {
          calculator.current = "";
          calculator.operator = e;
        }
        else {
          addOp(e);
        }
        break;
      case ".":
        addDec(e);
        break;
      case "clear":
        resetCalc();
        break;
      default:
        newNum(e);      
    };
    updateDisplay(); 
    
  });
  
})