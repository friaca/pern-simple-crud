export const emptyBook = {
  title: '',
  year: undefined,
  author: undefined
}

export function isValidBook(book) {
  if (!book.title) return false;
  if (!book.author || !book.author.name || !book.author.id) return false;
  if (book.year < 0 || book.year > new Date().getFullYear()) return false;

  return true;
}

export const simpleBook = (book) => ({
  id: book.id,
  title: book.title,
  year: book.year,
  author_id: book.author.id
})

export function formatDropdownAuthor(author) {
  return { text: author.name,  id: author.id }
}