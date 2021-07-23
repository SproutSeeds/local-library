// **HELPER FUNCTION** for getMostPopularBooks and getMostCommonGenres
// This helper function will take in the array of books and a specific
// property that is a string value and return an array of objects that have
// the "name" key equal to the specific book property value we pass in as an argument.
function mapOutObjNameAndCount(books, property) {
  return books.map((book) => {
    let myObj = {};
    myObj.name = book[property];
    myObj.count = 0;
    return myObj;
  });
}

// This function returns the total number of books in the array that is provided as an argument.
function getTotalBooksCount(books) {
  return books.length;
}
// This function returns the total number of accounts in the array that is provided as an argument.
function getTotalAccountsCount(accounts) {
  return accounts.length;
}
// This function returns the total number of books that are currently borrowed and/or out-on-loan.
function getBooksBorrowedCount(books) {
  return books.filter((book) => !book.borrows[0].returned).length;
}
// This function returns an array of objects where each object is the most common genres ordered by greatest to least. This array will give up to top 5 most common genres max.
function getMostCommonGenres(books) {
  const arrayOfGenresAndCount = mapOutObjNameAndCount(books, "genre");

  books.forEach(({ genre }) => {
    arrayOfGenresAndCount.find(({ name }) => name === genre).count++;
  });

  arrayOfGenresAndCount.sort((a, b) => b.count - a.count);

  return arrayOfGenresAndCount.slice(0, 5);
}
// This function returns an array of sorted objects where each object has "title" and "count" key/value pair that represents the number of borrows that book has. We are only returning up to 5 most popular books.
function getMostPopularBooks(books) {
  // this constant variable utilizes the mapOutObjNameAndCount helper function.
  const arrayOfBookNamesAndCount = mapOutObjNameAndCount(books, "title");

  books.forEach(({ title, borrows }) => {
    let borrowedCount = borrows.length;
    arrayOfBookNamesAndCount.find(({ name }) => name === title).count +=
      borrowedCount;
  });
  arrayOfBookNamesAndCount.sort((a, b) => b.count - a.count);

  return arrayOfBookNamesAndCount.slice(0, 5);
}
// This function returns a sorted array of objects where each object has a "name" and "count" key/value pair. It is sorted by count and returns up to 5 top most borrowed authors.
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
