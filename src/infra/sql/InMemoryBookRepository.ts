import Book from "../../domain/book/Book";
import BookRepository from "../../domain/book/BookRepository";

export default class InMemoryBookRepository implements BookRepository {

    private readonly books: Map<string, Book>;

    constructor(database: Map<string, Book>) {
        this.books = database;
    }

    async findAll(): Promise<Array<Book>> {
        return Array.from(this.books.values());
    }

    async save(book: Book): Promise<Book> {
        this.books.set(book.id, book);
        return book;
    }

    delete(bookId: string): Promise<boolean> {
        return Promise.resolve(this.books.delete(bookId));
    }
}