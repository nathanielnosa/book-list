// Book Constructor
function Book(title,author,isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI(){}

//add book to list
UI.prototype.addBookList = function(book){
  const tbody = document.querySelector('#book-list');
  const trow = document.createElement('tr');
  trow.innerHTML =`
                  <td>${book.title}</td>
                  <td>${book.author}</td>
                  <td>${book.isbn}</td>
                  <td><a href='#' class='delete'> X </a></td>
                  `;
  tbody.appendChild(trow);
}

// // set message
UI.prototype.setMessage = function(msg, color){
  const message = document.createElement('div');
  console.log(message);
  message.className = `alert`;
  message.style.borderColor = color;
  message.style.color = color;
  message.style.textAlign = 'center';
  message.appendChild(document.createTextNode(msg));
  const container = document.querySelector('#content');
  const form = document.querySelector('form');

  container.insertBefore(message,form);
  //console.log(message);

  setTimeout(function(){
    document.querySelector('.alert').remove();
  },2000);

  
}
// Delete Book
UI.prototype.deleteBook = function(target){
  target.parentElement.parentElement.remove();
}
// clear book list text
UI.prototype.clearBookList = function(){
  document.querySelector('#title').value='';
  document.querySelector('#author').value='';
  document.querySelector('#isbn').value='';
}


// Event listener
document.querySelector('form').addEventListener('submit', function(e){
  //get ui values
  const UItitle = document.querySelector('#title').value,
        UIauthor = document.querySelector('#author').value,
        UIisbn = document.querySelector('#isbn').value;
  //instantiate book
  const book = new Book(UItitle,UIauthor,UIisbn);
  //instantiate ui
  const ui = new UI();

  // validating input
  if(UItitle === '' || UIauthor === '' || UIisbn === ''){
    // set error message
    ui.setMessage('This fileds must not be empty!','red');

  }else{
    //add book
    ui.addBookList(book);
    //set success message
    ui.setMessage('Book Added Successfully!', 'green');
    //clear book list
    ui.clearBookList();
  }
  e.preventDefault();
});

document.querySelector('#book-list').addEventListener('click', function(e){
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.setMessage('Book successfuly removed!','green');
});