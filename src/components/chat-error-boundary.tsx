import React from 'react';
import { Button } from './ui/button';
import { RefreshCw, Home } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  onNavigate?: (tab: string) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ChatErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('💥 Chat Component Error:', error);
    console.error('💥 Error Info:', errorInfo);
    
    // Log to help with debugging
    console.log('Error name:', error.name);
    console.log('Error message:', error.message);
    console.log('Error stack:', error.stack);
    
    this.setState({
      error,
      errorInfo
    });
  }

  clearError = () => {
    // Clear localStorage chat data in case it's corrupted
    try {
      localStorage.removeItem('divinityagi_chat_history');
      console.log('✅ Cleared chat history');
    } catch (e) {
      console.error('Failed to clear chat history:', e);
    }
    
    // Reset state
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    
    // Reload the page
    window.location.reload();
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const errorMessage = this.state.error.message || 'Unknown error';
      const isReactError31 = errorMessage.includes('Objects are not valid') || errorMessage.includes('error #31');
      
      return (
        <div className="min-h-screen bg-[#0B1426] text-white p-6 overflow-auto">
          <div className="max-w-4xl mx-auto space-y-6 py-12">
            {/* Error Header */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
                <span className="text-4xl">⚠️</span>
              </div>
              <h1 className="text-3xl text-red-400">Chat Error Detected</h1>
              <p className="text-slate-300 max-w-2xl mx-auto">
                We encountered an issue loading the Chat page. This error has been logged for debugging.
              </p>
            </div>

            {/* Error Details */}
            <div className="bg-red-900/20 rounded-lg p-6 border border-red-500/50 space-y-4">
              <div>
                <p className="text-red-300 mb-2">Error Type:</p>
                <pre className="text-sm text-red-400 whitespace-pre-wrap font-mono bg-black/30 p-3 rounded">
                  {this.state.error.name || 'Error'}
                </pre>
              </div>
              
              <div>
                <p className="text-red-300 mb-2">Error Message:</p>
                <pre className="text-sm text-red-400 whitespace-pre-wrap font-mono bg-black/30 p-3 rounded">
                  {errorMessage}
                </pre>
              </div>

              {isReactError31 && (
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded p-4">
                  <p className="text-yellow-300 text-sm">
                    <strong>React Error #31:</strong> This usually means a JavaScript object is being rendered directly in JSX.
                    The app is trying to display an object instead of text/numbers.
                  </p>
                </div>
              )}

              {this.state.error.stack && (
                <div>
                  <p className="text-red-300 mb-2">Stack Trace:</p>
                  <pre className="text-xs text-red-400/70 whitespace-pre-wrap font-mono bg-black/30 p-3 rounded max-h-64 overflow-auto">
                    {this.state.error.stack}
                  </pre>
                </div>
              )}

              {this.state.errorInfo && (
                <div>
                  <p className="text-red-300 mb-2">Component Stack:</p>
                  <pre className="text-xs text-red-400/70 whitespace-pre-wrap font-mono bg-black/30 p-3 rounded max-h-40 overflow-auto">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={this.clearError}
                className="bg-gradient-to-r from-[#7A4FFF] to-[#1E3A5F] hover:from-[#1E3A5F] hover:to-[#0F2346] text-white border-0"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Clear Data & Reload
              </Button>
              
              <Button
                onClick={() => this.props.onNavigate?.('guides')}
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                <Home className="w-5 h-5 mr-2" />
                Go to Guides
              </Button>
            </div>

            {/* Device Info */}
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <p className="text-slate-400 text-sm mb-3">Device Information:</p>
              <div className="text-xs text-slate-500 space-y-1 font-mono">
                <p>• Screen: {window.innerWidth}x{window.innerHeight}</p>
                <p>• Touch: {('ontouchstart' in window) ? 'Supported ✓' : 'Not supported'}</p>
                <p>• Platform: {navigator.platform}</p>
                <p>• User Agent: {navigator.userAgent.substring(0, 80)}...</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
