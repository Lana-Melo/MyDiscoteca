// -----
// server.js
// -----

// Para carregar valores de variáveis definidas no ficheiro .env.
const { loadEnvFile } = require('node:process');
const fs = require('fs');
if (fs.existsSync('.env')) {
  loadEnvFile();
}

// -----

// Para criar o servidor e suportar a programação da API.
const express = require('express');
const path = require('path');

// Para interagir com a base de dados MongoDB.
const mongoose = require('mongoose');

// Regista os modelos da aplicacao no Mongoose durante o arranque.
require('./models');

// Para mostrar metadados de pedidos efetuados à API na consola.
const morgan = require('morgan');

// Para permitir que o frontend da aplicação web faça pedidos à API.
const cors = require('cors');

// Para tornar o servidor da API mais seguro usando cabeçalhos de HTTP.
const helmet = require('helmet');

// Para facilitar a extração de bearer tokens de pedidos à API.
const bearer = require('express-bearer-token');

// -----

// Porto de escuta de pedidos à API.
const PORT = Number(process.env.PORT);

// Configuração de acesso à base de dados MongoDB.
const DB_URI = process.env.DB_URI;

// -----

// Cria um servidor para a API da aplicação web (ainda não operacional).
const app = express();

// Formato mínimo de metadados sobre os pedidos recebidos pela API.
app.use(morgan('tiny'));

// Adiciona o cabeçalho Access-Control-Allow-Origin: *,
// para informar os browsers que podem fazer pedidos à
// API independentemente da origem do frontend.
app.use(cors());

// Manipula cabeçalhos HTTP relacionados com a segurança do
// servidor da API, retirando, por exemplo, um cabeçalho que
// permitiria determinar que o servidor usa Express.
app.use(helmet());

// Extrai o bearer token (caso exista) de cada pedido à API e
// disponibiliza-o de forma conveniente à aplicação web.
app.use(bearer());

// Configura o servidor para processar pedidos com o cabeçalho
// Content-Type: application/json, isto é, com dados no formato JSON.
app.use(express.json());

app.use('/api/media', express.static(path.join(__dirname, 'public', 'media')));

// -----

// Processamento de um pedido com método GET associado à rota '/'.
// O parâmetro 'req' do callback dá acesso aos dados do pedido,
// enquanto o 'res' permite compor a resposta ao cliente.
app.get('/home', (req, res) => {
    const name = req.body.name;
  res.send(`Olá, ${name}. A API está a funcionar!`);
});

// -----

// Importar as rotas que a API expõe sobre artistas
const artistRoutes = require('./routes/artistRoutes');

// As rotas sobre artistas têm todas o prefixo /api/artists.
app.use('/api/artists', artistRoutes);

// Importar as rotas que a API expõe sobre autenticacao
const authRoutes = require('./routes/authRoutes');

// As rotas sobre autenticacao têm todas o prefixo /api/auth.
app.use('/api/auth', authRoutes);

// Importar as rotas que a API expõe sobre utilizadores
const userRoutes = require('./routes/userRoutes');

// As rotas sobre utilizadores têm todas o prefixo /api/users.
app.use('/api/users', userRoutes);
// Importar as rotas que a API expõe sobre álbuns
const albumRoutes = require('./routes/albumRoutes');

// As rotas sobre álbuns têm todas o prefixo /api/albums.
app.use('/api/albums', albumRoutes);

const contributionRoutes = require('./routes/contributionRoutes');

app.use('/api/contributions', contributionRoutes);

const notificationRoutes = require('./routes/notificationRoutes');

app.use('/api/notifications', notificationRoutes);

// -----

// Faz a ligação à base de dados MongoDB.
// Se correr bem, fica então operacional o servidor da API.
(async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Ligação bem sucedida ao MongoDB.");

    // O servidor da API está em condições de ficar operacional.
    app.listen(PORT, () => {
      console.log(`O servidor da API está à escuta no porto ${PORT}.`);
    });
  } catch (error) {
    console.log("Falha na ligação ao MongoDB: ", error.message);
  }
})();

// -----
