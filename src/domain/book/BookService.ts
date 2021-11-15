import BookRepository from "./BookRepository";
import Book from "./Book";
import BookQuery from "./BookQuery";
import {Optional} from "typescript-optional";

export default class BookService {

    private readonly bookRepository: BookRepository;

    constructor(bookRepository: BookRepository) {
        this.bookRepository = bookRepository;
    }

    async save(book: Book): Promise<Book> {
        return this.bookRepository.save(book);
    }

    async findAll(query: BookQuery): Promise<Array<Book>> {
        return this.bookRepository.findAll(query);
    }

    async delete(bookId: string): Promise<void> {
        return this.findById(bookId)
            .then(bookOpt => bookOpt.orElseThrow(() => 'Book not found: ' + bookId))
            .then(book => this.bookRepository.delete(book));
    }

    async findById(bookId: string): Promise<Optional<Book>> {
        return this.bookRepository.findById(bookId);
    }
}