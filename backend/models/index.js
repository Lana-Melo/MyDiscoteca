// -----
// models/index.js
// -----

// Regista todos os modelos da aplicacao no Mongoose durante o arranque.
// Isto ajuda a manter a inicializacao do backend organizada e deixa os modelos
// prontos para serem usados pelos controllers e pelas referencias entre schemas.

require('./artistModel');
require('./albumModel');
require('./songModel');
require('./trackModel');
require('./physicalSupportModel');
require('./versionModel');
require('./userModel');
require('./albumCollectionModel');

// -----
