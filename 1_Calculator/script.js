class Calculator {
  // Constructor function to initialize the Calculator object with previous and current operand elements
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;

    // Call the clear method to reset the calculator
    this.clear();
  }

  // Method to reset the calculator
  clear() {
    // Set current and previous operands to empty strings and operation to undefined
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  // Method to delete the last character from the current operand
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  // Method to append a number to the current operand
  appendNumber(number) {
    // Prevent appending multiple decimal points
    if (number === "." && this.currentOperand.includes(".")) return;
    // Append the number to the current operand
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  // Method to choose an operation for calculation
  chooseOperation(operation) {
    // Return if current operand is empty
    if (this.currentOperand === "") return;

    // Compute the previous operation if there's already a previous operand
    if (this.previousOperand !== "") {
      this.compute();
    }

    // Set the operation and move the current operand to previous operand
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  // Method to perform the computation based on the chosen operation
  compute() {
    let computation;

    // Parse previous and current operands into float numbers
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    // Return if operands are not numbers
    if (isNaN(prev) || isNaN(current)) return;

    // Perform computation based on the chosen operation
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }

    // Set the current operand to the computation result
    this.currentOperand = computation;
    // Reset operation and previous operand
    this.operation = undefined;
    this.previousOperand = "";
  }

  // Method to format the displayed number
  getDisplayNumber(number) {
    const stringNumber = number.toString();

    // Extract integer and decimal digits
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;

    // Format integer display with commas
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    // Return formatted number with or without decimal digits
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  // Method to update the display with current and previous operands and operation
  updateDisplay() {
    // Update current operand text element
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );

    // Update previous operand text element with the operation if it exists
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      // Otherwise, clear the previous operand text element
      this.previousOperandTextElement.innerText = "";
    }
  }
}

// Select elements from the DOM
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

// Create a new Calculator object
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// Event listeners for number buttons to append numbers to the current operand
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

// Event listeners for operation buttons to choose operations
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

// Event listener for equals button to compute the result
equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
  calculator.currentOperand = "";
});

// Event listener for all clear button to reset the calculator
allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

// Event listener for delete button to delete the last character from the current operand
deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
