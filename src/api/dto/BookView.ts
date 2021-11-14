import Book from "../../domain/book/Book";

export default class BookView {

    readonly id: string;
    readonly title: string;
    readonly price: number;
    readonly createdAt: number;

    constructor(id: string, title: string, price: number, createdAt: number) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.createdAt = createdAt;
    }

    static fromDomain(book: Book): BookView {
        return new BookView(
            book.id,
            book.title,
            book.price,
            book.createdAt.getTime()
        );
    }
}