
const container = document.querySelector('.bookDisplay');
const totalBooks = document.querySelector('#totalno');
const theme = document.querySelector('#theme');
const root = document.documentElement;
const addBook = document.querySelector('.add');
const addForm = document.querySelector(".addForum");
const upload = document.querySelector('#imageUploader');


function book(book) {

    //create elements
    const card = document.createElement('div');
    const bookImageContainer = document.createElement('div');
    const bookImage = document.createElement('img');
    const info = document.createElement('div');
    const bookName = document.createElement('h2');
    const authorName = document.createElement('h3');
    const otherDetail = document.createElement('div');
    const status = document.createElement('span');
    const pageNo = document.createElement('span');
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('delete');
    removeBtn.innerHTML = `<i class="fa-solid fa-circle-minus icon-delete"></i>`;
    // set classes to elements
    card.classList.add('card')
    bookImageContainer.classList.add('imageContainer')
    bookImage.classList.add('bookImage')
    info.classList.add('info')
    bookName.classList.add('bookName')
    authorName.classList.add('authorName')
    otherDetail.classList.add('otherDetails')
    status.classList.add('status')
    pageNo.classList.add('pages')
    removeBtn.classList.add('remove')

    //set card structrue
    info.appendChild(bookName);
    info.appendChild(authorName);
    info.appendChild(otherDetail);
    otherDetail.appendChild(status);
    otherDetail.appendChild(pageNo);
    bookImageContainer.appendChild(bookImage)
    card.appendChild(bookImageContainer);
    card.appendChild(info);
    card.appendChild(removeBtn);

    // set book details
    bookImage.src = book.image;
    bookName.textContent = book.title;
    authorName.textContent = book.author;
    status.textContent = book.status;
    pageNo.textContent = book.page;

    // append card to container
    container.appendChild(card)

};


// book creating class

class Book{
    constructor(title, author, page, status, image) {
        this.title = title;
        this.author = author;
        this.page = page;
        this.status = status;
        this.image = image;
    }
}


// user menu 
class UserMenu{
    static dark() {
        root.style.setProperty('--main', 'white');
        root.style.setProperty('--menu', "#131313");
        root.style.setProperty('--fc','white')
    }
    static light() {
        root.style.setProperty('--main', '#131313');
        root.style.setProperty('--menu', "white");
        root.style.setProperty('--fc','black')
    }
    static profilePicture() {
        const imageInput = document.querySelector("#image");
        var uploaded_image;

        upload.addEventListener('click', () => {
            imageInput.click();
        })

        imageInput.value = '';
        imageInput.addEventListener('change', function() {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            uploaded_image = reader.result;
            // store picture to local storage
            localStorage.setItem('profile', uploaded_image)

            document.querySelector("#profileImage").src = localStorage.getItem('profile');

            
        });
        reader.readAsDataURL(this.files[0]);
    })
    }

    static userNameChanger() {
        // user name
        const userName = document.querySelector('.username');
        const userNameSubmitBtn = document.querySelector('#submit-name');
        userName.textContent = 'unknown';
        const nameChange = document.querySelector('#userName');
        const changeNameValue = document.querySelector('#userNameValue');
        nameChange.checked = false;
        changeNameValue.style.display = 'none';

        function check(){
                userName.style.display = 'none';
                changeNameValue.style.display = 'block';
                userNameSubmitBtn.style.display = 'block';
        }
        function unchecked() {
            changeNameValue.style.display = 'none';
            userNameSubmitBtn.style.display = 'none';
            userName.style.display = '';
        }

        nameChange.addEventListener('change', () => {
            if (nameChange.checked) {
                check();
            }
        })
        const change = () => {
                userName.textContent = changeNameValue.value;
                localStorage.setItem('username',userName.textContent)
                userName.style.display = '';
                changeNameValue.style.display = 'none';
                userNameSubmitBtn.style.display = 'none';
                changeNameValue.value = '';
                nameChange.checked = false;
        }
        const changeError = () => {
                userName.textContent = 'unknown';
                localStorage.setItem('username',userName.textContent)
                nameChange.checked = false;
        }
        changeNameValue.addEventListener('keypress', (e) => {
            if (e.keyCode == 13) {
                change();
                unchecked();
            }
        })

        userNameSubmitBtn.addEventListener('click', () => {
            if (changeNameValue.value === '') {
                changeError()
                unchecked();
            }
            else {
                change();
                unchecked();
            }
        })
    }
}


UserMenu.userNameChanger();


// storage
class Store{
   static getBooks() {
       let books;
       if (localStorage.getItem("books") === null) {
           books = [];
       }
       else {
           books = JSON.parse(localStorage.getItem('books'));
       }
       return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books))
    }
    static removeBook() {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.title) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books',JSON.stringify(books))
    }
}


class Library{
    static bookList() {
        const books = Store.getBooks();
        books.forEach((book)=>Library.display(book))
    }

    static display(e) {
        book(e)
    }
    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.remove()
        }
        if (el.classList.contains('icon-delete')) {
            el.parentElement.parentElement.remove()
        }
    }
    static clearInput() {
        document.querySelector('#titleValue').value = "";
        document.querySelector('#authorValue').value = "";
        document.querySelector('#statusValue').value = "";
        document.querySelector('#pageValue').value = "";
        document.querySelector('#imageValue').value = "";
    }
}


// display books on load
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('books') == null) {
        totalBooks.textContent = 0;
    }
    else {
        totalBooks.textContent = JSON.parse(localStorage.books).length;
    }
    document.querySelector('#profileImage').src = localStorage.getItem('profile');
    document.querySelector(".username").textContent = localStorage.getItem('username') || "unknown";
    Library.bookList()
})


// delete book
document.querySelector('.bookDisplay').addEventListener('click', (e) => {
    Library.deleteBook(e.target)

    // remove book from storage
    Store.removeBook(e.target.parentElement.title.textContent)

    //update read status
    document.querySelector('#totalno').textContent = JSON.parse(localStorage.books).length;
})

// add new books form
addForm.classList.add('display-hide')
addBook.addEventListener("click", () => {
    addForm.classList.toggle('display-hide')
})


// add book
addForm.addEventListener('submit', (e) => {
    // prevent default state
    e.preventDefault()
    // take values from user
    const title = document.querySelector('#titleValue').value;
    const author = document.querySelector('#authorValue').value;
    const state = document.querySelector('#statusValue').value;
    const page = document.querySelector('#pageValue').value;
    const image = document.querySelector('#imageValue').value;

    const book1 = new Book(title, author, page, state, image);

    Library.display(book1);

    Store.addBook(book1)
    // close form window
    addForm.classList.add('display-hide');
    Library.clearInput()

    //update read status
    document.querySelector('#totalno').textContent = JSON.parse(localStorage.books).length;
})


// add form close button 
const closeForm = document.querySelector('.close');
closeForm.addEventListener('click', () => {
    addForm.classList.add('display-hide');
    Library.clearInput();
})


// profile picture
upload.addEventListener('click', () => {
    UserMenu.profilePicture()
})

// theme button
theme.checked = false;
 
theme.addEventListener('change', () => {
    if (theme.checked) {
        UserMenu.dark()
    }
    else {
       UserMenu.light()
    }
})

