import React from "react";
import { Search, ChevronDown, LogIn } from "lucide-react";

// Card Component
const Card = ({ children, className }) => {
  return (
    <div className={`bg-white rounded-xl shadow ${className}`}>{children}</div>
  );
};

// CardContent Component
const CardContent = ({ children, className }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

// Input Component
const Input = ({ type, placeholder, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`border rounded-md px-3 py-2 ${className}`}
    />
  );
};

// Button Component
const Button = ({ children, variant = "default", size = "md", className }) => {
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-200",
  };
  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
  };

  return (
    <button
      className={`rounded-lg ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

const RedditPageClone = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <h1 className="text-xl font-bold text-orange-600">Reddit</h1>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Search Reddit"
              className="w-64 px-4"
            />
            <Button variant="ghost">
              <Search className="w-5 h-5" />
            </Button>
          </div>
          <Button variant="ghost">
            <LogIn className="w-5 h-5 mr-1" /> Log In
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 flex space-x-6">
        {/* Sidebar */}
        <aside className="w-64 bg-white rounded-xl shadow p-4">
          <nav>
            <ul>
              <li className="font-semibold text-gray-700 mb-4">Home</li>
              <li className="font-semibold text-gray-700 mb-4">Popular</li>
              <li className="text-gray-500 mb-2">Topics</li>
              <li className="text-gray-700">Internet Culture</li>
              <li className="text-gray-700">Games</li>
              <li className="text-gray-700">Q&As</li>
              <li className="text-gray-700">Technology</li>
              <li className="text-gray-700">Pop Culture</li>
              <li className="text-gray-700">Movies & TV</li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="col-span-2">
              <CardContent className="flex justify-between items-center">
                <h2 className="font-bold text-lg">Beyoncé wins first AOTY</h2>
                <Button variant="ghost" size="sm">
                  <ChevronDown className="w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h2 className="font-bold text-lg">Santorini earthquakes</h2>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h2 className="font-bold text-lg">67th Grammy Awards</h2>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h2 className="font-bold text-lg">Luka Dončić on trade</h2>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6">
            <h2 className="font-bold text-xl mb-4">Manifestation 😘</h2>
            <Card>
              <CardContent className="p-4 bg-gray-100 rounded-lg">
                <img
                  src="https://via.placeholder.com/500"
                  alt="Meme example"
                  className="rounded-md mx-auto"
                />
                <p className="mt-4 text-center text-sm text-gray-600">
                  Ek din shaadi ke baad mai nahate hue towel lena bhul jaunga aur
                  apni biwi se towel mangunga fir wo aayegi aur mai
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Popular Communities */}
        <aside className="w-64 bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold text-gray-700 mb-4">Popular Communities</h3>
          <ul className="space-y-2">
            <li className="text-blue-500">/r/explainlikeimfive</li>
            <li className="text-blue-500">/r/IAmA</li>
            <li className="text-blue-500">/r/classicwow</li>
            <li className="text-blue-500">/r/Instagram</li>
            <li className="text-blue-500">/r/NintendoSwitch</li>
          </ul>
        </aside>
      </main>
    </div>
  );
};

export default RedditPageClone;
