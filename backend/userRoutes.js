import express from 'express';
import connectAndQuery from './postgresQuery.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import cors from 'cors';
import { post, getPost, upvotePost, downvotePost } from './postAPI.js';

import loginController from './controllers/loginController.js';
import registerController from './controllers/registerController.js';
import submitController from './controllers/submitController.js';
import profileController from './controllers/profileController.js';
import postController from './controllers/postController.js';
import voteController from './controllers/voteController.js';

import verifyToken from './middlewares/authMiddleware.js';


const __filename = fileURLToPath(import.meta.url);

const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri);

// Get the current file's directory
const __dirname = path.dirname(__filename);



const router = express.Router();


router.get('/random/', express.json(), async (req, res) => {
    console.log("TEST");
    await client.connect();
    const db = await client.db("reddit");
    const collection = await db.collection("redditSearchQueries")
    const randomDocs = await collection.aggregate([{ $sample: { size: 3 } }]).toArray();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');
    res.write(JSON.stringify(randomDocs));
    res.end();
    await client.close();
});

router.post('/login', express.json(), loginController);

router.post('/register', express.json(), registerController);


router.get('', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index1.html'));
});

router.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'script.js'));
});

router.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'style.css'));
});

router.get('/Reddit-Logo.png', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Reddit-Logo.png'));
});

router.post('/submit/', express.json(), verifyToken, express.json(), submitController);

router.put('/vote/', express.json(), voteController);

router.get('/r/all/top/', async (req, res) => {
    const count = req.query.count;
    console.log(count);
    const result = await connectAndQuery(`SELECT * FROM posts ORDER BY (upvotes - downvotes) DESC LIMIT 25 OFFSET ${count};`);
    
    res.json(result.rows);

});

router.get('/r/all/new/', async (req, res) => {
    const count = req.query.count;
    console.log(count);
    const result = await connectAndQuery(`SELECT * FROM posts ORDER BY "Date" DESC LIMIT 25 OFFSET ${count};`);
    
    res.json(result.rows);

});

router.get('/r/all/controversial/', async (req, res) => {
    const count = req.query.count;
    console.log(count);
    const result = await connectAndQuery(`SELECT * FROM posts ORDER BY ((upvotes+downvotes) / greatest(abs(upvotes-downvotes), 1)) DESC LIMIT 25 OFFSET ${count};`);
    
    res.json(result.rows);

});

router.get('/r/all/hot/', async (req, res) => {
    const count = req.query.count;
    console.log(count);
    const result = await connectAndQuery(`SELECT * FROM posts WHERE "Date" > CURRENT_TIMESTAMP - INTERVAL '48 hours' ORDER BY ((upvotes+downvotes) / greatest(abs(upvotes-downvotes), 1)) DESC LIMIT 25 OFFSET ${count};`);

    res.json(result.rows);

});

router.get('/r/:subreddit/top/', async (req, res) => {
    const subreddit = (await connectAndQuery(`SELECT subredditid from subreddits where subredditname = '${req.params.subreddit}';`));
    console.log(subreddit.rows.length);
    if (subreddit.rows.length === 0)
        res.status(404).json();
    else{
        const subredditId = subreddit.rows[0].subredditid;
        
        
        const count = req.query.count;
        console.log(count);
        const result = await connectAndQuery(`SELECT * FROM posts where subredditid = ${subredditId} ORDER BY (upvotes - downvotes) DESC LIMIT 25 OFFSET ${count};`);
        
        res.json(result.rows);

    }

});

router.get('/r/:subreddit/new/', async (req, res) => {
    const subredditId = (await connectAndQuery(`SELECT subredditid from subreddits where subredditname = '${req.params.subreddit}';`)).rows[0].subredditid;
    const count = req.query.count;
    console.log(count);
    const result = await connectAndQuery(`SELECT * FROM posts where subredditid = ${subredditId} ORDER BY "Date" DESC LIMIT 25 OFFSET ${count};`);
    
    res.json(result.rows);

});

router.get('/r/:subreddit/controversial/', async (req, res) => {
    const subredditId = (await connectAndQuery(`SELECT subredditid from subreddits where subredditname = '${req.params.subreddit}';`)).rows[0].subredditid;
    const count = req.query.count;
    console.log(count);
    const result = await connectAndQuery(`SELECT * FROM posts where subredditid = ${subredditId} ORDER BY ((upvotes+downvotes) / greatest(abs(upvotes-downvotes), 1)) DESC LIMIT 25 OFFSET ${count};`);
    
    res.json(result.rows);

});

router.get('/r/:subreddit/hot/', async (req, res) => {
    const subredditId = (await connectAndQuery(`SELECT subredditid from subreddits where subredditname = '${req.params.subreddit}';`)).rows[0].subredditid;
    const count = req.query.count;
    console.log(count);
    const result = await connectAndQuery(`SELECT * FROM posts WHERE "Date" > CURRENT_TIMESTAMP - INTERVAL '48 hours' AND subredditid = ${subredditId} ORDER BY (upvotes - downvotes) DESC LIMIT 25 OFFSET ${count};`);
    
    res.json(result.rows);
});

router.get(/^\/r\/([^/]+)\/comments\/(\d+)$/, postController);
router.get(/^\/r\/([^/]+)\/comments\/(\d+)\/$/, postController);

router.get("/u/:id/", profileController);

router.get("/subreddit/:id/", async (req, res) => {
    const result = await connectAndQuery(`SELECT * from subreddits where subredditid = ${req.params.id};`);
    // console.log("The rows are", result.rows);
    res.json(result.rows);
})

router.get("/subreddits/", async (req, res) => {
    const result = await connectAndQuery(`SELECT * from subreddits;`);
    // console.log("The rows are", result.rows);
    res.json(result.rows);
})

export default router;