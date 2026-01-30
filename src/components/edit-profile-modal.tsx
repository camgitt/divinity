import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useSocialMedia, UserProfile } from "./social-media-context";
import { toast } from "sonner@2.0.3";
import { Camera, MapPin, Link as LinkIcon, Tag, Save, X } from "lucide-react";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const { currentUser, setCurrentUser } = useSocialMedia();
  
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [faithTradition, setFaithTradition] = useState("christianity");
  const [interests, setInterests] = useState<string[]>([]);

  // Faith traditions
  const faithTraditions = [
    { value: "christianity", label: "Christianity" },
    { value: "islam", label: "Islam" },
    { value: "hinduism", label: "Hinduism" },
    { value: "buddhism", label: "Buddhism" },
    { value: "judaism", label: "Judaism" },
    { value: "sikhism", label: "Sikhism" },
    { value: "taoism", label: "Taoism" },
    { value: "shinto", label: "Shinto" },
    { value: "jainism", label: "Jainism" },
    { value: "bahai", label: "Bahá'í" },
    { value: "confucianism", label: "Confucianism" },
    { value: "polytheism", label: "Polytheism" },
  ];

  const availableInterests = [
    "Prayer", "Meditation", "Scripture Study", "Service", "Community",
    "Worship", "Spiritual Growth", "Contemplation", "Yoga", "Mindfulness",
    "Theology", "Philosophy", "Ethics", "Interfaith Dialogue", "Social Justice"
  ];

  // Load current user data
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setUsername(currentUser.username || "");
      setBio(currentUser.bio || "");
      setLocation(currentUser.location || "");
      setWebsite(currentUser.website || "");
      setFaithTradition(currentUser.faithTradition || "christianity");
      setInterests(currentUser.interests || []);
    }
  }, [currentUser]);

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSave = () => {
    if (!currentUser) return;

    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    if (!username.trim()) {
      toast.error("Username cannot be empty");
      return;
    }

    // Update user profile
    const updatedUser: UserProfile = {
      ...currentUser,
      name: name.trim(),
      username: username.toLowerCase().trim(),
      bio: bio.trim(),
      location: location.trim(),
      website: website.trim(),
      faithTradition,
      interests,
    };

    setCurrentUser(updatedUser);
    toast.success("Profile updated successfully!");
    onClose();
  };

  if (!currentUser) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#0B1426] border-[#1E3A5F]/50 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">Edit Profile</DialogTitle>
          <DialogDescription className="text-slate-400">
            Update your profile information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Profile Avatar Section */}
          <div className="flex items-center gap-4 pb-6 border-b border-[#1E3A5F]/30">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7A4FFF]/30 to-[#FFD369]/30 flex items-center justify-center text-3xl">
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
              ) : (
                currentUser.name.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <Button variant="outline" className="border-[#7A4FFF]/50 text-white hover:bg-[#7A4FFF]/10">
                <Camera className="w-4 h-4 mr-2" />
                Change Photo
              </Button>
              <p className="text-slate-400 text-xs mt-2">JPG, PNG or GIF, max 2MB</p>
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label className="text-white mb-2">Full Name *</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="bg-[#162844]/60 border-[#1E3A5F]/50 text-white"
              />
            </div>

            <div>
              <Label className="text-white mb-2">Username *</Label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ''))}
                  placeholder="username"
                  className="pl-10 bg-[#162844]/60 border-[#1E3A5F]/50 text-white"
                />
              </div>
              <p className="text-slate-400 text-xs mt-1">@{username || 'username'}</p>
            </div>

            <div>
              <Label className="text-white mb-2">Bio</Label>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                className="bg-[#162844]/60 border-[#1E3A5F]/50 text-white min-h-24"
                maxLength={300}
              />
              <p className="text-slate-400 text-xs mt-1">{bio.length}/300 characters</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-4">
            <div>
              <Label className="text-white mb-2">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, Country"
                  className="pl-10 bg-[#162844]/60 border-[#1E3A5F]/50 text-white"
                />
              </div>
            </div>

            <div>
              <Label className="text-white mb-2">Website</Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://your-website.com"
                  className="pl-10 bg-[#162844]/60 border-[#1E3A5F]/50 text-white"
                />
              </div>
            </div>

            <div>
              <Label className="text-white mb-2">Faith Tradition</Label>
              <Select value={faithTradition} onValueChange={setFaithTradition}>
                <SelectTrigger className="bg-[#162844]/60 border-[#1E3A5F]/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0B1426] border-[#1E3A5F]/50">
                  {faithTraditions.map(faith => (
                    <SelectItem key={faith.value} value={faith.value}>
                      {faith.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Interests */}
          <div>
            <Label className="text-white mb-3">Interests</Label>
            <div className="flex flex-wrap gap-2">
              {availableInterests.map(interest => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                    interests.includes(interest)
                      ? "bg-gradient-to-r from-[#7A4FFF] to-[#4CAF50] border-transparent text-white"
                      : "border-slate-600 text-slate-300 hover:border-[#7A4FFF]"
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-[#1E3A5F]/30">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-slate-600 text-slate-300"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-[#7A4FFF] to-[#1E3A5F] hover:from-[#6A3FEF] hover:to-[#7A4FFF] text-white border-0 shadow-[0_4px_15px_rgba(122,79,255,0.4)] hover:shadow-[0_6px_25px_rgba(122,79,255,0.6)] transition-all duration-300 hover:scale-105"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
