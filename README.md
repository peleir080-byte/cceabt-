# 📚 CCEABT - Documentation

## 🎯 Vue d'Ensemble du Projet

Site web professionnel pour le CCEABT (Conseil de Concertation pour l'Eau et l'Assainissement de Base au Togo).
Le projet est un site web statique en **React** (Vite).

La collecte de données partenaires se fait désormais simplement via un lien vers **Google Forms**.

---

## 🚀 Démarrage Rapide

### Développement Local

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`.

### Build pour Production

```bash
npm run build
```

Cela génère un dossier `dist/` contenant les fichiers statiques prêts à être hébergés.

---

## 🌐 URLs du Projet (Local)

- Frontend : http://localhost:5173
- Admin : http://localhost:5173/cceabtadmin
- Portail Partenaire : http://localhost:5173/portal

---

## 🔐 Configuration Admin

Les identifiants par défaut pour le panneau d'administration sont :

- **Email** : `admin@cceabt.org`
- **Mot de passe** : `admin123`

⚠️ **Important** : Ces identifiants sont définis dans le code frontend (`Admin.tsx`) et ne sont pas stockés en base de données pour cette version statique.

---

## 🛠️ Technologies Utilisées

- **React** + **TypeScript** : Interface utilisateur
- **Vite** : Build tool ultra-rapide
- **Tailwind CSS** : Styling moderne
- **Lucide React** : Icônes
- **Framer Motion** : Animations

---

## 📁 Structure du Projet

```
CCEABT/
├── src/                       # Code source Frontend
│   ├── pages/
│   │   ├── Admin.tsx         # Dashboard admin
│   │   ├── PartnerPortal.tsx # Portail partenaire (lien Google Forms)
│   │   └── ...
│   ├── components/           # Composants réutilisables
│   ├── context/              # Gestion d'état (DataContext)
│   └── ...
├── public/                    # Fichiers publics (images, .htaccess)
└── README.md                  # Ce fichier
```

---

## 📞 Support

Pour toute question technique concernant le site, contactez l'équipe technique.
