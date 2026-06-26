import { asciiAvatar } from './constants';

// A central place for all data
export const config = {
  name: 'Isbat',

  // Main role
  role: 'Backend Engineer',

  // Rotating role sequences
  heroSequence: [
    'Backend Developer.',
    2000,
    'Software Engineer.',
    2000,
    'System Builder.',
    2000,
  ],

  // About me content
  about: {
    title: '// 02. About_Me',
    avatar: asciiAvatar,
    // Content for the [ INFO ] tab
    info: {
      EXPERIENCE: '2+ Years',
      MAIN_FOCUS: 'Backend & System Architecture',
      METHODOLOGY: [
        'Version Control (Git)',
        'Modular Design',
        'API-first Development',
      ],
      ARCHITECTURE: ['Microservices', 'RESTful APIs', 'Client-Server Model'],
      CURRENTLY_LEARNING: [
        'Operating Systems',
        'Systems Programming',
        'Golang',
      ],
    },
    // Content for the [ STACK ] tab
    stack: {
      Languages: ['JavaScript', 'TypeScript', 'Python', 'C', 'Go'],
      Backend: ['Node.js', 'Express', 'Django'],
      Databases: ['PostgreSQL', 'Redis', 'MongoDB'],
      Frontend: ['React', 'Next.js', 'Redux', 'Tailwind'],
      Tools: ['Docker', 'Git', 'Linux'],
    },
    // Content for the [ BIO ] tab
    bio: "Backend engineer focused on APIs, developer tools, and understanding how things work at the system level. I work primarily with Node.js, PostgreSQL, and Redis, and lately I've been going deeper into systems programming — memory, processes, and how the OS works under the hood. Outside of code — books, long walks, and music.",
  },

  // Project details
  projects: [
    {
      title: 'NodeChess',
      description:
        'A real-time multiplayer chess web app with matchmaking, built using WebSockets and a Node.js backend. Redis for live game state and session caching, PostgreSQL for persistence.',
      tags: [
        'Node.js',
        'WebSocket',
        'Express',
        'React',
        'Redis',
        'PostgreSQL',
        'Docker',
      ],
      githubUrl: 'https://github.com/15b4t/nodechess',
      demoUrl: 'https://node-chess.netlify.app/',
    },
    {
      title: 'create-x-lite',
      description:
        'A modern, interactive CLI for scaffolding production-ready Express.js projects. Inspired by create-vite.',
      tags: ['Node.js', 'JavaScript', 'CLI', 'Express', 'TypeScript'],
      githubUrl: 'https://github.com/15b4t/create-x-lite',
      demoUrl: 'https://www.npmjs.com/package/create-x-lite',
    },
    {
      title: 'imalloc',
      description:
        'A custom memory allocator written in C. Implements a first-fit free list, block splitting, forward and backward coalescing, sbrk-based heap growth, and mmap for large allocations.',
      tags: ['C', 'Systems Programming', 'Memory Management', 'Low-level'],
      githubUrl: 'https://github.com/15b4t/imalloc',
      demoUrl: '',
    },
    {
      title: 'ishell',
      description:
        'A Unix shell built from scratch in C. Supports pipelines, I/O redirection, background processes, quote parsing, and builtin commands. POSIX only.',
      tags: ['C', 'Unix', 'Linux', 'Shell', 'Systems Programming'],
      githubUrl: 'https://github.com/15b4t/ishell',
      demoUrl: '',
    },
    {
      title: 'Codenotes',
      description:
        'A browser-based coding notebook with a sandboxed JS runtime powered by esbuild-wasm. Import any npm library, render React components inline, and write markdown notes alongside code.',
      tags: ['React', 'TypeScript', 'esbuild', 'Redux', 'NPM'],
      githubUrl: 'https://github.com/15b4t/codenotes',
      demoUrl: 'https://www.npmjs.com/package/@isbat/codenotes',
    },
    {
      title: 'Draftcraft',
      description:
        'A collaborative online design tool with real-time chat, cursors, and reactions, built using Next.js and Liveblocks for a seamless multi-user experience.',
      tags: ['Next.js', 'TypeScript', 'Liveblocks', 'TailwindCSS', 'Fabric.js'],
      githubUrl: 'https://github.com/15b4t/draftcraft',
      demoUrl: 'https://draftcraft.vercel.app/',
    },
    {
      title: 'Warehouse Wizard',
      description:
        'An inventory management web app using the MERN stack, allowing users to add, delete, and edit products, with Cloudinary integration for media.',
      tags: ['Node.js', 'Express', 'React', 'MongoDB', 'Cloudinary'],
      githubUrl: 'https://github.com/15b4t/Warehouse-Wizard',
      demoUrl: 'https://warehouse-wizard.vercel.app/',
    },
  ],

  // Contact
  contact: {
    title: '// 03. ESTABLISH_CONTACT',
    subtitle: 'Select a secure channel to dispatch your transmission.',
    links: {
      github: {
        url: 'https://github.com/15b4t',
        label: '[github_profile]',
      },
      linkedin: {
        url: 'https://www.linkedin.com/in/isbat-bin-hossain/',
        label: '[linkedin_network]',
      },
      email: {
        url: 'mailto:isbatbinhossain@gmail.com',
        label: '[secure_email_protocol]',
      },
    },
  },
};
