import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import apiRoutes from './routes/index.js';

const app = express();

app.use(helmet())
  .disable('x-powered-by')
  .use(cors())
  .use(logger('combined'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Welcome to ExWallet Backend 👨🏽‍💻')
})

app.use('/api/v1/', apiRoutes);
app.all('*', (req, res) => {
  res.status(404).send('Invalid Route');
})

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(req.status || 500).send({
    status: "Error",
    message: err.message
  });
});

const port = process.env.PORT || 3000;
export default app.listen(port, () => {
  console.log(`app started on port ${port}`);
});