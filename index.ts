import express from 'express';
const app = express();
import cors from 'cors'
const port = 5000;

import agencyRouter from './routes/agency.js';
import subscriptionRouter from './routes/subscription.js';
import couponRouter from './routes/coupon.js';
import membershipRouter from './routes/membership.js';

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/agency', agencyRouter);
app.use('/api/subs', subscriptionRouter);
app.use('/api/coupon', couponRouter);
app.use('/api/membership', membershipRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});