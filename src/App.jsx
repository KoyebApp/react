import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, Moon, Sun, Download, Hammer, ExternalLink, TrainFront, 
  BookHeart, BadgeInfo, ImageDown, Gamepad, Play, Music4, Palette, 
  Images, ShieldMinus, FileCode, TicketCheck, Database, Film, Search,
  X, CheckCircle, AlertCircle, Copy, Upload, Home, Github, Twitter,
  Linkedin, Mail, ArrowRight, Zap, Code, Shield, Globe, Eye, EyeOff,
  Activity, Wifi, WifiOff, Link, FileText, Image as ImageIcon,
  Video, Headphones, Archive, Plus
} from 'lucide-react';

// Simulated endpoints data (replace with your actual import)
const endpoints = {
  download: [
    { 
      name: "YouTube Audio", 
      method: "GET", 
      inputs: ["url"], 
      url: "/api/dl/ytmp3",
      status: "active",
      description: "Download audio from YouTube videos in MP3 format",
      responseType: "json",
      plan: "free"
    },
    { 
      name: "YouTube Video", 
      method: "GET", 
      inputs: ["url", "format"], 
      url: "/api/dl/ytmp4",
      status: "active",
      description: "Download YouTube videos in MP4 format with quality options",
      responseType: "stream",
      plan: "free"
    },
    { 
      name: "Mediafire File", 
      method: "POST", 
      inputs: ["url"], 
      url: "/api/dl/mediafire",
      status: "active",
      description: "Download files from Mediafire links",
      responseType: "buffer",
      plan: "pro",
      requiresFormData: true
    }
  ],
  tools: [
    {
      name: "QR Code Generator",
      method: "POST",
      inputs: ["text"],
      url: "/api/tools/qr",
      status: "active",
      description: "Generate QR codes from text",
      responseType: "json",
      plan: "free"
    }
  ]
};

const categoryIcons = {
  download: Download,
  tools: Hammer,
  shortner: ExternalLink,
  islamic: Moon,
  ai: TrainFront,
  quotes: BookHeart,
  information: BadgeInfo,
  images: ImageDown,
  apps: Gamepad,
  videos: Play,
  music: Music4,
  ephoto: Palette,
  makers: Images,
  encoder: ShieldMinus,
  decoder: FileCode,
  validator: TicketCheck,
  generator: Database,
  anime: Film,
  search: Search
};

// Modern animated toggle switch component
const ModernToggle = ({ isOn, onToggle, icons, labels }) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`relative inline-flex items-center w-16 h-8 rounded-full transition-all duration-500 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300/30 ${
          isOn 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30' 
            : 'bg-gradient-to-r from-gray-400 to-gray-500 shadow-lg shadow-gray-400/30'
        }`}
      >
        <div
          className={`absolute top-1 left-1 w-6 h-6 rounded-full transition-all duration-500 ease-in-out transform bg-white shadow-lg flex items-center justify-center ${
            isOn ? 'translate-x-8 rotate-180' : 'translate-x-0 rotate-0'
          }`}
        >
          {isOn ? (
            <icons[1] className="w-3 h-3 text-purple-600" />
          ) : (
            <icons[0] className="w-3 h-3 text-gray-600" />
          )}
        </div>
      </button>
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
        <span className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {isOn ? labels[1] : labels[0]}
        </span>
      </div>
    </div>
  );
};

