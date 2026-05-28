'use strict';

require('dotenv').config();
const express    = require('express');
const helmet     = require('helmet');
const cors       = require('cors');
const rateLimit  = require('express-rate-limit');
const morgan     = require('morgan');
const { body, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

const app  = express();
const PORT = process.env.PORT || 4000;

// ══════════════════════════════════════════════
//  MIDDLEWARES SÉCURITÉ
// ══════════════════════════════════════════════

// Helmet — headers HTTP sécurisés
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc:  ["'self'"],
      scriptSrc:   ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
      styleSrc:    ["'self'", "'unsafe-inline'", "fonts.googleapis.com", "fonts.gstatic.com"],
      fontSrc:     ["'self'", "fonts.gstatic.com"],
      imgSrc:      ["'self'", "data:", "https:"],
      connectSrc:  ["'self'"],
      frameSrc:    ["'none'"],
      objectSrc:   ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// CORS — seulement le frontend autorisé
const allowedOrigins = [
  'https://zelktris-agency.netlify.app',
  process.env.FRONTEND_URL || 'http://localhost:8080',
  'http://localhost:8080',
  'http://localhost:3333',
  'http://127.0.0.1:8080',
  'http://127.0.0.1:3333',
];
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('CORS non autorisé pour cette origine'));
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'X-Request-ID'],
  credentials: false,
}));

// Body parser avec limite de taille
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

// Logging structuré (en prod, utiliser winston/pino)
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// Supprimer le header X-Powered-By
app.disable('x-powered-by');

// Request ID pour la traçabilité
app.use((req, _res, next) => {
  req.requestId = uuidv4();
  next();
});

// ══════════════════════════════════════════════
//  RATE LIMITING
// ══════════════════════════════════════════════

// Limiteur global
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Trop de requêtes, réessayez dans 15 minutes.' },
});
app.use(globalLimiter);

// Limiteur strict pour les formulaires (anti-spam)
const formLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max:      parseInt(process.env.RATE_LIMIT_MAX)        || 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Trop de soumissions. Veuillez patienter avant de réessayer.' },
  skipSuccessfulRequests: false,
});

// ══════════════════════════════════════════════
//  UTILITAIRES
// ══════════════════════════════════════════════

function sanitize(str) {
  return sanitizeHtml(str, { allowedTags: [], allowedAttributes: {} }).trim();
}

function createTransporter() {
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
    port:   parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: process.env.NODE_ENV === 'production' },
  });
}

// ══════════════════════════════════════════════
//  ROUTES
// ══════════════════════════════════════════════

