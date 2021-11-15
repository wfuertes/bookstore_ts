import AWS from "aws-sdk";
import BookStoreApi from "../api/BookStoreApi";
import BookService from "../domain/book/BookService";
import RootService from "./services/RootService";
import NoSqlBookRepository from "./nosql/NoSqlBookRepository";

const binds = new Map<any, any>();

const AppModule = {
    get: <T>(key: string): T => {
        return binds.get(key);
    }
};

const documentClient = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
});

binds.set('BookRepository', new NoSqlBookRepository(documentClient));
binds.set('BookService', new BookService(AppModule.get('BookRepository')));
binds.set('BookStoreApi', new BookStoreApi(AppModule.get('BookService')));
binds.set('RootService', new RootService(AppModule.get('BookStoreApi')));

export default AppModule;