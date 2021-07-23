// This function returns the account object that matches the ID passed in as an argument.
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}
// This function returns an alphabetically sorted array of account objects.
function sortAccountsByLastName(accounts) {
  accounts.sort((a, b) =>
    a.name.last.toLowerCase() > b.name.last.toLowerCase() ? 1 : -1
  );
  return accounts;
}
// This function returns the total number of borrows that an account has.
function getTotalNumberOfBorrows(account, books) {
  const accountID = account.id;

  return books.reduce((acc, book) => {
    acc += book.borrows.filter(
      (borrowObj) => borrowObj.id === accountID
    ).length;

    return acc;
  }, 0);
}
// This function returns an array of book objects that is currently borrowed by the specific account passed in as an argument. Where each object is the book object with the embedded author object inside of it.
function getBooksPossessedByAccount(account, books, authors) {
  const accountID = account.id;
  // booksCheckedOutByAccount returns an array of all books that are currently borrowed by the accountID.
  const booksCheckedOutByAccount = books.filter(
    (book) =>
      book.borrows[0].id === accountID && book.borrows[0].returned === false
  );
  // booksWithAuthors returns an array of books that has the specific author object of that book embedded inside of it.
  const booksWithAuthors = booksCheckedOutByAccount.reduce(
    (accumulatorBooks, book) => {
      // Setting book.author to the value of the returned author object. This author object is found by looping over the authors array, and comparing the book.authorId to the author id.
      book.author = authors.find((author) => author.id === book.authorId);
      accumulatorBooks.push(book);
      return accumulatorBooks;
    },
    []
  );

  return booksWithAuthors;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
