import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";
import livrosRoutes from "./routes/livrosRoutes.js";
import autoresRoutes from "./routes/autoresRoutes.js";

const conexao = await conectaNaDatabase();

conexao.on("error", (erro) => {
    console.error("erro de conexão", erro);
});

conexao.once("open", () => {
    console.log("Conexão com o banco feita com sucesso");
});

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Curso de Node.js");
});

app.use(livrosRoutes);
app.use(autoresRoutes);

export default app;
