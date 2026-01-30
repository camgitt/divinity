import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Bell, BellOff, Clock, Plus, Trash2, Check, X } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface MeditationReminder {
  id: string;
  time: string; // Format: "HH:MM"
  days: number[]; // 0-6 (Sunday-Saturday)
  enabled: boolean;
  label: string;
  lastFired?: number; // Timestamp to prevent duplicate notifications
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const STORAGE_KEY = 'divinityagi_meditation_reminders';

export function MeditationReminderSystem() {
  const [reminders, setReminders] = useState<MeditationReminder[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  // New reminder form state
  const [newTime, setNewTime] = useState('09:00');
  const [newLabel, setNewLabel] = useState('');
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 2, 3, 4, 5]); // Weekdays default

  // Load reminders from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setReminders(data.reminders || []);
        setNotificationsEnabled(data.enabled || false);
      }
      
      // Check notification permission
      if ('Notification' in window) {
        setPermissionStatus(Notification.permission);
      }
    } catch (error) {
      console.error('Failed to load meditation reminders:', error);
    }
  }, []);

  // Save reminders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        reminders,
        enabled: notificationsEnabled
      }));
    } catch (error) {
      console.error('Failed to save meditation reminders:', error);
    }
  }, [reminders, notificationsEnabled]);

  // Check reminders every minute
  useEffect(() => {
    if (!notificationsEnabled || reminders.length === 0) return;

    const checkReminders = () => {
      const now = new Date();
      const currentDay = now.getDay();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      reminders.forEach(reminder => {
        if (
          reminder.enabled &&
          reminder.days.includes(currentDay) &&
          reminder.time === currentTime
        ) {
          showNotification(reminder);
        }
      });
    };

    // Check immediately
    checkReminders();

    // Then check every 30 seconds for better accuracy
    const interval = setInterval(checkReminders, 30000);

    return () => clearInterval(interval);
  }, [reminders, notificationsEnabled]);

  // Request notification permission
  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      toast.error('Your browser does not support notifications');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      setPermissionStatus(permission);
      
      if (permission === 'granted') {
        toast.success('Notifications enabled!');
        setNotificationsEnabled(true);
        
        // Show test notification
        new Notification('DivinityAGI Meditation Reminders', {
          body: 'You\'ll receive meditation reminders at your scheduled times.',
          icon: '/icon-192x192.png',
          badge: '/icon-192x192.png'
        });
        
        return true;
      } else if (permission === 'denied') {
        toast.error('Notification permission denied. Please enable in browser settings.');
        return false;
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      toast.error('Failed to enable notifications');
      return false;
    }
    
    return false;
  };

  // Show notification
  const showNotification = (reminder: MeditationReminder) => {
    if (permissionStatus !== 'granted') return;

    // Prevent duplicate notifications within 2 minutes
    const now = Date.now();
    if (reminder.lastFired && (now - reminder.lastFired) < 120000) {
      return;
    }

    try {
      const notification = new Notification('Time to Meditate 🧘‍♀️', {
        body: reminder.label || 'Take a moment for mindfulness and inner peace.',
        icon: '/icon-192x192.png',
        badge: '/icon-192x192.png',
        tag: `meditation-reminder-${reminder.id}`,
        requireInteraction: false,
        silent: false
      });

      // Update last fired time to prevent duplicates
      setReminders(prev => prev.map(r =>
        r.id === reminder.id ? { ...r, lastFired: now } : r
      ));

      notification.onclick = () => {
        window.focus();
        // TODO: Navigate to Quiet Space or Meditation Library
        notification.close();
      };

      // Auto-close after 30 seconds
      setTimeout(() => notification.close(), 30000);
    } catch (error) {
      console.error('Failed to show notification:', error);
    }
  };

  // Toggle notifications
  const handleToggleNotifications = async () => {
    if (!notificationsEnabled) {
      const success = await requestNotificationPermission();
      if (!success) return;
    } else {
      setNotificationsEnabled(false);
      toast.info('Meditation reminders disabled');
    }
  };

  // Add new reminder
  const handleAddReminder = () => {
    if (!newTime) {
      toast.error('Please select a time');
      return;
    }

    if (selectedDays.length === 0) {
      toast.error('Please select at least one day');
      return;
    }

    const newReminder: MeditationReminder = {
      id: Date.now().toString(),
      time: newTime,
      days: selectedDays,
      enabled: true,
      label: newLabel || 'Time for your daily meditation'
    };

    setReminders(prev => [...prev, newReminder]);
    setShowAddDialog(false);
    
    // Reset form
    setNewTime('09:00');
    setNewLabel('');
    setSelectedDays([1, 2, 3, 4, 5]);
    
    toast.success('Reminder added!');
  };

  // Delete reminder
  const handleDeleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
    toast.success('Reminder deleted');
  };

  // Toggle reminder enabled/disabled
  const handleToggleReminder = (id: string) => {
    setReminders(prev => prev.map(r => 
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ));
  };

  // Toggle day selection
  const toggleDay = (day: number) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day].sort()
    );
  };

  // Format time display
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Format days display
  const formatDays = (days: number[]) => {
    if (days.length === 7) return 'Every day';
    if (days.length === 5 && days.every(d => d >= 1 && d <= 5)) return 'Weekdays';
    if (days.length === 2 && days.includes(0) && days.includes(6)) return 'Weekends';
    return days.map(d => DAYS_OF_WEEK[d]).join(', ');
  };

  return (
    <div className="space-y-6">
      {/* Header with Master Toggle */}
      <Card 
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
          boxShadow: '0 0 0 2px #C9A882, 0 20px 50px rgba(0, 0, 0, 0.4)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
        <div className="p-6 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#497EBC] to-[#FFD369] flex items-center justify-center shadow-[0_4px_15px_rgba(73,126,188,0.5)]">
                {notificationsEnabled ? (
                  <Bell className="w-5 h-5 text-white drop-shadow-lg" />
                ) : (
                  <BellOff className="w-5 h-5 text-white drop-shadow-lg" />
                )}
              </div>
              <div>
                <h3 className="text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">Meditation Reminders</h3>
                <p className="text-slate-300 text-sm">
                  {notificationsEnabled ? 'Reminders active' : 'Reminders disabled'}
                </p>
              </div>
            </div>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={handleToggleNotifications}
              className="data-[state=checked]:bg-[#497EBC]"
            />
          </div>

          {permissionStatus === 'denied' && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mt-4">
              <p className="text-red-400 text-sm">
                Notifications are blocked. Please enable them in your browser settings.
              </p>
            </div>
          )}

          {permissionStatus === 'default' && !notificationsEnabled && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mt-4">
              <p className="text-yellow-400 text-sm">
                Enable notifications to receive meditation reminders at your scheduled times.
              </p>
            </div>
          )}

          {notificationsEnabled && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-4">
              <p className="text-blue-400 text-sm">
                💡 <strong>Tip:</strong> Reminders work best on desktop browsers. Mobile notification support varies by device and browser.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Reminders List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-white">Your Reminders</h4>
          <Button
            onClick={() => setShowAddDialog(true)}
            size="sm"
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Reminder
          </Button>
        </div>

        {reminders.length === 0 ? (
          <Card 
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
              boxShadow: '0 0 0 2px #C9A882, 0 20px 50px rgba(0, 0, 0, 0.4)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
            <div className="p-8 text-center relative z-10">
              <Clock className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-300 mb-2">No reminders yet</p>
              <p className="text-slate-400 text-sm">
                Add your first meditation reminder to build a consistent practice
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-3">
            {reminders.map((reminder, index) => (
              <motion.div
                key={reminder.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card 
                  className={`relative rounded-3xl overflow-hidden transition-all duration-300 ${
                    reminder.enabled ? '' : 'opacity-60'
                  }`}
                  style={{
                    background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
                    boxShadow: reminder.enabled 
                      ? '0 0 0 2px #C9A882, 0 20px 50px rgba(0, 0, 0, 0.4)'
                      : '0 0 0 2px rgba(201, 168, 130, 0.3), 0 20px 50px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
                  <div className="p-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-2xl text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
                            {formatTime(reminder.time)}
                          </div>
                          {reminder.enabled ? (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              Active
                            </Badge>
                          ) : (
                            <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">
                              Paused
                            </Badge>
                          )}
                        </div>
                        <p className="text-slate-300 text-sm mb-1">{reminder.label}</p>
                        <p className="text-slate-400 text-xs">{formatDays(reminder.days)}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={reminder.enabled}
                          onCheckedChange={() => handleToggleReminder(reminder.id)}
                          className="data-[state=checked]:bg-[#497EBC]"
                        />
                        <Button
                          onClick={() => handleDeleteReminder(reminder.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add Reminder Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="bg-[#0B1426] border-[#1E3A5F] text-white">
          <DialogHeader>
            <DialogTitle>Add Meditation Reminder</DialogTitle>
            <DialogDescription className="text-slate-400">
              Set a daily reminder for your meditation practice
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Time Picker */}
            <div>
              <Label className="text-white mb-2 block">Time</Label>
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full bg-[#162844]/60 border border-[#1E3A5F]/60 rounded-lg px-4 py-3 text-white text-lg"
              />
            </div>

            {/* Label */}
            <div>
              <Label className="text-white mb-2 block">Message (optional)</Label>
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="Time for your daily meditation"
                className="w-full bg-[#162844]/60 border border-[#1E3A5F]/60 rounded-lg px-4 py-3 text-white placeholder:text-slate-400"
              />
            </div>

            {/* Days Selection */}
            <div>
              <Label className="text-white mb-3 block">Repeat on</Label>
              <div className="grid grid-cols-7 gap-2">
                {DAYS_OF_WEEK.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => toggleDay(index)}
                    aria-label={`${day}, ${selectedDays.includes(index) ? 'selected' : 'not selected'}`}
                    aria-pressed={selectedDays.includes(index)}
                    className={`aspect-square rounded-lg border-2 transition-all duration-300 ${
                      selectedDays.includes(index)
                        ? 'bg-teal-600 border-teal-500 text-white'
                        : 'bg-[#162844]/60 border-[#1E3A5F]/60 text-slate-400 hover:border-teal-500/50'
                    }`}
                  >
                    <div className="text-xs font-medium">{day}</div>
                  </button>
                ))}
              </div>

              {/* Quick selection buttons */}
              <div className="flex gap-2 mt-3">
                <Button
                  onClick={() => setSelectedDays([1, 2, 3, 4, 5])}
                  variant="outline"
                  size="sm"
                  className="text-xs border-[#1E3A5F]/60 text-slate-300 hover:bg-teal-600/20"
                >
                  Weekdays
                </Button>
                <Button
                  onClick={() => setSelectedDays([0, 6])}
                  variant="outline"
                  size="sm"
                  className="text-xs border-[#1E3A5F]/60 text-slate-300 hover:bg-teal-600/20"
                >
                  Weekends
                </Button>
                <Button
                  onClick={() => setSelectedDays([0, 1, 2, 3, 4, 5, 6])}
                  variant="outline"
                  size="sm"
                  className="text-xs border-[#1E3A5F]/60 text-slate-300 hover:bg-teal-600/20"
                >
                  Every day
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={() => setShowAddDialog(false)}
                variant="outline"
                className="flex-1 border-[#1E3A5F]/60 text-slate-300"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleAddReminder}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
              >
                <Check className="w-4 h-4 mr-2" />
                Add Reminder
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}