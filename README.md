# J.A.R.V.I.K.S (Just Another Rather Very Intelligent Kantega Service)

The application is a monstrosity(frontend made by a Data Scientist) trying to simulate something looking like chatGPT. 
It allows the user to communicate with OPENAIs GPT model through a chat interface or through speech.

### Project Goal
This project was made as a learning experience to get insight into various OPENAI APIs, such as:
- Whisper [https://platform.openai.com/docs/guides/speech-to-text]
- Functional [https://platform.openai.com/docs/guides/gpt/function-calling]
- Chat Completion [https://platform.openai.com/docs/guides/gpt/chat-completions-api]

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)

## Prerequisites

- Node.js and npm: Ensure you have Node.js and npm installed. If not, you can download them [here](https://nodejs.org/).

## Getting Started

To get a local copy up and running, follow these simple steps:

1. **Clone the repository**:

2. **Install Dependencies**:

   ```bash
    cd jarviks
    npm install
    ```
3. **Add Secrets**:

    This project utilizes dotenv for environment variable management. Ensure you create a `.env` file in the server directory and populate it with the required environment variables. The primary required key is `OPENAI_API_KEY`.

4. **Run the Project**:
    
    Run both server and client from the root using:
    ```bash
    npm start
    ```
    Alternatively, run the server and client individually:
    ```bash
    cd server
    npm start
    ```
    ```bash
    cd client
    npm start
    ```
4. **Development**:
    
    With the npm start command, both the client and server codes are set to hot reload. They will automatically reflect changes made to the codebase.

    __Note:__ When you modify the code, the current GPT context will be reset.

## Project Structure
- `/client`: This directory contains the React frontend application.
- `/server`: This directory contains the Node.js backend.

## Want to give the Bot new superpowers?
Check out ./server/README.md to see how one can add new functions to the GPT context

