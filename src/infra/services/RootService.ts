import {Application} from "express-serve-static-core";
import CreateBook from "../../api/dto/CreateBook";
import BookStoreApi from "../../api/BookStoreApi";

export default class RootService {

    private readonly bookApi: BookStoreApi;

    constructor(bookApi: BookStoreApi) {
        this.bookApi = bookApi;
    }

    public configure(app: Application): void {
        app.get('/books', async (req, res) => {
            return res.send(await this.bookApi.fetchBooks());
        });

        app.post('/books', async (req, res) => {
            const bookView = await this.bookApi.store(CreateBook.fromJson(req.body));
            return res.status(202).send(bookView);
        });

        app.delete('/books/:id', async (req, res) => {
            await this.bookApi.delete(req.params.id);
            return res.status(204).send();
        });
    }
}