import BookRepository from "./BookRepository";
import Book from "./Book";

export default class BookService {

    private readonly bookRepository: BookRepository;

    constructor(bookRepository: BookRepository) {
        this.bookRepository = bookRepository;
    }

    async save(book: Book): Promise<Book> {
        return this.bookRepository.save(book);
    }

    async findAll(): Promise<Array<Book>> {
        return this.bookRepository.findAll();
    }

    async delete(bookId: string): Promise<boolean> {
        return this.bookRepository.delete(bookId);
    }
}