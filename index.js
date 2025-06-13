const express = require('express');
const sequelize = require('./config/database');
const CursoRoutes = require('./src/routes/CursoRoutes');
const UsuarioRoutes = require('./src/routes/UsuarioRoutes');
const AuthRoutes = require('./src/routes/AuthRoutes');
const RootRoutes = require('./src/routes/RootRoutes');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser()); // Add this line

app.use('/cursos', CursoRoutes);
app.use('/usuarios', UsuarioRoutes);
app.use('/login', AuthRoutes);
app.use('/', RootRoutes);

sequelize.sync().then(() => {
    console.log("Banco de dados sincronizado com sucesso!");
    app.listen(3000, ()=> console.log("Servidor rodando na porta 3000"));
}).catch(err => console.error("Erro ao conectar com banco de dados", err));