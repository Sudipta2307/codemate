"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Folder, File, Cpu, MemoryStick, Terminal as TerminalIcon, History, Server } from 'lucide-react';

const Terminal = () => {
  const initialWelcomeMessage = (
    <>
      <div key="welcome-1" className="flex items-center gap-2">
        <TerminalIcon className="w-6 h-6 text-accent" />
        <h1 className="text-2xl font-bold">Welcome to TerminalX</h1>
      </div>
      <div key="welcome-2" className="mt-2">
        Based on Next.js & DaisyUI. Type <span className="font-bold text-accent">'help'</span> to see available commands.
      </div>
      <div key="welcome-3" className="opacity-50">
        System time: {new Date().toLocaleString()}
      </div>
      <div key="welcome-4" className="mb-4"></div>
    </>
  );

  const [history, setHistory] = useState([initialWelcomeMessage]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [commandHistoryIndex, setCommandHistoryIndex] = useState(-1);

  const [fileSystem, setFileSystem] = useState({
    home: {
      user: {
        'README.md': '## Welcome to my terminal!\n\nType help to see available commands.\n\nThis is a virtual file system. You can create files and directories, but nothing is saved permanently.',
        documents: {
          'project-plan.txt': 'Milestone 1: Build the core terminal.\nMilestone 2: Add advanced features like autocomplete.'
        },
        'secret.txt': 'The secret is... there is no secret. 🤫',
        'image.jpg': 'This is a mock image file.',
      }
    },
    'system.log': 'System boot successful. All services started.',
    'config.json': '{ "theme": "dark", "user": "user" }'
  });

  const [currentPath, setCurrentPath] = useState('home/user');

  const inputRef = useRef(null);
  const terminalBodyRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
    console.log("History updated:", history);
  }, [history]);

  const getPathObject = (path, fs = fileSystem) => {
    if (path === '') return fs;
    const parts = path.split('/').filter(p => p);
    let current = fs;
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return null;
      }
    }
    return current;
  };

  const updateFileSystem = (path, newDirName) => {
    const newFileSystem = JSON.parse(JSON.stringify(fileSystem));
    const parentDir = getPathObject(path, newFileSystem);
    if (parentDir && typeof parentDir === 'object') {
      parentDir[newDirName] = {};
      setFileSystem(newFileSystem);
      console.log("FileSystem updated: mkdir", newDirName, "at", path);
      return true;
    }
    return false;
  };
  
  const removeFromFileSystem = (path, targetName) => {
    const newFileSystem = JSON.parse(JSON.stringify(fileSystem));
    const parentDir = getPathObject(path, newFileSystem);
    if (parentDir && typeof parentDir === 'object' && parentDir[targetName]) {
      delete parentDir[targetName];
      setFileSystem(newFileSystem);
      console.log("FileSystem updated: rm", targetName, "from", path);
      return true;
    }
    return false;
  };

  const handleHelp = () => {
    const commands = {
      help: 'Shows this help message.',
      clear: 'Clears the terminal screen.',
      ls: 'Lists directory contents.',
      cd: 'Changes the current directory.',
      pwd: 'Prints the current working directory.',
      mkdir: 'Creates a new directory.',
      rm: 'Removes a file or empty directory.',
      cat: 'Displays the content of a file.',
      echo: 'Displays a line of text.',
      whoami: 'Prints the current user.',
      date: 'Displays the current date and time.',
      cpu: 'Shows mock CPU usage.',
      memory: 'Shows mock memory usage.',
      ps: 'Shows mock process list.',
    };
    return (
      <div>
        <p className="mb-2 font-bold">Available commands:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1">
          {Object.entries(commands).map(([cmd, desc]) => (
            <div key={cmd} className="flex">
              <span className="w-24 text-accent font-semibold">{cmd}</span>
              <span className="text-gray-400">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleClear = () => {
    setHistory([initialWelcomeMessage]);
  };

  const handleLs = () => {
    const currentDir = getPathObject(currentPath);
    if (!currentDir || typeof currentDir !== 'object') {
      return ls: cannot access '${currentPath}': No such file or directory;
    }
    const entries = Object.keys(currentDir);
    if (entries.length === 0) return '';

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-1">
        {entries.map(entry => {
          const isDir = typeof currentDir[entry] === 'object';
          return (
            <div key={entry} className="flex items-center gap-2 hover:bg-base-content/10 rounded-sm px-1">
              {isDir ? <Folder className="w-4 h-4 text-info" /> : <File className="w-4 h-4 text-base-content/70" />}
              <span className={isDir ? 'text-info font-medium' : ''}>{entry}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const handleCd = (args) => {
    const target = args[0] || 'home/user';
    let newPath;

    if (target.startsWith('/')) {
      newPath = target.substring(1);
    } else if (target === '~') {
      newPath = 'home/user';
    } else {
      const currentParts = currentPath === '' ? [] : currentPath.split('/');
      const targetParts = target.split('/');
      for (const part of targetParts) {
        if (part === '..') {
          currentParts.pop();
        } else if (part !== '.') {
          currentParts.push(part);
        }
      }
      newPath = currentParts.join('/');
    }

    const targetObj = getPathObject(newPath);
    if (targetObj && typeof targetObj === 'object') {
      setCurrentPath(newPath);
      console.log("Path changed to:", newPath);
      return '';
    } else if (targetObj) {
      return cd: not a directory: ${target};
    } else {
      return cd: no such file or directory: ${target};
    }
  };

  const handlePwd = () => /${currentPath};

  const handleMkdir = (args) => {
    if (!args[0]) return 'mkdir: missing operand';
    const dirName = args[0];
    const currentDir = getPathObject(currentPath);
    if (currentDir[dirName]) return mkdir: cannot create directory '${dirName}': File exists;
    if (updateFileSystem(currentPath, dirName)) return '';
    return mkdir: cannot create directory '${dirName}': Permission denied;
  };

  const handleRm = (args) => {
    if (!args[0]) return 'rm: missing operand';
    const targetName = args[0];
    const currentDir = getPathObject(currentPath);
    if (!currentDir || !currentDir[targetName]) return rm: cannot remove '${targetName}': No such file or directory;
    const target = currentDir[targetName];
    if (typeof target === 'object' && Object.keys(target).length > 0) {
      return rm: cannot remove '${targetName}': Directory not empty;
    }
    if (removeFromFileSystem(currentPath, targetName)) return '';
    return rm: cannot remove '${targetName}': Permission denied;
  };

  const handleCat = (args) => {
    if (!args[0]) return 'cat: missing operand';
    const fileName = args[0];
    const currentDir = getPathObject(currentPath);
    const fileContent = currentDir ? currentDir[fileName] : undefined;
    if (fileContent === undefined) return cat: ${fileName}: No such file or directory;
    if (typeof fileContent === 'object') return cat: ${fileName}: Is a directory;
    return <pre className="whitespace-pre-wrap">{fileContent}</pre>;
  };

  const handleEcho = (args) => args.join(' ');
  const handleWhoami = () => 'user';
  const handleDate = () => new Date().toString();
  const handleCpu = () => <div className="flex items-center gap-2"><Cpu className="w-4 h-4 text-warning"/> CPU Usage: ${(Math.random() * 15 + 5).toFixed(2)}%</div>;
  const handleMemory = () => <div className="flex items-center gap-2"><MemoryStick className="w-4 h-4 text-info"/> Memory: ${(Math.random() * 4096 + 2048).toFixed(0)}MB / 8192MB</div>;
  const handlePs = () => (
    <pre className="text-xs">
      {'PID\tTTY\tTIME\t\tCMD\n'}
      {'1\t?\t00:00:01\t/sbin/init\n'}
      {'1337\tpts/0\t00:00:00\t-bash\n'}
      {'1350\tpts/0\t00:00:00\tps'}
    </pre>
  );

  const processCommand = (commandString) => {
    const [command, ...args] = commandString.split(/\s+/);
    console.log(Processing command: '${command}' with args:, args);

    switch (command) {
      case 'help': return handleHelp();
      case 'clear': handleClear(); return null;
      case 'ls': return handleLs();
      case 'cd': return handleCd(args);
      case 'pwd': return handlePwd();
      case 'mkdir': return handleMkdir(args);
      case 'rm': return handleRm(args);
      case 'cat': return handleCat(args);
      case 'echo': return handleEcho(args);
      case 'whoami': return handleWhoami();
      case 'date': return handleDate();
      case 'cpu': return handleCpu();
      case 'memory': return handleMemory();
      case 'ps': return handlePs();
      default: return command not found: ${command};
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const command = e.target.value.trim();
      const prompt = user@nextjs:~/${currentPath}$;
      const commandLine = (
        <div className="flex w-full">
          <span className="text-success">{prompt}</span>
          <span className="pl-2">{command}</span>
        </div>
      );

      if (command) {
        const output = processCommand(command);
        setHistory(prev => [...prev, commandLine, ...(output !== null ? [output] : [])]);
        if (command !== commandHistory[0]) {
          setCommandHistory(prev => [command, ...prev]);
        }
        setCommandHistoryIndex(-1);
      } else {
        setHistory(prev => [...prev, commandLine]);
      }
      e.target.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistoryIndex < commandHistory.length - 1) {
        const newIndex = commandHistoryIndex + 1;
        setCommandHistoryIndex(newIndex);
        e.target.value = commandHistory[newIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistoryIndex >= 0) {
        const newIndex = commandHistoryIndex - 1;
        setCommandHistoryIndex(newIndex);
        e.target.value = newIndex >= 0 ? commandHistory[newIndex] : '';
      }
    }
  };

  return (
    <div 
      className="mockup-code w-full h-full max-w-6xl mx-auto my-4 shadow-2xl bg-base-300/80 backdrop-blur-sm border border-base-content/10"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={terminalBodyRef} className="h-[calc(100%-2.5rem)] overflow-y-auto px-4 pb-4">
        {history.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="my-1"
          >
            {line}
          </motion.div>
        ))}
      </div>
      <div className="flex items-center px-4 h-10 border-t border-base-content/10">
        <span className="text-success">{user@nextjs:~/${currentPath}$}</span>
        <input
          ref={inputRef}
          type="text"
          className="bg-transparent border-none focus:ring-0 focus:outline-none w-full text-inherit pl-2 cursor-blink"
          onKeyDown={handleKeyDown}
          autoFocus
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default Terminal;
