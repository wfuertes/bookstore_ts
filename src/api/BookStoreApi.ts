import {ulid} from "ulid";
import BookView from "./dto/BookView";
import CreateBook from "./dto/CreateBook";
import BookService from "../domain/book/BookService";

export default class BookStoreApi {

    private bookService: BookService;

    constructor(bookService: BookService) {
        this.bookService = bookService;
    }

    async store(createBook: CreateBook): Promise<BookView> {
        const savedBook = await this.bookService.save(createBook.toDomain(ulid(), new Date()));
        return BookView.fromDomain(savedBook);
    }

    async fetchBooks(): Promise<Array<BookView>> {
        return (await this.bookService.findAll()).map(BookView.fromDomain);
    }
}