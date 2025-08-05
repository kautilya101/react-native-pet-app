# 🐾 PetList - React Native App

A simple React Native application to add, view, and manage a list of pets with image, name, breed, and age. Built with modern best practices using React Native, React Hook Form, Zod, and Expo.

---

## 🚀 How to Run the App

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/petlist-app.git
cd petlist-app
npm install
# or
yarn install
npx expo start
```

## Architecture
```bash
.
├── App.tsx
├── components/        # UI components like PetListItem, FAB, Modal
├── context/           # Global app state (petContext)
├── screens/           # Screen-level views
├── assets/            # App images/icons
└── utils/             # Helper functions
```

##Libraries Used

| Library                    | Purpose                                                 |
| -------------------------- | ------------------------------------------------------- |
| `expo`                     | Fast, zero-config development workflow for React Native |
| `react-hook-form`          | Form management                                         |
| `zod`                      | Schema-based form validation                            |
| `expo-image-picker`        | Allows picking images from camera or gallery            |
| `lucide-react-native`      | Icon system used across the app                         |