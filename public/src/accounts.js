function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  accounts.sort((a, b) =>
    a.name.last.toLowerCase() > b.name.last.toLowerCase() ? 1 : -1
  );
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  const accountID = account.id;

  return books.reduce((acc, book) => {
    acc += book.borrows.filter(
      (borrowObj) => borrowObj.id === accountID
    ).length;

    return acc;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountID = account.id;
  const booksCheckedOut = books.filter(
    (book) =>
      book.borrows[0].id === accountID && book.borrows[0].returned === false
  );
  const booksWithAuthors = booksCheckedOut.reduce((books, book) => {
    book.author = authors.find((author) => author.id === book.authorId);
    books.push(book);
    return books;
  }, []);

  console.log(booksWithAuthors);
  return booksWithAuthors;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
