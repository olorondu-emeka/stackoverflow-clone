import express, { json, urlencoded, Request, Response, NextFunction } from 'express';
import cors from 'cors';

import routes from 'entrypoint/web/routes';

const app = express();
const PORT = Number(process.env.PORT) || 5000;
// const developmentServer = `http://localhost:${PORT}`;

app.use(cors());
app.use(cors());
app.use(json({ limit: '20mb' }));
app.use(urlencoded({ extended: true }));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send('server error, this will be resolved shortly!');

  next();
});

app.get('/', (request: Request, response: Response) => {
  response.status(200).send('Welcome to Stackoverflow Clones');
});

app.use('/api/v1', routes);

app.use('*', (request, response) => {
  response.status(404).send('Not Found');
});

if (process.env.NODE_ENV !== 'test') {
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.info(`Server started on port ${PORT}`));
}

export default app;
