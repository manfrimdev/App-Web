// Importação de módulos
const express = require("express");
const path = require("path");
const mysql = require("mysql2/promise");
const cors = require("cors");

// Configuração do Express
const App = express();
App.set("view engine", "ejs");
App.set("views", path.join(__dirname, "mvc/views"));
App.use(express.static(path.join(__dirname, "public")));
App.use(express.urlencoded({ extended: true }));
App.use(express.json());
App.use(cors());

// Configuração do banco de dados
const connection = mysql.createPool({
    host: "10.111.4.30",
    user: "dev1b",
    database: "dev1b",
    password: "Sen4i2024"
});

// Inicia o servidor na porta 3000
App.listen(3000, () => console.log("Aplicação no ar"));

// ========================== ROTAS ==========================

// Página inicial
App.get("/", (req, res) => {
    res.render("index", {
        nome: "Arthur",
        texto: "Esta é uma demonstração"
    });
});



// Login - método POST
App.post("/login", async (req, res) => {
    try {
        const { usuario, senha } = req.body;

        if (!usuario || !senha) {
            return res.render("error", { mensagem: "Erro ao preencher o formulário" });
        }

        const [rows] = await connection.query(
            "SELECT * FROM a_usuarios WHERE Usuario = ? AND Senha = ?",
            [usuario, senha]
        );

        if (rows.length === 0) {
            return res.render("error", { mensagem: "Usuário ou senha errados" });
        }

        res.redirect("/page");
    } catch (error) {
        console.error("Erro no banco de dados:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
});

App.get("/page", (req, res) => {
    res.render("teste.ejs")
})
