import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../config/swagger.config';

const swaggerRouter = Router();

swaggerRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default swaggerRouter;