# Ambient Sound System Architecture

## 🎯 Global State Management

The entire ambient sound system is now managed through a **global React Context** that persists across the entire application.

---

## 📁 File Structure

```
/contexts/
  └── ambient-sound-context.tsx       # ✅ GLOBAL STATE (The "Brain")

/components/
  ├── ambient-sound-grid.tsx          # Variant A: Glass Card Grid
  ├── ambient-mini-player.tsx         # Variant B: Floating Mini-Player
  ├── ambient-mixer-overlay.tsx       # Variant C: Volume Mixer Modal
  ├── ambient-waveform-visualizer.tsx # Live Audio Visualizations
  ├── ambient-background-effect.tsx   # Dynamic Background Gradients
  └── ambient-sound-system.tsx        # Master Orchestrator Component
```

---

## 🧠 Global Context (`/contexts/ambient-sound-context.tsx`)

### State Managed Globally

```typescript
// Sound State
selectedSound: AmbientSound | null;    // Currently active sound
isPlaying: boolean;                    // Playback state
ambientVolume: number;                 // Ambient sound level (0-100)
voiceVolume: number;                   // Voice/narration level (0-100)
isMuted: boolean;                      // Global mute toggle

// View State
viewMode: 'grid' | 'mini-player' | 'mixer';  // Current UI variant
showMixer: boolean;                          // Mixer overlay visibility

// Audio Engine
analyserNode: AnalyserNode | null;     // Web Audio API analyzer
audioContext: AudioContext | null;     // Audio context instance
soundGenerator: AmbientSoundGenerator; // Persistent sound engine
```

### Why Global Context?

✅ **Persistence** - Audio continues playing when navigating between pages
✅ **Single Source of Truth** - No duplicate state across components
✅ **Centralized Logic** - All audio generation happens in one place
✅ **Cross-Component Communication** - Grid → Mini-Player → Mixer share state seamlessly

---

## 🔧 AmbientSoundGenerator Class

Lives **inside the context** as a persistent singleton:

```typescript
class AmbientSoundGenerator {
  private audioContext: AudioContext;
  private gainNode: GainNode;
  private analyserNode: AnalyserNode;
  private oscillators: OscillatorNode[] = [];
  private noiseNode: AudioBufferSourceNode | null = null;
  private masterVolume: number = 0.5; // Track base volume before ducking
  private isDucking: boolean = false; // Ducking state
  
  // Methods
  playRain(volume: number)
  playOcean(volume: number)
  playForest(volume: number)
  playWind(volume: number)
  playBells(volume: number)
  playSynthPad(volume: number)
  setVolume(volume: number)
  setDucking(active: boolean) // 🎵 NEW: Audio ducking for voice narration
  stop()
  destroy()
  
  // Audio Analysis
  getAnalyserNode(): AnalyserNode
  getAudioContext(): AudioContext
}
```

**Key Features:**
- ✅ Initialized **once** when context mounts
- ✅ Persists for entire app lifetime
- ✅ Uses Web Audio API for synthetic sound generation
- ✅ No external files needed - 100% browser-generated audio
- ✅ Provides real-time frequency data for visualizations
- ✅ 🎵 **NEW: Audio ducking** - Smoothly reduces volume to 30% for voice clarity

---

## 🎨 UI Variants (Controlled by Context)

### Variant A: Glass Card Grid
**Component:** `/components/ambient-sound-grid.tsx`
**View Mode:** `'grid'`
**When Shown:** Discovery mode in Quiet Space

```typescript
const { selectedSound, selectSound, setViewMode } = useAmbientSound();

// On sound selection:
selectSound(sound);           // Updates global state
setViewMode('mini-player');   // Transitions to mini-player
```

### Variant B: Persistent Mini-Player
**Component:** `/components/ambient-mini-player.tsx`
**View Mode:** `'mini-player'`
**When Shown:** Automatically after sound selection

```typescript
const { isPlaying, togglePlayPause, setShowMixer } = useAmbientSound();

// Floats at bottom of screen
// Persists across page navigation
// Opens mixer overlay on button click
```

### Variant C: Volume Mixer Overlay
**Component:** `/components/ambient-mixer-overlay.tsx`
**View Mode:** Any (controlled by `showMixer` state)
**When Shown:** User clicks "Mixer" button

