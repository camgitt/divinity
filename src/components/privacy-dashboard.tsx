import { useState } from "react";
import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Shield,
  Lock,
  Eye,
  Download,
  Trash2,
  Database,
  FileText,
  Cookie,
  Bell,
  MapPin,
  Users,
  MessageSquare,
  Heart,
  AlertTriangle,
  CheckCircle2,
  Info,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface PrivacyDashboardProps {
  onNavigate?: (page: string) => void;
  onBack?: () => void;
}

export function PrivacyDashboard({ onNavigate, onBack }: PrivacyDashboardProps) {
  // Privacy Settings State
  const [analyticsEnabled, setAnalyticsEnabled] = useState(() => {
    try {
      return localStorage.getItem('divinityagi_analytics_enabled') !== 'false';
    } catch {
      return true;
    }
  });

  const [marketingEnabled, setMarketingEnabled] = useState(() => {
    try {
      return localStorage.getItem('divinityagi_marketing_enabled') !== 'false';
    } catch {
      return true;
    }
  });

  const [locationEnabled, setLocationEnabled] = useState(() => {
    try {
      return localStorage.getItem('divinityagi_location_enabled') === 'true';
    } catch {
      return false;
    }
  });

  const [showDataModal, setShowDataModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataExport, setDataExport] = useState<any>(null);

  // Calculate data stored
  const getStoredDataSize = () => {
    try {
      let totalSize = 0;
      for (let key in localStorage) {
        if (key.startsWith('divinityagi_')) {
          totalSize += localStorage.getItem(key)?.length || 0;
        }
      }
      // Convert to KB
      return (totalSize / 1024).toFixed(2);
    } catch {
      return '0';
    }
  };

  const getDataCategories = () => {
    const categories = [];
    
    if (localStorage.getItem('divinityagi_user')) {
      categories.push({ name: 'Profile Data', icon: Users, color: '#7A4FFF' });
    }
    if (localStorage.getItem('divinityagi_chat_history')) {
      categories.push({ name: 'Chat History', icon: MessageSquare, color: '#2196F3' });
    }
    if (localStorage.getItem('divinityagi_journal_entries')) {
      categories.push({ name: 'Journal Entries', icon: FileText, color: '#FFD369' });
    }
    if (localStorage.getItem('divinityagi_spiritual_goals')) {
      categories.push({ name: 'Spiritual Goals', icon: Heart, color: '#4CAF50' });
    }
    if (localStorage.getItem('divinityagi_saved_guides')) {
      categories.push({ name: 'Saved Guides', icon: Users, color: '#FF9800' });
    }
    
    return categories;
  };

  const handleToggleAnalytics = (enabled: boolean) => {
    setAnalyticsEnabled(enabled);
    localStorage.setItem('divinityagi_analytics_enabled', String(enabled));
    toast.success(enabled ? 'Analytics enabled' : 'Analytics disabled');
  };

  const handleToggleMarketing = (enabled: boolean) => {
    setMarketingEnabled(enabled);
    localStorage.setItem('divinityagi_marketing_enabled', String(enabled));
    toast.success(enabled ? 'Marketing emails enabled' : 'Marketing emails disabled');
  };

  const handleToggleLocation = (enabled: boolean) => {
    setLocationEnabled(enabled);
    localStorage.setItem('divinityagi_location_enabled', String(enabled));
    toast.success(enabled ? 'Location services enabled' : 'Location services disabled');
  };

  const handleExportData = () => {
    try {
      const exportData: any = {
        exportedAt: new Date().toISOString(),
        user: null,
        chatHistory: null,
        journalEntries: null,
        spiritualGoals: null,
        savedGuides: null,
        preferences: {
          analytics: analyticsEnabled,
          marketing: marketingEnabled,
          location: locationEnabled,
        }
      };

      // Collect all DivinityAGI data
      for (let key in localStorage) {
        if (key.startsWith('divinityagi_')) {
          const dataKey = key.replace('divinityagi_', '');
          try {
            exportData[dataKey] = JSON.parse(localStorage.getItem(key) || 'null');
          } catch {
            exportData[dataKey] = localStorage.getItem(key);
          }
        }
      }

      setDataExport(exportData);
      setShowDataModal(true);
    } catch (error) {
      toast.error('Failed to export data');
      console.error('Export error:', error);
    }
  };

  const handleDownloadData = () => {
    if (!dataExport) return;

    const blob = new Blob([JSON.stringify(dataExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `divinityagi-data-export-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Data downloaded successfully');
    setShowDataModal(false);
  };

  const handleDeleteAllData = () => {
    try {
      // Remove all DivinityAGI data
      const keysToDelete = [];
      for (let key in localStorage) {
        if (key.startsWith('divinityagi_')) {
          keysToDelete.push(key);
        }
      }
      
      keysToDelete.forEach(key => localStorage.removeItem(key));
      
      // Clear session storage
      sessionStorage.clear();
      
      toast.success('All data deleted successfully');
      setShowDeleteModal(false);
      
      // Redirect to home
      setTimeout(() => {
        if (onNavigate) onNavigate('home');
      }, 1500);
    } catch (error) {
      toast.error('Failed to delete data');
      console.error('Delete error:', error);
    }
  };

  const dataCategories = getDataCategories();
  const storedDataSize = getStoredDataSize();

  return (
    <div className="min-h-screen bg-[#0B1426] pb-24">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-[#0B1426] via-[#162844] to-[#0B1426] border-b border-[#1E3A5F]/30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDEyMiwgNzksIDI1NSwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        
        <div className="relative z-10 px-6 pt-8 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-2xl">Privacy & Data</h1>
              <p className="text-slate-400 text-sm">Your data, your control</p>
            </div>
          </div>

          {onBack && (
            <Button
              onClick={onBack}
              variant="outline"
              size="sm"
              className="mt-4 border-[#1E3A5F]/50 text-slate-300"
            >
              ← Back
            </Button>
          )}
        </div>
      </div>

      <div className="px-6 pt-6 space-y-6 max-w-4xl mx-auto">
        {/* Data Overview */}
        <Card className="bg-[#162844]/60 border-[#1E3A5F]/30 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-white mb-2">Your Data</h3>
              <p className="text-slate-400 text-sm">
                All data is stored locally on your device
              </p>
            </div>
            <Badge variant="outline" className="border-[#4CAF50]/50 text-[#4CAF50]">
              <Lock className="w-3 h-3 mr-1" />
              Secure
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#0B1426]/60 rounded-lg p-4 border border-[#1E3A5F]/20">
              <Database className="w-6 h-6 text-[#7A4FFF] mb-2" />
              <div className="text-2xl text-white mb-1">{storedDataSize} KB</div>
              <div className="text-xs text-slate-400">Data Stored</div>
            </div>
            <div className="bg-[#0B1426]/60 rounded-lg p-4 border border-[#1E3A5F]/20">
              <FileText className="w-6 h-6 text-[#FFD369] mb-2" />
              <div className="text-2xl text-white mb-1">{dataCategories.length}</div>
              <div className="text-xs text-slate-400">Data Categories</div>
            </div>
          </div>

          {/* Data Categories */}
          {dataCategories.length > 0 && (
            <div className="space-y-2 mb-6">
              <h4 className="text-white text-sm mb-3">Data We Store</h4>
              {dataCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-[#0B1426]/40 rounded-lg border border-[#1E3A5F]/20"
                  >
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: category.color }} />
                    </div>
                    <span className="text-slate-300 text-sm">{category.name}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Data Actions */}
          <div className="flex gap-3">
            <Button
              onClick={handleExportData}
              variant="outline"
              className="flex-1 border-[#7A4FFF]/50 text-[#7A4FFF] hover:bg-[#7A4FFF]/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button
              onClick={() => setShowDeleteModal(true)}
              variant="outline"
              className="flex-1 border-[#E53935]/50 text-[#E53935] hover:bg-[#E53935]/10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete All
            </Button>
          </div>
        </Card>

        {/* Privacy Controls */}
        <Card className="bg-[#162844]/60 border-[#1E3A5F]/30 p-6">
          <h3 className="text-white mb-4">Privacy Controls</h3>
          
          <div className="space-y-4">
            {/* Analytics */}
            <div className="flex items-start justify-between p-4 bg-[#0B1426]/40 rounded-lg border border-[#1E3A5F]/20">
              <div className="flex items-start gap-3 flex-1">
                <Eye className="w-5 h-5 text-[#7A4FFF] mt-0.5" />
                <div>
                  <h4 className="text-white mb-1">Usage Analytics</h4>
                  <p className="text-slate-400 text-sm">
                    Help us improve by sharing anonymous usage data
                  </p>
                </div>
              </div>
              <Switch
                checked={analyticsEnabled}
                onCheckedChange={handleToggleAnalytics}
              />
            </div>

            {/* Marketing */}
            <div className="flex items-start justify-between p-4 bg-[#0B1426]/40 rounded-lg border border-[#1E3A5F]/20">
              <div className="flex items-start gap-3 flex-1">
                <Bell className="w-5 h-5 text-[#FFD369] mt-0.5" />
                <div>
                  <h4 className="text-white mb-1">Marketing Communications</h4>
                  <p className="text-slate-400 text-sm">
                    Receive updates about new features and content
                  </p>
                </div>
              </div>
              <Switch
                checked={marketingEnabled}
                onCheckedChange={handleToggleMarketing}
              />
            </div>

            {/* Location */}
            <div className="flex items-start justify-between p-4 bg-[#0B1426]/40 rounded-lg border border-[#1E3A5F]/20">
              <div className="flex items-start gap-3 flex-1">
                <MapPin className="w-5 h-5 text-[#4CAF50] mt-0.5" />
                <div>
                  <h4 className="text-white mb-1">Location Services</h4>
                  <p className="text-slate-400 text-sm">
                    Find local spiritual centers and events near you
                  </p>
                </div>
              </div>
              <Switch
                checked={locationEnabled}
                onCheckedChange={handleToggleLocation}
              />
            </div>
          </div>
        </Card>

        {/* Data Policy Info */}
        <Card className="bg-gradient-to-br from-[#7A4FFF]/20 to-[#4CAF50]/20 border-[#7A4FFF]/30 p-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[#7A4FFF] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white mb-2">Our Commitment to Privacy</h4>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                DivinityAGI stores your data locally on your device for maximum privacy. 
                We never sell your personal information. Your spiritual journey is personal and sacred.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate && onNavigate('privacy')}
                className="border-[#7A4FFF]/50 text-[#7A4FFF] hover:bg-[#7A4FFF]/10"
              >
                Read Full Privacy Policy
                <ExternalLink className="w-3 h-3 ml-2" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Important Notice */}
        <Alert className="bg-[#162844]/60 border-[#FFD369]/30">
          <AlertTriangle className="h-4 w-4 text-[#FFD369]" />
          <AlertDescription className="text-slate-300 text-sm ml-2">
            <strong className="text-white">Note:</strong> DivinityAGI is not designed to collect, 
            store, or process sensitive personal information (PII) or health data. Please avoid 
            sharing such information in your conversations and journal entries.
          </AlertDescription>
        </Alert>
      </div>

      {/* Export Data Modal */}
      <Dialog open={showDataModal} onOpenChange={setShowDataModal}>
        <DialogContent className="bg-[#0B1426] border-[#1E3A5F]/50 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Export Your Data</DialogTitle>
            <DialogDescription className="text-slate-400">
              Download all your DivinityAGI data in JSON format
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="bg-[#162844]/60 rounded-lg p-4 border border-[#1E3A5F]/30 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="w-5 h-5 text-[#4CAF50]" />
                <span className="text-white">Data ready for export</span>
              </div>
              <p className="text-slate-400 text-sm">
                Your data will be downloaded as a JSON file that you can save, 
                backup, or transfer to another device.
              </p>
            </div>

            <div className="bg-[#FFD369]/10 rounded-lg p-4 border border-[#FFD369]/30">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-[#FFD369] flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 text-sm">
                  Keep this file secure. It contains all your personal DivinityAGI data.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={() => setShowDataModal(false)}
              variant="outline"
              className="border-[#1E3A5F]/50 text-slate-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDownloadData}
              className="bg-gradient-to-r from-[#7A4FFF] to-[#B794F6] hover:from-[#6A3FEF] hover:to-[#A684E6] text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Data Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="bg-[#0B1426] border-[#E53935]/50 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#E53935]" />
              Delete All Data
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              This action cannot be undone
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Alert className="bg-[#E53935]/10 border-[#E53935]/30 mb-4">
              <AlertTriangle className="h-4 w-4 text-[#E53935]" />
              <AlertDescription className="text-slate-300 text-sm ml-2">
                <strong className="text-white">Warning:</strong> This will permanently delete:
              </AlertDescription>
            </Alert>

            <ul className="space-y-2 text-slate-300 text-sm ml-6">
              <li>• Your profile and account data</li>
              <li>• All chat history and conversations</li>
              <li>• Journal entries and reflections</li>
              <li>• Spiritual goals and progress</li>
              <li>• Saved guides and preferences</li>
              <li>• All settings and customizations</li>
            </ul>

            <p className="text-slate-400 text-sm mt-4">
              Consider exporting your data before deleting if you want to keep a backup.
            </p>
          </div>

          <DialogFooter>
            <Button
              onClick={() => setShowDeleteModal(false)}
              variant="outline"
              className="border-[#1E3A5F]/50 text-slate-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteAllData}
              className="bg-gradient-to-r from-[#E53935] to-[#C62828] hover:from-[#C62828] hover:to-[#B71C1C] text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Everything
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
