import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, X, Clock, FileText, Cpu, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'device' | 'rule' | 'job' | 'template' | 'page';
  url: string;
  icon: React.ReactNode;
}

interface SearchProps {
  className?: string;
  onResultClick?: (result: SearchResult) => void;
}

const GlobalSearch = ({ className, onResultClick }: SearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Temperature sensors",
    "HVAC rules",
    "Building A devices"
  ]);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock search data
  const searchData: SearchResult[] = [
    {
      id: "device-1",
      title: "Temperature Sensor A",
      description: "Building A - Floor 1 environmental monitoring",
      type: "device",
      url: "/devices",
      icon: <Cpu className="w-4 h-4" />
    },
    {
      id: "rule-1", 
      title: "High Temperature Alert",
      description: "Trigger when temperature exceeds 30°C",
      type: "rule",
      url: "/rules",
      icon: <Settings className="w-4 h-4" />
    },
    {
      id: "template-1",
      title: "Environmental Sensor Template",
      description: "Template for temperature and humidity sensors",
      type: "template", 
      url: "/device-templates",
      icon: <FileText className="w-4 h-4" />
    },
    {
      id: "page-devices",
      title: "Devices",
      description: "Manage and monitor your IoT devices",
      type: "page",
      url: "/devices",
      icon: <Cpu className="w-4 h-4" />
    },
    {
      id: "page-analytics",
      title: "Analytics",
      description: "Analyze telemetry data and device performance",
      type: "page",
      url: "/analytics",
      icon: <FileText className="w-4 h-4" />
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setQuery("");
      }
      
      // Global search shortcut Ctrl/Cmd + K
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    // Add to recent searches
    setRecentSearches(prev => {
      const updated = [result.title, ...prev.filter(s => s !== result.title)].slice(0, 5);
      return updated;
    });
    
    setIsOpen(false);
    setQuery("");
    onResultClick?.(result);
    
    // Navigate to result URL (you might want to use react-router here)
    window.location.href = result.url;
  };

  const handleRecentClick = (recent: string) => {
    setQuery(recent);
    inputRef.current?.focus();
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'device':
        return 'bg-primary';
      case 'rule':
        return 'bg-device-warning';
      case 'job':
        return 'bg-device-online';
      case 'template':
        return 'bg-purple-500';
      case 'page':
        return 'bg-muted';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div ref={searchRef} className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          placeholder="Search devices, rules, jobs... (⌘K)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 p-0 shadow-elevated z-50 max-h-96 overflow-hidden">
          <div className="p-4">
            {query.length === 0 ? (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-3">Recent Searches</h3>
                <div className="space-y-2">
                  {recentSearches.map((recent, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentClick(recent)}
                      className="flex items-center space-x-2 w-full p-2 text-left hover:bg-muted rounded-md transition-colors"
                    >
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{recent}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-3">
                  {results.length} Result{results.length !== 1 ? 's' : ''}
                </h3>
                <div className="space-y-1 max-h-80 overflow-y-auto">
                  {results.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className="flex items-center space-x-3 w-full p-3 text-left hover:bg-muted rounded-md transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        {result.icon}
                        <Badge variant="outline" className={cn("text-xs", getTypeColor(result.type))}>
                          {result.type}
                        </Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{result.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{result.description}</p>
                      </div>
                    </button>
                  ))}
                  
                  {results.length === 0 && (
                    <div className="text-center py-6 text-muted-foreground">
                      <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No results found for "{query}"</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default GlobalSearch;