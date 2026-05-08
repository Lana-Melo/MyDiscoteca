// -----
// controllers/contributionController.js
// -----

// Para usar os modelos definidos em Mongoose.
const Contribution = require('../models/contributionModel');
const Album = require('../models/albumModel');
const Notification = require('../models/notificationModel');

// Para validar JSON Web Tokens.
const jwt = require('jsonwebtoken');

// -----

// Chave usada na validacao de JSON Web Tokens.
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

// -----

// Resolve o id do utilizador autenticado a partir do bearer token.
function resolveAuthenticatedUserId(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return null;

  try {
    const payload = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    return payload.sub;
  } catch {
    return null;
  }
}

// -----

exports.createContribution = async (req, res) => {
  try {
    const newContribution = new Contribution(req.body);
    await newContribution.save();
    res.status(201).json({ success: true, contribution: newContribution });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'O código EAN-13 já está em uso por outra submissão.'
      });
    }
    res.status(500).json({ success: false, message: 'Erro ao guardar.' });
  }
};

// Submeter um pedido de nova versão de álbum (US12).
exports.submitAlbumVersionRequest = async (req, res) => {
  try {
    const userId = resolveAuthenticatedUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Utilizador não autenticado.'
      });
    }

    const { albumId, eanCode, physicalSupport, designation } = req.body;

    // Verificar se o álbum existe.
    const album = await Album.findById(albumId);
    if (!album) {
      return res.status(404).json({
        success: false,
        message: 'Álbum não encontrado.'
      });
    }

    const newContribution = new Contribution({
      user: userId,
      album: albumId,
      eanCode: eanCode?.trim(),
      physicalSupport,
      designation: designation?.trim() || null,
      status: 'Em análise'
    });

    await newContribution.save();

    res.status(201).json({
      _id: newContribution._id,
      albumId: newContribution.album,
      eanCode: newContribution.eanCode,
      physicalSupport: newContribution.physicalSupport,
      designation: newContribution.designation,
      status: newContribution.status,
      createdAt: newContribution.createdAt
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors).map(e => e.message).join(' ')
      });
    }
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Erro do servidor ao submeter o pedido de contribuição.'
    });
  }
};

// -----

// Listar os pedidos do utilizador autenticado (US13).
exports.getMyRequests = async (req, res) => {
  try {
    const userId = resolveAuthenticatedUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Utilizador não autenticado.'
      });
    }

    // Filtro opcional por estado (?status=em+análise | aceite | recusado).
    const { status } = req.query;

    const filter = { user: userId };
    if (status) {
      const allowedStatuses = ['Em análise', 'Aceite', 'Recusado'];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Estado inválido. Os valores possíveis são: "em análise", "aceite", "recusado".'
        });
      }
      filter.status = status;
    }

    const contributions = await Contribution.find(filter)
      .populate('album', 'title')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Pedidos do utilizador obtidos com sucesso.',
      contributions: contributions.map(c => ({
        _id: c._id,
        albumId: c.album?._id,
        albumTitle: c.album?.title ?? 'Álbum desconhecido',
        eanCode: c.eanCode,
        physicalSupport: c.physicalSupport,
        designation: c.designation,
        status: c.status,
        createdAt: c.createdAt
      }))
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Erro do servidor ao obter os pedidos de contribuição.'
    });
  }
};

// -----

// Simular resposta a um pedido (aceite/recusado) — nota de rodapé 12 do enunciado.
// Rota: POST /api/contributions/album-version/:id/respond
// Body: { "status": "Aceite" | "Recusado" }
exports.respondToRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['Aceite', 'Recusado'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Estado inválido. Os valores possíveis são: "Aceite" ou "Recusado".'
      });
    }

    const contribution = await Contribution.findById(id)
      .populate('album');

    if (!contribution) {
      return res.status(404).json({
        success: false,
        message: 'Pedido de contribuição não encontrado.'
      });
    }

    if (contribution.status !== 'Em análise') {
      return res.status(409).json({
        success: false,
        message: 'Este pedido já foi respondido.'
      });
    }

    contribution.status = status;
    await contribution.save();

    // Criar notificação para o utilizador que submeteu o pedido (US14).
    await Notification.create({
      user: contribution.user,
      contribution: contribution._id,
      albumTitle: contribution.album?.title ?? 'Álbum desconhecido',
      designation: contribution.designation,
      status
    });

    // Se aceite, criar a versão no álbum (US14c).
    if (status === 'Aceite') {
      const PhysicalSupport = require('../models/physicalSupportModel');
      const Version = require('../models/versionModel');

      // Encontrar ou criar o suporte físico para este álbum.
      let physicalSupport = await PhysicalSupport.findOne({
        album: contribution.album._id,
        type: contribution.physicalSupport
      });

      if (!physicalSupport) {
        physicalSupport = new PhysicalSupport({
          type: contribution.physicalSupport,
          album: contribution.album._id
        });
        await physicalSupport.save();

        // Adicionar o suporte físico ao álbum.
        await Album.findByIdAndUpdate(
          contribution.album._id,
          { $push: { physicalSupports: physicalSupport._id } }
        );
      }

      // Criar a versão.
      const newVersion = new Version({
        eanCode: contribution.eanCode,
        designation: contribution.designation || 'Standard Edition',
        physicalSupport: physicalSupport._id
      });
      await newVersion.save();

      // Adicionar a versão ao suporte físico.
      await PhysicalSupport.findByIdAndUpdate(
        physicalSupport._id,
        { $push: { versions: newVersion._id } }
      );
    }

    res.status(200).json({
      success: true,
      message: `Pedido marcado como "${status}".`,
      contribution: {
        _id: contribution._id,
        status: contribution.status,
        updatedAt: contribution.updatedAt
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Erro do servidor ao responder ao pedido de contribuição.'
    });
  }
};

// -----