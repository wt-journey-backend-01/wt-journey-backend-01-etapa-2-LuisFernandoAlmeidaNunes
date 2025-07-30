const express = require('express');
const agentesRouter = require("./routes/agentesRoutes");
const casosRouter = require("./routes/casosRoutes");
const errorHandler = require("./utils/errorHandler");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(agentesRouter);
app.use(casosRouter);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia rodando em localhost:${PORT}`);
});