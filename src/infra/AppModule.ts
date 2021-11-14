import Book from "../domain/book/Book";
import BookStoreApi from "../api/BookStoreApi";
import BookService from "../domain/book/BookService";
import SqlBookRepository from "./sql/SqlBookRepository";
import RootService from "./services/RootService";

const binds = new Map<any, any>();

const AppModule = {
    get: <T>(key: string): T => {
        return binds.get(key);
    }
};

const database = new Map<string, Book>();
binds.set('BookRepository', new SqlBookRepository(database));
binds.set('BookService', new BookService(AppModule.get('BookRepository')));
binds.set('BookStoreApi', new BookStoreApi(AppModule.get('BookService')));
binds.set('RootService', new RootService(AppModule.get('BookStoreApi')));

export default AppModule;