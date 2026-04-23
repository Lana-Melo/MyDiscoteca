// -----
// controllers/albumController.js
// -----

// Para usar os modelos definidos em Mongoose.
const Album = require('../models/albumModel');
const Artist = require('../models/artistModel');

// -----

// Registo de um novo álbum.
exports.create = async (req, res) => {
    try {
        const { mbdi, title, releaseYear, type, artistId } = req.body;

        // Verificar se o artista existe (se foi fornecido um artistId)
        let artist = null;
        if (artistId) {
            artist = await Artist.findById(artistId);
            if (!artist) {
                return res.status(404).json({
                    success: false,
                    message: 'Artista não encontrado. Se o álbum tiver um artista, este tem de existir.'
                });
            }
        }

        // Cria novo objeto Album com os dados do request
        const newAlbum = new Album({
            mbdi: mbdi,
            title: title,
            releaseYear: releaseYear,
            type: type,
            artist: artistId || undefined
        });

        await newAlbum.save();

        // Adicionar o álbum à lista de álbuns do artista (se existir)
        if (artist) {
            artist.albums.push(newAlbum._id);
            await artist.save();
        }

        if (newAlbum.artist) {
            await newAlbum.populate('artist', 'isni name type');
        }

        res.status(200).json({
            success: true,
            message: 'Álbum registado com sucesso.',
            album: {
                id: newAlbum.id,
                mbdi: newAlbum.mbdi,
                title: newAlbum.title,
                releaseYear: newAlbum.releaseYear,
                type: newAlbum.type,
                artist: newAlbum.artist
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro do servidor durante o registo de um álbum.'
        });
        console.error(error);
    }
}

// Obter a lista de todos os álbuns.
exports.getAll = async (req, res) => {
    try {
        const albums = await Album.find().populate('artist', 'isni name type');

        res.status(200).json({
            success: true,
            message: 'Lista de todos os álbuns resgatada com sucesso.',
            albums: albums
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro do servidor durante a busca pelos álbuns.'
        });
    }
}

// Obter um álbum pelo seu id.
exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        const album = await Album.findById(id).populate('artist', 'isni name type');

        if (!album) {
            return res.status(404).json({
                success: false,
                message: 'Álbum não encontrado.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Álbum encontrado com sucesso.',
            album: {
                id: album.id,
                mbdi: album.mbdi,
                title: album.title,
                releaseYear: album.releaseYear,
                type: album.type,
                artist: album.artist
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro do servidor durante a busca pelo álbum.'
        });
    }
}

// Deletar um álbum pelo seu id.
exports.delete = async (req, res) => {
    try {
        const albumId = req.params.id;

        const deletedAlbum = await Album.findByIdAndDelete(albumId);

        if (!deletedAlbum) {
            return res.status(404).json({
                success: false,
                message: 'Álbum a remover não existe.'
            });
        }

        // Remover a referência do álbum na array de álbuns do artista
        if (deletedAlbum.artist) {
            await Artist.updateOne(
                { _id: deletedAlbum.artist },
                { $pull: { albums: deletedAlbum._id } }
            );
        }

        res.status(200).json({
            success: true,
            message: 'Álbum removido com sucesso.',
            deleted: deletedAlbum
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro do servidor durante a remoção de um álbum.'
        });
        console.error(error);
    }
}

// -----
