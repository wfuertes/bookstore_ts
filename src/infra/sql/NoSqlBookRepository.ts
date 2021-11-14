import Book from "../../domain/book/Book";
import BookRepository from "../../domain/book/BookRepository";
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";

export default class NoSqlBookRepository implements BookRepository {

    private readonly documentClient: DocumentClient;

    constructor(documentClient: DocumentClient) {
        this.documentClient = documentClient;
    }

    async findAll(): Promise<Array<Book>> {
        const queryOutput = await this.documentClient.query({
            TableName: "bookstore",
            KeyConditionExpression: '#pk = :pk and begins_with(#sk, :sk)',
            ExpressionAttributeNames: {
                '#pk': 'pk',
                '#sk': 'sk',
            },
            ExpressionAttributeValues: {
                ':pk': 'BOOK',
                ':sk': 'CREATED'
            }
        }).promise();

        const books = queryOutput.Items?.map(({sk, title, price, createdAt}) => {
            return new Book(sk, title, price, new Date(createdAt));
        }) || [];

        console.info("Found books: ", books);
        return books;
    }

    async save(book: Book): Promise<Book> {
        const bookId = `CREATED!#${book.createdAt.getTime()}!#${book.id}`;

        await this.documentClient.put({
            TableName: 'bookstore',
            Item: {
                pk: 'BOOK',
                sk: bookId,
                title: book.title,
                price: book.price,
                createdAt: book.createdAt.getTime()
            }
        }).promise();

        console.info("Saved book: ", book);
        return new Book(bookId, book.title, book.price, book.createdAt);
    }

    delete(bookId: string): Promise<boolean> {
        const deletePromise = this.documentClient.delete({
            TableName: 'bookstore',
            Key: {
                'pk': 'BOOK',
                'sk': bookId
            }
        }).promise();

        return deletePromise.then(() => true).catch(() => false);
    }
}