// Modern hamburger menu button
const ModernMenuButton = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg hover:shadow-xl transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300/30 transition-all duration-300 flex items-center justify-center group"
    >
      <div className="relative w-6 h-6 flex flex-col justify-center items-center">
        <span
          className={`block absolute h-0.5 w-6 bg-white transform transition-all duration-500 ease-in-out rounded-full ${
            isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
          }`}
        />
        <span
          className={`block absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out rounded-full ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <span
          className={`block absolute h-0.5 w-6 bg-white transform transition-all duration-500 ease-in-out rounded-full ${
            isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
          }`}
        />
      </div>
      <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
    </button>
  );
};

// Response type badge with different colors
const ResponseTypeBadge = ({ type }) => {
  const getTypeConfig = (responseType) => {
    switch(responseType) {
      case 'json':
        return { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-800 dark:text-green-200', icon: FileText };
      case 'buffer':
        return { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-800 dark:text-blue-200', icon: Archive };
      case 'stream':
        return { bg: 'bg-purple-100 dark:bg-purple-900', text: 'text-purple-800 dark:text-purple-200', icon: Activity };
      default:
        return { bg: 'bg-gray-100 dark:bg-gray-900', text: 'text-gray-800 dark:text-gray-200', icon: FileText };
    }
  };

  const config = getTypeConfig(type);
  const IconComponent = config.icon;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <IconComponent className="w-3 h-3 mr-1" />
      {type.toUpperCase()}
    </span>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [testingEndpoint, setTestingEndpoint] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const sidebarRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(saved === 'dark' || (!saved && prefersDark));
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-blue-900/30 dark:to-purple-900/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-800 dark:text-blue-200 text-sm font-medium mb-6 animate-bounce">
              <Zap className="w-4 h-4 mr-2" />
              GenZ API Platform
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-pulse">
              NIXORACLE API
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              The ultimate API platform with 500+ endpoints. Built with TypeScript for reliability and speed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-500"
              >
                <span className="flex items-center justify-center">
                  Explore APIs
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </button>
              <button className="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 text-gray-800 dark:text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-2 hover:scale-105 transition-all duration-500">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards with animations */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Zap, label: "500+ Endpoints", value: "GenZ+FastZ", color: "blue" },
            { icon: Code, label: "Built with", value: "TypeScript", color: "purple" },
            { icon: Shield, label: "Secure & Reliable", value: "99.9% Uptime", color: "green" },
            { icon: Globe, label: "Estimated Response", value: "< 950ms", color: "orange" }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 border-l-4 border-blue-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <IconComponent className="w-8 h-8 text-blue-500 mb-3 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Grid with staggered animations */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Platform Features</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Everything you need for API testing and integration</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(categoryIcons).slice(0, 9).map(([category, IconComponent], index) => (
            <div 
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage('api');
              }}
              className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer transform hover:-translate-y-4 hover:scale-105 transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 relative overflow-hidden"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 capitalize">
                  {category} APIs
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  High-performance {category} endpoints with real-time processing
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  Explore APIs
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">NIXORACLE API</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                The most comprehensive API testing platform with lightning-fast performance and enterprise-grade security.
              </p>
              <div className="flex space-x-4">
                {[Github, Twitter, Linkedin, Mail].map((Icon, index) => (
                  <Icon 
                    key={index}
                    className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transform hover:scale-125 hover:-translate-y-1 transition-all duration-300" 
                  />
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                {['Documentation', 'API Reference', 'Tutorials', 'Support'].map((link, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button 
                    onClick={() => setCurrentPage('home')} 
                    className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage('api')} 
                    className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    API Testing
                  </button>
                </li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Frontend Apps</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Tools</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2025 NixOracle. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );

  const TestModal = ({ endpoint, onClose }) => {
    const [formData, setFormData] = useState({});
    const [files, setFiles] = useState({});
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [method, setMethod] = useState(endpoint.method);
    const [inputType, setInputType] = useState('form'); // 'form', 'json'
    const [jsonInput, setJsonInput] = useState('');
    const [showApiKey, setShowApiKey] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setResult(null);

      try {
        // Simulate API call with proper delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate different response types
        let mockResponse;
        if (endpoint.responseType === 'json') {
          mockResponse = {
            status: 200,
            data: {
              success: true,
              message: "API test completed successfully",
              result: {
                processed: true,
                timestamp: new Date().toISOString(),
                data: inputType === 'json' ? JSON.parse(jsonInput || '{}') : formData
              }
            },
            responseType: endpoint.responseType
          };
        } else if (endpoint.responseType === 'buffer') {
          mockResponse = {
            status: 200,
            data: {
              success: true,
              message: "File ready for download",
              downloadUrl: "https://example.com/download/file.pdf",
              fileSize: "1.2MB",
              format: "PDF"
            },
            responseType: endpoint.responseType
          };
        } else if (endpoint.responseType === 'stream') {
          mockResponse = {
            status: 200,
            data: {
              success: true,
              message: "Stream available",
              streamUrl: "https://example.com/stream/video.mp4",
              duration: "00:05:23",
              quality: "HD"
            },
            responseType: endpoint.responseType
          };
        }
        
        setResult(mockResponse);
      } catch (error) {
        setResult({
          status: 500,
          error: error.message,
          responseType: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    const copyToClipboard = async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        // You could add a toast notification here
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };

    const generateFullURL = () => {
      const baseUrl = window.location.origin;
      const queryParams = new URLSearchParams();
      
      // Add form data or JSON data
      if (inputType === 'form') {
        Object.entries(formData).forEach(([key, value]) => {
          if (value && key !== 'apikey') queryParams.append(key, value);
        });
      }
      
      // Add API key if provided
      if (formData.apikey) {
        queryParams.append('apikey', formData.apikey);
      }
      
      const fullUrl = `${baseUrl}${endpoint.url}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      return fullUrl;
    };

    const downloadResponse = (data, filename, type = 'application/json') => {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Activity className="w-6 h-6 mr-3 text-blue-600" />
                  {endpoint.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{endpoint.description}</p>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:rotate-90"
              >
                <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            
            {/* Endpoint info badges */}
            <div className="flex items-center gap-3 mt-4 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                method === 'GET' ? 'bg-green-500' :
                method === 'POST' ? 'bg-blue-500' :
                method === 'PUT' ? 'bg-yellow-500' :
                method === 'DELETE' ? 'bg-red-500' : 'bg-purple-500'
              }`}>{method}</span>
              
              <code className="px-3 py-1 bg-gray-100 dark:bg-gray-900 rounded-lg text-sm font-mono border">
                {endpoint.url}
              </code>
              
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                endpoint.plan === 'free' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                endpoint.plan === 'pro' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
              }`}>{endpoint.plan.toUpperCase()}</span>
              
              <ResponseTypeBadge type={endpoint.responseType} />
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Input Type Toggle */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Input Type:</span>
                <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setInputType('form')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      inputType === 'form' 
                        ? 'bg-blue-500 text-white shadow-lg transform scale-105' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    Form Data
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputType('json')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      inputType === 'json' 
                        ? 'bg-blue-500 text-white shadow-lg transform scale-105' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    JSON
                  </button>
                </div>
              </div>

              {/* Form Inputs */}
              {inputType === 'form' ? (
                <div className="space-y-4">
                  {endpoint.inputs.map(input => (
                    <div key={input} className="group">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {input}:
                      </label>
                      {endpoint.requiresFormData && (input === 'file' || input === 'image') ? (
                        <div className="relative">
                          <input
                            type="file"
                            onChange={(e) => setFiles(prev => ({ ...prev, [input]: e.target.files[0] }))}
                            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-300/30 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-300"
                          required
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                    <FileCode className="w-4 h-4 mr-2" />
                    JSON Input:
                  </label>
                  <textarea
                    placeholder='{"key": "value"}'
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    rows={8}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-300/30 focus:border-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm transition-all duration-300 hover:border-blue-300"
                  />
                </div>
              )}

              {/* API Key Input */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  API Key:
                </label>
                <div className="relative">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    placeholder="Your API key"
                    value={formData.apikey || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, apikey: e.target.value }))}
                    className="w-full px-4 py-3 pr-12 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-300/30 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-blue-500 transition-colors duration-300"
                  >
                    {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* HTTP Method Selector */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  HTTP Method:
                </label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-300/30 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-300"
                >
                  {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* URL Copy Section */}
              <div className="group p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-blue-200 dark:border-gray-700">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <Link className="w-4 h-4 mr-2" />
                  Complete URL:
                </label>
                <div className="flex gap-2">
                  <code className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-mono break-all">
                    {generateFullURL()}
                  </code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(generateFullURL())}
                    className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                    title="Copy URL"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium disabled:opacity-50 transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Testing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Activity className="w-5 h-5 mr-2" />
                      Test API
                    </span>
                  )}
                </button>
              </div>
            </form>

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col justify-center items-center py-12 space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full"></div>
                  <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                </div>
                <div className="text-center">
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Testing endpoint...</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Please wait while we process your request</p>
                </div>
              </div>
            )}

            {/* Results Section */}
            {result && (
              <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 animate-fadeIn">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {result.status === 200 ? (
                      <div className="flex items-center text-green-600 dark:text-green-400">
                        <CheckCircle className="w-6 h-6 mr-3" />
                        <span className="text-lg font-semibold">Success!</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600 dark:text-red-400">
                        <AlertCircle className="w-6 h-6 mr-3" />
                        <span className="text-lg font-semibold">Error!</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      result.status === 200 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {result.status}
                    </span>
                    <ResponseTypeBadge type={result.responseType} />
                  </div>
                </div>

                {result.status === 200 ? (
                  <div className="space-y-4">
                    {/* Response Preview */}
                    <div className="bg-gray-900 dark:bg-black rounded-xl p-4 overflow-hidden">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-green-400 font-mono text-sm">Response:</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => copyToClipboard(JSON.stringify(result.data, null, 2))}
                            className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                            title="Copy Response"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => downloadResponse(result.data, `response-${Date.now()}.json`)}
                            className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                            title="Download Response"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <pre className="text-green-400 text-sm overflow-auto max-h-64 font-mono">
                        <code>{JSON.stringify(result.data, null, 2)}</code>
                      </pre>
                    </div>

                    {/* Special handling for different response types */}
                    {result.responseType === 'buffer' && result.data.downloadUrl && (
                      <div className="flex gap-3">
                        <a
                          href={result.data.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl text-center font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          <Download className="w-5 h-5 inline mr-2" />
                          Download File ({result.data.fileSize})
                        </a>
                      </div>
                    )}

                    {result.responseType === 'stream' && result.data.streamUrl && (
                      <div className="flex gap-3">
                        <a
                          href={result.data.streamUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-6 py-3 rounded-xl text-center font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          <Play className="w-5 h-5 inline mr-2" />
                          Open Stream ({result.data.duration})
                        </a>
                        <button
                          onClick={() => copyToClipboard(result.data.streamUrl)}
                          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
                          title="Copy Stream URL"
                        >
                          <Copy className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-xl">
                    <p className="text-red-600 dark:text-red-400 font-medium">{result.error}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const APIsPage = () => (
    <div className="space-y-6">
      {selectedCategory && endpoints[selectedCategory] ? (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              {React.createElement(categoryIcons[selectedCategory], { 
                className: "w-8 h-8 mr-4 text-blue-600 dark:text-blue-400" 
              })}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">
                  {selectedCategory} Endpoints
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {endpoints[selectedCategory].length} endpoints available
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                endpoints[selectedCategory].some(e => e.status === 'active')
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                  : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
              }`}>
                <Activity className="w-4 h-4 mr-2" />
                {endpoints[selectedCategory].filter(e => e.status === 'active').length} Active
              </span>
            </div>
          </div>
          
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Method</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Endpoint</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Response</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Plan</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Description</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Parameters</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {endpoints[selectedCategory].map((endpoint, index) => (
                  <tr 
                    key={index} 
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-800 transition-all duration-300"
                  >
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                        endpoint.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 shadow-green-200/50' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 shadow-red-200/50'
                      }`}>
                        {endpoint.status === 'active' ? <Wifi className="w-3 h-3 mr-1" /> : <WifiOff className="w-3 h-3 mr-1" />}
                        {endpoint.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">
                      {endpoint.name}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                        endpoint.method === 'GET' ? 'bg-green-500 shadow-green-200/50' :
                        endpoint.method === 'POST' ? 'bg-blue-500 shadow-blue-200/50' :
                        endpoint.method === 'PUT' ? 'bg-yellow-500 shadow-yellow-200/50' :
                        endpoint.method === 'DELETE' ? 'bg-red-500 shadow-red-200/50' : 'bg-purple-500 shadow-purple-200/50'
                      }`}>
                        {endpoint.method}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <code className="px-3 py-1 bg-gray-100 dark:bg-gray-900 rounded-lg text-sm font-mono border border-gray-200 dark:border-gray-700">
                        {endpoint.url}
                      </code>
                    </td>
                    <td className="py-4 px-6">
                      <ResponseTypeBadge type={endpoint.responseType} />
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                        endpoint.plan === 'free' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 shadow-green-200/50' :
                        endpoint.plan === 'pro' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 shadow-blue-200/50' :
                        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 shadow-purple-200/50'
                      }`}>
                        {endpoint.plan.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400 max-w-xs">
                      <div className="truncate" title={endpoint.description}>
                        {endpoint.description}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-500 font-mono">
                      <div className="flex flex-wrap gap-1">
                        {endpoint.inputs.map((param, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs"
                          >
                            {param}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => setTestingEndpoint(endpoint)}
                        disabled={endpoint.status !== 'active'}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg disabled:shadow-none"
                      >
                        <Activity className="w-4 h-4 inline mr-2" />
                        Test
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
              <Search className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Select a Category</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              Choose a category from the sidebar to explore available endpoints and start testing APIs
            </p>
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Menu className="w-5 h-5 mr-3" />
              Explore Categories
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        {/* Modern Header */}
        <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg border-b border-gray-200/20 dark:border-gray-700/20">
          <div className="flex justify-between items-center px-6 h-20">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <ModernMenuButton 
                  isOpen={sidebarOpen}
                  onClick={() => setSidebarOpen(true)}
                />
                <div className="hidden md:block">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    NIXORACLE
                  </h1>
                </div>
              </div>
              
              <div className="hidden lg:flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                <button 
                  onClick={() => setCurrentPage('home')}
                  className={`px-6 py-3 rounded-lg transition-all duration-300 font-medium ${
                    currentPage === 'home' 
                      ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-lg transform scale-105' 
                      : 'hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <Home className="w-4 h-4 inline mr-2" />
                  Home
                </button>
                <button 
                  onClick={() => setCurrentPage('api')}
                  className={`px-6 py-3 rounded-lg transition-all duration-300 font-medium ${
                    currentPage === 'api' 
                      ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-lg transform scale-105' 
                      : 'hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <Activity className="w-4 h-4 inline mr-2" />
                  API Testing
                </button>
              </div>
            </div>

            <ModernToggle 
              isOn={darkMode}
              onToggle={() => setDarkMode(!darkMode)}
              icons={[Sun, Moon]}
              labels={['Light', 'Dark']}
            />
          </div>
        </header>

        {/* Modern Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50">
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setSidebarOpen(false)}
            />
            <nav 
              ref={sidebarRef}
              className="fixed top-0 left-0 h-full w-96 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-500 overflow-y-auto border-r border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="p-8 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    API Categories
                  </h2>
                  <button 
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:rotate-90"
                  >
                    <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Explore our comprehensive API collection
                </p>
              </div>
              
              <div className="p-6 space-y-3">
                {Object.keys(categoryIcons).map((category, index) => {
                  const IconComponent = categoryIcons[category];
                  const isActive = selectedCategory === category;
                  const hasEndpoints = endpoints[category];
                  
                  return (
                    <button
                      key={category}
                      onClick={() => {
                        if (hasEndpoints) {
                          setSelectedCategory(category);
                          setCurrentPage('api');
                          setSidebarOpen(false);
                        }
                      }}
                      disabled={!hasEndpoints}
                      className={`w-full flex items-center gap-4 px-6 py-4 text-left rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl shadow-blue-500/25' 
                          : hasEndpoints
                            ? 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                            : 'text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50 border border-gray-200 dark:border-gray-700'
                      }`}
                      style={{
                        animationDelay: `${index * 50}ms`
                      }}
                    >
                      <div className={`p-3 rounded-xl ${
                        isActive 
                          ? 'bg-white/20' 
                          : hasEndpoints 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                            : 'bg-gray-300 dark:bg-gray-600'
                      }`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold capitalize text-lg block">
                          {category}
                        </span>
                        <span className="text-sm opacity-75">
                          {hasEndpoints ? `${endpoints[category].length} endpoints` : 'Coming Soon'}
                        </span>
                      </div>
                      {hasEndpoints && !isActive && (
                        <ArrowRight className="w-5 h-5 opacity-60 group-hover:translate-x-1 transition-transform duration-300" />
                      )}
                    </button>
                  );
                })}
              </div>
              
              <div className="p-6 mt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Check our documentation for detailed API guides
                  </p>
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Documentation
                  </button>
                </div>
              </div>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="pt-20 min-h-screen">
          {currentPage === 'home' ? <HomePage /> : (
            <div className="max-w-7xl mx-auto p-6">
              <APIsPage />
            </div>
          )}
        </main>

        {/* Modern Test Modal */}
        {testingEndpoint && (
          <TestModal 
            endpoint={testingEndpoint} 
            onClose={() => setTestingEndpoint(null)} 
          />
        )}

        {/* Custom CSS for animations */}
        <style jsx global>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideUp {
            from { 
              opacity: 0; 
              transform: translateY(30px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          
          @keyframes slideInRight {
            from { 
              opacity: 0; 
              transform: translateX(100%); 
            }
            to { 
              opacity: 1; 
              transform: translateX(0); 
            }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
          }
          
          .animate-slideUp {
            animation: slideUp 0.5s ease-out forwards;
          }
          
          .animate-slideInRight {
            animation: slideInRight 0.5s ease-out forwards;
          }
          
          /* Smooth scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #2563eb, #7c3aed);
          }
          
          /* Custom backdrop blur for older browsers */
          .backdrop-blur-xl {
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
          }
          
          .backdrop-blur-sm {
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
          }
          
          .backdrop-blur-lg {
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
          }
          
          /* Hover effects */
          .group:hover .group-hover\\:scale-110 {
            transform: scale(1.1);
          }
          
          .group:hover .group-hover\\:rotate-12 {
            transform: rotate(12deg);
          }
          
          .group:hover .group-hover\\:translate-x-1 {
            transform: translateX(0.25rem);
          }
          
          .group:hover .group-hover\\:translate-x-2 {
            transform: translateX(0.5rem);
          }
          
          /* Loading animation improvements */
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .animate-spin {
            animation: spin 1s linear infinite;
          }
          
          /* Pulse animation improvements */
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          
          .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          
          /* Bounce animation */
          @keyframes bounce {
            0%, 100% {
              transform: translateY(-25%);
              animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
            }
            50% {
              transform: translateY(0);
              animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
            }
          }
          
          .animate-bounce {
            animation: bounce 1s infinite;
          }
          
          /* Enhanced gradient text */
          .bg-gradient-to-r {
            background-image: linear-gradient(to right, var(--tw-gradient-stops));
          }
          
          .bg-clip-text {
            -webkit-background-clip: text;
            background-clip: text;
          }
          
          .text-transparent {
            color: transparent;
          }
          
          /* Enhanced shadows */
          .shadow-2xl {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }
          
          .dark .shadow-2xl {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          }
          
          /* Enhanced transitions */
          .transition-all {
            transition-property: all;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .duration-300 {
            transition-duration: 300ms;
          }
          
          .duration-500 {
            transition-duration: 500ms;
          }
          
          /* Form input focus states */
          input:focus, textarea:focus, select:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
          
          .dark input:focus, .dark textarea:focus, .dark select:focus {
            border-color: #60a5fa;
            box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
          }
          
          /* Enhanced button states */
          button:active {
            transform: scale(0.98);
          }
          
          button:disabled {
            pointer-events: none;
          }
          
          /* Table hover effects */
          tbody tr:hover {
            transform: translateX(4px);
          }
          
          /* Smooth height transitions */
          .transition-height {
            transition: height 0.3s ease-in-out;
          }
          
          /* Enhanced gradients */
          .bg-gradient-to-br {
            background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
          }
          
          /* Mobile responsiveness improvements */
          @media (max-width: 768px) {
            .sidebar-mobile {
              width: 90vw;
            }
            
            .modal-mobile {
              margin: 1rem;
              width: calc(100vw - 2rem);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default App;
