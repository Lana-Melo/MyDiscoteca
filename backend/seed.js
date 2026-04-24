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

async function upsertArtist(isni, artistData) {
    return Artist.findOneAndUpdate(
        { isni },
        { $set: artistData },
        { new: true, upsert: true, runValidators: true }
    );
}

async function upsertAlbum(mbdi, albumData) {
    return Album.findOneAndUpdate(
        { mbdi },
        { $set: albumData },
        { new: true, upsert: true, runValidators: true }
    );
}

const seedDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("Ligação bem sucedida ao MongoDB para povoamento.");

        console.log("A atualizar dados iniciais sem apagar referencias existentes.");

        // 1. Criar Artistas Solo
        const artist1 = await upsertArtist("0000000117226071", {
            isni: "0000000117226071",
            name: "Bruno Mars",
            imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Bruno%20Mars.jpg",
            yearStarted: 2004,
            type: "solo"
        });

        const artist2 = await upsertArtist("0000000455128183", {
            isni: "0000000455128183",
            name: "Anderson .Paak",
            imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Anderson%20.Paak.jpg",
            yearStarted: 2009,
            type: "solo"
        });

        // 2. Criar Grupo de Artistas
        const groupArtist = await upsertArtist("0000000502548122", {
            isni: "0000000502548122",
            name: "Silk Sonic",
            imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Silk%20Sonic.jpg",
            yearStarted: 2021,
            type: "group",
            members: [artist1._id, artist2._id]
        });

        // 3. Criar Álbuns associados ao Bruno Mars
        const album1 = await upsertAlbum("b3d1fbf7-dd1c-4119-a16e-58c2feb5bcb0", {
            mbdi: "b3d1fbf7-dd1c-4119-a16e-58c2feb5bcb0",
            title: "Doo-Wops & Hooligans",
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Bruno_Mars_-_Doo-Wops_%26_Hooligans.png/250px-Bruno_Mars_-_Doo-Wops_%26_Hooligans.png",
            releaseYear: 2010,
            type: "LP",
            artist: artist1._id
        });

        const album2 = await upsertAlbum("80ea43b7-2c32-4a79-9fb0-8ff1761ebe09", {
            mbdi: "80ea43b7-2c32-4a79-9fb0-8ff1761ebe09",
            title: "24K Magic",
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Bruno_Mars_-_24K_Magic_%28Official_Album_Cover%29.png/250px-Bruno_Mars_-_24K_Magic_%28Official_Album_Cover%29.png",
            releaseYear: 2016,
            type: "LP",
            artist: artist1._id
        });

        // 4. Criar Álbum associado ao Anderson .Paak
        const album3 = await upsertAlbum("59732510-a2ad-447d-bd8b-9cbdfef39f88", {
            mbdi: "59732510-a2ad-447d-bd8b-9cbdfef39f88",
            title: "Ventura",
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/5/57/Anderson_Paak_-_Ventura.png/250px-Anderson_Paak_-_Ventura.png",
            releaseYear: 2019,
            type: "LP",
            artist: artist2._id
        });

        // 5. Criar Álbum associado ao grupo
        const album4 = await upsertAlbum("5efd4506-bf30-4f3f-a5f0-0f7a5ef1df3e", {
            mbdi: "5efd4506-bf30-4f3f-a5f0-0f7a5ef1df3e",
            title: "An Evening with Silk Sonic",
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Silk_Sonic_-_An_Evening_with_Silk_Sonic.png/250px-Silk_Sonic_-_An_Evening_with_Silk_Sonic.png",
            releaseYear: 2021,
            type: "LP",
            artist: groupArtist._id
        });

        artist1.albums = [album1._id, album2._id];
        await artist1.save();

        artist2.albums = [album3._id];
        await artist2.save();

        groupArtist.members = [artist1._id, artist2._id];
        groupArtist.albums = [album4._id];
        await groupArtist.save();

        console.log("Base de dados povoada com sucesso!");

    } catch (error) {
        console.error("Erro ao povoar a base de dados:", error);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
        console.log("Desconectado do MongoDB.");
        process.exit(process.exitCode || 0);
    }
};

seedDatabase();
