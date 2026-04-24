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

async function seedAlbumsForArtist(artist, albums) {
    const savedAlbums = [];

    for (const album of albums) {
        const savedAlbum = await upsertAlbum(album.mbdi, {
            ...album,
            artist: artist._id
        });

        savedAlbums.push(savedAlbum);
    }

    artist.albums = savedAlbums.map((album) => album._id);
    await artist.save();
    return savedAlbums;
}

const extraArtists = [
    {
        artist: {
            isni: "seed-eminem",
            name: "Eminem",
            imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Eminem_2021_Color_Corrected.jpg",
            yearStarted: 1988,
            type: "solo"
        },
        albums: [
            {
                mbdi: "seed-eminem-the-slim-shady-lp",
                title: "The Slim Shady LP",
                imageUrl: "https://upload.wikimedia.org/wikipedia/en/3/35/Eminem_-_The_Slim_Shady_LP_CD_cover.jpg",
                releaseYear: 1999,
                type: "LP"
            },
            {
                mbdi: "seed-eminem-the-marshall-mathers-lp",
                title: "The Marshall Mathers LP",
                imageUrl: "https://upload.wikimedia.org/wikipedia/en/a/ae/The_Marshall_Mathers_LP.jpg",
                releaseYear: 2000,
                type: "LP"
            },
            {
                mbdi: "seed-eminem-the-eminem-show",
                title: "The Eminem Show",
                imageUrl: "https://upload.wikimedia.org/wikipedia/en/3/35/The_Eminem_Show.jpg",
                releaseYear: 2002,
                type: "LP"
            },
            {
                mbdi: "seed-eminem-recovery",
                title: "Recovery",
                imageUrl: "https://upload.wikimedia.org/wikipedia/en/6/60/Recovery_Album_Cover.jpg",
                releaseYear: 2010,
                type: "LP"
            },
            {
                mbdi: "seed-eminem-music-to-be-murdered-by",
                title: "Music to Be Murdered By",
                imageUrl: "https://upload.wikimedia.org/wikipedia/en/8/80/Eminem_-_Music_to_Be_Murdered_By.png",
                releaseYear: 2020,
                type: "LP"
            }
        ]
    },
    {
        artist: {
            isni: "seed-luiz-gonzaga",
            name: "Luiz Gonzaga",
            imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Luiz_Gonzaga_(1957).jpg",
            yearStarted: 1941,
            type: "solo"
        },
        albums: [
            {
                mbdi: "seed-luiz-gonzaga-luiz-gonzaga-canta-seus-sucessos",
                title: "Luiz Gonzaga Canta Seus Sucessos",
                imageUrl: "/api/media/placeholders/album.svg",
                releaseYear: 1958,
                type: "LP"
            },
            {
                mbdi: "seed-luiz-gonzaga-o-rei-do-baiao",
                title: "O Rei do Baiao",
                imageUrl: "/api/media/placeholders/album.svg",
                releaseYear: 1961,
                type: "LP"
            },
            {
                mbdi: "seed-luiz-gonzaga-a-triste-partida",
                title: "A Triste Partida",
                imageUrl: "/api/media/placeholders/album.svg",
                releaseYear: 1964,
                type: "LP"
            },
            {
                mbdi: "seed-luiz-gonzaga-sanfona-do-povo",
                title: "Sanfona do Povo",
                imageUrl: "/api/media/placeholders/album.svg",
                releaseYear: 1964,
                type: "LP"
            }
        ]
    },
    {
        artist: {
            isni: "seed-quim-barreiros",
            name: "Quim Barreiros",
            imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Quim_Barreiros_no_Pereiro_-_2008.jpg",
            yearStarted: 1971,
            type: "solo"
        },
        albums: [
            {
                mbdi: "seed-quim-barreiros-bacalhau-a-portuguesa",
                title: "Bacalhau a Portuguesa",
                imageUrl: "/api/media/placeholders/album.svg",
                releaseYear: 1986,
                type: "LP"
            },
            {
                mbdi: "seed-quim-barreiros-mestre-de-culinaria",
                title: "Mestre de Culinaria",
                imageUrl: "/api/media/placeholders/album.svg",
                releaseYear: 1991,
                type: "LP"
            },
            {
                mbdi: "seed-quim-barreiros-a-garagem-da-vizinha",
                title: "A Garagem da Vizinha",
                imageUrl: "/api/media/placeholders/album.svg",
                releaseYear: 2000,
                type: "LP"
            },
            {
                mbdi: "seed-quim-barreiros-o-melhor-de-quim-barreiros",
                title: "O Melhor de Quim Barreiros",
                imageUrl: "/api/media/placeholders/album.svg",
                releaseYear: 2002,
                type: "LP"
            }
        ]
    },
    {
        artist: {
            isni: "seed-belchior",
            name: "Belchior",
            imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Belchior.jpg",
            yearStarted: 1971,
            type: "solo"
        },
        albums: [
            {
                mbdi: "seed-belchior-mote-e-glosa",
                title: "Mote e Glosa",
                imageUrl: "https://upload.wikimedia.org/wikipedia/pt/1/12/Mote_e_Glosa.jpg",
                releaseYear: 1974,
                type: "LP"
            },
            {
                mbdi: "seed-belchior-alucinacao",
                title: "Alucinacao",
                imageUrl: "https://upload.wikimedia.org/wikipedia/pt/3/38/Alucina%C3%A7%C3%A3o.jpg",
                releaseYear: 1976,
                type: "LP"
            },
            {
                mbdi: "seed-belchior-coracao-selvagem",
                title: "Coracao Selvagem",
                imageUrl: "https://upload.wikimedia.org/wikipedia/pt/5/5a/Cora%C3%A7%C3%A3o_Selvagem.jpg",
                releaseYear: 1977,
                type: "LP"
            },
            {
                mbdi: "seed-belchior-todos-os-sentidos",
                title: "Todos os Sentidos",
                imageUrl: "/api/media/placeholders/album.svg",
                releaseYear: 1978,
                type: "LP"
            },
            {
                mbdi: "seed-belchior-era-uma-vez-um-homem",
                title: "Era uma Vez um Homem e o seu Tempo",
                imageUrl: "/api/media/placeholders/album.svg",
                releaseYear: 1979,
                type: "LP"
            }
        ]
    },
    {
        artist: {
            isni: "seed-caetano-veloso",
            name: "Caetano Veloso",
            imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Caetano_Veloso_(cropped).jpg",
            yearStarted: 1965,
            type: "solo"
        },
        albums: [
            {
                mbdi: "seed-caetano-veloso-caetano-veloso-1968",
                title: "Caetano Veloso",
                imageUrl: "https://upload.wikimedia.org/wikipedia/pt/4/40/Caetano_Veloso_%281968%29.jpg",
                releaseYear: 1968,
                type: "LP"
            },
            {
                mbdi: "seed-caetano-veloso-transa",
                title: "Transa",
                imageUrl: "https://upload.wikimedia.org/wikipedia/pt/e/e5/Transa.jpg",
                releaseYear: 1972,
                type: "LP"
            },
            {
                mbdi: "seed-caetano-veloso-bicho",
                title: "Bicho",
                imageUrl: "https://upload.wikimedia.org/wikipedia/pt/0/02/Bicho_caetano_veloso.jpg",
                releaseYear: 1977,
                type: "LP"
            },
            {
                mbdi: "seed-caetano-veloso-livro",
                title: "Livro",
                imageUrl: "https://upload.wikimedia.org/wikipedia/pt/f/f7/Livro_Caetano_Veloso.jpg",
                releaseYear: 1997,
                type: "LP"
            },
            {
                mbdi: "seed-caetano-veloso-abracaco",
                title: "Abracaco",
                imageUrl: "https://upload.wikimedia.org/wikipedia/pt/9/9d/Abra%C3%A7a%C3%A7o.jpg",
                releaseYear: 2012,
                type: "LP"
            }
        ]
    },
    {
        artist: {
            isni: "seed-ice-spice",
            name: "Ice Spice",
            imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Ice_Spice,_2024_2.jpg",
            yearStarted: 2021,
            type: "solo"
        },
        albums: [
            {
                mbdi: "seed-ice-spice-like",
                title: "Like..?",
                imageUrl: "https://upload.wikimedia.org/wikipedia/en/3/3e/Ice_Spice_-_Like..%3F.png",
                releaseYear: 2023,
                type: "EP"
            },
            {
                mbdi: "seed-ice-spice-y2k",
                title: "Y2K!",
                imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/96/Ice_Spice_-_Y2K%21.png",
                releaseYear: 2024,
                type: "LP"
            },
            {
                mbdi: "seed-ice-spice-y2k-im-just-a-girl",
                title: "Y2K!: I'm Just A Girl",
                imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/96/Ice_Spice_-_Y2K%21.png",
                releaseYear: 2024,
                type: "LP"
            }
        ]
    },
    {
        artist: {
            isni: "seed-skillet",
            name: "Skillet",
            imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Skillet_-_853537431.jpg",
            yearStarted: 1996,
            type: "group"
        },
        albums: [
            {
                mbdi: "seed-skillet-collide",
                title: "Collide",
                imageUrl: "https://upload.wikimedia.org/wikipedia/en/1/1b/Skillet_-_Collide.jpg",
                releaseYear: 2003,
                type: "LP"
            },
            {
                mbdi: "seed-skillet-comatose",
                title: "Comatose",
                imageUrl: "https://upload.wikimedia.org/wikipedia/en/0/07/Skilletcomatose.jpg",
                releaseYear: 2006,
                type: "LP"
            },
            {
                mbdi: "seed-skillet-awake",
                title: "Awake",
                imageUrl: "https://upload.wikimedia.org/wikipedia/en/c/cd/Skilletawake.jpg",
                releaseYear: 2009,
                type: "LP"
            },
            {
                mbdi: "seed-skillet-rise",
                title: "Rise",
                imageUrl: "https://upload.wikimedia.org/wikipedia/en/d/dd/Skillet_Rise.jpg",
                releaseYear: 2013,
                type: "LP"
            },
            {
                mbdi: "seed-skillet-unleashed",
                title: "Unleashed",
                imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/99/Skillet_Unleashed.jpg",
                releaseYear: 2016,
                type: "LP"
            }
        ]
    },
    {
        artist: {
            isni: "seed-bloodlines",
            name: "Bloodlines",
            imageUrl: "/api/media/placeholders/artist.svg",
            yearStarted: 2018,
            type: "group"
        },
        albums: [
            {
                mbdi: "seed-bloodlines-hevel",
                title: "Hevel",
                imageUrl: "/api/media/placeholders/album.svg",
                releaseYear: 2021,
                type: "EP"
            },
            {
                mbdi: "seed-bloodlines-holiness-cries",
                title: "Holiness Cries",
                imageUrl: "/api/media/placeholders/album.svg",
                releaseYear: 2023,
                type: "EP"
            },
            {
                mbdi: "seed-bloodlines-wake-the-dead",
                title: "Wake the Dead",
                imageUrl: "/api/media/placeholders/album.svg",
                releaseYear: 2024,
                type: "EP"
            }
        ]
    },
    {
        artist: {
            isni: "seed-baroes-da-pisadinha",
            name: "Baroes da Pisadinha",
            imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Show_%22Os_Bar%C3%B5es_da_Pisadinha%22_na_ExpoLondrina_2022.jpg",
            yearStarted: 2015,
            type: "group"
        },
        albums: [
            {
                mbdi: "seed-baroes-da-pisadinha-ao-vivo-em-sao-paulo",
                title: "Ao Vivo em Sao Paulo",
                imageUrl: "/api/media/placeholders/album.svg",
                releaseYear: 2019,
                type: "LP"
            },
            {
                mbdi: "seed-baroes-da-pisadinha-paredao-dos-baroes",
                title: "Paredao dos Baroes",
                imageUrl: "/api/media/placeholders/album.svg",
                releaseYear: 2020,
                type: "LP"
            },
            {
                mbdi: "seed-baroes-da-pisadinha-conquistas",
                title: "Conquistas",
                imageUrl: "/api/media/placeholders/album.svg",
                releaseYear: 2021,
                type: "LP"
            },
            {
                mbdi: "seed-baroes-da-pisadinha-da-roca-para-o-mundo",
                title: "Da Roca para o Mundo",
                imageUrl: "/api/media/placeholders/album.svg",
                releaseYear: 2022,
                type: "LP"
            }
        ]
    }
];

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

        for (const extraArtist of extraArtists) {
            const artist = await upsertArtist(extraArtist.artist.isni, extraArtist.artist);
            await seedAlbumsForArtist(artist, extraArtist.albums);
        }

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
