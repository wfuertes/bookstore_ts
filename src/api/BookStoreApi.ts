import {ulid} from "ulid";
import BookView from "./dto/BookView";
import CreateBook from "./dto/CreateBook";
import BookService from "../domain/book/BookService";
import BookQuery from "../domain/book/BookQuery";
import {Optional} from "typescript-optional";

export default class BookStoreApi {

    private bookService: BookService;

    constructor(bookService: BookService) {
        this.bookService = bookService;
    }

    async store(createBook: CreateBook): Promise<BookView> {
        const savedBook = await this.bookService.save(createBook.toDomain(ulid(), new Date()));
        return BookView.fromDomain(savedBook);
    }

    async fetchBooks(query: BookQuery): Promise<Array<BookView>> {
        return (await this.bookService.findAll(query)).map(BookView.fromDomain);
    }

    async delete(bookId: string): Promise<void> {
        return this.bookService.delete(bookId);
    }

    async fetchById(bookId: string): Promise<Optional<BookView>> {
       return this.bookService.findById(bookId)
           .then(bookOpt => bookOpt.map(book => BookView.fromDomain(book)));
    }
}