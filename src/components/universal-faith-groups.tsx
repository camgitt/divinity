import React from "react";
import { Users } from "lucide-react";

interface UniversalFaithGroupsProps {
  onNavigate?: (tab: string) => void;
}

export function UniversalFaithGroups({ onNavigate }: UniversalFaithGroupsProps) {
  return (
    <div className="px-6 mb-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-8 h-8 text-[#7A4FFF]" />
            <h2 className="text-3xl sm:text-4xl bg-gradient-to-r from-gray-900 via-[#7A4FFF] to-gray-900 bg-clip-text text-transparent">
              Universal Community
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with seekers from all spiritual paths in our inclusive community
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-xl border-2 border-white/40 rounded-3xl p-8 shadow-[0_8px_30px_rgba(122,79,255,0.1)]">
          <p className="text-center text-gray-700">
            Universal faith groups coming soon. Connect with guides above to begin your spiritual journey.
          </p>
        </div>
      </div>
    </div>
  );
}
