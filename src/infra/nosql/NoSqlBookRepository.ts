import Book from "../../domain/book/Book";
import {Optional} from "typescript-optional";
import BookQuery from "../../domain/book/BookQuery";
import BookRepository from "../../domain/book/BookRepository";
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import AttributeMap = DocumentClient.AttributeMap;

export default class NoSqlBookRepository implements BookRepository {

    private readonly documentClient: DocumentClient;

    constructor(documentClient: DocumentClient) {
        this.documentClient = documentClient;
    }

    async findAll(query: BookQuery): Promise<Array<Book>> {
        const queryOutput = await this.documentClient.scan({
            TableName: 'bookstore',
            FilterExpression: 'begins_with(#pk, :pk)',
            ExpressionAttributeNames: {
                '#pk': 'pk'
            },
            ExpressionAttributeValues: {
                ':pk': 'BOOK'
            }
        }).promise();

        const books = queryOutput.Items?.map(NoSqlBookRepository.deserialize) || [];
        console.info("Found books: ", books);
        return books;
    }

    private static deserialize(item: AttributeMap): Book {
        const {pk, title, price, createdAt} = item;
        const bookId = pk.split('#')[1];
        return new Book(bookId, title, price, new Date(createdAt));
    }

    async findById(id: string): Promise<Optional<Book>> {
        const queryOutput = await this.documentClient.query({
            TableName: "bookstore",
            KeyConditionExpression: '#pk = :pk and begins_with(#sk, :sk)',
            ExpressionAttributeNames: {
                '#pk': 'pk',
                '#sk': 'sk'
            },
            ExpressionAttributeValues: {
                ':pk': `BOOK#${id}`,
                ':sk': 'CREATED'
            }
        }).promise();

        const books: Book[] = queryOutput.Items?.map(NoSqlBookRepository.deserialize) || [];

        console.info("Found books: ", books);
        return Optional.ofNullable(books[0]);
    }

    async save(book: Book): Promise<Book> {
        return this.documentClient.put({
            TableName: 'bookstore',
            Item: {
                pk: `BOOK#${book.id}`,
                sk: `CREATED#${book.createdAt}`,
                title: book.title,
                price: book.price,
                createdAt: book.createdAt.getTime()
            }
        }).promise()
            .then(() => {
                console.info("Saved book: ", book);
                return new Book(book.id, book.title, book.price, book.createdAt);
            });
    }

    async delete(book: Book): Promise<void> {
        return this.documentClient.delete({
            TableName: 'bookstore',
            Key: {
                'pk': `BOOK#${book.id}`,
                'sk': `CREATED#${book.createdAt.getTime()}`
            }
        }).promise()
            .then(() => console.info('Book deleted: ' + book.id));
    }
}