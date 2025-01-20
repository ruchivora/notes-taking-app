# Notes App

## Overview
The Notes App is a user-friendly application designed to streamline the process of writing, formatting, and managing notes. It includes advanced features to ensure an efficient and enjoyable user experience.

## Pages
1. **/**
   - Displays a list of all saved notes.
   - Enables users to view, edit, and delete notes, with an additional option to view glossary for the created note. 

2. **/createNote**
   - Provides a form to create a new note.
   - Includes options for rich text editing, password protection

3. **/editNote**
   - Enables editing of existing notes.
   - Retains original formatting and password protection settings.

----
## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **Redux**: Used for state management, ensuring scalability and predictable state updates.
- **Local Storage**: Stores notes persistently in the browser.
- **GPT API**: Powers the glossary feature to enhance note content with   AI-generated suggestions.

---

## Features

1. **Create, Edit, and Delete Notes**
   - Users can easily manage their notes with intuitive interfaces.

2. **Password Protection with Encryption**
   - Secure sensitive notes with password-based encryption to ensure privacy.

3. **Rich Text Editor**
   - Format text with bold, italic, underline, and alignment options.

4. **AI Glossary Feature**
   - Generate glossary terms for notes using GPT API for added context and information.

---

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd notes-taking-app
   ```
3. Install dependencies:
   ```bash
   npm install
4. Run the app
    ```bash
    npm run dev  