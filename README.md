# AI-Powered Video Script Generator

## Project Overview
This project is an AI-powered video script generator built using React, Vite, and Node.js for the backend. It leverages the https://x.ai/api to dynamically generate scripts based on user inputs. The application supports diverse input types, including text, documents, images, and links, making it a versatile tool for content creators.

## Features
- **Dynamic Input Handling**:
  - Enter prompts as text.
  - Upload documents and images, extracting meaningful text to enhance prompts.
  - Input external links to fetch metadata or text content.
- **AI Script Generation**:
  - Uses the https://x.ai/api to generate scripts dynamically.
  - Displays generated scripts below the input field in real time.
- **File Handling**:
  - Extract text from uploaded .txt and .pdf files.
  - Optionally use OCR for extracting text from images.
- **Save and Retrieve Scripts**:
  - Save generated scripts for future use.
  - View previously saved scripts.
- **Responsive Design**:
  - Works seamlessly on both mobile and desktop devices.

## Bonus Features
- **Interactive File Parsing**:
  - Preview extracted content from files and choose what to include in the prompt.
- **Script Library**:
  - Pagination and search functionality for managing saved scripts.
- **Multi-Language Support**:
  - Generate scripts in multiple languages.
- **Export Options**:
  - Download generated scripts as .txt or .pdf files.

## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add the API key for https://x.ai/api and other required configurations.

## Usage
To start the development server:
```bash
npm run dev
```

To build the project for production:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Folder Structure
```
project 3/
├── public/             # Static assets
├── src/                # Source code
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── styles/         # Tailwind and custom styles
│   └── ...             # Other source files
├── server/             # Backend/server logic
│   ├── api/            # API integration and handlers
│   └── ...             # Additional server-side code
├── index.html          # Entry HTML file
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── package.json        # Project metadata and dependencies
└── ...
```

## Technologies Used
- **React**: For building the user interface.
- **Vite**: A fast build tool for modern web applications.
- **Tailwind CSS**: Utility-first CSS framework.
- **Node.js**: Backend runtime environment.
- **ESLint**: For linting JavaScript code.
- **https://x.ai/api**: For AI-powered script generation.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any improvements or fixes.

## License
This project is licensed under the MIT License. See `LICENSE` for more information.

