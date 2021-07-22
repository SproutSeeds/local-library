function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.filter((book) => !book.borrows[0].returned).length;
}

function getMostCommonGenres(books) {
  const arrayOfGenresAndCount = mapOutObjNameAndCount(books, "genre");

  books.forEach(({ genre }) => {
    arrayOfGenresAndCount.find(({ name }) => name === genre).count++;
  });

  arrayOfGenresAndCount.sort((a, b) => b.count - a.count);

  return arrayOfGenresAndCount.slice(0, 5);
}

function getMostPopularBooks(books) {
  const arrayOfBookNamesAndCount = mapOutObjNameAndCount(books, "title");

  books.forEach(({ title, borrows }) => {
    let borrowedCount = borrows.length;
    arrayOfBookNamesAndCount.find(({ name }) => name === title).count +=
      borrowedCount;
  });
  arrayOfBookNamesAndCount.sort((a, b) => b.count - a.count);

  return arrayOfBookNamesAndCount.slice(0, 5);
}
// Helper function for getMostPopularBooks and getMostCommonGenres
function mapOutObjNameAndCount(books, property) {
  return books.map((book) => {
    let myObj = {};
    myObj.name = book[property];
    myObj.count = 0;
    return myObj;
  });
}

function getMostPopularAuthors(books, authors) {
  let myAuthArr = [];
  authors.forEach((author) => {
    const authObj = {};
    authObj.name = `${author.name.first} ${author.name.last}`;
    authObj.count = 0;

    const allAuthorBooks = books.filter(
      ({ authorId }) => authorId === author.id
    );
    allAuthorBooks.forEach((authBook) => {
      authObj.count += authBook.borrows.length;
    });
    myAuthArr.push(authObj);
  });

  myAuthArr.sort((a, b) => b.count - a.count);

  return myAuthArr.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
