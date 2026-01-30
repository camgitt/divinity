import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { useCrisisSupport } from "./crisis-support-context";
import { 
  Heart, 
  Phone, 
  MessageSquare, 
  Globe, 
  Clock,
  Shield,
  AlertCircle,
  ExternalLink
} from "lucide-react";

export function CrisisResourcesModal() {
  const { showCrisisResources, closeCrisisResources, getResourcesByRegion } = useCrisisSupport();
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const resources = getResourcesByRegion(selectedRegion);

  const regions = [
    { value: 'all', label: 'All Resources' },
    { value: 'united states', label: 'United States' },
    { value: 'canada', label: 'Canada' },
    { value: 'united kingdom', label: 'United Kingdom' },
    { value: 'australia', label: 'Australia' },
    { value: 'worldwide', label: 'International' }
  ];

  return (
    <Dialog open={showCrisisResources} onOpenChange={closeCrisisResources}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-[#a79a4c]/50">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-[#E53935] rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl text-[#3D3D6B] mb-1" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                You're Not Alone
              </DialogTitle>
              <DialogDescription className="text-gray-600" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                Free, confidential support is available 24/7
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Important Notice */}
        <Card className="border-2 border-[#E53935] p-4 mb-6" style={{ background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)' }}>
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#E53935] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white mb-2" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>If you're in immediate danger:</h4>
              <ul className="text-white/90 text-sm space-y-1" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                <li>• Call emergency services (911 in US, 999 in UK, etc.)</li>
                <li>• Go to your nearest emergency room</li>
                <li>• Reach out to a trusted friend or family member</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* AI Disclaimer */}
        <Card className="border-2 border-[#a79a4c] p-4 mb-6" style={{ background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)' }}>
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#a79a4c] flex-shrink-0 mt-0.5" />
            <div className="text-white/90 text-sm" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
              <p className="mb-2">
                <strong className="text-white" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700 }}>Important:</strong> DivinityAGI is an AI companion and cannot provide professional mental health care, crisis intervention, or therapy.
              </p>
              <p>
                Please reach out to trained crisis counselors who can provide the support you need right now.
              </p>
            </div>
          </div>
        </Card>

        {/* Region Filter */}
        <div className="mb-6">
          <label className="text-sm text-gray-600 mb-2 block" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500 }}>Select your region:</label>
          <div className="flex flex-wrap gap-2">
            {regions.map((region) => (
              <Button
                key={region.value}
                variant={selectedRegion === region.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRegion(region.value)}
                className={
                  selectedRegion === region.value
                    ? "bg-[#a79a4c] hover:bg-[#8b7a4a] text-white border-0"
                    : "border-2 border-[#1e386e] text-[#3D3D6B] hover:bg-[#1e386e]/10"
                }
                style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
              >
                {region.label}
              </Button>
            ))}
          </div>
        </div>

        <Separator className="bg-[#a79a4c]/30 mb-6" />

        {/* Crisis Resources */}
        <div className="space-y-4">
          <h3 className="text-[#3D3D6B] mb-4" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>Crisis Support Resources</h3>
          
          {resources.map((resource, index) => (
            <Card 
              key={index}
              className="border-2 border-[#a79a4c]/40 hover:border-[#a79a4c] transition-all duration-300 p-5"
              style={{ background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)' }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-white mb-1" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>{resource.name}</h4>
                  <p className="text-white/80 text-sm" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>{resource.description}</p>
                </div>
                <Badge 
                  variant="outline" 
                  className="border-2 border-[#a79a4c] bg-[#a79a4c] text-white whitespace-nowrap ml-4"
                  style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
                >
                  {resource.region}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                {resource.phone && (
                  <div className="flex items-center gap-3 text-white/90" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                    <Phone className="w-4 h-4 text-[#a79a4c]" />
                    <a 
                      href={`tel:${resource.phone}`}
                      className="hover:text-[#a79a4c] transition-colors"
                    >
                      {resource.phone}
                    </a>
                  </div>
                )}
                
                {resource.sms && (
                  <div className="flex items-center gap-3 text-white/90" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                    <MessageSquare className="w-4 h-4 text-[#a79a4c]" />
                    <span>{resource.sms}</span>
                  </div>
                )}

                {resource.website && (
                  <div className="flex items-center gap-3 text-white/90" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                    <Globe className="w-4 h-4 text-[#a79a4c]" />
                    <a 
                      href={resource.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#a79a4c] transition-colors flex items-center gap-1"
                    >
                      Visit Website
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}

                <div className="flex items-center gap-3 text-white/70 text-sm" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                  <Clock className="w-4 h-4 text-[#a79a4c]" />
                  <span>{resource.available}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Support Message */}
        <Card className="border-2 border-[#a79a4c] p-6 mt-6" style={{ background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)' }}>
          <div className="text-center">
            <Heart className="w-8 h-8 text-[#a79a4c] mx-auto mb-3" />
            <h4 className="text-white mb-2" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>You Matter</h4>
            <p className="text-white/90 text-sm leading-relaxed" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
              Your life has value and meaning. These feelings are temporary, even when they feel overwhelming. 
              Reaching out for help is a sign of strength, not weakness. You deserve support and care.
            </p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <Button
            onClick={closeCrisisResources}
            variant="outline"
            className="flex-1 border-2 border-[#1e386e] text-[#3D3D6B] hover:bg-[#1e386e]/10"
            style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
          >
            Close
          </Button>
          <Button
            onClick={() => window.open('https://988lifeline.org', '_blank')}
            className="flex-1 bg-[#E53935] hover:bg-[#C62828] text-white border-0"
            style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
          >
            <Phone className="w-4 h-4 mr-2" />
            Call 988 Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}