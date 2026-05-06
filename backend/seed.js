// -----
// seed.js
// Script para popular a base de dados - Discografia de Michael Jackson
// -----

const { loadEnvFile } = require('node:process');
const fs = require('fs');
if (fs.existsSync('.env')) {
  loadEnvFile();
}

const mongoose = require('mongoose');
const Artist = require('./models/artistModel');
const Album = require('./models/albumModel');
const Song = require('./models/songModel');
const Track = require('./models/trackModel');
const PhysicalSupport = require('./models/physicalSupportModel');
const Version = require('./models/versionModel');

const DB_URI = process.env.DB_URI;

if (!DB_URI) {
    console.error("Erro: Variável de ambiente DB_URI não definida.");
    process.exit(1);
}

// ----- Funções auxiliares de upsert -----

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

async function upsertSong(isrcCode, songData) {
    return Song.findOneAndUpdate(
        { isrcCode },
        { $set: songData },
        { new: true, upsert: true, runValidators: true }
    );
}

async function upsertPhysicalSupport(albumId, type, supportData) {
    return PhysicalSupport.findOneAndUpdate(
        { album: albumId, type },
        { $set: supportData },
        { new: true, upsert: true, runValidators: true }
    );
}

async function upsertVersion(eanCode, versionData) {
    return Version.findOneAndUpdate(
        { eanCode },
        { $set: versionData },
        { new: true, upsert: true, runValidators: true }
    );
}

async function seedTracksForAlbum(album, songs) {
    const tracks = await Promise.all(
        songs.map((song, i) =>
            Track.findOneAndUpdate(
                { album: album._id, song: song._id },
                { $set: { sequentialNumber: i + 1, song: song._id, album: album._id } },
                { new: true, upsert: true, runValidators: true }
            )
        )
    );
    album.tracks = tracks.map(t => t._id);
    await album.save();
    return tracks;
}

// -----

/*
// ===== Seed anterior (comentado) =====

async function seedAlbumsForArtist(artist, albums) { ... }

const extraArtists = [
    { artist: { isni: "seed-eminem", name: "Eminem", ... }, albums: [...] },
    { artist: { isni: "seed-luiz-gonzaga", name: "Luiz Gonzaga", ... }, albums: [...] },
    { artist: { isni: "seed-quim-barreiros", name: "Quim Barreiros", ... }, albums: [...] },
    { artist: { isni: "seed-belchior", name: "Belchior", ... }, albums: [...] },
    { artist: { isni: "seed-caetano-veloso", name: "Caetano Veloso", ... }, albums: [...] },
    { artist: { isni: "seed-ice-spice", name: "Ice Spice", ... }, albums: [...] },
    { artist: { isni: "seed-skillet", name: "Skillet", ... }, albums: [...] },
    { artist: { isni: "seed-bloodlines", name: "Bloodlines", ... }, albums: [...] },
    { artist: { isni: "seed-baroes-da-pisadinha", name: "Baroes da Pisadinha", ... }, albums: [...] }
];

const seedDatabase = async () => {
    // Bruno Mars, Anderson .Paak, Silk Sonic + extraArtists
};

seedDatabase();
// ===== Fim da seed anterior =====
*/

// -----

const seedDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("Ligação bem sucedida ao MongoDB para povoamento.");

        // ----- Michael Jackson -----
        console.log("A criar artista: Michael Jackson...");
        const mj = await upsertArtist("0000000121707484", {
            isni: "0000000121707484",
            name: "Michael Jackson",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Michael_Jordan_in_2014.jpg/330px-Michael_Jordan_in_2014.jpg",
            yearStarted: 1964,
            type: "solo"
        });

        // ----- Off the Wall (1979) -----
        console.log("A criar álbum: Off the Wall...");
        const offTheWall = await upsertAlbum("seed-mj-off-the-wall", {
            mbdi: "seed-mj-off-the-wall",
            title: "Off the Wall",
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/90/Offthewall.jpg",
            releaseYear: 1979,
            type: "LP",
            artist: mj._id
        });

        const offTheWallSongs = [
            await upsertSong("USMJA7900001", { isrcCode: "USMJA7900001", title: "Don't Stop 'Til You Get Enough", duration: 365, artists: [mj._id] }),
            await upsertSong("USMJA7900002", { isrcCode: "USMJA7900002", title: "Rock with You", duration: 222, artists: [mj._id] }),
            await upsertSong("USMJA7900003", { isrcCode: "USMJA7900003", title: "Workin' Day and Night", duration: 314, artists: [mj._id] }),
            await upsertSong("USMJA7900004", { isrcCode: "USMJA7900004", title: "Get on the Floor", duration: 279, artists: [mj._id] }),
            await upsertSong("USMJA7900005", { isrcCode: "USMJA7900005", title: "Off the Wall", duration: 245, artists: [mj._id] }),
            await upsertSong("USMJA7900006", { isrcCode: "USMJA7900006", title: "Girlfriend", duration: 185, artists: [mj._id] }),
            await upsertSong("USMJA7900007", { isrcCode: "USMJA7900007", title: "She's Out of My Life", duration: 218, artists: [mj._id] }),
            await upsertSong("USMJA7900008", { isrcCode: "USMJA7900008", title: "I Can't Help It", duration: 269, artists: [mj._id] }),
            await upsertSong("USMJA7900009", { isrcCode: "USMJA7900009", title: "It's the Falling in Love", duration: 229, artists: [mj._id] }),
            await upsertSong("USMJA7900010", { isrcCode: "USMJA7900010", title: "Burn This Disco Out", duration: 220, artists: [mj._id] })
        ];

        await seedTracksForAlbum(offTheWall, offTheWallSongs);

        // ----- Thriller (1982) -----
        console.log("A criar álbum: Thriller...");
        const thriller = await upsertAlbum("seed-mj-thriller", {
            mbdi: "seed-mj-thriller",
            title: "Thriller",
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png",
            releaseYear: 1982,
            type: "LP",
            artist: mj._id
        });

        const thrillerSongs = [
            await upsertSong("USMJA8200001", { isrcCode: "USMJA8200001", title: "Wanna Be Startin' Somethin'", duration: 363, artists: [mj._id] }),
            await upsertSong("USMJA8200002", { isrcCode: "USMJA8200002", title: "Baby Be Mine", duration: 260, artists: [mj._id] }),
            await upsertSong("USMJA8200003", { isrcCode: "USMJA8200003", title: "The Girl Is Mine", duration: 222, artists: [mj._id] }),
            await upsertSong("USMJA8200004", { isrcCode: "USMJA8200004", title: "Thriller", duration: 357, artists: [mj._id] }),
            await upsertSong("USMJA8200005", { isrcCode: "USMJA8200005", title: "Beat It", duration: 258, artists: [mj._id] }),
            await upsertSong("USMJA8200006", { isrcCode: "USMJA8200006", title: "Billie Jean", duration: 294, artists: [mj._id] }),
            await upsertSong("USMJA8200007", { isrcCode: "USMJA8200007", title: "Human Nature", duration: 246, artists: [mj._id] }),
            await upsertSong("USMJA8200008", { isrcCode: "USMJA8200008", title: "P.Y.T. (Pretty Young Thing)", duration: 239, artists: [mj._id] }),
            await upsertSong("USMJA8200009", { isrcCode: "USMJA8200009", title: "The Lady in My Life", duration: 299, artists: [mj._id] })
        ];

        await seedTracksForAlbum(thriller, thrillerSongs);

        // Thriller - Suportes Físicos
        console.log("A criar suportes físicos do Thriller...");

        const thrillerVinyl = await upsertPhysicalSupport(thriller._id, "Vinyl", {
            type: "Vinyl",
            album: thriller._id
        });
        const thrillerVinylVersions = [
            await upsertVersion("5099750441121", { eanCode: "5099750441121", designation: "Original 1982 Black Vinyl", physicalSupport: thrillerVinyl._id }),
            await upsertVersion("0886973266625", { eanCode: "0886973266625", designation: "25th Anniversary Edition Vinyl", physicalSupport: thrillerVinyl._id })
        ];
        thrillerVinyl.versions = thrillerVinylVersions.map(v => v._id);
        await thrillerVinyl.save();

        const thrillerCD = await upsertPhysicalSupport(thriller._id, "CD", {
            type: "CD",
            album: thriller._id
        });
        const thrillerCDVersions = [
            await upsertVersion("5099750441138", { eanCode: "5099750441138", designation: "Original 1982 CD", physicalSupport: thrillerCD._id }),
            await upsertVersion("5099750490228", { eanCode: "5099750490228", designation: "2001 Special Edition CD", physicalSupport: thrillerCD._id })
        ];
        thrillerCD.versions = thrillerCDVersions.map(v => v._id);
        await thrillerCD.save();

        thriller.physicalSupports = [thrillerVinyl._id, thrillerCD._id];
        await thriller.save();

        // ----- Bad (1987) -----
        console.log("A criar álbum: Bad...");
        const bad = await upsertAlbum("seed-mj-bad", {
            mbdi: "seed-mj-bad",
            title: "Bad",
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/5/51/Michael_Jackson_-_Bad.png",
            releaseYear: 1987,
            type: "LP",
            artist: mj._id
        });

        const badSongs = [
            await upsertSong("USMJA8700001", { isrcCode: "USMJA8700001", title: "Bad", duration: 247, artists: [mj._id] }),
            await upsertSong("USMJA8700002", { isrcCode: "USMJA8700002", title: "The Way You Make Me Feel", duration: 299, artists: [mj._id] }),
            await upsertSong("USMJA8700003", { isrcCode: "USMJA8700003", title: "Speed Demon", duration: 241, artists: [mj._id] }),
            await upsertSong("USMJA8700004", { isrcCode: "USMJA8700004", title: "Liberian Girl", duration: 232, artists: [mj._id] }),
            await upsertSong("USMJA8700005", { isrcCode: "USMJA8700005", title: "Just Good Friends", duration: 250, artists: [mj._id] }),
            await upsertSong("USMJA8700006", { isrcCode: "USMJA8700006", title: "Another Part of Me", duration: 232, artists: [mj._id] }),
            await upsertSong("USMJA8700007", { isrcCode: "USMJA8700007", title: "Man in the Mirror", duration: 319, artists: [mj._id] }),
            await upsertSong("USMJA8700008", { isrcCode: "USMJA8700008", title: "I Just Can't Stop Loving You", duration: 252, artists: [mj._id] }),
            await upsertSong("USMJA8700009", { isrcCode: "USMJA8700009", title: "Dirty Diana", duration: 281, artists: [mj._id] }),
            await upsertSong("USMJA8700010", { isrcCode: "USMJA8700010", title: "Smooth Criminal", duration: 257, artists: [mj._id] }),
            await upsertSong("USMJA8700011", { isrcCode: "USMJA8700011", title: "Leave Me Alone", duration: 279, artists: [mj._id] })
        ];

        await seedTracksForAlbum(bad, badSongs);

        // Bad - Suportes Físicos
        console.log("A criar suportes físicos do Bad...");

        const badVinyl = await upsertPhysicalSupport(bad._id, "Vinyl", {
            type: "Vinyl",
            album: bad._id
        });
        const badVinylVersions = [
            await upsertVersion("5099747032318", { eanCode: "5099747032318", designation: "Original 1987 Black Vinyl", physicalSupport: badVinyl._id }),
            await upsertVersion("5099747032820", { eanCode: "5099747032820", designation: "2001 Special Edition Vinyl", physicalSupport: badVinyl._id })
        ];
        badVinyl.versions = badVinylVersions.map(v => v._id);
        await badVinyl.save();

        const badCD = await upsertPhysicalSupport(bad._id, "CD", {
            type: "CD",
            album: bad._id
        });
        const badCDVersions = [
            await upsertVersion("5099747032325", { eanCode: "5099747032325", designation: "Original 1987 CD", physicalSupport: badCD._id })
        ];
        badCD.versions = badCDVersions.map(v => v._id);
        await badCD.save();

        bad.physicalSupports = [badVinyl._id, badCD._id];
        await bad.save();

        // ----- Dangerous (1991) -----
        console.log("A criar álbum: Dangerous...");
        const dangerous = await upsertAlbum("seed-mj-dangerous", {
            mbdi: "seed-mj-dangerous",
            title: "Dangerous",
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/90/Dangerous.png",
            releaseYear: 1991,
            type: "LP",
            artist: mj._id
        });

        const dangerousSongs = [
            await upsertSong("USMJA9100001", { isrcCode: "USMJA9100001", title: "Jam", duration: 365, artists: [mj._id] }),
            await upsertSong("USMJA9100002", { isrcCode: "USMJA9100002", title: "Why You Wanna Trip on Me", duration: 302, artists: [mj._id] }),
            await upsertSong("USMJA9100003", { isrcCode: "USMJA9100003", title: "In the Closet", duration: 392, artists: [mj._id] }),
            await upsertSong("USMJA9100004", { isrcCode: "USMJA9100004", title: "She Drives Me Wild", duration: 238, artists: [mj._id] }),
            await upsertSong("USMJA9100005", { isrcCode: "USMJA9100005", title: "Remember the Time", duration: 244, artists: [mj._id] }),
            await upsertSong("USMJA9100006", { isrcCode: "USMJA9100006", title: "Can't Let Her Get Away", duration: 299, artists: [mj._id] }),
            await upsertSong("USMJA9100007", { isrcCode: "USMJA9100007", title: "Heal the World", duration: 385, artists: [mj._id] }),
            await upsertSong("USMJA9100008", { isrcCode: "USMJA9100008", title: "Black or White", duration: 253, artists: [mj._id] }),
            await upsertSong("USMJA9100009", { isrcCode: "USMJA9100009", title: "Who Is It", duration: 396, artists: [mj._id] }),
            await upsertSong("USMJA9100010", { isrcCode: "USMJA9100010", title: "Give In to Me", duration: 329, artists: [mj._id] }),
            await upsertSong("USMJA9100011", { isrcCode: "USMJA9100011", title: "Will You Be There", duration: 462, artists: [mj._id] }),
            await upsertSong("USMJA9100012", { isrcCode: "USMJA9100012", title: "Keep the Faith", duration: 358, artists: [mj._id] }),
            await upsertSong("USMJA9100013", { isrcCode: "USMJA9100013", title: "Gone Too Soon", duration: 179, artists: [mj._id] }),
            await upsertSong("USMJA9100014", { isrcCode: "USMJA9100014", title: "Dangerous", duration: 420, artists: [mj._id] })
        ];

        await seedTracksForAlbum(dangerous, dangerousSongs);

        // ----- Invincible (2001) -----
        console.log("A criar álbum: Invincible...");
        const invincible = await upsertAlbum("seed-mj-invincible", {
            mbdi: "seed-mj-invincible",
            title: "Invincible",
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/98/Michael_Jackson_-_Invincible.png",
            releaseYear: 2001,
            type: "LP",
            artist: mj._id
        });

        const invincibleSongs = [
            await upsertSong("USMJA0100001", { isrcCode: "USMJA0100001", title: "Unbreakable", duration: 386, artists: [mj._id] }),
            await upsertSong("USMJA0100002", { isrcCode: "USMJA0100002", title: "Heartbreaker", duration: 310, artists: [mj._id] }),
            await upsertSong("USMJA0100003", { isrcCode: "USMJA0100003", title: "Invincible", duration: 287, artists: [mj._id] }),
            await upsertSong("USMJA0100004", { isrcCode: "USMJA0100004", title: "Break of Dawn", duration: 325, artists: [mj._id] }),
            await upsertSong("USMJA0100005", { isrcCode: "USMJA0100005", title: "Heaven Can Wait", duration: 296, artists: [mj._id] }),
            await upsertSong("USMJA0100006", { isrcCode: "USMJA0100006", title: "You Rock My World", duration: 341, artists: [mj._id] }),
            await upsertSong("USMJA0100007", { isrcCode: "USMJA0100007", title: "Butterflies", duration: 278, artists: [mj._id] }),
            await upsertSong("USMJA0100008", { isrcCode: "USMJA0100008", title: "Speechless", duration: 197, artists: [mj._id] }),
            await upsertSong("USMJA0100009", { isrcCode: "USMJA0100009", title: "2000 Watts", duration: 284, artists: [mj._id] }),
            await upsertSong("USMJA0100010", { isrcCode: "USMJA0100010", title: "You Are My Life", duration: 274, artists: [mj._id] }),
            await upsertSong("USMJA0100011", { isrcCode: "USMJA0100011", title: "Privacy", duration: 300, artists: [mj._id] }),
            await upsertSong("USMJA0100012", { isrcCode: "USMJA0100012", title: "Don't Walk Away", duration: 265, artists: [mj._id] }),
            await upsertSong("USMJA0100013", { isrcCode: "USMJA0100013", title: "Cry", duration: 299, artists: [mj._id] }),
            await upsertSong("USMJA0100014", { isrcCode: "USMJA0100014", title: "The Lost Children", duration: 238, artists: [mj._id] }),
            await upsertSong("USMJA0100015", { isrcCode: "USMJA0100015", title: "Whatever Happens", duration: 299, artists: [mj._id] }),
            await upsertSong("USMJA0100016", { isrcCode: "USMJA0100016", title: "Threatened", duration: 261, artists: [mj._id] })
        ];

        await seedTracksForAlbum(invincible, invincibleSongs);

        // ----- Atualizar artista com todos os álbuns -----
        mj.albums = [offTheWall._id, thriller._id, bad._id, dangerous._id, invincible._id];
        await mj.save();

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
