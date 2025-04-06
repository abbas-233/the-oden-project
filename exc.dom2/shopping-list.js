// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const list = document.querySelector('.shopping-list');
    const input = document.getElementById('item');
    const addButton = document.getElementById('add-item');
    const clearButton = document.getElementById('clear-all');
    const totalCount = document.getElementById('total-count');
    const completedCount = document.getElementById('completed-count');

    // Load items from localStorage
    let items = JSON.parse(localStorage.getItem('shoppingList')) || [];

    // Function to update statistics
    function updateStats() {
        const total = items.length;
        const completed = items.filter(item => item.completed).length;
        totalCount.textContent = total;
        completedCount.textContent = completed;
    }

    // Function to save items to localStorage
    function saveItems() {
        localStorage.setItem('shoppingList', JSON.stringify(items));
        updateStats();
    }

    // Function to create a new list item
    function createListItem(item) {
        const listItem = document.createElement('li');
        if (item.completed) {
            listItem.classList.add('completed');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';
        checkbox.checked = item.completed;
        checkbox.addEventListener('change', () => {
            item.completed = checkbox.checked;
            listItem.classList.toggle('completed', item.completed);
            saveItems();
        });

        const itemSpan = document.createElement('span');
        itemSpan.className = 'item-text';
        itemSpan.textContent = item.text;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            items = items.filter(i => i !== item);
            listItem.remove();
            saveItems();
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(itemSpan);
        listItem.appendChild(deleteButton);
        return listItem;
    }

    // Function to render all items
    function renderItems() {
        list.innerHTML = '';
        items.forEach(item => {
            list.appendChild(createListItem(item));
        });
        updateStats();
    }

    // Function to handle adding new items
    function addItem() {
        const itemText = input.value.trim();
        
        if (itemText) {
            const newItem = {
                text: itemText,
                completed: false,
                id: Date.now()
            };
            
            items.push(newItem);
            list.appendChild(createListItem(newItem));
            saveItems();
            
            input.value = '';
            input.focus();
        }
    }

    // Function to clear all items
    function clearAllItems() {
        if (confirm('Are you sure you want to clear all items?')) {
            items = [];
            list.innerHTML = '';
            saveItems();
        }
    }

    // Add event listeners
    addButton.addEventListener('click', addItem);
    clearButton.addEventListener('click', clearAllItems);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addItem();
        }
    });

    // Initial render
    renderItems();
}); 