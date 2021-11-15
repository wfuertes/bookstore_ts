import {Application} from "express-serve-static-core";
import CreateBook from "../../api/dto/CreateBook";
import BookStoreApi from "../../api/BookStoreApi";

export default class RootService {

    private readonly bookApi: BookStoreApi;

    constructor(bookApi: BookStoreApi) {
        this.bookApi = bookApi;
    }

    public configure(app: Application): void {
        app.post('/books', async (req, res) => {
            const bookView = await this.bookApi.store(CreateBook.fromJson(req.body));
            return res.status(202).send(bookView);
        });

        app.get('/books', async (req, res) => {
            return res.send(await this.bookApi.fetchBooks({...req.query}));
        });

        app.get('/books/:id', async (req, res) => {
            const bookView = await this.bookApi.fetchById(req.params.id);
            if (bookView.isPresent()) {
                return res.status(202).send(bookView.get());
            }
            return res.status(404).send();
        });

        app.delete('/books/:id', async (req, res) => {
            return this.bookApi.delete(req.params.id)
                .then(() => res.status(204).send())
                .catch(reason => res.status(400).send(reason));
        });
    }
}