// ── Santé ──
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Formulaire de contact ──
app.post('/api/contact',
  formLimiter,

  // Validation + sanitisation
  body('name')
    .trim().notEmpty().withMessage('Le nom est requis.')
    .isLength({ min: 2, max: 100 }).withMessage('Nom invalide.')
    .escape(),
  body('company')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ max: 150 }).withMessage('Société invalide.')
    .escape(),
  body('email')
    .trim().notEmpty().withMessage("L'email est requis.")
    .isEmail().withMessage('Email invalide.')
    .normalizeEmail(),
  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[+\d\s\-().]{7,20}$/).withMessage('Numéro de téléphone invalide.'),
  body('message')
    .trim().notEmpty().withMessage('Le message est requis.')
    .isLength({ min: 10, max: 2000 }).withMessage('Message trop court ou trop long.'),
  body('projectType')
    .optional({ checkFalsy: true })
    .isLength({ max: 120 }).withMessage('Type de projet invalide.')
    .trim(),
  body('budget')
    .optional({ checkFalsy: true })
    .isLength({ max: 120 }).withMessage('Budget invalide.')
    .trim(),
  body('estimate')
    .optional({ checkFalsy: true })
    .isLength({ max: 150 }).trim(),
  body('details')
    .optional({ checkFalsy: true })
    .isLength({ max: 1000 }).trim(),
  body('features')
    .optional({ checkFalsy: true })
    .isLength({ max: 1000 }).trim(),
  body('complexity')
    .optional({ checkFalsy: true })
    .isLength({ max: 100 }).trim(),
  body('country')
    .optional({ checkFalsy: true })
    .isLength({ max: 100 }).trim(),
  body('deadline').optional().isLength({ max: 50 }).trim().escape(),
  body('source').optional().isLength({ max: 50 }).trim().escape(),

  async (req, res) => {
    // Vérification des erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
      });
    }

    const {
      name, company, email, phone, message,
      projectType, budget, deadline, source,
      estimate, details, features, complexity, country,
    } = req.body;

    const safeMessage = sanitize(message);

    // Log de l'IP pour audit (sans stocker l'email brut en log)
    console.log(`[CONTACT] id=${req.requestId} from=${req.ip} type=${projectType || 'N/A'}`);

    try {
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        const transporter = createTransporter();
        await transporter.sendMail({
          from:    `"ZELKTRIS Site" <${process.env.SMTP_USER}>`,
          to:      process.env.CONTACT_RECIPIENT || process.env.SMTP_USER,
          replyTo: email,
          subject: `[ZELKTRIS] Nouveau contact — ${projectType || 'Non précisé'} — ${name}`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0010;color:#f0f0ff;padding:32px;border-radius:12px;">
              <h2 style="color:#FFD700;font-size:1.4rem;margin-bottom:8px;">📬 Nouveau contact ZELKTRIS</h2>
              ${source ? `<p style="color:#8B00FF;font-size:.8rem;margin:0 0 20px;">Source : ${sanitize(source)}</p>` : '<p style="margin:0 0 20px;"></p>'}
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#aaa;width:140px;">Nom</td><td style="padding:10px 0;border-bottom:1px solid #222;">${sanitize(name)}</td></tr>
                ${company ? `<tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#aaa;">Société / Pays</td><td style="padding:10px 0;border-bottom:1px solid #222;">${sanitize(company)}</td></tr>` : ''}
                ${country ? `<tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#aaa;">Pays</td><td style="padding:10px 0;border-bottom:1px solid #222;">${sanitize(country)}</td></tr>` : ''}
                <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#aaa;">Email</td><td style="padding:10px 0;border-bottom:1px solid #222;"><a href="mailto:${email}" style="color:#00AAFF;">${email}</a></td></tr>
                ${phone ? `<tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#aaa;">Téléphone / WhatsApp</td><td style="padding:10px 0;border-bottom:1px solid #222;">${sanitize(phone)}</td></tr>` : ''}
                <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#aaa;">Type de projet</td><td style="padding:10px 0;border-bottom:1px solid #222;color:#B44FFF;">${projectType || 'Non précisé'}</td></tr>
                ${complexity ? `<tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#aaa;">Complexité</td><td style="padding:10px 0;border-bottom:1px solid #222;">${sanitize(complexity)}</td></tr>` : ''}
                ${estimate ? `<tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#aaa;">Estimation</td><td style="padding:10px 0;border-bottom:1px solid #222;color:#00C853;font-weight:700;">${sanitize(estimate)}</td></tr>` : (budget ? `<tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#aaa;">Budget</td><td style="padding:10px 0;border-bottom:1px solid #222;color:#FFD700;">${sanitize(budget)}</td></tr>` : '')}
                ${deadline ? `<tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#aaa;">Délai souhaité</td><td style="padding:10px 0;border-bottom:1px solid #222;">${sanitize(deadline)}</td></tr>` : ''}
              </table>
              ${details || features ? `
              <div style="margin-top:16px;padding:16px;background:#0d0018;border-radius:8px;border-left:3px solid #0066FF;">
                ${details ? `<p style="color:#aaa;font-size:.8rem;margin:0 0 6px;">Détails du projet :</p><p style="line-height:1.6;margin:0 0 12px;">${sanitize(details)}</p>` : ''}
                ${features ? `<p style="color:#aaa;font-size:.8rem;margin:0 0 6px;">Fonctionnalités souhaitées :</p><p style="line-height:1.6;margin:0;">${sanitize(features)}</p>` : ''}
              </div>` : ''}
              <div style="margin-top:16px;padding:20px;background:#12001a;border-radius:8px;border-left:3px solid #8B00FF;">
                <p style="color:#aaa;font-size:0.85rem;margin:0 0 8px;">Message complet :</p>
                <p style="line-height:1.7;margin:0;">${safeMessage.replace(/\n/g, '<br>')}</p>
              </div>
              <p style="color:#444;font-size:0.75rem;margin-top:24px;">ID: ${req.requestId} · ${new Date().toLocaleString('fr-FR')}</p>
            </div>
          `,
        });
      } else {
        // Mode dev — pas de SMTP configuré, on logue simplement
        console.log('[CONTACT DEV] Email non envoyé (SMTP non configuré) :', { name, company, email, projectType, budget });
      }

      return res.status(200).json({
        success: true,
        message: 'Message reçu ! Notre équipe vous répond sous 24h.',
        id: req.requestId,
      });

    } catch (err) {
      console.error(`[CONTACT ERROR] id=${req.requestId}`, err.message);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de l\'envoi. Veuillez réessayer ou nous appeler directement.',
      });
    }
  }
);

// ── Newsletter ──
app.post('/api/newsletter',
  formLimiter,

  body('email')
    .trim().notEmpty().withMessage("L'email est requis.")
    .isEmail().withMessage('Email invalide.')
    .normalizeEmail(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
      });
    }

    const { email } = req.body;

    console.log(`[NEWSLETTER] id=${req.requestId} from=${req.ip}`);

    try {
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        const transporter = createTransporter();
        // Notification interne
        await transporter.sendMail({
          from:    `"ZELKTRIS Site" <${process.env.SMTP_USER}>`,
          to:      process.env.NEWSLETTER_RECIPIENT || process.env.SMTP_USER,
          subject: `[ZELKTRIS] Nouvel abonné newsletter`,
          text:    `Nouvel abonné : ${email}\nDate : ${new Date().toLocaleString('fr-FR')}\nID : ${req.requestId}`,
        });
        // Email de confirmation à l'abonné
        await transporter.sendMail({
          from:    `"Zelktris Agency" <${process.env.SMTP_USER}>`,
          to:      email,
          subject: `✅ Bienvenue dans la newsletter ZELKTRIS !`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;background:#0a0010;color:#f0f0ff;padding:32px;border-radius:12px;text-align:center;">
              <div style="font-size:2.5rem;margin-bottom:16px;">🚀</div>
              <h2 style="color:#FFD700;font-size:1.4rem;">Vous êtes abonné !</h2>
              <p style="color:#aaa;line-height:1.7;margin:16px 0;">Merci de rejoindre les 12 000+ professionnels qui reçoivent nos insights digitaux chaque semaine.</p>
              <p style="color:#aaa;font-size:0.85rem;">Vous pouvez vous désabonner à tout moment en répondant STOP à cet email.</p>
              <div style="margin-top:24px;padding-top:24px;border-top:1px solid #222;font-size:0.75rem;color:#444;">Zelktris Agency · Paris, France</div>
            </div>
          `,
        });
      } else {
        console.log('[NEWSLETTER DEV] Inscription :', email);
      }

      return res.status(200).json({
        success: true,
        message: 'Inscription confirmée ! Vérifiez votre boîte mail.',
      });

    } catch (err) {
      console.error(`[NEWSLETTER ERROR] id=${req.requestId}`, err.message);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de l\'inscription. Réessayez plus tard.',
      });
    }
  }
);

// ══════════════════════════════════════════════
//  GESTION DES ERREURS
// ══════════════════════════════════════════════

// Route 404
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route introuvable.' });
});

// Gestionnaire d'erreurs global
app.use((err, req, res, _next) => {
  const status = err.status || 500;
  console.error(`[ERROR] id=${req.requestId} status=${status}`, err.message);

  // Ne jamais exposer la stack trace en prod
  res.status(status).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'Une erreur serveur est survenue.'
      : err.message,
  });
});

// ══════════════════════════════════════════════
//  DÉMARRAGE
// ══════════════════════════════════════════════
app.listen(PORT, () => {
  console.log(`\n✅  ZELKTRIS Backend démarré sur http://localhost:${PORT}`);
  console.log(`   ENV  : ${process.env.NODE_ENV || 'development'}`);
  console.log(`   SMTP : ${process.env.SMTP_USER ? '✓ configuré' : '✗ non configuré (mode dev)'}`);
  console.log(`   API  : POST /api/contact | POST /api/newsletter | GET /api/health\n`);
});

module.exports = app;
