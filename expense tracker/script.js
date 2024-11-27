// Get references to DOM elements
const expenseForm = document.getElementById('expense-form');
const expenseName = document.getElementById('expense-name');
const expenseAmount = document.getElementById('expense-amount');
const expenseList = document.getElementById('expense-list');

// Load expenses from localStorage
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to save expenses to localStorage
function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to render expenses list
function renderExpenses() {
    expenseList.innerHTML = '';  // Clear the list
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.name} - $${expense.amount}
            <button onclick="deleteExpense(${index})">Delete</button>
            <button onclick="editExpense(${index})">Edit</button>
        `;
        expenseList.appendChild(li);
    });
}

// Handle form submission to add a new expense
expenseForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the name and amount from the inputs
    const name = expenseName.value;
    const amount = parseFloat(expenseAmount.value);

    if (name && amount && !isNaN(amount)) {
        // Add new expense to the list
        expenses.push({ name, amount });

        // Save to localStorage
        saveExpenses();

        // Clear inputs and render the updated list
        expenseName.value = '';
        expenseAmount.value = '';
        renderExpenses();
    } else {
        alert('Please provide valid inputs.');
    }
});

// Delete expense function
function deleteExpense(index) {
    expenses.splice(index, 1);  // Remove expense at the specified index
    saveExpenses();  // Save updated expenses to localStorage
    renderExpenses();  // Re-render the expenses list
}

// Edit expense function
function editExpense(index) {
    const expense = expenses[index];
    expenseName.value = expense.name;
    expenseAmount.value = expense.amount;

    // Replace the add button with update logic
    expenseForm.removeEventListener('submit', addExpense);
    expenseForm.addEventListener('submit', function (event) {
        event.preventDefault();
        expense.name = expenseName.value;
        expense.amount = parseFloat(expenseAmount.value);

        saveExpenses();
        renderExpenses();
        expenseName.value = '';
        expenseAmount.value = '';
        expenseForm.removeEventListener('submit', arguments.callee);
        expenseForm.addEventListener('submit', addExpense);
    });
}

// Render expenses on initial load
renderExpenses();
