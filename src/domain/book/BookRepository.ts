import Book from "./Book";
import BookQuery from "./BookQuery";
import {Optional} from "typescript-optional";

export default interface BookRepository {

    save(book: Book): Promise<Book>;

    findAll(query: BookQuery): Promise<Array<Book>>;

    findById(bookId: string): Promise<Optional<Book>>;

    delete(book: Book): Promise<void>;
}