```typescript
const { 
  ambientVolume, 
  voiceVolume, 
  setAmbientVolume, 
  setVoiceVolume 
} = useAmbientSound();

// Independent volume sliders
// Preset buttons (25%, 50%, 75%, 100%)
// Global mute toggle
```

---

## 🎵 Audio Flow

```
User Selects Sound
       ↓
Context Updates selectedSound State
       ↓
useEffect Detects Change
       ↓
soundGenerator.play[SoundType](volume)
       ↓
Web Audio API Creates Oscillators/Noise
       ↓
Audio Chain: Source → Analyser → Gain → Destination
       ↓
AnalyserNode Provides Frequency Data
       ↓
Waveform Visualizers Read Data
       ↓
Canvas Animates in Real-Time
```

---

## 🌈 Dynamic Background Gradients

**Component:** `/components/ambient-background-effect.tsx`

Each sound has a unique gradient that overlays the page background:

| Sound | Gradient |
|-------|----------|
| Rain | Deep Blue (#1E3A8A → #0F172A) |
| Ocean | Deep Cyan (#164E63 → #0F172A) |
| Forest | Deep Emerald (#064E3B → #0F172A) |
| Wind | Deep Slate (#334155 → #0F172A) |
| Bells | Deep Amber (#78350F → #0F172A) |
| Music | Deep Purple (#4C1D95 → #0F172A) |

**Implementation:**
```typescript
<AmbientBackgroundEffect 
  enabled={true} 
  opacity={0.15} 
/>
```

Uses `mix-blend-mode: overlay` for subtle atmospheric effect.

---

## 📊 Live Visualizations

### Waveform Visualizer
**Component:** `/components/ambient-waveform-visualizer.tsx`

```typescript
<WaveformVisualizer
  analyserNode={analyserNode}
  isPlaying={isPlaying}
  size={48}
  color={selectedSound.color}
  lineWidth={2}
/>
```

**Features:**
- Circular waveform using canvas
- Reads real-time frequency data from Web Audio API
- 64 sample points around circle
- Smooth animations with 0.8 smoothing constant

### Ring Waveform
```typescript
<RingWaveform
  analyserNode={analyserNode}
  isPlaying={isPlaying}
  size={64}
  color={selectedSound.color}
/>
```

**Features:**
- 3 concentric rings
- Each ring samples different frequency ranges
- Varying opacity for depth effect
- Modulates radius based on audio amplitude

---

## 🔗 Integration Points

### App.tsx Provider Hierarchy
```typescript
<LocalizationProvider>
  <SocialMediaProvider>
    <CommunityProvider>
      <ThemeProvider>
        <HapticProvider>
          <SoundProvider>
            {/* ... other providers ... */}
            <MeditationProvider>
              <FavoriteMantrasProvider>
                <AmbientSoundProvider>  {/* ← GLOBAL AMBIENT STATE */}
                  <AtmosphereProvider>
                    {/* ... app content ... */}
                  </AtmosphereProvider>
                </AmbientSoundProvider>
              </FavoriteMantrasProvider>
            </MeditationProvider>
          </SoundProvider>
        </HapticProvider>
      </ThemeProvider>
    </CommunityProvider>
  </SocialMediaProvider>
</LocalizationProvider>
```

### Quiet Space Page Integration
```typescript
// /components/quiet-space-page-REFACTORED.tsx

// ❌ OLD (Local State - REMOVED):
// const [selectedAmbientSound, setSelectedAmbientSound] = useState(null);
// const [ambientVolume, setAmbientVolume] = useState(50);
// const [isMuted, setIsMuted] = useState(false);
// const ambientSounds = [...];

// ✅ NEW (Global Context):
<>
  <AmbientBackgroundEffect enabled={true} opacity={0.15} />
  
  <div className="min-h-screen bg-[#F5F7FA] pb-20 relative z-10">
    {/* ... page content ... */}
    
    <AmbientSoundSystem />
    
    {/* ... more content ... */}
  </div>
  
  <AmbientMiniPlayer />
</>
```

---

## ✅ Benefits of Global State

### 1. **Persistence Across Pages**
- Start playing rain on Quiet Space page
- Navigate to Meditation Library
- Navigate to Journal
- **Audio keeps playing** - mini-player follows you

### 2. **No State Duplication**
- Single `selectedSound` variable
- Single `isPlaying` boolean
- Single `soundGenerator` instance
- Eliminates sync issues

### 3. **Seamless Transitions**
- Glass card → Mini-player transition is just a view mode change
- No audio interruption
- Smooth Smart Animate-style effect

### 4. **Centralized Audio Logic**
- All Web Audio API code in one place
- Easy to debug
- Consistent behavior across components

### 5. **Real-Time Synchronization**
- Waveform visualizers read from same `analyserNode`
- Volume changes instantly affect all UI elements
- Mute toggle updates everywhere simultaneously

---

## 🎯 Usage Example

```typescript
import { useAmbientSound } from '../contexts/ambient-sound-context';

function MyComponent() {
  const {
    // State
    selectedSound,
    isPlaying,
    ambientVolume,
    
    // Actions
    selectSound,
    togglePlayPause,
    setAmbientVolume,
    setDucking, // 🎵 NEW: Control audio ducking
    
    // View Control
    viewMode,
    setViewMode,
    
    // Audio Analysis
    analyserNode
  } = useAmbientSound();
  
  return (
    <div>
      {selectedSound && <p>Playing: {selectedSound.name}</p>}
      <button onClick={togglePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}
```

---

## 🎵 Audio Ducking (Voice Clarity)

### What is Ducking?

**Ducking** automatically reduces ambient sound volume when guided meditation voice narration plays, ensuring the voice is clearly heard while maintaining atmospheric presence.

### How It Works

```typescript
// Enable ducking when voice narration starts
const { setDucking } = useAmbientSound();

// Voice starts playing
setDucking(true);  // Ambient sound smoothly drops to 30% over 1.5 seconds

// Voice ends
setDucking(false); // Ambient sound smoothly returns to 100% over 1.5 seconds
```

### Technical Implementation

- **Volume Reduction:** 30% of original volume (ideal balance)
- **Transition:** 1.5 second exponential ramp (smooth, natural)
- **Method:** `exponentialRampToValueAtTime()` with `setTargetAtTime()` fallback
- **Master Volume:** User's volume slider setting is preserved during ducking

### Integration Example

```typescript
import { useAmbientSound } from '../contexts/ambient-sound-context';
import { useMeditation } from './meditation-context';

function MeditationPlayer() {
  const { setDucking } = useAmbientSound();
  const { isPlaying, activeSession } = useMeditation();
  
  // Auto-duck when meditation with voice narration is playing
  useEffect(() => {
    setDucking(isPlaying && !!activeSession);
    return () => setDucking(false); // Cleanup
  }, [isPlaying, activeSession, setDucking]);
  
  return <div>{/* Player UI */}</div>;
}
```

### Volume Behavior

**Normal Mode (No Ducking):**
- User sets 50% → Output: 50%
- User sets 75% → Output: 75%
- User sets 100% → Output: 100%

**Ducking Mode (Voice Active):**
- User sets 50% → Output: 15% (30% of 50%)
- User sets 75% → Output: 22.5% (30% of 75%)
- User sets 100% → Output: 30% (30% of 100%)

**User adjusts slider during ducking:**
- New volume is respected, ducking ratio maintained
- Example: Change from 50% → 80% while ducked
- Output changes from 15% → 24% (30% of 80%)

### Files

- **Implementation:** `/contexts/ambient-sound-context.tsx` (AmbientSoundGenerator class)
- **Documentation:** `/DUCKING_IMPLEMENTATION_GUIDE.md`
- **Test Component:** `/components/ducking-test-panel.tsx`

---

## 🚀 Performance Optimizations

1. **Lazy Initialization** - AudioContext created only when first sound plays
2. **Single Instance** - One `AmbientSoundGenerator` for entire app
3. **Efficient Cleanup** - `destroy()` method properly disconnects all nodes
4. **Canvas Animation** - Uses `requestAnimationFrame` for smooth 60fps visuals
5. **Smoothing** - FFT smoothing constant of 0.8 prevents jittery animations

---

## 📝 Summary

The Ambient Sound System is now a **first-class global feature** with:

✅ **Global State** - Lives in `/contexts/ambient-sound-context.tsx`
✅ **Persistent Audio** - Plays across entire app navigation
✅ **Three UI Variants** - Grid, Mini-Player, Mixer
✅ **Live Visualizations** - Real-time waveform animations
✅ **Dynamic Backgrounds** - Atmospheric gradients per sound
✅ **Zero External Files** - 100% synthetic Web Audio API generation
✅ **Seamless Transitions** - Smart view mode switching

**No more local state.** Everything is controlled by the context provider.