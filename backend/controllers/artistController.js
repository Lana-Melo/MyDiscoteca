// -----
// controllers/artistController.js
// -----

// Para usar o modelo de artista definido em Mongoose.
const Artist = require('../models/artistModel');

// -----

// Funções com a lógica de resposta a pedidos da API relativos
// a artistas. Todas estas funções têm dois parâmetros:
//  - req: dá acesso aos dados do pedido; e
//  - res: permite compor a resposta ao cliente.

// -----

// Registo de um novo artista.
exports.create = async (req, res) => {
    try {
        // Dados do novo artista vêm no corpo do pedido.
        const { isni, name, yearStarted, type, members, imageUrl } = req.body;

        // Validação: se type é 'group', members é obrigatório e não pode estar vazio.
        if (type === 'group') {
            if (!members || members.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Um grupo deve ter pelo menos um membro.'
                });
            }

            // Verifica que todos os membros são artistas solo (não podem ser grupos).
            const memberArtists = await Artist.find({ _id: { $in: members } });
            
            if (memberArtists.length !== members.length) {
                return res.status(404).json({
                    success: false,
                    message: 'Um ou mais membros especificados não existem.'
                });
            }

            // Valida que nenhum membro é um grupo.
            const nonSoloMembers = memberArtists.filter(artist => artist.type === 'group');
            if (nonSoloMembers.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Um grupo não pode conter outros grupos como membros.'
                });
            }
        }

        // Cria novo objeto Artist com os dados do request
        const newArtist = new Artist({
            isni: isni,
            name: name,
            imageUrl: imageUrl,
            yearStarted: yearStarted,
            type: type || 'solo',
            members: members || []
        });

        // Se não for possível gravar os dados do artista,
        // o processamento passa para o bloco catch da função.
        await newArtist.save();
        await newArtist.populate('members', 'isni name yearStarted type imageUrl');

        // 200 = Successful operation.
        res.status(200).json({
            success: true,
            message: 'Artista registado com sucesso.',
            artist: {
                id: newArtist.id,
                isni: newArtist.isni,
                name: newArtist.name,
                imageUrl: newArtist.imageUrl,
                yearStarted: newArtist.yearStarted,
                type: newArtist.type,
                members: newArtist.members,
                albums: newArtist.albums
            }
        });

    } catch (error) {
        // 500 = Internal server error.
        res.status(500).json({
            success: false,
            message: 'Erro do servidor durante o registo de um artista.'
        });

        // O que terá acontecido?
        console.error(error);
    }
}

// Obter a lista de todos os artistas.
exports.getAll = async (req, res) => {
    try {
        // TODO(user-sprint-1): a User Story 5 pede pesquisa parcial por nome.
        // O sitio mais natural para evoluir isto e aqui (ou numa funcao search
        // dedicada), lendo algo como req.query.name para filtrar artistas.

        // Usa o model Artist para interagir com a DB
        // e selecionar todos os artistas registados.
        // Popula os membros dos grupos e os álbuns para mostrar detalhes completos.
        const artists = await Artist.find()
            .populate('members', 'isni name yearStarted type imageUrl')
            .populate('albums', 'mbdi title releaseYear type imageUrl');

        // 200 = OK.
        res.status(200).json({
            success: true,
            message: 'Lista de todos os artistas resgatada com sucesso.',
            artists: artists
        });
    } catch (error) {
        // 500 = Internal server error.
        res.status(500).json({
            success: false,
            message: 'Erro do servidor durante a busca pelos artistas.'
        });
    }
}

// Pesquisar artistas pelo nome (para funcionalidade de autocomplete)
exports.searchByName = async (req, res) => {
    try {
        const query = req.query.q;
        
        if (!query) {
            return res.status(400).json({
                success: false,
                message: 'É necessário fornecer um termo de pesquisa usando o parâmetro de query "q".'
            });
        }

        // Procura artistas cujo nome contenha o termo de pesquisa (case-insensitive)
        // Usamos limit(10) para devolver apenas as melhores 10 sugestões
        const artists = await Artist.find({ 
            name: { $regex: query, $options: 'i' } 
        })
        .limit(10)
        .populate('members', 'isni name yearStarted type imageUrl')
        .populate('albums', 'mbdi title releaseYear type imageUrl');

        res.status(200).json({
            success: true,
            message: 'Pesquisa concluída com sucesso.',
            artists: artists
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro do servidor durante a pesquisa de artistas.'
        });
    }
}

// Obter um artista pelo seu id.
exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        // Popula os membros dos grupos e os álbuns para mostrar detalhes completos.
        const artist = await Artist.findById(id)
            .populate('members', 'isni name yearStarted type imageUrl')
            .populate('albums', 'mbdi title releaseYear type imageUrl');

        if (!artist) {
            // 404 = Not Found.
            return res.status(404).json({
                success: false,
                message: 'Artista não encontrado.'
            });
        }

        // 200 = OK
        res.status(200).json({
            success: true,
            message: 'Artista encontrado com sucesso.',
            artist: {
                id: artist.id,
                isni: artist.isni,
                name: artist.name,
                imageUrl: artist.imageUrl,
                yearStarted: artist.yearStarted,
                type: artist.type,
                members: artist.members,
                albums: artist.albums
            }
        });

    } catch (error) {
        // 500 = Internal server error.
        res.status(500).json({
            success: false,
            message: 'Erro do servidor durante a busca pelo artista.'
        });
    }
}

// Deletar um artista pelo seu id.
exports.delete = async (req, res) => {
    try {
        // Identificador do artista a remover vem num parâmetro do pedido.
        const artistId = req.params.id;

        // Se o artista a remover não existir, devolve null.
        const deletedArtistDocument = await Artist.findByIdAndDelete(artistId);

        if (!deletedArtistDocument) {
            // 404 = Not Found.
            return res.status(404).json({
                success: false,
                message: 'Artista a remover não existe.'
            });
        }

        // 200 = OK
        res.status(200).json({
            success: true,
            message: 'Artista removido com sucesso.',
            deleted: deletedArtistDocument
        });

    } catch (error) {
        // 500 = Internal Server Error.
        res.status(500).json({
            success: false,
            message: 'Erro do servidor durante a remoção de um artista.'
        });

        // O que terá acontecido?
        console.error(error);
    }
}

// -----
