// This function returns the author object that matches the ID passed in as an argument.
function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}
// This function returns the book object that matches the ID passed in as an argument.
function findBookById(books, id) {
  return books.find((book) => book.id === id);
}
// This function returns an array with two arrays inside of it
// The first inner array contains books that have been loaned out but not yet returned
// The second inner array contains books that have been returned
function partitionBooksByBorrowedStatus(books) {
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
// This function returns an array of objects where each object has the account information of the borrower and has the borrow object "returned" key/value pair
function getBorrowersForBook(book, accounts) {
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
