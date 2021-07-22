function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  // returns an array with two arrays inside of it
  // The first inner array contains books that have been loaned out but not yet returned
  // The second inner array contains books that have been returned
  const booksLoanedOut = [];
  const booksReturned = [];
  const myArray = [booksLoanedOut, booksReturned];

  for (let book in books) {
    books[book].borrows[0].returned === false
      ? booksLoanedOut.push(books[book])
      : booksReturned.push(books[book]);
  }

  return myArray;
}

function getBorrowersForBook(book, accounts) {
  // returns an array objects where each object spreads the account information and has the borrows returned key/value pair
  const borrows = book.borrows.slice(0, 10);
  const accountBorrowedObjects = [];
  console.log(borrows);
  for (let borrowObj in borrows) {
    let borrowId = borrows[borrowObj].id;

    let accountObj = accounts.find((account) => account.id === borrowId);
    accountBorrowedObjects.push({ ...accountObj, ...borrows[borrowObj] });
  }
  return accountBorrowedObjects;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
