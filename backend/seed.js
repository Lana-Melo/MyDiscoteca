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
    const { artists = [], ...songFields } = songData;
    const update = { $set: songFields };

    if (artists.length > 0) {
        update.$addToSet = { artists: { $each: artists } };
    }

    return Song.findOneAndUpdate(
        { isrcCode },
        update,
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

function uniqueObjectIds(ids) {
    const seen = new Set();

    return ids.filter((id) => {
        if (!id) return false;

        const value = id.toString();
        if (seen.has(value)) return false;

        seen.add(value);
        return true;
    });
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

function commonsImage(fileName) {
    return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}`;
}

function wikipediaImage(fileName) {
    return `https://en.wikipedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}`;
}

async function seedPhysicalSupportsForAlbum(album, supports) {
    const physicalSupports = [];

    for (const support of supports) {
        const physicalSupport = await upsertPhysicalSupport(album._id, support.type, {
            type: support.type,
            album: album._id
        });

        const versions = await Promise.all(
            support.versions.map((version) =>
                upsertVersion(version.eanCode, {
                    ...version,
                    physicalSupport: physicalSupport._id
                })
            )
        );

        physicalSupport.versions = uniqueObjectIds([
            ...(physicalSupport.versions || []),
            ...versions.map(version => version._id)
        ]);
        await physicalSupport.save();
        physicalSupports.push(physicalSupport);
    }

    album.physicalSupports = uniqueObjectIds([
        ...(album.physicalSupports || []),
        ...physicalSupports.map(support => support._id)
    ]);
    await album.save();
}

async function seedAlbumForArtist(artist, albumData) {
    console.log(`A criar álbum: ${albumData.title}...`);

    const album = await upsertAlbum(albumData.mbdi, {
        mbdi: albumData.mbdi,
        title: albumData.title,
        imageUrl: albumData.imageUrl,
        releaseYear: albumData.releaseYear,
        type: albumData.type,
        artist: artist._id
    });

    const songs = await Promise.all(
        albumData.songs.map((song) =>
            upsertSong(song.isrcCode, {
                ...song,
                artists: [artist._id]
            })
        )
    );

    await seedTracksForAlbum(album, songs);
    await seedPhysicalSupportsForAlbum(album, albumData.supports || []);

    return album;
}

async function seedArtistCatalog(catalog) {
    const seededArtists = [];

    for (const artistData of catalog) {
        console.log(`A criar artista: ${artistData.name}...`);

        const artist = await upsertArtist(artistData.isni, {
            isni: artistData.isni,
            name: artistData.name,
            imageUrl: artistData.imageUrl,
            yearStarted: artistData.yearStarted,
            type: artistData.type,
            members: artistData.members || []
        });

        const albums = [];

        for (const albumData of artistData.albums) {
            albums.push(await seedAlbumForArtist(artist, albumData));
        }

        artist.albums = albums.map(album => album._id);
        await artist.save();
        seededArtists.push(artist);
    }

    return seededArtists;
}

async function assertSprint2SeedCoverage(seedMbdis) {
    const albums = await Album.find({ mbdi: { $in: seedMbdis } })
        .populate('artist', 'name')
        .populate({
            path: 'tracks',
            select: 'sequentialNumber song',
            populate: { path: 'song', select: 'title duration artists' }
        })
        .populate({
            path: 'physicalSupports',
            select: 'type versions',
            populate: { path: 'versions', select: 'eanCode designation' }
        });

    const foundMbdis = new Set(albums.map(album => album.mbdi));
    const problems = seedMbdis
        .filter(mbdi => !foundMbdis.has(mbdi))
        .map(mbdi => `Álbum seedado não encontrado: ${mbdi}`);

    let trackCount = 0;
    let versionCount = 0;

    for (const album of albums) {
        if (!album.artist) {
            problems.push(`${album.title}: sem artista associado ao álbum.`);
        }

        if (!album.tracks || album.tracks.length === 0) {
            problems.push(`${album.title}: sem tracks associadas ao álbum.`);
        }

        for (const track of album.tracks || []) {
            trackCount += 1;

            if (!track.song) {
                problems.push(`${album.title}: track #${track.sequentialNumber} sem song associada.`);
                continue;
            }

            if (!track.song.artists || track.song.artists.length === 0) {
                problems.push(`${album.title}: "${track.song.title}" sem artista associado à song.`);
            }
        }

        if (!album.physicalSupports || album.physicalSupports.length === 0) {
            problems.push(`${album.title}: sem suportes físicos/versões.`);
        }

        for (const support of album.physicalSupports || []) {
            if (!support.versions || support.versions.length === 0) {
                problems.push(`${album.title}: suporte ${support.type} sem versões.`);
            }

            versionCount += support.versions?.length || 0;
        }
    }

    if (problems.length > 0) {
        throw new Error(`Seed Sprint 2 incompleta:\n- ${problems.join('\n- ')}`);
    }

    console.log(
        `Seed Sprint 2 validada: ${albums.length} álbuns, ${trackCount} tracks, ${versionCount} versões.`
    );
}

const additionalCatalog = [
    {
        isni: "0000000114460345",
        name: "Rick Astley",
        imageUrl: commonsImage("Rick Astley Dallas.jpg"),
        yearStarted: 1985,
        type: "solo",
        albums: [
            {
                mbdi: "10000000-0000-4000-8000-000000000001",
                title: "Whenever You Need Somebody",
                imageUrl: wikipediaImage("Rick_Astley_-_Whenever_You_Need_Somebody.png"),
                releaseYear: 1987,
                type: "LP",
                songs: [
                    { isrcCode: "GBRAA8700001", title: "Never Gonna Give You Up", duration: 213 },
                    { isrcCode: "GBRAA8700002", title: "Whenever You Need Somebody", duration: 232 },
                    { isrcCode: "GBRAA8700003", title: "Together Forever", duration: 204 },
                    { isrcCode: "GBRAA8700004", title: "It Would Take a Strong Strong Man", duration: 219 },
                    { isrcCode: "GBRAA8700005", title: "When I Fall in Love", duration: 179 }
                ],
                supports: [
                    {
                        type: "Vinyl",
                        versions: [
                            { eanCode: "1000000000001", designation: "Original 1987 LP" },
                            { eanCode: "1000000000002", designation: "2022 Red Vinyl Remaster" }
                        ]
                    },
                    {
                        type: "CD",
                        versions: [
                            { eanCode: "1000000000003", designation: "2010 Expanded Remaster" }
                        ]
                    }
                ]
            },
            {
                mbdi: "10000000-0000-4000-8000-000000000002",
                title: "Hold Me in Your Arms",
                imageUrl: wikipediaImage("Hold_Me_in_Your_Arms_(Rick_Astley_album).jpg"),
                releaseYear: 1988,
                type: "LP",
                songs: [
                    { isrcCode: "GBRAA8800001", title: "She Wants to Dance with Me", duration: 194 },
                    { isrcCode: "GBRAA8800002", title: "Take Me to Your Heart", duration: 207 },
                    { isrcCode: "GBRAA8800003", title: "Giving Up on Love", duration: 241 },
                    { isrcCode: "GBRAA8800004", title: "Ain't Too Proud to Beg", duration: 259 },
                    { isrcCode: "GBRAA8800005", title: "Hold Me in Your Arms", duration: 272 }
                ],
                supports: [
                    {
                        type: "Vinyl",
                        versions: [
                            { eanCode: "1000000000004", designation: "Original 1988 LP" },
                            { eanCode: "1000000000005", designation: "2023 Blue Vinyl Remaster" }
                        ]
                    },
                    {
                        type: "CD",
                        versions: [
                            { eanCode: "1000000000006", designation: "2023 Double CD Remaster" }
                        ]
                    }
                ]
            }
        ]
    },
    {
        isni: "000000012146438X",
        name: "Daft Punk",
        imageUrl: commonsImage("Daft Punk in 2013.jpg"),
        yearStarted: 1993,
        type: "group",
        albums: [
            {
                mbdi: "10000000-0000-4000-8000-000000000003",
                title: "Homework",
                imageUrl: wikipediaImage("Daftpunk-homework.jpg"),
                releaseYear: 1997,
                type: "LP",
                songs: [
                    { isrcCode: "FRDPK9700001", title: "Daftendirekt", duration: 164 },
                    { isrcCode: "FRDPK9700002", title: "WDPK 83.7 FM", duration: 28 },
                    { isrcCode: "FRDPK9700003", title: "Revolution 909", duration: 326 },
                    { isrcCode: "FRDPK9700004", title: "Around the World", duration: 429 },
                    { isrcCode: "FRDPK9700005", title: "Da Funk", duration: 329 }
                ],
                supports: [
                    {
                        type: "Vinyl",
                        versions: [
                            { eanCode: "1000000000007", designation: "Original 1997 2xLP" }
                        ]
                    },
                    {
                        type: "CD",
                        versions: [
                            { eanCode: "1000000000008", designation: "Original 1997 CD" }
                        ]
                    }
                ]
            },
            {
                mbdi: "10000000-0000-4000-8000-000000000004",
                title: "Discovery",
                imageUrl: wikipediaImage("Daft_Punk_-_Discovery.png"),
                releaseYear: 2001,
                type: "LP",
                songs: [
                    { isrcCode: "FRDPK0100001", title: "One More Time", duration: 320 },
                    { isrcCode: "FRDPK0100002", title: "Aerodynamic", duration: 207 },
                    { isrcCode: "FRDPK0100003", title: "Digital Love", duration: 299 },
                    { isrcCode: "FRDPK0100004", title: "Harder, Better, Faster, Stronger", duration: 224 },
                    { isrcCode: "FRDPK0100005", title: "Something About Us", duration: 232 }
                ],
                supports: [
                    {
                        type: "Vinyl",
                        versions: [
                            { eanCode: "1000000000009", designation: "Original 2001 2xLP" }
                        ]
                    },
                    {
                        type: "CD",
                        versions: [
                            { eanCode: "1000000000010", designation: "Original 2001 CD" }
                        ]
                    }
                ]
            },
            {
                mbdi: "10000000-0000-4000-8000-000000000005",
                title: "Random Access Memories",
                imageUrl: wikipediaImage("Random_Access_Memories.jpg"),
                releaseYear: 2013,
                type: "LP",
                songs: [
                    { isrcCode: "FRDPK1300001", title: "Give Life Back to Music", duration: 275 },
                    { isrcCode: "FRDPK1300002", title: "The Game of Love", duration: 322 },
                    { isrcCode: "FRDPK1300003", title: "Giorgio by Moroder", duration: 544 },
                    { isrcCode: "FRDPK1300004", title: "Get Lucky", duration: 369 },
                    { isrcCode: "FRDPK1300005", title: "Contact", duration: 382 }
                ],
                supports: [
                    {
                        type: "Vinyl",
                        versions: [
                            { eanCode: "1000000000011", designation: "Original 2013 2xLP" },
                            { eanCode: "1000000000012", designation: "10th Anniversary Edition" }
                        ]
                    },
                    {
                        type: "CD",
                        versions: [
                            { eanCode: "1000000000013", designation: "Original 2013 CD" }
                        ]
                    }
                ]
            }
        ]
    },
    {
        isni: "0000000121753954",
        name: "The Beatles",
        imageUrl: commonsImage("The Beatles members at New York City in 1964.jpg"),
        yearStarted: 1960,
        type: "group",
        albums: [
            {
                mbdi: "10000000-0000-4000-8000-000000000006",
                title: "Abbey Road",
                imageUrl: wikipediaImage("Beatles_-_Abbey_Road.jpg"),
                releaseYear: 1969,
                type: "LP",
                songs: [
                    { isrcCode: "GBBTL6900001", title: "Come Together", duration: 259 },
                    { isrcCode: "GBBTL6900002", title: "Something", duration: 182 },
                    { isrcCode: "GBBTL6900003", title: "Maxwell's Silver Hammer", duration: 207 },
                    { isrcCode: "GBBTL6900004", title: "Here Comes the Sun", duration: 185 },
                    { isrcCode: "GBBTL6900005", title: "The End", duration: 140 }
                ],
                supports: [
                    {
                        type: "Vinyl",
                        versions: [
                            { eanCode: "1000000000014", designation: "Original 1969 LP" },
                            { eanCode: "1000000000015", designation: "50th Anniversary LP" }
                        ]
                    },
                    {
                        type: "CD",
                        versions: [
                            { eanCode: "1000000000016", designation: "2009 Stereo Remaster" }
                        ]
                    }
                ]
            },
            {
                mbdi: "10000000-0000-4000-8000-000000000007",
                title: "Let It Be",
                imageUrl: wikipediaImage("LetItBe.jpg"),
                releaseYear: 1970,
                type: "LP",
                songs: [
                    { isrcCode: "GBBTL7000001", title: "Two of Us", duration: 216 },
                    { isrcCode: "GBBTL7000002", title: "Across the Universe", duration: 228 },
                    { isrcCode: "GBBTL7000003", title: "Let It Be", duration: 243 },
                    { isrcCode: "GBBTL7000004", title: "I've Got a Feeling", duration: 218 },
                    { isrcCode: "GBBTL7000005", title: "Get Back", duration: 189 }
                ],
                supports: [
                    {
                        type: "Vinyl",
                        versions: [
                            { eanCode: "1000000000017", designation: "Original 1970 LP" }
                        ]
                    },
                    {
                        type: "CD",
                        versions: [
                            { eanCode: "1000000000018", designation: "2021 Special Edition" }
                        ]
                    }
                ]
            }
        ]
    },
    {
        isni: "0000000121458167",
        name: "Nirvana",
        imageUrl: commonsImage("Nirvana around 1992 (high quality) (cropped).jpg"),
        yearStarted: 1987,
        type: "group",
        albums: [
            {
                mbdi: "10000000-0000-4000-8000-000000000008",
                title: "Nevermind",
                imageUrl: wikipediaImage("NirvanaNevermindalbumcover.jpg"),
                releaseYear: 1991,
                type: "LP",
                songs: [
                    { isrcCode: "USNIR9100001", title: "Smells Like Teen Spirit", duration: 301 },
                    { isrcCode: "USNIR9100002", title: "In Bloom", duration: 255 },
                    { isrcCode: "USNIR9100003", title: "Come as You Are", duration: 219 },
                    { isrcCode: "USNIR9100004", title: "Lithium", duration: 257 },
                    { isrcCode: "USNIR9100005", title: "Something in the Way", duration: 232 }
                ],
                supports: [
                    {
                        type: "Vinyl",
                        versions: [
                            { eanCode: "1000000000019", designation: "Original 1991 LP" },
                            { eanCode: "1000000000020", designation: "30th Anniversary LP" }
                        ]
                    },
                    {
                        type: "CD",
                        versions: [
                            { eanCode: "1000000000021", designation: "Original 1991 CD" }
                        ]
                    }
                ]
            },
            {
                mbdi: "10000000-0000-4000-8000-000000000009",
                title: "In Utero",
                imageUrl: wikipediaImage("In_Utero_(Nirvana)_album_cover.jpg"),
                releaseYear: 1993,
                type: "LP",
                songs: [
                    { isrcCode: "USNIR9300001", title: "Serve the Servants", duration: 216 },
                    { isrcCode: "USNIR9300002", title: "Scentless Apprentice", duration: 228 },
                    { isrcCode: "USNIR9300003", title: "Heart-Shaped Box", duration: 281 },
                    { isrcCode: "USNIR9300004", title: "Rape Me", duration: 170 },
                    { isrcCode: "USNIR9300005", title: "All Apologies", duration: 230 }
                ],
                supports: [
                    {
                        type: "Vinyl",
                        versions: [
                            { eanCode: "1000000000022", designation: "Original 1993 LP" }
                        ]
                    },
                    {
                        type: "CD",
                        versions: [
                            { eanCode: "1000000000023", designation: "20th Anniversary CD" }
                        ]
                    }
                ]
            }
        ]
    },
    {
        isni: "seed-bloodlines",
        name: "Bloodlines",
        imageUrl: "https://facedownrecords.com/wp-content/uploads/2020/12/IG_Band.jpg",
        yearStarted: 2014,
        type: "group",
        albums: [
            {
                mbdi: "10000000-0000-4000-8000-000000000014",
                title: "HEVEL",
                imageUrl: "https://facedownrecords.com/wp-content/uploads/2021/09/FCD183_3000.jpg",
                releaseYear: 2021,
                type: "EP",
                songs: [
                    { isrcCode: "USBLL2100001", title: "Lotus", duration: 227 },
                    { isrcCode: "USBLL2100002", title: "Devil (ft. Brook Reeves)", duration: 257 },
                    { isrcCode: "USBLL2100003", title: "Colder", duration: 253 },
                    { isrcCode: "USBLL2100004", title: "Ruah", duration: 230 },
                    { isrcCode: "USBLL2100005", title: "Hevel", duration: 248 }
                ],
                supports: [
                    {
                        type: "Vinyl",
                        versions: [
                            { eanCode: "1000000000033", designation: "Gold Vinyl EP" }
                        ]
                    },
                    {
                        type: "CD",
                        versions: [
                            { eanCode: "1000000000034", designation: "Original CD EP" }
                        ]
                    }
                ]
            },
            {
                mbdi: "10000000-0000-4000-8000-000000000015",
                title: "Holiness Cries",
                imageUrl: "https://facedownrecords.com/wp-content/uploads/2024/06/FCD197_1500.jpg",
                releaseYear: 2024,
                type: "EP",
                songs: [
                    { isrcCode: "USBLL2400001", title: "Come & Die", duration: 233 },
                    { isrcCode: "USBLL2400002", title: "Holiness Cries", duration: 237 },
                    { isrcCode: "USBLL2400003", title: "Psalm of the Depths", duration: 235 },
                    { isrcCode: "USBLL2400004", title: ".IMG", duration: 222 },
                    { isrcCode: "USBLL2400005", title: "Holy", duration: 260 }
                ],
                supports: [
                    {
                        type: "Vinyl",
                        versions: [
                            { eanCode: "1000000000035", designation: "Onyx Vinyl EP" }
                        ]
                    },
                    {
                        type: "CD",
                        versions: [
                            { eanCode: "1000000000036", designation: "Original CD EP" }
                        ]
                    }
                ]
            }
        ]
    },
    {
        isni: "0000000115681224",
        name: "Taylor Swift",
        imageUrl: commonsImage("Taylor Swift (52791470537).jpg"),
        yearStarted: 2004,
        type: "solo",
        albums: [
            {
                mbdi: "10000000-0000-4000-8000-000000000010",
                title: "1989",
                imageUrl: wikipediaImage("Taylor_Swift_-_1989.png"),
                releaseYear: 2014,
                type: "LP",
                songs: [
                    { isrcCode: "USTSW1400001", title: "Welcome to New York", duration: 212 },
                    { isrcCode: "USTSW1400002", title: "Blank Space", duration: 231 },
                    { isrcCode: "USTSW1400003", title: "Style", duration: 231 },
                    { isrcCode: "USTSW1400004", title: "Out of the Woods", duration: 235 },
                    { isrcCode: "USTSW1400005", title: "Shake It Off", duration: 219 }
                ],
                supports: [
                    {
                        type: "Vinyl",
                        versions: [
                            { eanCode: "1000000000024", designation: "Original 2014 2xLP" },
                            { eanCode: "1000000000025", designation: "Taylor's Version Blue Vinyl" }
                        ]
                    },
                    {
                        type: "CD",
                        versions: [
                            { eanCode: "1000000000026", designation: "Original 2014 CD" }
                        ]
                    }
                ]
            },
            {
                mbdi: "10000000-0000-4000-8000-000000000011",
                title: "Folklore",
                imageUrl: wikipediaImage("Taylor_Swift_-_Folklore.png"),
                releaseYear: 2020,
                type: "LP",
                songs: [
                    { isrcCode: "USTSW2000001", title: "The 1", duration: 210 },
                    { isrcCode: "USTSW2000002", title: "Cardigan", duration: 239 },
                    { isrcCode: "USTSW2000003", title: "The Last Great American Dynasty", duration: 231 },
                    { isrcCode: "USTSW2000004", title: "Exile", duration: 285 },
                    { isrcCode: "USTSW2000005", title: "August", duration: 261 }
                ],
                supports: [
                    {
                        type: "Vinyl",
                        versions: [
                            { eanCode: "1000000000027", designation: "In the Trees Vinyl Edition" }
                        ]
                    },
                    {
                        type: "CD",
                        versions: [
                            { eanCode: "1000000000028", designation: "Original 2020 CD" }
                        ]
                    }
                ]
            }
        ]
    },
    {
        isni: "0000000115203819",
        name: "Beyoncé",
        imageUrl: commonsImage("Beyonce 2016.jpg"),
        yearStarted: 1997,
        type: "solo",
        albums: [
            {
                mbdi: "10000000-0000-4000-8000-000000000012",
                title: "Lemonade",
                imageUrl: wikipediaImage("Beyoncé_-_Lemonade_(Official_Album_Cover).png"),
                releaseYear: 2016,
                type: "LP",
                songs: [
                    { isrcCode: "USBEY1600001", title: "Pray You Catch Me", duration: 196 },
                    { isrcCode: "USBEY1600002", title: "Hold Up", duration: 221 },
                    { isrcCode: "USBEY1600003", title: "Don't Hurt Yourself", duration: 234 },
                    { isrcCode: "USBEY1600004", title: "Sorry", duration: 233 },
                    { isrcCode: "USBEY1600005", title: "Formation", duration: 206 }
                ],
                supports: [
                    {
                        type: "Vinyl",
                        versions: [
                            { eanCode: "1000000000029", designation: "Yellow Vinyl Edition" }
                        ]
                    },
                    {
                        type: "CD",
                        versions: [
                            { eanCode: "1000000000030", designation: "CD + DVD Edition" }
                        ]
                    }
                ]
            },
            {
                mbdi: "10000000-0000-4000-8000-000000000013",
                title: "Renaissance",
                imageUrl: wikipediaImage("Beyoncé_-_Renaissance.png"),
                releaseYear: 2022,
                type: "LP",
                songs: [
                    { isrcCode: "USBEY2200001", title: "I'm That Girl", duration: 208 },
                    { isrcCode: "USBEY2200002", title: "Cozy", duration: 210 },
                    { isrcCode: "USBEY2200003", title: "Alien Superstar", duration: 215 },
                    { isrcCode: "USBEY2200004", title: "Cuff It", duration: 225 },
                    { isrcCode: "USBEY2200005", title: "Break My Soul", duration: 278 }
                ],
                supports: [
                    {
                        type: "Vinyl",
                        versions: [
                            { eanCode: "1000000000031", designation: "Limited Edition Vinyl" }
                        ]
                    },
                    {
                        type: "CD",
                        versions: [
                            { eanCode: "1000000000032", designation: "Original 2022 CD" }
                        ]
                    }
                ]
            }
        ]
    }
];

const michaelAlbumMbdis = [
    "a0d9d43c-46eb-4e17-a5b2-0b18f1e8b2cb",
    "b10bbbfc-cf9e-4200-be17-e2c3e1d2600d",
    "94a0b5b9-3b35-4a11-8f5d-f5f9e6c9f27b",
    "b7a77143-e2a8-4cec-96b7-3b1d1d4a5e9e",
    "8e6c5f3c-9e7e-4a5d-8f5d-c3b9e6c9f27b"
];

const sprint2SeedAlbumMbdis = [
    ...michaelAlbumMbdis,
    ...additionalCatalog.flatMap(artist => artist.albums.map(album => album.mbdi))
];

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

        if (process.env.DROP_DB === 'true') {
            await mongoose.connection.dropDatabase();
            console.log("Base de dados limpa (DROP_DB=true).");
        }

        // ----- Michael Jackson -----
        console.log("A criar artista: Michael Jackson...");
        const mj = await upsertArtist("0000000121707484", {
            isni: "0000000121707484",
            name: "Michael Jackson",
            imageUrl: commonsImage("Michael Jackson 1988.jpg"),
            yearStarted: 1964,
            type: "solo"
        });

        // ----- Off the Wall (1979) -----
        console.log("A criar álbum: Off the Wall...");
        const offTheWall = await upsertAlbum("a0d9d43c-46eb-4e17-a5b2-0b18f1e8b2cb", {
            mbdi: "a0d9d43c-46eb-4e17-a5b2-0b18f1e8b2cb",
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
        await seedPhysicalSupportsForAlbum(offTheWall, [
            {
                type: "Vinyl",
                versions: [
                    { eanCode: "1000000000037", designation: "Original 1979 Gatefold LP" },
                    { eanCode: "1000000000038", designation: "Half-Speed Master Vinyl" }
                ]
            },
            {
                type: "CD",
                versions: [
                    { eanCode: "1000000000039", designation: "2001 Special Edition CD" }
                ]
            },
            {
                type: "Cassette",
                versions: [
                    { eanCode: "1000000000040", designation: "Original 1979 Cassette" }
                ]
            }
        ]);

        // Off the Wall - Suportes Físicos
        console.log("A criar suportes físicos do Off the Wall...");
        const otwVinyl = await upsertPhysicalSupport(offTheWall._id, "Vinyl", {
            type: "Vinyl",
            album: offTheWall._id
        });
        const otwVinylVersions = [
            await upsertVersion("0074643574514", { eanCode: "0074643574514", designation: "Original 1979 Vinyl", physicalSupport: otwVinyl._id })
        ];
        otwVinyl.versions = otwVinylVersions.map(v => v._id);
        await otwVinyl.save();

        offTheWall.physicalSupports = [otwVinyl._id];
        await offTheWall.save();

        // ----- Thriller (1982) -----
        console.log("A criar álbum: Thriller...");
        const thriller = await upsertAlbum("b10bbbfc-cf9e-4200-be17-e2c3e1d2600d", {
            mbdi: "b10bbbfc-cf9e-4200-be17-e2c3e1d2600d",
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
            await upsertVersion("5099750441121", { eanCode: "5099750441121", designation: "Original 1982 Black", physicalSupport: thrillerVinyl._id }),
            await upsertVersion("0886973266625", { eanCode: "0886973266625", designation: "25th Anniversary Edition", physicalSupport: thrillerVinyl._id })
        ];
        thrillerVinyl.versions = uniqueObjectIds([
            ...(thrillerVinyl.versions || []),
            ...thrillerVinylVersions.map(v => v._id)
        ]);
        await thrillerVinyl.save();

        const thrillerCD = await upsertPhysicalSupport(thriller._id, "CD", {
            type: "CD",
            album: thriller._id
        });
        const thrillerCDVersions = [
            await upsertVersion("5099750441138", { eanCode: "5099750441138", designation: "Original 1982", physicalSupport: thrillerCD._id }),
            await upsertVersion("5099750490228", { eanCode: "5099750490228", designation: "2001 Special Edition", physicalSupport: thrillerCD._id })
        ];
        thrillerCD.versions = uniqueObjectIds([
            ...(thrillerCD.versions || []),
            ...thrillerCDVersions.map(v => v._id)
        ]);
        await thrillerCD.save();

        const thrillerCassette = await upsertPhysicalSupport(thriller._id, "Cassette", {
            type: "Cassette",
            album: thriller._id
        });
        const thrillerCassetteVersions = [
            await upsertVersion("1000000000041", { eanCode: "1000000000041", designation: "Original 1982 Cassette", physicalSupport: thrillerCassette._id })
        ];
        thrillerCassette.versions = uniqueObjectIds([
            ...(thrillerCassette.versions || []),
            ...thrillerCassetteVersions.map(v => v._id)
        ]);
        await thrillerCassette.save();

        thriller.physicalSupports = uniqueObjectIds([
            ...(thriller.physicalSupports || []),
            thrillerVinyl._id,
            thrillerCD._id,
            thrillerCassette._id
        ]);
        await thriller.save();

        // ----- Bad (1987) -----
        console.log("A criar álbum: Bad...");
        const bad = await upsertAlbum("94a0b5b9-3b35-4a11-8f5d-f5f9e6c9f27b", {
            mbdi: "94a0b5b9-3b35-4a11-8f5d-f5f9e6c9f27b",
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
            await upsertVersion("5099747032318", { eanCode: "5099747032318", designation: "Original 1987 Black", physicalSupport: badVinyl._id }),
            await upsertVersion("5099747032820", { eanCode: "5099747032820", designation: "2001 Special Edition", physicalSupport: badVinyl._id })
        ];
        badVinyl.versions = uniqueObjectIds([
            ...(badVinyl.versions || []),
            ...badVinylVersions.map(v => v._id)
        ]);
        await badVinyl.save();

        const badCD = await upsertPhysicalSupport(bad._id, "CD", {
            type: "CD",
            album: bad._id
        });
        const badCDVersions = [
            await upsertVersion("5099747032325", { eanCode: "5099747032325", designation: "Original 1987", physicalSupport: badCD._id })
        ];
        badCD.versions = uniqueObjectIds([
            ...(badCD.versions || []),
            ...badCDVersions.map(v => v._id)
        ]);
        await badCD.save();

        const badCassette = await upsertPhysicalSupport(bad._id, "Cassette", {
            type: "Cassette",
            album: bad._id
        });
        const badCassetteVersions = [
            await upsertVersion("1000000000042", { eanCode: "1000000000042", designation: "Original 1987 Cassette", physicalSupport: badCassette._id })
        ];
        badCassette.versions = uniqueObjectIds([
            ...(badCassette.versions || []),
            ...badCassetteVersions.map(v => v._id)
        ]);
        await badCassette.save();

        bad.physicalSupports = uniqueObjectIds([
            ...(bad.physicalSupports || []),
            badVinyl._id,
            badCD._id,
            badCassette._id
        ]);
        await bad.save();

        // ----- Dangerous (1991) -----
        console.log("A criar álbum: Dangerous...");
        const dangerous = await upsertAlbum("b7a77143-e2a8-4cec-96b7-3b1d1d4a5e9e", {
            mbdi: "b7a77143-e2a8-4cec-96b7-3b1d1d4a5e9e",
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
        await seedPhysicalSupportsForAlbum(dangerous, [
            {
                type: "Vinyl",
                versions: [
                    { eanCode: "1000000000043", designation: "Original 1991 2xLP" },
                    { eanCode: "1000000000044", designation: "Picture Disc Edition" }
                ]
            },
            {
                type: "CD",
                versions: [
                    { eanCode: "1000000000045", designation: "Original 1991 CD" }
                ]
            },
            {
                type: "Cassette",
                versions: [
                    { eanCode: "1000000000046", designation: "Original 1991 Cassette" }
                ]
            }
        ]);

        // Dangerous - Suportes Físicos
        console.log("A criar suportes físicos do Dangerous...");
        const dangerousCD = await upsertPhysicalSupport(dangerous._id, "CD", {
            type: "CD",
            album: dangerous._id
        });
        const dangerousCDVersions = [
            await upsertVersion("0074644540026", { eanCode: "0074644540026", designation: "Original 1991 CD", physicalSupport: dangerousCD._id })
        ];
        dangerousCD.versions = dangerousCDVersions.map(v => v._id);
        await dangerousCD.save();

        dangerous.physicalSupports = [dangerousCD._id];
        await dangerous.save();

        // ----- Invincible (2001) -----
        console.log("A criar álbum: Invincible...");
        const invincible = await upsertAlbum("8e6c5f3c-9e7e-4a5d-8f5d-c3b9e6c9f27b", {
            mbdi: "8e6c5f3c-9e7e-4a5d-8f5d-c3b9e6c9f27b",
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
        await seedPhysicalSupportsForAlbum(invincible, [
            {
                type: "Vinyl",
                versions: [
                    { eanCode: "1000000000047", designation: "Limited 2021 Vinyl Reissue" }
                ]
            },
            {
                type: "CD",
                versions: [
                    { eanCode: "1000000000048", designation: "Original 2001 CD" },
                    { eanCode: "1000000000049", designation: "Blue Cover Edition" }
                ]
            }
        ]);

        // Invincible - Suportes Físicos
        console.log("A criar suportes físicos do Invincible...");
        const invincibleCD = await upsertPhysicalSupport(invincible._id, "CD", {
            type: "CD",
            album: invincible._id
        });
        const invincibleCDVersions = [
            await upsertVersion("0074646940026", { eanCode: "0074646940026", designation: "Original 2001 Silver CD", physicalSupport: invincibleCD._id }),
            await upsertVersion("0074646940027", { eanCode: "0074646940027", designation: "2001 Blue Limited Edition CD", physicalSupport: invincibleCD._id })
        ];
        invincibleCD.versions = invincibleCDVersions.map(v => v._id);
        await invincibleCD.save();

        invincible.physicalSupports = [invincibleCD._id];
        await invincible.save();

        // ----- Atualizar artista com todos os álbuns -----
        mj.albums = [offTheWall._id, thriller._id, bad._id, dangerous._id, invincible._id];
        await mj.save();

        // ----- Catálogo extra para popular melhor o site -----
        await seedArtistCatalog(additionalCatalog);
        await assertSprint2SeedCoverage(sprint2SeedAlbumMbdis);

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
