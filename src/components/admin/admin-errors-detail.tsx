import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowLeft, AlertTriangle, AlertCircle, XCircle, Calendar, Info } from 'lucide-react';
import { useAdminMonitoring, EventSeverity } from '../admin-monitoring-context';
import { motion } from 'motion/react';

interface AdminErrorsDetailProps {
  onBack: () => void;
}

export const AdminErrorsDetail: React.FC<AdminErrorsDetailProps> = ({ onBack }) => {
  const { events } = useAdminMonitoring();
  const [filter, setFilter] = useState<EventSeverity | 'all'>('all');

  // Get error-related events
  const errorEvents = events.filter(e => 
    e.severity === 'error' || 
    e.severity === 'critical' || 
    e.severity === 'warning' ||
    e.type === 'error_reported' ||
    e.type === 'crash_detected'
  );

  const filteredEvents = filter === 'all' 
    ? errorEvents 
    : errorEvents.filter(e => e.severity === filter);

  const getSeverityDisplay = (severity: EventSeverity) => {
    switch (severity) {
      case 'critical':
        return { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/20', border: 'border-red-500', label: 'Critical' };
      case 'error':
        return { icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-500/20', border: 'border-orange-500', label: 'Error' };
      case 'warning':
        return { icon: AlertTriangle, color: 'text-yellow-500', bg: 'bg-yellow-500/20', border: 'border-yellow-500', label: 'Warning' };
      default:
        return { icon: Info, color: 'text-blue-500', bg: 'bg-blue-500/20', border: 'border-blue-500', label: 'Info' };
    }
  };

  // Calculate error rate
  const totalEvents = events.length || 1;
  const errorRate = ((errorEvents.length / totalEvents) * 100).toFixed(2);

  const criticalCount = errorEvents.filter(e => e.severity === 'critical').length;
  const errorCount = errorEvents.filter(e => e.severity === 'error').length;
  const warningCount = errorEvents.filter(e => e.severity === 'warning').length;

  return (
    <div className="min-h-screen bg-[#0B1426] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 pt-6 pb-8 px-6">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-white hover:bg-white/10 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="w-8 h-8 text-white" />
          <h1 className="text-white text-3xl font-['Poppins',sans-serif] font-semibold">
            Errors & Warnings
          </h1>
        </div>
        <p className="text-white/80 font-['Raleway',sans-serif]">
          {errorRate}% error rate • {errorEvents.length} total issues
        </p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-red-600 to-red-700 p-4 border-0">
            <div className="text-sm text-white/70 mb-1">Critical</div>
            <div className="text-2xl text-white font-semibold">{criticalCount}</div>
          </Card>
          <Card className="bg-gradient-to-br from-orange-600 to-orange-700 p-4 border-0">
            <div className="text-sm text-white/70 mb-1">Errors</div>
            <div className="text-2xl text-white font-semibold">{errorCount}</div>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-600 to-yellow-700 p-4 border-0">
            <div className="text-sm text-white/70 mb-1">Warnings</div>
            <div className="text-2xl text-white font-semibold">{warningCount}</div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'default' : 'outline'}
            className={filter === 'all' ? 'bg-[#7A4FFF]' : 'border-[#1E3A5F] text-white hover:bg-[#7A4FFF]/20'}
          >
            All ({errorEvents.length})
          </Button>
          <Button
            onClick={() => setFilter('critical')}
            variant={filter === 'critical' ? 'default' : 'outline'}
            className={filter === 'critical' ? 'bg-red-600' : 'border-[#1E3A5F] text-white hover:bg-red-600/20'}
          >
            Critical ({criticalCount})
          </Button>
          <Button
            onClick={() => setFilter('error')}
            variant={filter === 'error' ? 'default' : 'outline'}
            className={filter === 'error' ? 'bg-orange-600' : 'border-[#1E3A5F] text-white hover:bg-orange-600/20'}
          >
            Errors ({errorCount})
          </Button>
          <Button
            onClick={() => setFilter('warning')}
            variant={filter === 'warning' ? 'default' : 'outline'}
            className={filter === 'warning' ? 'bg-yellow-600' : 'border-[#1E3A5F] text-white hover:bg-yellow-600/20'}
          >
            Warnings ({warningCount})
          </Button>
        </div>

        {/* Events List */}
        {filteredEvents.length === 0 ? (
          <Card className="bg-[#162844] border-[#1E3A5F] p-8 text-center">
            <AlertCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <div className="text-white text-lg mb-2">No errors found!</div>
            <div className="text-slate-400">All systems are running smoothly</div>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredEvents.map((event, index) => {
              const display = getSeverityDisplay(event.severity);
              const Icon = display.icon;
              
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Card className={`bg-[#162844] border-[#1E3A5F] p-4 hover:border-2 hover:${display.border} transition-all`}>
                    <div className="flex items-start gap-3">
                      <div className={`${display.bg} p-2 rounded-lg`}>
                        <Icon className={`w-5 h-5 ${display.color}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-white font-medium">{event.title}</h3>
                          <Badge variant="outline" className={`${display.color} ${display.border}`}>
                            {display.label}
                          </Badge>
                          <Badge variant="outline" className="text-slate-400 border-slate-600">
                            {event.type.replace('_', ' ')}
                          </Badge>
                        </div>
                        
                        <p className="text-slate-300 text-sm mb-3">{event.description}</p>
                        
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(event.timestamp).toLocaleString()}
                          </div>
                          {event.userEmail && (
                            <div className="flex items-center gap-1">
                              <span>User: {event.userEmail}</span>
                            </div>
                          )}
                        </div>
                        
                        {event.metadata && Object.keys(event.metadata).length > 0 && (
                          <details className="mt-3">
                            <summary className="text-xs text-slate-400 cursor-pointer hover:text-slate-300 select-none">
                              View technical details
                            </summary>
                            <pre className="text-xs text-slate-300 mt-2 p-3 bg-black/30 rounded border border-slate-700 overflow-x-auto">
                              {JSON.stringify(event.metadata, null, 2)}
                            </pre>
                          </details>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
