const express = require('express');
const agentesRouter = require("./routes/agentesRoutes");
// const swaggerUi = require("swagger-ui-express");
const casosRouter = require("./routes/casosRoutes");
const errorHandler = require("./utils/errorHandler");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(agentesRouter);
app.use(casosRouter);
// app.use("api-docs", swaggerUi.serve, swaggerUi.setup(require("./swagger.json")));
app.use(errorHandler.errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia rodando em localhost:${PORT}`);
});