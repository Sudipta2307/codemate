# TerminalX - Virtual Terminal Emulator

TerminalX is a web-based virtual terminal emulator built with Next.js and React. It provides a realistic terminal experience directly in your browser with support for common Unix-like commands and natural language processing.

## Features

- **Virtual File System**: Simulated file system with directories and files
- **Terminal Commands**: Support for common terminal commands like ls, cd, mkdir, rm, cat, etc.
- **Natural Language Processing**: Interpret natural language commands like "show me the files" or "create a folder named 'src'"
- **Command History**: Navigate through previously executed commands using arrow keys
- **Tab Completion**: Auto-complete commands and file/directory names
- **Responsive Design**: Works on desktop and mobile devices

## Available Commands

- `help` - Show available commands
- `clear` - Clear the terminal screen
- `ls` - List directory contents
- `cd <directory>` - Change current directory
- `pwd` - Print working directory
- `mkdir <dirname>` - Create a new directory
- `rm <filename>` - Remove a file or empty directory
- `cat <filename>` - Display file contents
- `echo <text>` - Display text
- `whoami` - Print current user
- `date` - Display current date and time
- `cpu` - Show mock CPU usage
- `memory` - Show mock memory usage
- `ps` - Show mock process list

## Natural Language Support

You can also use natural language commands:
- "show me the files"
- "go to the folder named 'documents'"
- "create a folder called 'src'"
- "delete the file 'README.md'"
- "display the content of 'config.json'"

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Project Structure

- `app/page.jsx` - Main page component
- `app/components/Terminal.jsx` - Core terminal component with all functionality
- `app/globals.css` - Global styles

## How to Use

1. Start the development server with `npm run dev`
2. Visit http://localhost:3001 in your browser
3. Use terminal commands or natural language to interact with the virtual file system
4. Try commands like:
   - `ls` to list files
   - `cd documents` to navigate
   - `cat README.md` to view file contents
   - "show me the files" (natural language)

## Customization

You can customize the virtual file system by modifying the `fileSystem` state in `app/components/Terminal.jsx`. Add or remove files and directories as needed for your specific use case.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
