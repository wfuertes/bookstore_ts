export default class Book {

    readonly id: string;
    readonly title: string;
    readonly price: number;
    readonly createdAt: Date;

    constructor(id: string, title: string, price: number, createdAt: Date) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.createdAt = createdAt;
    }


}