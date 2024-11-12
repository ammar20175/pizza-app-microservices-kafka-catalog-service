import express, { Request, Response } from 'express';
import { globalErrorHandler } from './common/middlewares/globalErrorHandler';
import categoryRouter from './category/category-router';
import productRouter from './product/product-router';
import cookieParser from 'cookie-parser';
import toppingRouter from './topping/topping-router';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use('/categories', categoryRouter);
app.use('/products', productRouter);
app.use('/toppings', toppingRouter);

app.use(globalErrorHandler);

export default app;
