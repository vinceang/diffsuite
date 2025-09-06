# DiffSuite - File Comparison Tool

A desktop file comparison application built with Angular and Tauri, similar to Beyond Compare. This application allows you to compare files side-by-side with syntax highlighting and diff visualization.

## Features

- 📁 File selection through native dialogs
- 🔍 Side-by-side file comparison
- 🎨 Syntax highlighting for multiple file types
- 📱 Cross-platform desktop application
- ⚡ Fast file reading with Rust backend

## Prerequisites

Before running this application, you need to install:

1. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
2. **Rust** (for Tauri development) - [Install here](https://rustup.rs/)

### Installing Rust

Run this command in your terminal:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

After installation, restart your terminal or run:

```bash
source ~/.cargo/env
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Development Mode

#### Option A: Angular Only (Web Development)
```bash
npm start
```

This runs the Angular application in development mode at `http://localhost:4200`.

#### Option B: Full Desktop Application
```bash
npm run tauri:dev
```

This builds and runs the complete desktop application with Tauri.

### 3. Build for Production

#### Angular Build
```bash
npm run build
```

#### Desktop Application Build
```bash
npm run tauri:build
```

## Project Structure

```
diffsuite/
├── src/                          # Angular frontend source
│   ├── app/
│   │   ├── diff-viewer/         # Main diff viewer component
│   │   ├── services/            # Angular services
│   │   └── ...
│   └── ...
├── src-tauri/                   # Rust backend source
│   ├── src/
│   │   ├── lib.rs              # Main Tauri app logic
│   │   └── main.rs
│   ├── Cargo.toml              # Rust dependencies
│   └── tauri.conf.json         # Tauri configuration
├── package.json                 # Node.js dependencies
└── README.md
```

## Available Scripts

- `npm start` - Start Angular development server
- `npm run build` - Build Angular for production
- `npm test` - Run Angular tests
- `npm run tauri:dev` - Start Tauri development mode
- `npm run tauri:build` - Build desktop application

## Technologies Used

- **Frontend**: Angular 20 (standalone components, signals)
- **Backend**: Rust with Tauri
- **Diff Engine**: CodeMirror Merge View
- **Styling**: SCSS
- **File Dialogs**: Tauri Dialog Plugin

## How to Use

1. Launch the application
2. Click "Select File 1" to choose the first file to compare
3. Click "Select File 2" to choose the second file to compare
4. The files will be displayed side-by-side with differences highlighted

## Development Notes

- The application uses Angular's latest features including standalone components and signals
- Tauri provides the desktop functionality and file system access
- CodeMirror handles the diff visualization and syntax highlighting
- The Rust backend handles file reading operations for security and performance

## Troubleshooting

### Rust/Cargo Not Found
If you get "cargo not found" errors, ensure Rust is properly installed:

```bash
rustc --version
cargo --version
```

If these commands fail, reinstall Rust following the prerequisites section.

### Build Issues
If you encounter build issues:

1. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
2. Check that all prerequisites are installed
3. Ensure you're using a supported Node.js version

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
