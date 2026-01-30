import { Button } from "./ui/button";
import { useCrisisSupport } from "./crisis-support-context";
import { Heart } from "lucide-react";

interface CrisisSupportButtonProps {
  variant?: "default" | "floating" | "minimal";
  className?: string;
}

export function CrisisSupportButton({ 
  variant = "default",
  className = ""
}: CrisisSupportButtonProps) {
  const { openCrisisResources } = useCrisisSupport();

  if (variant === "floating") {
    return (
      <button
        onClick={openCrisisResources}
        className={`fixed bottom-24 left-4 w-12 h-12 bg-gradient-to-br from-[#E53935] to-[#C62828] hover:from-[#C62828] hover:to-[#B71C1C] text-white rounded-full shadow-lg hover:shadow-[#E53935]/30 flex items-center justify-center transition-all duration-300 z-40 border border-[#E53935]/30 backdrop-blur-sm hover:scale-110 ${className}`}
        aria-label="Crisis Support Resources"
        title="Need help? Click for crisis support resources"
      >
        <Heart className="w-5 h-5" />
      </button>
    );
  }

  if (variant === "minimal") {
    return (
      <button
        onClick={openCrisisResources}
        className={`text-slate-400 hover:text-[#E53935] transition-colors text-xs flex items-center gap-1 ${className}`}
        aria-label="Crisis Support"
      >
        <Heart className="w-3 h-3" />
        <span>Need Help?</span>
      </button>
    );
  }

  return (
    <Button
      onClick={openCrisisResources}
      variant="outline"
      size="sm"
      className={`border-[#E53935]/50 text-[#E53935] hover:bg-[#E53935]/10 hover:border-[#E53935] ${className}`}
    >
      <Heart className="w-4 h-4 mr-2" />
      Crisis Support
    </Button>
  );
}
