interface AppFooterProps {
  onOpenMission?: () => void;
  onNavigate?: (tab: string) => void;
}

export function AppFooter({ onOpenMission, onNavigate }: AppFooterProps) {
  return (
    <footer className="px-4 sm:px-6 pb-6 sm:pb-8">
      <div className="text-center space-y-3 sm:space-y-4">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs text-slate-400">
          {onOpenMission && (
            <button onClick={onOpenMission} className="hover:text-purple-400 transition-colors py-1">
              Our Mission
            </button>
          )}
          <button 
            onClick={() => onNavigate?.('guides')} 
            className="hover:text-purple-400 transition-colors py-1"
          >
            Spirit Guides
          </button>
          <button 
            onClick={() => onNavigate?.('privacy')} 
            className="hover:text-purple-400 transition-colors py-1"
          >
            Privacy
          </button>
          <button 
            onClick={() => onNavigate?.('terms')} 
            className="hover:text-purple-400 transition-colors py-1"
          >
            Terms
          </button>
        </div>
        
        <p className="text-xs text-slate-500">© 2025 DivinityAGI</p>
      </div>
    </footer>
  );
}