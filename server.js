require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const Task = require("./models/Task");
const taskRoutes = require("./routes/tasks");
const cors = require("cors");

const app = express();
app.use(
    cors({
         origin: "http://localhost:5173"
    })
);

// Permite JSON no corpo das requisições
app.use(express.json());

app.use("/tasks", taskRoutes);


const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
    console.log("Banco de dados sincronizado!");
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
});
