import Book from "./Book";

export default interface BookRepository {

    save(book: Book): Promise<Book>;

    findAll(): Promise<Array<Book>>;

    delete(bookId: string): Promise<boolean>;
}