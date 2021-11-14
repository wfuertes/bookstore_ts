import Book from "../../domain/book/Book";

export default class CreateBook {
    readonly title: string;
    readonly price: number;

    constructor(title: string, price: number) {
        this.title = title;
        this.price = price;
    }

    static fromJson(json: any): CreateBook {
        return new CreateBook(json.title, json.price)
    }

    public toDomain(id: string, createdAt: Date): Book {
        return new Book(`CREATED!#${createdAt.getTime()}!#${id}`, this.title, this.price, createdAt);
    }
}