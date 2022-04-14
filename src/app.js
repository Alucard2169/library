
const container = document.querySelector('.bookDisplay');


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
        let userName = document.querySelector('.username');
        userName.textContent = 'unknown';
        let nameChange = document.querySelector('#userName');
        let changeNameValue = document.querySelector('#userNameValue');
        nameChange.checked = false;
        changeNameValue.style.display = 'none';

        nameChange.addEventListener('change', () => {
            if (nameChange.checked) {
                userName.style.display = 'none';
                changeNameValue.style.display = 'block';
            }
        })

        changeNameValue.addEventListener('keypress', (e) => {
            if (e.keyCode == 13) {
                userName.textContent = changeNameValue.value;
                localStorage.setItem('username',userName.textContent)
                userName.style.display = '';
                changeNameValue.style.display = 'none';
                changeNameValue.value = '';
                nameChange.checked = false;
            }
            else if(e.keyCode == 13 && changeNameValue.value == '') {
                userName.textContent = 'unknown';
                localStorage.setItem('username',userName.textContent)

                nameChange.checked = false;
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
        let books = Store.getBooks();
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
    document.querySelector('#totalno').textContent = JSON.parse(localStorage.books).length || 0;
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

let addBook = document.querySelector('.add');
let addForm = document.querySelector(".addForum")
addForm.classList.add('display-hide')
addBook.addEventListener("click", () => {
    addForm.classList.toggle('display-hide')
})


// add book
addForm.addEventListener('submit', (e) => {
    // prevent default state
    e.preventDefault()
    // take values from user
    let title = document.querySelector('#titleValue').value;
    let author = document.querySelector('#authorValue').value;
    let state = document.querySelector('#statusValue').value;
    let page = document.querySelector('#pageValue').value;
    let image = document.querySelector('#imageValue').value;

    let book1 = new Book(title, author, page, state, image);

    Library.display(book1);

    Store.addBook(book1)
    // close form window
    addForm.classList.add('display-hide');
    Library.clearInput()

    //update read status
    document.querySelector('#totalno').textContent = JSON.parse(localStorage.books).length;
})





// profile picture
let upload = document.querySelector('#imageUploader');
upload.addEventListener('click', () => {
    UserMenu.profilePicture()
})

// theme button
const theme = document.querySelector('#theme');
let root = document.documentElement;
theme.checked = false;
 
theme.addEventListener('change', () => {
    if (theme.checked) {
        UserMenu.dark()
    }
    else {
       UserMenu.light()
    }
})

