// Library array to store all books
const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Add toggleRead method to Book prototype
Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

// Function to add a new book to the library
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    updateLibraryDisplay();
    updateStats();
}

// Function to remove a book from the library
function removeBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        updateLibraryDisplay();
        updateStats();
    }
}

// Function to update the library display
function updateLibraryDisplay() {
    const booksGrid = document.getElementById('books-grid');
    booksGrid.innerHTML = '';

    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.dataset.id = book.id;

        bookCard.innerHTML = `
            <h2>${book.title}</h2>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Status:</strong> <span class="status ${book.read ? 'read' : 'not-read'}">${book.read ? 'Done' : 'Unread'}</span></p>
            <div class="book-actions">
                <button class="btn btn-read" data-status="${book.read ? 'read' : 'unread'}" onclick="toggleReadStatus('${book.id}')">
                    ${book.read ? 'Mark as Unread' : 'Mark as Done'}
                </button>
                <button class="btn btn-delete" onclick="removeBook('${book.id}')">
                    Delete
                </button>
            </div>
        `;

        booksGrid.appendChild(bookCard);
    });
}

// Function to update statistics
function updateStats() {
    const totalBooks = document.getElementById('total-books');
    const booksRead = document.getElementById('books-read');

    totalBooks.textContent = myLibrary.length;
    booksRead.textContent = myLibrary.filter(book => book.read).length;
}

// Function to toggle read status
function toggleReadStatus(id) {
    const book = myLibrary.find(book => book.id === id);
    if (book) {
        book.toggleRead();
        updateLibraryDisplay();
        updateStats();
    }
}

// Modal functionality
const modal = document.getElementById('add-book-modal');
const addBookBtn = document.getElementById('add-book-btn');
const closeModal = document.getElementById('close-modal');
const addBookForm = document.getElementById('add-book-form');

// Open modal
addBookBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Handle form submission
addBookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, read);

    // Reset form and close modal
    addBookForm.reset();
    modal.style.display = 'none';
});

// Add some sample books
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, true);
addBookToLibrary('1984', 'George Orwell', 328, false);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, true); 