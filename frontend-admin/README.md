# Frontend d'Administration USSD

Interface d'administration professionnelle pour gérer les services USSD modulaires.

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+ installé
- Backend Spring Boot fonctionnel sur le port 8080

### Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur **http://localhost:3000**

### Connexion

Utilisez n'importe quel email et mot de passe pour vous connecter (l'authentification est actuellement simulée).

Par exemple :
- **Email** : `admin@test.com`
- **Mot de passe** : `password123`

## 📁 Structure du Projet

```
src/
├── app/              # Pages Next.js
│   ├── auth/        # Connexion et inscription
│   └── dashboard/   # Dashboard et gestion des services
├── components/       # Composants réutilisables
├── context/         # Contextes React
├── lib/             # Utilitaires et API
└── types/           # Types TypeScript
```

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env.local` :

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## 📝 Fonctionnalités

- ✅ Authentification (connexion/inscription)
- ✅ Dashboard avec statistiques
- ✅ Ajouter un service USSD (via JSON)
- ✅ Liste des services avec recherche
- ✅ Modifier un service
- ✅ Supprimer un service
- ✅ Toggle statut actif/inactif

## 🎨 Technologies

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling
- **Axios** - Appels API
- **React Icons** - Icônes
- **React Hot Toast** - Notifications

## 📡 API Backend

L'application communique avec le backend Spring Boot via les endpoints suivants :

- `GET /api/admin/services` - Liste des services
- `POST /api/admin/services` - Créer un service
- `PUT /api/admin/services/{code}` - Modifier un service
- `DELETE /api/admin/services/{code}` - Supprimer un service
- `PATCH /api/admin/services/{code}/status` - Toggle statut

## 📖 Documentation

Consultez le fichier [walkthrough.md](file:///C:/Users/njiki/.gemini/antigravity/brain/88a10a4d-9d30-4f29-9ba5-d1579627a977/walkthrough.md) pour une documentation complète avec captures d'écran.

## 🛠️ Scripts Disponibles

```bash
npm run dev       # Lancer en mode développement
npm run build     # Créer une version de production
npm run start     # Lancer la version de production
npm run lint      # Vérifier le code
```

## ⚠️ Notes Importantes

- L'authentification actuelle est **simulée**. Pour la production, implémentez une vraie authentification backend.
- Assurez-vous que le backend Spring Boot est lancé avant d'utiliser l'application.

## 📞 Support

Pour toute question, consultez :
- [Plan d'implémentation](file:///C:/Users/njiki/.gemini/antigravity/brain/88a10a4d-9d30-4f29-9ba5-d1579627a977/implementation_plan.md)
- [Documentation complète](file:///C:/Users/njiki/.gemini/antigravity/brain/88a10a4d-9d30-4f29-9ba5-d1579627a977/walkthrough.md)
