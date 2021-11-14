import Book from "../../domain/book/Book";
import BookRepository from "../../domain/book/BookRepository";

export default class SqlBookRepository implements BookRepository {

    private books: Map<string, Book>;

    constructor(books: Map<string, Book>) {
        this.books = books;
    }

    async findAll(): Promise<Array<Book>> {
        return Array.from(this.books.values());
    }

    async save(book: Book): Promise<Book> {
        this.books.set(book.id, book);
        return book;
    }
}