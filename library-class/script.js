class Book {
    constructor(title, author, pages, read) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

class Library {
    constructor() {
        this.myLibrary = [];
        this.booksGrid = document.getElementById('books-grid');
        this.totalBooksStat = document.getElementById('total-books');
        this.booksReadStat = document.getElementById('books-read');
        this.addBookForm = document.getElementById('add-book-form');
        this.modal = document.getElementById('add-book-modal');
        this.addBookBtn = document.getElementById('add-book-btn');
        this.closeModalBtn = document.getElementById('close-modal');

        this.setupEventListeners();
        this.updateLibraryDisplay();
        this.updateStats();
    }

    setupEventListeners() {
        this.addBookBtn.addEventListener('click', () => this.openModal());
        this.closeModalBtn.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (event) => {
            if (event.target === this.modal) {
                this.closeModal();
            }
        });
        this.addBookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });
    }

    openModal() {
        this.modal.classList.add('active');
    }

    closeModal() {
        this.modal.classList.remove('active');
        this.addBookForm.reset();
    }

    handleFormSubmit() {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        const read = document.getElementById('read').checked;

        const newBook = new Book(title, author, pages, read);
        this.addBookToLibrary(newBook);
        this.closeModal();
    }

    addBookToLibrary(book) {
        this.myLibrary.push(book);
        this.updateLibraryDisplay();
        this.updateStats();
    }

    removeBookFromLibrary(bookId) {
        this.myLibrary = this.myLibrary.filter(book => book.id !== bookId);
        this.updateLibraryDisplay();
        this.updateStats();
    }

    toggleBookReadStatus(bookId) {
        const book = this.myLibrary.find(book => book.id === bookId);
        if (book) {
            book.toggleRead();
            this.updateLibraryDisplay();
            this.updateStats();
        }
    }

    updateLibraryDisplay() {
        this.booksGrid.innerHTML = '';
        this.myLibrary.forEach(book => {
            const bookCard = this.createBookCard(book);
            this.booksGrid.appendChild(bookCard);
        });
    }

    createBookCard(book) {
        const card = document.createElement('div');
        card.classList.add('book-card');
        card.dataset.id = book.id;

        const statusClass = book.read ? 'read' : 'not-read';
        const statusText = book.read ? 'Read' : 'Not Read';
        const toggleButtonText = book.read ? 'Mark Unread' : 'Mark Read';
        const toggleButtonIcon = book.read ? 'fa-times-circle' : 'fa-check-circle';
        const toggleButtonClass = book.read ? '' : 'mark-unread';

        card.innerHTML = `
            <div>
                <h2>${book.title}</h2>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Pages:</strong> ${book.pages}</p>
                <p><strong>Status:</strong> <span class="book-status ${statusClass}">${statusText}</span></p>
            </div>
            <div class="book-actions">
                <button class="btn btn-read ${toggleButtonClass}" data-action="toggle">
                    <i class="fas ${toggleButtonIcon}"></i> ${toggleButtonText}
                </button>
                <button class="btn btn-delete" data-action="delete">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;

        card.querySelector('[data-action="toggle"]').addEventListener('click', () => {
            this.toggleBookReadStatus(book.id);
        });
        card.querySelector('[data-action="delete"]').addEventListener('click', () => {
            this.removeBookFromLibrary(book.id);
        });

        return card;
    }

    updateStats() {
        const totalBooks = this.myLibrary.length;
        const booksRead = this.myLibrary.filter(book => book.read).length;
        this.totalBooksStat.textContent = totalBooks;
        this.booksReadStat.textContent = booksRead;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const library = new Library();
    library.addBookToLibrary(new Book('The Hobbit', 'J.R.R. Tolkien', 295, true));
    library.addBookToLibrary(new Book('1984', 'George Orwell', 328, false));
    library.addBookToLibrary(new Book('To Kill a Mockingbird', 'Harper Lee', 281, true));
});