// -----
// seed.js
// Script para popular a base de dados com Artistas e Álbuns
// -----

const { loadEnvFile } = require('node:process');
const fs = require('fs');
if (fs.existsSync('.env')) {
  loadEnvFile();
}

const mongoose = require('mongoose');
const Artist = require('./models/artistModel');
const Album = require('./models/albumModel');

const DB_URI = process.env.DB_URI;

if (!DB_URI) {
    console.error("Erro: Variável de ambiente DB_URI não definida.");
    process.exit(1);
}

const seedDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("Ligação bem sucedida ao MongoDB para povoamento.");

        // Limpar as coleções existentes
        await Artist.deleteMany({});
        await Album.deleteMany({});
        console.log("Coleções limpas.");

        // 1. Criar Artistas Solo
        const artist1 = new Artist({
            isni: "0000000100000001",
            name: "John Doe",
            yearStarted: 2010,
            type: "solo"
        });
        await artist1.save();

        const artist2 = new Artist({
            isni: "0000000100000002",
            name: "Jane Smith",
            yearStarted: 2015,
            type: "solo"
        });
        await artist2.save();

        // 2. Criar Grupo de Artistas
        const groupArtist = new Artist({
            isni: "0000000100000003",
            name: "The Doe Smiths",
            yearStarted: 2018,
            type: "group",
            members: [artist1._id, artist2._id]
        });
        await groupArtist.save();

        // 3. Criar Álbuns associados ao artista solo 1
        const album1 = new Album({
            mbdi: "mbdi-1111-2222-3333-4444",
            title: "First Steps",
            releaseYear: 2012,
            type: "LP",
            artist: artist1._id
        });
        await album1.save();
        artist1.albums.push(album1._id);

        const album2 = new Album({
            mbdi: "mbdi-5555-6666-7777-8888",
            title: "Solo Hit",
            releaseYear: 2014,
            type: "single",
            artist: artist1._id
        });
        await album2.save();
        artist1.albums.push(album2._id);
        
        await artist1.save();

        // 4. Criar Álbum associado ao grupo
        const album3 = new Album({
            mbdi: "mbdi-9999-0000-aaaa-bbbb",
            title: "Together At Last",
            releaseYear: 2019,
            type: "EP",
            artist: groupArtist._id
        });
        await album3.save();
        groupArtist.albums.push(album3._id);
        await groupArtist.save();

        // 5. Criar Álbum sem artista associado
        const album4 = new Album({
            mbdi: "mbdi-cccc-dddd-eeee-ffff",
            title: "Unknown Origins",
            releaseYear: 2023,
            type: "LP"
            // artist é opcional
        });
        await album4.save();

        console.log("Base de dados povoada com sucesso!");

    } catch (error) {
        console.error("Erro ao povoar a base de dados:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Desconectado do MongoDB.");
        process.exit(0);
    }
};

seedDatabase();
