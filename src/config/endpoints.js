export const endpoints = {
  download: [
    { 
      name: "YouTube Audio", 
      method: "GET", 
      inputs: ["url"], 
      url: "/api/dl/ytmp3",
      status: "active",
      description: "Download audio from YouTube videos in MP3 format",
      responseType: "json",
      plan: "free",
      requiresFormData: false
    },
    { 
      name: "File Upload", 
      method: "POST", 
      inputs: ["file"], 
      url: "/api/upload",
      status: "active",
      description: "Upload and process files",
      responseType: "json",
      plan: "pro",
      requiresFormData: true
    }
  ],
  videos: [
    { 
      name: "YouTube Video", 
      method: "GET", 
      inputs: ["url"], 
      url: "/api/video/yt",
      status: "active",
      description: "Download YouTube Shorts in video format",
      responseType: "json",
      plan: "free",
      requiresFormData: false
    },
    { 
      name: "YouTube Audio", 
      method: "GET", 
      inputs: ["url"], 
      url: "/api/audio/yt",
      status: "active",
      description: "Download YouTube Shorts in audio format",
      responseType: "json",
      plan: "free",
      requiresFormData: false
    },
    { 
      name: "Twitter Video", 
      method: "GET", 
      inputs: ["url"], 
      url: "/api/video/twitter",
      status: "active",
      description: "Download Twitter videos from urls",
      responseType: "json",
      plan: "free",
      requiresFormData: false
    },
    { 
      name: "Likee Video", 
      method: "GET", 
      inputs: ["url"], 
      url: "/api/video/likee",
      status: "active",
      description: "Download Likee videos from urls",
      responseType: "json",
      plan: "free",
      requiresFormData: false
    },
    { 
      name: "Insta Video", 
      method: "GET", 
      inputs: ["url"], 
      url: "/api/dl/instagram",
      status: "active",
      description: "Download Instagram videos from urls",
      responseType: "json",
      plan: "free",
      requiresFormData: false
    },
    { 
      name: "Threads Video", 
      method: "GET", 
      inputs: ["url"], 
      url: "/api/video/threads",
      status: "active",
      description: "Download Threads by Instagram videos from urls",
      responseType: "json",
      plan: "free",
      requiresFormData: false
    },
    { 
      name: "Tiktok Video", 
      method: "GET", 
      inputs: ["url"], 
      url: "/api/video/tiktok",
      status: "active",
      description: "Download TikTok videos from urls",
      responseType: "json",
      plan: "free",
      requiresFormData: false
    },
    { 
      name: "Tiktok Video", 
      method: "GET", 
      inputs: ["url"], 
      url: "/api/dl/tiktok",
      status: "active",
      description: "Download TikTok videos from urls",
      responseType: "json",
      plan: "free",
      requiresFormData: false
    }
  ],
  tools: [
    { 
      name: "Fancy Text", 
      method: "GET", 
      inputs: ["text"], 
      url: "/api/text/style",
      status: "active",
      description: "Convert text to stylized formats",
      responseType: "json",
      plan: "free",
      requiresFormData: false
    },
    { 
      name: "Morse Text", 
      method: "GET", 
      inputs: ["text"], 
      url: "/api/text/morse",
      status: "active",
      description: "Convert text to Morse format",
      responseType: "json",
      plan: "free",
      requiresFormData: false
    },
    { 
      name: "Reverse Text", 
      method: "GET", 
      inputs: ["text"], 
      url: "/api/text/reverse",
      status: "active",
      description: "Convert text to Reverse format",
      responseType: "json",
      plan: "free",
      requiresFormData: false
    },
    { 
      name: "Google Translate", 
      method: "GET", 
      inputs: ["text", "lang"], 
      url: "/api/translate",
      status: "active",
      description: "Translate any text to any language",
      responseType: "json",
      plan: "free",
      requiresFormData: false
    },
    { 
      name: "Microsoft Translate", 
      method: "GET", 
      inputs: ["text", "to"], 
      url: "/api/ms/translate",
      status: "active",
      description: "Translate any text to any language",
      responseType: "json",
      plan: "free",
      requiresFormData: false
    },
    { 
      name: "Define Word", 
      method: "GET", 
      inputs: ["word"], 
      url: "/api/tools/define",
      status: "active",
      description: "Get complete definition of any word",
      responseType: "json",
      plan: "free",
      requiresFormData: false
    },
    { 
      name: "SS Web", 
      method: "GET", 
      inputs: ["url"], 
      url: "/api/web/screenshot",
      status: "active",
      description: "Get screenshot of any given  destination ",
      responseType: "stream",
      plan: "free",
      requiresFormData: false
    },
    { 
      name: "SS Pc", 
      method: "GET", 
      inputs: ["url"], 
      url: "/api/pc/screenshot",
      status: "active",
      description: "Get pc screen size screenshot of any destination",
      responseType: "buffer",
      plan: "free",
      requiresFormData: false
    },
    { 
      name: "Genrate QR", 
      method: "GET", 
      inputs: ["text"], 
      url: "/api/generate/qr",
      status: "active",
      description: "Generate Qr Code from any text",
      responseType: "stream",
      plan: "free",
      requiresFormData: false
    },
    { 
      name: "Define Word", 
      method: "GET", 
      inputs: ["word"], 
      url: "/api/tools/define",
      status: "active",
      description: "Get complete definition of any word",
      responseType: "json",
      plan: "free",
      requiresFormData: false
    },
    { 
      name: "Maker TTP", 
      method: "GET", 
      inputs: ["text"], 
      url: "/api/maker/ttp",
      status: "active",
      description: "Convert text to stylized image format",
      responseType: "json",
      plan: "free",
      requiresFormData: false
    }
  ]
};

export default endpoints;
