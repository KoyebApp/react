import React, { useState, useEffect } from 'react';
import { 
  Menu, Moon, Sun, Download, Hammer, ExternalLink, TrainFront, 
  BookHeart, BadgeInfo, ImageDown, Gamepad, Play, Music4, Palette, 
  Images, ShieldMinus, FileCode, TicketCheck, Database, Film, Search,
  X, CheckCircle, AlertCircle, Copy, Upload, Home, Github, Twitter,
  Linkedin, Mail, ArrowRight, Zap, Code, Shield, Globe
} from 'lucide-react';
import endpoints from './config/endpoints.js'
/*
// Import endpoints from external file (simulated here)
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
      responseType: "json",
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
*/

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

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [testingEndpoint, setTestingEndpoint] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(saved === 'dark' || (!saved && prefersDark));
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-blue-900/30 dark:to-purple-900/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-800 dark:text-blue-200 text-sm font-medium mb-6 animate-pulse">
              <Zap className="w-4 h-4 mr-2" />
              GenZ API Platform
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              NIXORACLE API
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              The ultimate API platform with 500+ endpoints. Built with TypeScript for reliability and speed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Explore APIs
                <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 text-gray-800 dark:text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Zap, label: "500+ Endpoints", value: "GenZ+FastZ", color: "blue" },
            { icon: Code, label: "Built with", value: "TypeScript+React", color: "purple" },
            { icon: Shield, label: "Secure & Reliable", value: "99.9% Uptime", color: "green" },
            { icon: Globe, label: "Estimated Response", value: "< 950ms", color: "orange" }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border-l-4 border-blue-500">
                <IconComponent className="w-8 h-8 text-blue-500 mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Features Grid */}
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
              className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer transform hover:-translate-y-3 transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 capitalize">
                {category} APIs
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                High-performance {category} endpoints with real-time processing
              </p>
              <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                Explore APIs
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">NIXORACLE API</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                The most comprehensive API testing platform with lightning-fast performance and enterprise-grade security.
              </p>
              <div className="flex space-x-4">
                <Github className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Linkedin className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Mail className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button 
                    onClick={() => setCurrentPage('home')} 
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage('api')} 
                    className="hover:text-white transition-colors"
                  >
                    API Testing
                  </button>
                </li>
                <li><a href="#" className="hover:text-white transition-colors">Frontend Apps</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tools</a></li>
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

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setResult(null);

      try {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
        
        setResult({
          status: 200,
          data: {
            success: true,
            message: "API test completed successfully",
            url: endpoint.responseType === 'buffer' ? "https://example.com/download/file.pdf" : null,
            data: { result: "Sample response data" }
          },
          responseType: endpoint.responseType
        });
      } catch (error) {
        setResult({
          status: 500,
          error: error.message
        });
      } finally {
        setLoading(false);
      }
    };

    const handleFileChange = (inputName, file) => {
      setFiles(prev => ({ ...prev, [inputName]: file }));
    };

    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{endpoint.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{endpoint.description}</p>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                method === 'GET' ? 'bg-green-500' :
                method === 'POST' ? 'bg-blue-500' :
                method === 'PUT' ? 'bg-yellow-500' :
                method === 'DELETE' ? 'bg-red-500' : 'bg-purple-500'
              }`}>{method}</span>
              <code className="px-2 py-1 bg-gray-100 dark:bg-gray-900 rounded text-sm">{endpoint.url}</code>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                endpoint.plan === 'free' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                endpoint.plan === 'pro' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
              }`}>{endpoint.plan.toUpperCase()}</span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900 rounded text-xs">{endpoint.responseType}</span>
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {endpoint.inputs.map(input => (
                <div key={input}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">
                    {input}:
                  </label>
                  {endpoint.requiresFormData && (input === 'file' || input === 'image') ? (
                    <div className="relative">
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(input, e.target.files[0])}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                      <Upload className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
                    </div>
                  ) : (
                    <input
                      type="text"
                      placeholder={`Enter ${input}`}
                      value={formData[input] || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, [input]: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  )}
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  API Key:
                </label>
                <input
                  type="text"
                  placeholder="Your API key"
                  value={formData.apikey || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, apikey: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  HTTP Method:
                </label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                  <option value="PATCH">PATCH</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Testing...' : 'Test API'}
                </button>
              </div>
            </form>

            {loading && (
              <div className="flex justify-center items-center py-8">
                <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-3 text-gray-600 dark:text-gray-400">Testing endpoint...</span>
              </div>
            )}

            {result && (
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                {result.status === 200 ? (
                  <div>
                    <div className="flex items-center text-green-600 dark:text-green-400 mb-3">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Success!
                    </div>
                    <pre className="bg-gray-900 text-green-400 p-3 rounded-lg overflow-auto text-sm max-h-64">
                      <code>{JSON.stringify(result.data, null, 2)}</code>
                    </pre>
                    {result.data.url && (
                      <div className="mt-4 flex gap-2">
                        <a
                          href={result.data.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg text-center hover:bg-purple-700 transition-colors"
                        >
                          <Download className="w-4 h-4 inline mr-2" />
                          Download
                        </a>
                        <button
                          onClick={() => copyToClipboard(JSON.stringify(result.data, null, 2))}
                          className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          <Copy className="w-4 h-4 inline mr-2" />
                          Copy JSON
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center text-red-600 dark:text-red-400 mb-3">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Error!
                    </div>
                    <p className="text-red-600 dark:text-red-400">{result.error}</p>
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
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
          <div className="flex items-center mb-6">
            {React.createElement(categoryIcons[selectedCategory], { className: "w-6 h-6 mr-3" })}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
              {selectedCategory} Endpoints
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Method</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Endpoint</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Response</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Plan</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Description</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Parameters</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {endpoints[selectedCategory].map((endpoint, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        endpoint.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {endpoint.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{endpoint.name}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                        endpoint.method === 'GET' ? 'bg-green-500' :
                        endpoint.method === 'POST' ? 'bg-blue-500' :
                        endpoint.method === 'PUT' ? 'bg-yellow-500' :
                        endpoint.method === 'DELETE' ? 'bg-red-500' : 'bg-purple-500'
                      }`}>
                        {endpoint.method}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <code className="px-2 py-1 bg-gray-100 dark:bg-gray-900 rounded text-sm">{endpoint.url}</code>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-red-100 dark:bg-red-900 rounded text-xs">
                        {endpoint.responseType}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        endpoint.plan === 'free' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        endpoint.plan === 'pro' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      }`}>
                        {endpoint.plan.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{endpoint.description}</td>
                    <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-500 font-mono">
                      {endpoint.inputs.join(', ')}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setTestingEndpoint(endpoint)}
                        disabled={endpoint.status !== 'active'}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                      >
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
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Select a Category</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Choose a category from the sidebar to view available endpoints</p>
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Menu className="w-4 h-4 mr-2" />
              Open Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 shadow-lg">
          <div className="flex justify-between items-center px-4 h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="flex items-center space-x-2 text-xl font-semibold focus:outline-none hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Menu className="w-6 h-6" />
                <span>Menu</span>
              </button>
              <div className="hidden md:flex items-center space-x-6">
                <button 
                  onClick={() => setCurrentPage('home')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'home' 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Home className="w-4 h-4 inline mr-2" />
                  Home
                </button>
                <button 
                  onClick={() => setCurrentPage('api')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'api' 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  API Testing
                </button>
              </div>
            </div>

            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50">
            <div 
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setSidebarOpen(false)}
            ></div>
            <nav className="fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-800 shadow-2xl transform transition-transform duration-300 overflow-y-auto">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Categories</h2>
                  <button 
                    onClick={() => setSidebarOpen(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-4 space-y-2">
                {Object.keys(categoryIcons).map(category => {
                  const IconComponent = categoryIcons[category];
                  const isActive = selectedCategory === category;
                  const hasEndpoints = endpoints[category];
                  
                  return (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage('api');
                        setSidebarOpen(false);
                      }}
                      disabled={!hasEndpoints}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 shadow-md' 
                          : hasEndpoints
                            ? 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                            : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      <IconComponent className={`w-6 h-6 ${
                        isActive 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : hasEndpoints 
                            ? 'text-gray-600 dark:text-gray-400'
                            : 'text-gray-400 dark:text-gray-600'
                      }`} />
                      <span className="font-medium capitalize text-lg">
                        {category}
                        {!hasEndpoints && ' (Coming Soon)'}
                      </span>
                      {hasEndpoints && (
                        <span className="ml-auto bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-xs">
                          {endpoints[category].length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="pt-16 min-h-screen">
          {currentPage === 'home' ? <HomePage /> : (
            <div className="max-w-7xl mx-auto p-6">
              <APIsPage />
            </div>
          )}
        </main>

        {/* Test Modal */}
        {testingEndpoint && (
          <TestModal 
            endpoint={testingEndpoint} 
            onClose={() => setTestingEndpoint(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default App;
