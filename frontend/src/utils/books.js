export const emptyBook = {
  title: '',
  year: undefined,
  author: undefined
}

export function isValidBook(book) {
  if (!book.title) return false;
  if (!book.author.name || !book.author.id) return false;
  if (book.year < 0 || book.year > new Date().getFullYear()) return false;

  return true;
}