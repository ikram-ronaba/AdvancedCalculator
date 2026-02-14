const currentDisplay = document.querySelector(".current");
const previousDisplay = document.querySelector(".previous");
const buttons = document.querySelectorAll("button");

let current = "";
let previous = "";
let operator = null;

function updateDisplay() {
  currentDisplay.textContent = current || "0";
  previousDisplay.textContent = operator ? `${previous} ${operator}` : "";
}

function appendNumber(number) {
  if (number === "." && current.includes(".")) return;
  current += number;
}

function chooseOperator(op) {
  if (current === "") return;
  if (previous !== "") calculate();
  operator = op;
  previous = current;
  current = "";
}

function calculate() {
  let result;
  const prev = parseFloat(previous);
  const curr = parseFloat(current);
  if (isNaN(prev) || isNaN(curr)) return;

  switch (operator) {
    case "+": result = prev + curr; break;
    case "-": result = prev - curr; break;
    case "*": result = prev * curr; break;
    case "/": 
      if (curr === 0) {
        alert("Cannot divide by zero");
        clear();
        return;
      }
      result = prev / curr; 
      break;
    default: return;
  }

  current = result.toString();
  operator = null;
  previous = "";
}

function clear() {
  current = "";
  previous = "";
  operator = null;
}

function deleteNumber() {
  current = current.slice(0, -1);
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (!action) {
      appendNumber(value);
    } else if (action === "operator") {
      chooseOperator(button.dataset.value);
    } else if (action === "equals") {
      calculate();
    } else if (action === "clear") {
      clear();
    } else if (action === "delete") {
      deleteNumber();
    }

    updateDisplay();
  });
});

document.addEventListener("keydown", e => {
  if (!isNaN(e.key) || e.key === ".") appendNumber(e.key);
  if (["+", "-", "*", "/"].includes(e.key)) chooseOperator(e.key);
  if (e.key === "Enter") calculate();
  if (e.key === "Backspace") deleteNumber();
  if (e.key === "Escape") clear();
  updateDisplay();
});

updateDisplay();
