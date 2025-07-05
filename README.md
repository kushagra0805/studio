# M A Global Network - Cloud Services Website

This is a modern, full-stack website built with Next.js, React, TypeScript, and Tailwind CSS. It features a complete set of pages for a cloud services provider, including dynamic forms connected to a Firebase backend and an AI-powered chatbot.

## Prerequisites

Before you begin, ensure you have the following software installed on your local machine:

1.  **Node.js:** This project requires Node.js to run. We recommend installing the latest Long-Term Support (LTS) version. You can download it from [nodejs.org](https://nodejs.org/).
2.  **Code Editor:** A source-code editor is needed to view and edit the code. We highly recommend **Visual Studio Code (VS Code)** as it has excellent built-in support for TypeScript and JavaScript. You can download it from [code.visualstudio.com](https://code.visualstudio.com/).

---

## Getting Started: Running the Website Locally

Follow these steps to get the website running on your computer.

### Step 1: Set Up the Project Files

1.  Create a new folder on your computer to store the project (e.g., `ma-global-website`).
2.  Copy all the files and folders from this project into the new folder you just created.

### Step 2: Install Dependencies

1.  Open your code editor (e.g., VS Code).
2.  Go to `File > Open Folder` and select the project folder (`ma-global-website`).
3.  Open the integrated terminal in your code editor (in VS Code, you can use `Terminal > New Terminal` or the `Ctrl+` \` `` shortcut).
4.  In the terminal, run the following command to install all the necessary packages:
    ```bash
    npm install
    ```
    This command reads the `package.json` file and downloads all the required libraries into a `node_modules` folder.

### Step 3: Configure Environment Variables (API Keys)

The website needs API keys to connect to its backend services (Firebase and Google AI).

1.  Find the file named `.env.local.example` in the project.
2.  Make a copy of this file in the same directory and rename it to `.env`.
3.  Follow the instructions in the `required-apis.txt` file to get your API keys from Firebase and Google AI Studio.
4.  Paste your keys into the `.env` file. **This step is essential for the contact forms and AI chatbot to work.**

### Step 4: Run the Development Server

Now you are ready to start the website. Run the following command in your terminal:

```bash
npm run dev
```

This will start the local development server. You can now view your website by opening the following URL in your web browser:

**[http://localhost:9002](http://localhost:9002)**

Any changes you make to the code will automatically be reflected in the browser.

---

## Managing Website Images and Logos

Adding your own images and logos is simple:

-   **Logos:** Navigate to the `public/logos/` directory. You will find subfolders for `m-a-global` and `cloud-x`. Replace the placeholder SVG files in these folders with your own logos.
-   **Images:** Navigate to the `public/images/` directory. You will find subfolders for each major page (`home`, `about`, `products`, etc.). Replace the placeholder `.png` files with your own images.

The website code is already configured to use these file paths, so you do not need to make any code changes after replacing the images.

---

## Available Scripts

In the project directory, you can run:

-   `npm run dev`: Runs the app in development mode.
-   `npm run build`: Builds the app for production.
-   `npm start`: Starts a production server (after running `npm run build`).
-   `npm run lint`: Lints the code for potential errors.
