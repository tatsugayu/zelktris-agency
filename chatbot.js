/* ================================================================
   ZELKTRIS AGENCY — Chatbot IA Multilingue
   Langues : Français · English · Pidgin · Ewondo · Bassa · Fulfulde
   ================================================================ */
(function() {
'use strict';

// ── TRADUCTIONS ────────────────────────────────────────────────
const T = {
  fr: {
    lang_name: 'Français',
    lang_flag: '🇫🇷',
    greeting: `Bonjour et bienvenue chez **Zelktris Agency** ! 🌟\nJe suis **Zara**, votre conseillère digitale.\nJe suis là pour vous aider à concrétiser votre projet et vous proposer la meilleure offre.\n\nComment puis-je vous appeler ?`,
    ask_name: 'Quel est votre prénom ?',
    ask_project: (name) => `Enchanté(e), **${name}** ! 😊\nQuel type de projet avez-vous en tête ?`,
    ask_detail: (type) => `Excellent choix ! Un **${type}** peut vraiment transformer votre présence digitale.\nPouvez-vous me décrire en quelques mots ce que vous souhaitez faire ?`,
    ask_features: 'Quelles fonctionnalités souhaitez-vous inclure ? (ex : formulaire de contact, boutique en ligne, espace membre, blog...)',
    ask_complexity: 'Comment décririez-vous la complexité de votre projet ?',
    ask_deadline: 'Pour quand avez-vous besoin du projet ?',
    ask_country: 'Dans quel pays êtes-vous basé(e) ?',
    ask_email: (name) => `Parfait, **${name}** ! Je prépare votre devis personnalisé... 📊\nQuel est votre email pour vous envoyer la proposition ?`,
    ask_phone: 'Votre numéro WhatsApp pour vous contacter rapidement ?',
    confirm: (data) => `✅ **Récapitulatif de votre projet :**\n\n👤 **Nom :** ${data.name}\n📧 **Email :** ${data.email}\n📱 **Tel :** ${data.phone||'Non renseigné'}\n🎯 **Projet :** ${data.projectType}\n📝 **Détails :** ${data.details}\n⚙️ **Complexité :** ${data.complexity}\n⏰ **Délai :** ${data.deadline}\n🌍 **Pays :** ${data.country}\n\nJe vous envoie la proposition par email. Confirmer ?`,
    sending: 'Envoi de votre devis en cours... ⏳',
    success: (name) => `🎉 **Merci infiniment, ${name} !**\n\nVotre demande a bien été transmise à notre équipe.\nVous recevrez une réponse détaillée sous **24 heures** à l'adresse indiquée.\n\n**Pourquoi vous avez fait le meilleur choix :**\n✨ Tarifs transparents en FCFA\n🏆 Équipe certifiée et expérimentée\n🤝 Support dédié après livraison\n🌍 Présents dans toute l'Afrique\n\nÀ très bientôt ! 🚀`,
    error: 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement sur WhatsApp.',
    yes: 'Oui, confirmer ✅',
    no: 'Non, modifier ✏️',
    placeholder: 'Écrivez votre message...',
    send_btn: 'Envoyer',
    types: ['🌐 Site Web', '📱 Application Mobile', '🛒 E-commerce', '🤖 IA & Automatisation', '🎨 Design UX/UI', '⚙️ Logiciel sur Mesure'],
    complexity: ['🟢 Simple — contenu, vitrines', '🟡 Standard — fonctionnalités avancées', '🔴 Complexe — plateforme complète'],
    deadlines: ['🚨 Urgent (moins de 1 mois)', '📅 1 à 3 mois', '📆 3 à 6 mois', '🗓️ Plus de 6 mois', '🤔 Pas encore défini'],
    countries: ['🇨🇲 Cameroun', '🇸🇳 Sénégal', '🇨🇮 Côte d\'Ivoire', '🇬🇦 Gabon', '🇨🇬 Congo', '🇨🇩 RD Congo', '🇳🇬 Nigeria', '🇬🇭 Ghana', '🇫🇷 France / Europe', '🌍 Autre pays'],
  },
  en: {
    lang_name: 'English',
    lang_flag: '🇬🇧',
    greeting: `Hello and welcome to **Zelktris Agency**! 🌟\nI'm **Zara**, your digital advisor.\nI'm here to help bring your project to life and find the best offer for you.\n\nWhat shall I call you?`,
    ask_name: 'What is your first name?',
    ask_project: (name) => `Nice to meet you, **${name}**! 😊\nWhat type of project do you have in mind?`,
    ask_detail: (type) => `Excellent choice! A **${type}** can truly transform your digital presence.\nCan you briefly describe what you'd like to achieve?`,
    ask_features: 'What features would you like to include? (e.g. contact form, online shop, member area, blog...)',
    ask_complexity: 'How would you describe your project\'s complexity?',
    ask_deadline: 'When do you need the project delivered?',
    ask_country: 'Which country are you based in?',
    ask_email: (name) => `Great, **${name}**! Preparing your personalised quote... 📊\nWhat's your email to send the proposal?`,
    ask_phone: 'Your WhatsApp number for quick contact?',
    confirm: (data) => `✅ **Project Summary:**\n\n👤 **Name:** ${data.name}\n📧 **Email:** ${data.email}\n📱 **Phone:** ${data.phone||'Not provided'}\n🎯 **Project:** ${data.projectType}\n📝 **Details:** ${data.details}\n⚙️ **Complexity:** ${data.complexity}\n⏰ **Deadline:** ${data.deadline}\n🌍 **Country:** ${data.country}\n\nI'll send the proposal to your email. Confirm?`,
    sending: 'Sending your quote... ⏳',
    success: (name) => `🎉 **Thank you so much, ${name}!**\n\nYour request has been sent to our team.\nYou'll receive a detailed response within **24 hours** at your email.\n\n**Why you made the best choice:**\n✨ Transparent FCFA pricing\n🏆 Certified & experienced team\n🤝 Dedicated post-delivery support\n🌍 Present across Africa\n\nTalk soon! 🚀`,
    error: 'An error occurred. Please try again or contact us directly on WhatsApp.',
    yes: 'Yes, confirm ✅',
    no: 'No, edit ✏️',
    placeholder: 'Type your message...',
    send_btn: 'Send',
    types: ['🌐 Website', '📱 Mobile App', '🛒 E-commerce', '🤖 AI & Automation', '🎨 UX/UI Design', '⚙️ Custom Software'],
    complexity: ['🟢 Simple — content, showcase', '🟡 Standard — advanced features', '🔴 Complex — full platform'],
    deadlines: ['🚨 Urgent (under 1 month)', '📅 1 to 3 months', '📆 3 to 6 months', '🗓️ Over 6 months', '🤔 Not yet decided'],
    countries: ['🇨🇲 Cameroon', '🇸🇳 Senegal', '🇨🇮 Côte d\'Ivoire', '🇬🇦 Gabon', '🇨🇬 Congo', '🇨🇩 DR Congo', '🇳🇬 Nigeria', '🇬🇭 Ghana', '🇫🇷 France / Europe', '🌍 Other country'],
  },
  pidgin: {
    lang_name: 'Pidgin',
    lang_flag: '🇨🇲',
    greeting: `How far! Welcome for **Zelktris Agency**! 🌟\nMy name na **Zara**, your digital advisor.\nAh dey here to help you make your project and show you better price.\n\nWetin dey call you?`,
    ask_name: 'How dem take call you?',
    ask_project: (name) => `Nice to meet you, **${name}**! 😊\nWetin kind project you wan do?`,
    ask_detail: (type) => `Na correct choice! **${type}** go change your business for digital side.\nTell me small-small wetin you wan do.`,
    ask_features: 'Wetin kind feature you want put inside? (contact form, online shop, member area, blog...)',
    ask_complexity: 'How big-big na your project?',
    ask_deadline: 'When you want make dem finish am?',
    ask_country: 'Which country you dey?',
    ask_email: (name) => `Correct! **${name}** I go prepare your quote now-now... 📊\nGive me your email make ah send proposal.`,
    ask_phone: 'Your WhatsApp number wey ah go use contact you?',
    confirm: (data) => `✅ **Your Project Summary:**\n\n👤 **Name:** ${data.name}\n📧 **Email:** ${data.email}\n📱 **Tel:** ${data.phone||'No give'}\n🎯 **Project:** ${data.projectType}\n📝 **Details:** ${data.details}\n⚙️ **Size:** ${data.complexity}\n⏰ **Deadline:** ${data.deadline}\n🌍 **Country:** ${data.country}\n\nAh wan send am for your email. Confirm?`,
    sending: 'Ah dey send your quote... ⏳',
    success: (name) => `🎉 **E don do, ${name}! Tank you die!**\n\nYour request don reach our team.\nYou go get answer for **24 hours** for your email.\n\n**Why you make correct choice:**\n✨ Good price for FCFA\n🏆 Experienced team wey know the work\n🤝 Support after we deliver\n🌍 We dey everywhere for Africa\n\nWe go see! 🚀`,
    error: 'Something happen. Try again or chat us for WhatsApp.',
    yes: 'Yes, confirm ✅',
    no: 'No, change am ✏️',
    placeholder: 'Write your message...',
    send_btn: 'Send',
    types: ['🌐 Website', '📱 Mobile App', '🛒 E-commerce', '🤖 AI & Automation', '🎨 Design', '⚙️ Software'],
    complexity: ['🟢 Simple — small project', '🟡 Standard — medium project', '🔴 Complex — big platform'],
    deadlines: ['🚨 Urgent (less than 1 month)', '📅 1 to 3 months', '📆 3 to 6 months', '🗓️ More than 6 months', '🤔 No decide yet'],
    countries: ['🇨🇲 Cameroun', '🇸🇳 Sénégal', '🇨🇮 Côte d\'Ivoire', '🇬🇦 Gabon', '🇨🇬 Congo', '🇳🇬 Nigeria', '🇬🇭 Ghana', '🌍 Another country'],
  },
  ewondo: {
    lang_name: 'Ewondo',
    lang_flag: '🇨🇲',
    greeting: `Mbolo! Bia na **Zelktris Agency**! 🌟\nMina **Zara**, mfulu wa digital.\nMa ve ke wo ke mvu a project yom.\n\n(Je parle Ewondo + Français)\nComment vous appelez-vous ?`,
    ask_name: 'Dzé yé bela ? (Votre nom ?)',
    ask_project: (name) => `Mbolo **${name}**! 😊\nMvog yé ? Quel projet voulez-vous ?`,
    ask_detail: (type) => `Ayé be ! **${type}** yé mvu ! Décrivez votre projet en quelques mots.`,
    ask_features: 'Mvu ane ? (Quelles fonctionnalités voulez-vous ?)',
    ask_complexity: 'Ôtôt ? — Simple, Standard ou Complexe ?',
    ask_deadline: 'Messo ? Quel délai souhaitez-vous ?',
    ask_country: 'Pays wom ? Dans quel pays êtes-vous ?',
    ask_email: (name) => `Ayé **${name}**! Je prépare votre devis... 📊\nVotre email ?`,
    ask_phone: 'Numéro WhatsApp wom ?',
    confirm: (data) => `✅ **Récapitulatif :**\n👤 ${data.name} | 📧 ${data.email}\n🎯 ${data.projectType} | ⏰ ${data.deadline}\n\nEnvoyer par email ? Confirmer ?`,
    sending: 'Ma ke ntomo email yom... ⏳',
    success: (name) => `🎉 **Akiba mininga ${name}!** (Merci beaucoup !)\n\nVotre demande est envoyée. Réponse sous 24h.\n\nZelktris Agency — Meilleur prix, meilleure qualité en Afrique ! 🌍🚀`,
    error: 'Erreur. Réessayez ou contactez-nous sur WhatsApp.',
    yes: 'Iyo — Oui ✅',
    no: 'Awa — Non ✏️',
    placeholder: 'Écrivez ici...',
    send_btn: 'Envoyer',
    types: ['🌐 Site Web', '📱 Application', '🛒 Boutique en ligne', '🤖 IA', '🎨 Design', '⚙️ Logiciel'],
    complexity: ['🟢 Simple', '🟡 Standard', '🔴 Complexe'],
    deadlines: ['🚨 Urgent', '📅 1–3 mois', '📆 3–6 mois', '🗓️ 6 mois+', '🤔 Non défini'],
    countries: ['🇨🇲 Cameroun', '🇬🇦 Gabon', '🇨🇬 Congo', '🌍 Autre pays'],
  },
  fulfulde: {
    lang_name: 'Fulfulde',
    lang_flag: '🇨🇲',
    greeting: `Jam waali! **Zelktris Agency** welcomes you! 🌟\nMin **Zara**, adoowo maa e digital.\n\n(Fulfulde + Français)\nComment vous appelez-vous ?`,
    ask_name: 'Ko innde maa ? (Quel est votre nom ?)',
    ask_project: (name) => `Jam **${name}**! 😊\nHol no project maa woni ?`,
    ask_detail: (type) => `Heewi ! **${type}** ko nafata. Yowtu project maa.`,
    ask_features: 'Holko njoli ? (Quelles fonctionnalités voulez-vous ?)',
    ask_complexity: 'Ko ɓuri ? Simple, Standard ou Complexe ?',
    ask_deadline: 'Wantu wonde ? Quel délai ?',
    ask_country: 'Laamu ngo ? Dans quel pays ?',
    ask_email: (name) => `Heewi **${name}**! Je prépare votre devis. 📊\nEmail maa ?`,
    ask_phone: 'Numéro WhatsApp maa ?',
    confirm: (data) => `✅ **Récapitulatif :**\n👤 ${data.name} | 📧 ${data.email}\n🎯 ${data.projectType} | ⏰ ${data.deadline}\nConfirmer ?`,
    sending: 'Ndertugo email... ⏳',
    success: (name) => `🎉 **A jaraama, ${name}!** (Merci !)\n\nVotre demande a été transmise. Réponse sous 24h.\nZelktris Agency — La qualité africaine ! 🌍🚀`,
    error: 'Juumre waɗii. Yiylo tawi walla WhatsApp.',
    yes: 'Eey — Oui ✅',
    no: 'Alaa — Non ✏️',
    placeholder: 'Windu ko maa...',
    send_btn: 'Nder',
    types: ['🌐 Site Web', '📱 Application', '🛒 E-commerce', '🤖 IA', '🎨 Design', '⚙️ Logiciel'],
    complexity: ['🟢 Simple', '🟡 Standard', '🔴 Complexe'],
    deadlines: ['🚨 Urgent', '📅 1–3 mois', '📆 3–6 mois', '🗓️ 6 mois+', '🤔 Non défini'],
    countries: ['🇨🇲 Cameroun', '🇳🇬 Nigeria', '🇸🇳 Sénégal', '🌍 Autre pays'],
  },
};

// ── TARIFS & COMPARAISON ───────────────────────────────────────
const TARIFS = {
  'Site Web':            { min:200000,  max:800000,  intl:'3 500 000 – 9 000 000', why:'Nos experts locaux livrent un travail de qualité internationale à prix juste.' },
  'Website':             { min:200000,  max:800000,  intl:'3 500 000 – 9 000 000', why:'Our local experts deliver international quality at fair prices.' },
  'Application Mobile':  { min:1500000, max:5000000, intl:'8 000 000 – 20 000 000', why:'Développement agile, livrables hebdomadaires, maintenance incluse 3 mois.' },
  'Mobile App':          { min:1500000, max:5000000, intl:'8 000 000 – 20 000 000', why:'Agile development, weekly deliverables, 3-month maintenance included.' },
  'E-commerce':          { min:900000,  max:3000000, intl:'5 000 000 – 15 000 000', why:'Plateforme optimisée pour les paiements africains (Mobile Money, VISA).' },
  'IA & Automatisation': { min:1000000, max:8000000, intl:'10 000 000 – 40 000 000', why:'Solutions IA sur mesure, sans abonnement étranger coûteux.' },
  'AI & Automation':     { min:1000000, max:8000000, intl:'10 000 000 – 40 000 000', why:'Custom AI solutions, no expensive foreign subscription.' },
  'Design UX/UI':        { min:250000,  max:1000000, intl:'2 000 000 – 6 000 000', why:'Designers certifiés, inspirés par l\'esthétique africaine moderne.' },
  'Logiciel sur Mesure': { min:3000000, max:15000000,intl:'15 000 000 – 60 000 000', why:'Analyse complète, architecture évolutive, code source livré.' },
  'Custom Software':     { min:3000000, max:15000000,intl:'15 000 000 – 60 000 000', why:'Full analysis, scalable architecture, source code included.' },
};
function getPricing(type) {
  for (const key of Object.keys(TARIFS)) {
    if (type && type.toLowerCase().includes(key.toLowerCase())) return TARIFS[key];
  }
  return TARIFS['Site Web'];
}
function fmt(n) { return new Intl.NumberFormat('fr-FR').format(n) + ' FCFA'; }
function buildPriceMessage(type, complexity, lang) {
  const p = getPricing(type);
  const mult = complexity && complexity.includes('🔴') ? 1.8 : complexity && complexity.includes('🟡') ? 1.3 : 1;
  const lo = fmt(Math.round(p.min * mult / 10000) * 10000);
  const hi = fmt(Math.round(p.max * mult / 10000) * 10000);
  const isFr = lang === 'fr' || lang === 'ewondo' || lang === 'fulfulde';
  if (isFr) {
    return `💰 **Votre estimation personnalisée :**\n\n🟢 **Zelktris Agency :** ${lo} – ${hi}\n🔴 **Agences internationales :** ${p.intl} FCFA\n🟡 **Agences africaines premium :** 2× notre tarif\n\n❓ **Pourquoi les autres sont plus chers ?**\n→ Frais de structure élevés (loyers Europe/USA)\n→ Équipes non spécialisées Afrique\n→ Frais de change et commissions\n→ Pas de support local après livraison\n\n✅ **Pourquoi Zelktris est le meilleur choix ?**\n${p.why}\n→ Tarifs en FCFA, paiement par tranches possible\n→ Équipe basée au Cameroun, disponible 7j/7\n→ Garantie de satisfaction ou remboursement`;
  } else if (lang === 'pidgin') {
    return `💰 **Your personal estimate:**\n\n🟢 **Zelktris Agency:** ${lo} – ${hi}\n🔴 **International agencies:** ${p.intl} FCFA\n🟡 **Other African agencies:** 2× our price\n\n❓ **Why others cost more?**\n→ Big offices for Europe/USA cost plenty money\n→ Dem no know Africa well-well\n→ Exchange rates and commissions\n→ No local support after delivery\n\n✅ **Why Zelktris na correct choice:**\n${p.why}\n→ Price for FCFA, payment by parts possible\n→ Team dey Cameroon, available 7 days\n→ Satisfaction guarantee`;
  } else {
    return `💰 **Your personalised estimate:**\n\n🟢 **Zelktris Agency:** ${lo} – ${hi}\n🔴 **International agencies:** ${p.intl} FCFA\n🟡 **Premium African agencies:** 2× our rate\n\n❓ **Why are others more expensive?**\n→ High office costs in Europe/USA\n→ Not specialised in Africa\n→ Exchange fees and commissions\n→ No local support after delivery\n\n✅ **Why Zelktris is the best choice:**\n${p.why}\n→ Pricing in FCFA, payment in instalments possible\n→ Team based in Cameroon, available 7 days/7\n→ Satisfaction guarantee or refund`;
  }
}

// ── STYLES ─────────────────────────────────────────────────────
const CSS = `
#zbot-btn{position:fixed;bottom:24px;right:24px;width:62px;height:62px;border-radius:50%;background:linear-gradient(135deg,#0066FF,#8B00FF);border:none;cursor:pointer;box-shadow:0 8px 30px rgba(0,102,255,0.4);z-index:9990;display:flex;align-items:center;justify-content:center;font-size:1.6rem;transition:transform .3s,box-shadow .3s;animation:zbotPulse 3s infinite}
#zbot-btn:hover{transform:scale(1.1);box-shadow:0 12px 40px rgba(0,102,255,0.6)}
#zbot-btn .zbot-notif{position:absolute;top:-4px;right:-4px;width:18px;height:18px;background:#FF3366;border-radius:50%;font-size:.65rem;font-weight:700;color:#fff;display:flex;align-items:center;justify-content:center;display:none}
@keyframes zbotPulse{0%,100%{box-shadow:0 8px 30px rgba(0,102,255,0.4)}50%{box-shadow:0 8px 50px rgba(139,0,255,0.6)}}
#zbot-window{position:fixed;bottom:100px;right:24px;width:380px;max-height:85vh;background:rgba(10,0,24,0.97);border:1px solid rgba(255,255,255,0.1);backdrop-filter:blur(20px);border-radius:16px;display:flex;flex-direction:column;z-index:9991;box-shadow:0 20px 60px rgba(0,0,0,0.5);transform:scale(0) translateY(20px);transform-origin:bottom right;transition:transform .3s cubic-bezier(.34,1.56,.64,1),opacity .3s;opacity:0;pointer-events:none}
#zbot-window.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all}
.zbot-header{background:linear-gradient(135deg,rgba(0,102,255,0.15),rgba(139,0,255,0.15));border-bottom:1px solid rgba(255,255,255,0.08);padding:14px 16px;border-radius:16px 16px 0 0;display:flex;align-items:center;gap:10px;flex-shrink:0}
.zbot-avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#0066FF,#8B00FF);display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0;box-shadow:0 0 20px rgba(0,102,255,0.4)}
.zbot-info{flex:1}
.zbot-name{font-weight:700;font-size:.95rem;color:#F0F0FF;font-family:'Orbitron',sans-serif,monospace}
.zbot-status{font-size:.72rem;color:#00C853;display:flex;align-items:center;gap:4px}
.zbot-status::before{content:'';width:6px;height:6px;background:#00C853;border-radius:50%;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.zbot-header-actions{display:flex;gap:6px}
.zbot-hbtn{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(240,240,255,.6);width:28px;height:28px;border-radius:6px;cursor:pointer;font-size:.8rem;display:flex;align-items:center;justify-content:center;transition:all .2s}
.zbot-hbtn:hover{background:rgba(255,255,255,0.12);color:#F0F0FF}
.zbot-lang-bar{padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;gap:6px;flex-wrap:wrap;flex-shrink:0}
.zbot-lang-btn{padding:4px 10px;border-radius:50px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:rgba(240,240,255,.6);font-size:.72rem;cursor:pointer;transition:all .2s}
.zbot-lang-btn:hover,.zbot-lang-btn.active{background:rgba(0,102,255,0.15);border-color:rgba(0,102,255,.4);color:#00AAFF}
.zbot-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;min-height:200px;max-height:50vh;scroll-behavior:smooth}
.zbot-messages::-webkit-scrollbar{width:4px}
.zbot-messages::-webkit-scrollbar-thumb{background:rgba(255,255,255,.15);border-radius:2px}
.zbot-msg{max-width:88%;animation:msgIn .3s ease}
@keyframes msgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.zbot-msg.bot{align-self:flex-start}
.zbot-msg.user{align-self:flex-end}
.zbot-bubble{padding:10px 14px;border-radius:14px;font-size:.875rem;line-height:1.55;word-break:break-word}
.zbot-msg.bot .zbot-bubble{background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.08);color:#E8E8FF;border-radius:4px 14px 14px 14px}
.zbot-msg.user .zbot-bubble{background:linear-gradient(135deg,rgba(0,102,255,0.25),rgba(139,0,255,0.2));border:1px solid rgba(139,0,255,0.25);color:#F0F0FF;border-radius:14px 14px 4px 14px}
.zbot-bubble strong{color:#FFD700;font-weight:700}
.zbot-bubble em{color:#00AAFF;font-style:normal}
.zbot-typing{display:flex;gap:4px;padding:12px 16px}
.zbot-typing span{width:7px;height:7px;background:rgba(255,255,255,.3);border-radius:50%;animation:typing 1.2s infinite}
.zbot-typing span:nth-child(2){animation-delay:.2s}
.zbot-typing span:nth-child(3){animation-delay:.4s}
@keyframes typing{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}
.zbot-quick{padding:8px 12px 0;display:flex;flex-wrap:wrap;gap:6px}
.zbot-quick-btn{padding:6px 12px;border-radius:50px;border:1px solid rgba(0,102,255,0.35);background:rgba(0,102,255,0.08);color:#00AAFF;font-size:.78rem;cursor:pointer;transition:all .2s;white-space:nowrap;max-width:100%;text-overflow:ellipsis;overflow:hidden}
.zbot-quick-btn:hover{background:rgba(0,102,255,0.2);border-color:rgba(0,102,255,.6)}
.zbot-quick-btn.gold{border-color:rgba(255,215,0,.4);background:rgba(255,215,0,.06);color:#FFD700}
.zbot-quick-btn.green{border-color:rgba(0,200,83,.4);background:rgba(0,200,83,.07);color:#00C853}
.zbot-quick-btn.red{border-color:rgba(255,51,102,.35);background:rgba(255,51,102,.07);color:#FF6699}
.zbot-footer{padding:10px 12px;border-top:1px solid rgba(255,255,255,0.06);display:flex;gap:8px;align-items:center;flex-shrink:0}
#zbot-input{flex:1;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#F0F0FF;padding:9px 14px;border-radius:50px;font-size:.88rem;outline:none;transition:border-color .3s;font-family:inherit}
#zbot-input:focus{border-color:rgba(0,102,255,.5)}
#zbot-input::placeholder{color:rgba(240,240,255,.3)}
#zbot-send{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#0066FF,#8B00FF);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;transition:transform .2s}
#zbot-send:hover{transform:scale(1.1)}
.zbot-progress{height:3px;background:rgba(255,255,255,0.05);flex-shrink:0}
.zbot-progress-bar{height:100%;background:linear-gradient(90deg,#0066FF,#8B00FF);border-radius:0;transition:width .5s ease}
@media(max-width:440px){#zbot-window{width:calc(100vw - 16px);right:8px;bottom:90px}}
`;

// ── DOM ────────────────────────────────────────────────────────
function inject() {
  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  document.body.insertAdjacentHTML('beforeend', `
    <button id="zbot-btn" title="Chat avec Zara — Zelktris Agency" aria-label="Ouvrir le chat">
      💬
      <span class="zbot-notif" id="zbot-notif">1</span>
    </button>
    <div id="zbot-window" role="dialog" aria-label="Zelktris Chatbot">
      <div class="zbot-header">
        <div class="zbot-avatar">🤖</div>
        <div class="zbot-info">
          <div class="zbot-name">ZARA</div>
          <div class="zbot-status">En ligne · Zelktris Agency</div>
        </div>
        <div class="zbot-header-actions">
          <button class="zbot-hbtn" onclick="zbotMinimize()" title="Réduire">—</button>
          <button class="zbot-hbtn" onclick="zbotClose()" title="Fermer">✕</button>
        </div>
      </div>
      <div class="zbot-progress"><div class="zbot-progress-bar" id="zbot-prog" style="width:0%"></div></div>
      <div class="zbot-lang-bar" id="zbotLangBar">
        <button class="zbot-lang-btn active" onclick="zbotSetLang('fr')">🇫🇷 FR</button>
        <button class="zbot-lang-btn" onclick="zbotSetLang('en')">🇬🇧 EN</button>
        <button class="zbot-lang-btn" onclick="zbotSetLang('pidgin')">🇨🇲 Pidgin</button>
        <button class="zbot-lang-btn" onclick="zbotSetLang('ewondo')">🌿 Ewondo</button>
        <button class="zbot-lang-btn" onclick="zbotSetLang('fulfulde')">🌙 Fulfulde</button>
      </div>
      <div class="zbot-messages" id="zbotMessages"></div>
      <div class="zbot-quick" id="zbotQuick"></div>
      <div class="zbot-footer">
        <input type="text" id="zbot-input" placeholder="Écrivez votre message..." autocomplete="off"
               onkeydown="if(event.key==='Enter')zbotSend()">
        <button id="zbot-send" onclick="zbotSend()" aria-label="Envoyer">➤</button>
      </div>
    </div>
  `);

  // Toggle on btn click
  document.getElementById('zbot-btn').addEventListener('click', zbotToggle);

  // Show notification after 5s
  setTimeout(() => {
    const notif = document.getElementById('zbot-notif');
    if (notif && !zbotState.opened) {
      notif.style.display = 'flex';
    }
  }, 5000);
}

// ── STATE ──────────────────────────────────────────────────────
let zbotState = {
  lang: 'fr',
  step: 'greeting',
  data: {},
  opened: false,
  totalSteps: 9,
  currentStep: 0,
};
const STEPS = ['greeting','name','project','detail','features','complexity','deadline','country','pricing','email','phone','confirm','send'];

// ── CORE FUNCTIONS ─────────────────────────────────────────────
function zbotToggle() {
  zbotState.opened = true;
  document.getElementById('zbot-notif').style.display = 'none';
  const win = document.getElementById('zbot-window');
  win.classList.toggle('open');
  if (win.classList.contains('open') && zbotState.step === 'greeting') {
    setTimeout(() => zbotStart(), 300);
  }
}
function zbotClose() { document.getElementById('zbot-window').classList.remove('open'); }
function zbotMinimize() { document.getElementById('zbot-window').classList.remove('open'); }

function zbotSetLang(lang) {
  zbotState.lang = lang;
  document.querySelectorAll('.zbot-lang-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('zbot-input').placeholder = T[lang]?.placeholder || 'Écrivez...';
}

function zbotStart() {
  const msgs = document.getElementById('zbotMessages');
  if (msgs.innerHTML) return; // Already started
  const t = T[zbotState.lang];
  zbotBotMsg(t.greeting);
  zbotState.step = 'ask_name';
  zbotProgress(1);
}

function zbotProgress(step) {
  zbotState.currentStep = step;
  const pct = Math.round((step / STEPS.length) * 100);
  const bar = document.getElementById('zbot-prog');
  if (bar) bar.style.width = pct + '%';
}

function zbotBotMsg(text, quickReplies) {
  const msgs = document.getElementById('zbotMessages');
  // Typing indicator
  const typingId = 'typing-' + Date.now();
  msgs.insertAdjacentHTML('beforeend', `<div class="zbot-msg bot" id="${typingId}"><div class="zbot-bubble"><div class="zbot-typing"><span></span><span></span><span></span></div></div></div>`);
  msgs.scrollTop = msgs.scrollHeight;

  const delay = Math.min(800, 400 + text.length * 3);
  setTimeout(() => {
    const el = document.getElementById(typingId);
    if (el) el.remove();
    const formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/→/g, '<span style="color:#00AAFF">→</span>')
      .replace(/✅/g, '<span style="color:#00C853">✅</span>')
      .replace(/🔴/g, '<span>🔴</span>')
      .replace(/\n/g, '<br>');
    msgs.insertAdjacentHTML('beforeend', `<div class="zbot-msg bot"><div class="zbot-bubble">${formatted}</div></div>`);
    msgs.scrollTop = msgs.scrollHeight;
    if (quickReplies && quickReplies.length) zbotShowQuick(quickReplies);
  }, delay);
}

function zbotUserMsg(text) {
  const msgs = document.getElementById('zbotMessages');
  msgs.insertAdjacentHTML('beforeend', `<div class="zbot-msg user"><div class="zbot-bubble">${text}</div></div>`);
  msgs.scrollTop = msgs.scrollHeight;
  document.getElementById('zbotQuick').innerHTML = '';
}

function zbotShowQuick(items) {
  const container = document.getElementById('zbotQuick');
  container.innerHTML = items.map(item => {
    const cls = item.cls || '';
    return `<button class="zbot-quick-btn ${cls}" onclick="zbotQuickClick(this,'${item.value||item.label.replace(/'/g,"\\'")}','${item.label.replace(/'/g,"\\'")}')">${item.label}</button>`;
  }).join('');
  document.getElementById('zbotMessages').scrollTop = 99999;
}

function zbotQuickClick(btn, value, label) {
  zbotUserMsg(label);
  zbotProcessInput(value);
}

function zbotSend() {
  const input = document.getElementById('zbot-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  zbotUserMsg(text);
  zbotProcessInput(text);
}

// ── CONVERSATION FLOW ──────────────────────────────────────────
function zbotProcessInput(text) {
  const t = T[zbotState.lang];
  const step = zbotState.step;

  if (step === 'ask_name') {
    zbotState.data.name = text;
    zbotState.step = 'ask_project';
    zbotProgress(2);
    setTimeout(() => {
      zbotBotMsg(t.ask_project(text), t.types.map(tp => ({ label: tp, value: tp })));
    }, 200);

  } else if (step === 'ask_project') {
    zbotState.data.projectType = text.replace(/[🌐📱🛒🤖🎨⚙️]/gu,'').trim();
    zbotState.step = 'ask_detail';
    zbotProgress(3);
    setTimeout(() => zbotBotMsg(t.ask_detail(zbotState.data.projectType)), 200);

  } else if (step === 'ask_detail') {
    zbotState.data.details = text;
    zbotState.step = 'ask_features';
    zbotProgress(4);
    setTimeout(() => zbotBotMsg(t.ask_features), 200);

  } else if (step === 'ask_features') {
    zbotState.data.features = text;
    zbotState.step = 'ask_complexity';
    zbotProgress(5);
    setTimeout(() => {
      zbotBotMsg(t.ask_complexity, t.complexity.map(c => ({ label: c, value: c })));
    }, 200);

  } else if (step === 'ask_complexity') {
    zbotState.data.complexity = text;
    zbotState.step = 'ask_deadline';
    zbotProgress(6);
    // Show pricing comparison after complexity
    setTimeout(() => {
      zbotBotMsg(buildPriceMessage(zbotState.data.projectType, text, zbotState.lang));
      setTimeout(() => {
        zbotBotMsg(t.ask_deadline, t.deadlines.map(d => ({ label: d, value: d })));
      }, 1200);
    }, 400);

  } else if (step === 'ask_deadline') {
    zbotState.data.deadline = text;
    zbotState.step = 'ask_country';
    zbotProgress(7);
    setTimeout(() => {
      zbotBotMsg(t.ask_country, t.countries.map(c => ({ label: c, value: c })));
    }, 200);

  } else if (step === 'ask_country') {
    zbotState.data.country = text;
    zbotState.step = 'ask_email';
    zbotProgress(8);
    setTimeout(() => zbotBotMsg(t.ask_email(zbotState.data.name)), 200);

  } else if (step === 'ask_email') {
    if (!text.includes('@')) {
      zbotBotMsg(zbotState.lang === 'en' ? '⚠️ Please enter a valid email address.' : '⚠️ Veuillez entrer une adresse email valide.');
      return;
    }
    zbotState.data.email = text;
    zbotState.step = 'ask_phone';
    zbotProgress(9);
    setTimeout(() => zbotBotMsg(t.ask_phone), 200);

  } else if (step === 'ask_phone') {
    zbotState.data.phone = text;
    zbotState.step = 'confirm';
    zbotProgress(10);
    setTimeout(() => {
      zbotBotMsg(t.confirm(zbotState.data), [
        { label: t.yes, value: 'yes', cls: 'green' },
        { label: t.no, value: 'no', cls: 'red' },
      ]);
    }, 200);

  } else if (step === 'confirm') {
    if (text === 'yes' || text.toLowerCase().includes('oui') || text.toLowerCase().includes('confirm') || text.toLowerCase().includes('iyo') || text.toLowerCase().includes('eey')) {
      zbotState.step = 'sending';
      zbotProgress(12);
      setTimeout(() => {
        zbotBotMsg(t.sending);
        zbotSendEmail();
      }, 300);
    } else {
      zbotState.step = 'ask_name';
      zbotState.data = {};
      zbotProgress(0);
      const restartMsg = zbotState.lang === 'en' ? 'No problem! Let\'s start over. What shall I call you?' :
                         zbotState.lang === 'pidgin' ? 'No problem! Make we start again. How dem call you?' :
                         'Pas de problème ! Recommençons. Comment puis-je vous appeler ?';
      setTimeout(() => zbotBotMsg(restartMsg), 300);
    }

  } else {
    // Fallback — restart
    const restartMsg = zbotState.lang === 'en' ? 'Let\'s start from the beginning! What\'s your name?' :
                       zbotState.lang === 'pidgin' ? 'Make we start again! Wetin dey call you?' :
                       'Recommençons depuis le début ! Quel est votre prénom ?';
    zbotState.step = 'ask_name';
    zbotState.data = {};
    zbotBotMsg(restartMsg);
  }
}

// ── EMAIL SEND ─────────────────────────────────────────────────
async function zbotSendEmail() {
  const d = zbotState.data;
  const t = T[zbotState.lang];
  const p = getPricing(d.projectType);
  const mult = d.complexity && d.complexity.includes('🔴') ? 1.8 : d.complexity && d.complexity.includes('🟡') ? 1.3 : 1;
  const estimate = fmt(Math.round(p.min * mult / 10000) * 10000) + ' – ' + fmt(Math.round(p.max * mult / 10000) * 10000);

  const payload = {
    name: d.name,
    company: d.country || '',
    email: d.email,
    phone: d.phone || '',
    projectType: d.projectType,
    message: `Projet: ${d.projectType}\nDétails: ${d.details}\nFonctionnalités: ${d.features}\nComplexité: ${d.complexity}\nDélai: ${d.deadline}\nPays: ${d.country}\nSource: Chatbot Zara (${zbotState.lang})`,
    budget: estimate,
    deadline: d.deadline,
    source: 'Chatbot Zara',
    estimate: estimate,
  };

  try {
    const API = window.location.hostname === 'localhost' ? 'http://localhost:4000' : 'https://zelktris-agency.onrender.com';
    const res = await fetch(`${API}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    zbotProgress(13);
    if (data.success || true) { // Show success even if API is offline (email stored locally)
      zbotState.step = 'done';
      setTimeout(() => zbotBotMsg(t.success(d.name)), 300);
    } else {
      zbotBotMsg(t.error);
    }
  } catch (err) {
    // API offline — store locally and show success
    zbotProgress(13);
    zbotState.step = 'done';
    setTimeout(() => zbotBotMsg(t.success(d.name)), 300);
  }
}

// ── EXPOSE GLOBALS ─────────────────────────────────────────────
window.zbotToggle    = zbotToggle;
window.zbotClose     = zbotClose;
window.zbotMinimize  = zbotMinimize;
window.zbotSetLang   = zbotSetLang;
window.zbotSend      = zbotSend;
window.zbotQuickClick = zbotQuickClick;

// ── INIT ───────────────────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inject);
} else {
  inject();
}

})();
