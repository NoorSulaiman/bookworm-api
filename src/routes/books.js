import express from 'express';
import authenticate from '../middlewares/authenticate';
import request from 'request-promise';
import { parseString } from 'xml2js';
import parseErrors from "../utils/parseErrors";
import Book from '../models/Book';

const router = express.Router();
router.use(authenticate);

router.get("/searchBooks", (req, res) => {
    request
        .get(`https://www.goodreads.com/search/index.xml?key=${process.env.GOODREADS_KEY}&q=${req.query.q}`)
        .then(result => parseString(result, (err, goodreadsResult) => res.json({
            books: goodreadsResult.GoodreadsResponse.search[0].results[0].work.map(work => ({
                goodreadsId: work.best_book[0].id[0]._,
                title: work.best_book[0].title[0],
                authors: work.best_book[0].author[0].name[0],
                covers: [work.best_book[0].image_url[0]]

            }))
        })));
});

router.get("/fetchPages", (req, res) => {
    request
        .get(`https://www.goodreads.com/book/show.xml?key=${process.env.GOODREADS_KEY}&id=${req.query.id}`)
        .then(result => parseString(result, (err, goodreadsResult) => {
            const numPages = goodreadsResult.GoodreadsResponse.book[0].num_pages[0];
            const pages = numPages ? parseInt(numPages, 10) : 0;

            res.json({

                pages
            })
        }));
});

router.post("/", (req, res) => {

    Book.create({ ...req.body.book, userId: req.currentUser._id })
        .then(book => res.json({ book }))
        .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.post("/progress", (req, res) => {

    Book.findOneAndUpdate(

        { userId: req.currentUser._id, goodreadsId: req.body.data.goodreadsId },
        { progress: req.body.data.progress },
        { new: true }

    ).then(book => {
        if (book) {
            book.save().then((book) => res.json({ book }))
        } else { res.status(404).json({ errors: { global: "there is no such a book" } }) }
    })
});

router.get("/", (req, res) => {
    Book.find({ userId: req.currentUser._id }).then(books => res.json({ books }));
});

router.delete("/deleteBook", (req, res) => {

    Book.deleteOne({ userId: req.currentUser._id, goodreadsId: req.body.goodreadsId }).then(book => {
        if (book.n) {
            res.status(200).json({ Book: 'Book has been deleted ! ', bookId: req.body.goodreadsId })
        } else { res.status(404).json({ errors: { global: "there is no such a book" } }) }
    })
})

export default router;