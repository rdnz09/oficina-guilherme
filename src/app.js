const express = require('express');
const sequelize = require('./config/database');

const clienteRoutes = require('./routes/clienteRoutes');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(clienteRoutes);
app.use(authRoutes);

async function iniciarServidor() {
  try {
    await sequelize.authenticate();

    console.log('Conectado ao banco de dados');

    await sequelize.sync();

    console.log('Modelos sincronizados com o banco');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });

  } catch (erro) {
    console.error(
      'Erro ao iniciar o sistema:',
      erro.message
    );
  }
}

iniciarServidor();