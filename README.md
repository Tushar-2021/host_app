# Frontend UI

This repository contains the frontend codebase for the **Host App**, consisting of three main modules: **Chat**, **Email**, and **Host**. Each module is a separate React project with its own dependencies and configurations.

## 📁 Folder Structure

```
frontend_ui/
├── chat/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── package-lock.json
│   └── webpack.config.js
├── email/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── package-lock.json
│   └── webpack.config.js
└── host/
    ├── node_modules/
    ├── public/
    ├── src/
    ├── package.json
    ├── package-lock.json
    └── webpack.config.js
```

### 🔍 Module Descriptions
- **Chat:** Handles real-time messaging functionality.
- **Email:** Manages email-based communications.
- **Host:** The core module, integrating Chat and Email components.

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Git

### Installation
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Tushar-2021/host_app.git
   cd frontend_ui
   ```
2. **Install Dependencies:**
   For each module:
   ```bash
   cd chat && npm install
   cd ../email && npm install
   cd ../host && npm install
   ```

### Running the Projects
Start the development server for each module:
```bash
# For Chat Module
cd chat
npm start

# For Email Module
cd ../email
npm start

# For Host Module
cd ../host
npm start
```

Each module will run on a different local port (typically starting from `http://localhost:3000`).

## ⚙️ Build for Production
To create optimized production builds:
```bash
cd chat && npm run build
cd ../email && npm run build
cd ../host && npm run build
```

## 📦 Deployment
Push changes to the `Sharma` branch (or the appropriate branch):
```bash
git add .
git commit -m "Your commit message"
git push origin Sharma
```

## 📝 .gitignore
Unnecessary files like `node_modules`, build artifacts, environment files, and logs are excluded from version control. Check the `.gitignore` file for details.

## 🤝 Contributing
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## 📄 License
This project is licensed under the [MIT License](LICENSE).

## 📧 Contact
For questions, feel free to reach out at tushar9837shr@gmail.com

