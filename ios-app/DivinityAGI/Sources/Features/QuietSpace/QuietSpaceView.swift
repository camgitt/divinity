// QuietSpaceView.swift
// Meditation and quiet space experience

import SwiftUI

struct QuietSpaceView: View {
    @EnvironmentObject var appState: AppState
    @StateObject private var meditationState = MeditationState()
    @State private var selectedSound: AmbientSound = .ocean
    @State private var selectedDuration: Int = 5 // minutes
    @State private var showingSettings = false

    private let durations = [3, 5, 10, 15, 20, 30]

    var body: some View {
        NavigationStack {
            ZStack {
                // Animated background
                AnimatedBackground(isActive: meditationState.isPlaying)
                    .ignoresSafeArea()

                VStack(spacing: 32) {
                    Spacer()

                    // Timer Display
                    timerDisplay

                    // Breathing Guide
                    if meditationState.isPlaying {
                        BreathingCircle(phase: meditationState.breathingPhase)
                            .transition(.scale.combined(with: .opacity))
                    }

                    Spacer()

                    // Controls
                    controlsSection

                    // Sound and Duration Selectors
                    if !meditationState.isPlaying {
                        settingsSection
                            .transition(.move(edge: .bottom).combined(with: .opacity))
                    }
                }
                .padding()
            }
            .navigationTitle("Quiet Space")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: { showingSettings = true }) {
                        Image(systemName: "gearshape")
                            .foregroundColor(.divinityGold)
                    }
                }
            }
            .sheet(isPresented: $showingSettings) {
                QuietSpaceSettingsView()
            }
        }
    }

    // MARK: - Timer Display
    private var timerDisplay: some View {
        VStack(spacing: 8) {
            Text(meditationState.formattedTime)
                .font(.system(size: 72, weight: .light, design: .rounded))
                .foregroundColor(.divinityGold)
                .monospacedDigit()

            if meditationState.isPlaying {
                Text(meditationState.breathingInstruction)
                    .font(.title3)
                    .foregroundColor(.divinityTextSecondary)
                    .animation(.easeInOut, value: meditationState.breathingPhase)
            } else {
                Text("Choose your duration")
                    .font(.subheadline)
                    .foregroundColor(.divinityTextSecondary)
            }
        }
    }

    // MARK: - Breathing Circle
    struct BreathingCircle: View {
        let phase: BreathingPhase

        var body: some View {
            ZStack {
                // Outer glow
                Circle()
                    .fill(
                        RadialGradient(
                            colors: [.divinityGold.opacity(0.4), .clear],
                            center: .center,
                            startRadius: 60,
                            endRadius: 140
                        )
                    )
                    .frame(width: 280, height: 280)
                    .scaleEffect(phase.scale)

                // Inner circle
                Circle()
                    .fill(
                        LinearGradient(
                            colors: [.divinityGold.opacity(0.6), .divinityTeal.opacity(0.4)],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .frame(width: 140, height: 140)
                    .scaleEffect(phase.scale)

                // Center
                Circle()
                    .fill(Color.divinityGold.opacity(0.8))
                    .frame(width: 20, height: 20)
            }
            .animation(.easeInOut(duration: phase.duration), value: phase)
        }
    }

    // MARK: - Controls Section
    private var controlsSection: some View {
        HStack(spacing: 40) {
            // Reset button
            Button(action: {
                HapticManager.shared.impact(.light)
                withAnimation {
                    meditationState.reset(duration: selectedDuration)
                }
            }) {
                Image(systemName: "arrow.counterclockwise")
                    .font(.title2)
                    .foregroundColor(.divinityTextSecondary)
                    .frame(width: 60, height: 60)
                    .background(Color.divinitySurface)
                    .clipShape(Circle())
            }
            .opacity(meditationState.hasStarted ? 1 : 0.3)
            .disabled(!meditationState.hasStarted)

            // Play/Pause button
            Button(action: {
                HapticManager.shared.impact(.medium)
                withAnimation(.spring(response: 0.4)) {
                    if meditationState.isPlaying {
                        meditationState.pause()
                    } else {
                        if !meditationState.hasStarted {
                            meditationState.start(duration: selectedDuration, sound: selectedSound)
                        } else {
                            meditationState.resume()
                        }
                    }
                }
            }) {
                Image(systemName: meditationState.isPlaying ? "pause.fill" : "play.fill")
                    .font(.system(size: 32))
                    .foregroundColor(.divinityDeep)
                    .frame(width: 88, height: 88)
                    .background(
                        LinearGradient(
                            colors: [.divinityGold, .divinityTeal],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .clipShape(Circle())
                    .shadow(color: .divinityGold.opacity(0.4), radius: 20)
            }

            // Sound toggle
            Button(action: {
                HapticManager.shared.selection()
                meditationState.toggleSound()
            }) {
                Image(systemName: meditationState.isSoundMuted ? "speaker.slash.fill" : "speaker.wave.2.fill")
                    .font(.title2)
                    .foregroundColor(meditationState.isSoundMuted ? .divinityTextSecondary : .divinityGold)
                    .frame(width: 60, height: 60)
                    .background(Color.divinitySurface)
                    .clipShape(Circle())
            }
        }
    }

    // MARK: - Settings Section
    private var settingsSection: some View {
        VStack(spacing: 24) {
            // Duration selector
            VStack(alignment: .leading, spacing: 12) {
                Text("Duration")
                    .font(.subheadline)
                    .foregroundColor(.divinityTextSecondary)

                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 12) {
                        ForEach(durations, id: \.self) { minutes in
                            DurationChip(
                                minutes: minutes,
                                isSelected: selectedDuration == minutes,
                                action: { selectedDuration = minutes }
                            )
                        }
                    }
                }
            }

            // Sound selector
            VStack(alignment: .leading, spacing: 12) {
                Text("Ambient Sound")
                    .font(.subheadline)
                    .foregroundColor(.divinityTextSecondary)

                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 12) {
                        ForEach(AmbientSound.allCases, id: \.self) { sound in
                            SoundChip(
                                sound: sound,
                                isSelected: selectedSound == sound,
                                action: { selectedSound = sound }
                            )
                        }
                    }
                }
            }
        }
        .padding(.horizontal)
    }
}

// MARK: - Duration Chip
struct DurationChip: View {
    let minutes: Int
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: {
            HapticManager.shared.selection()
            action()
        }) {
            Text("\(minutes) min")
                .font(.subheadline)
                .fontWeight(isSelected ? .semibold : .regular)
                .foregroundColor(isSelected ? .divinityDeep : .divinityTextPrimary)
                .padding(.horizontal, 16)
                .padding(.vertical, 10)
                .background(isSelected ? Color.divinityGold : Color.divinitySurface)
                .cornerRadius(20)
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Sound Chip
struct SoundChip: View {
    let sound: AmbientSound
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: {
            HapticManager.shared.selection()
            action()
        }) {
            HStack(spacing: 6) {
                Image(systemName: sound.icon)
                    .font(.caption)
                Text(sound.displayName)
                    .font(.subheadline)
            }
            .foregroundColor(isSelected ? .divinityDeep : .divinityTextPrimary)
            .padding(.horizontal, 14)
            .padding(.vertical, 10)
            .background(isSelected ? Color.divinityTeal : Color.divinitySurface)
            .cornerRadius(20)
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Animated Background
struct AnimatedBackground: View {
    let isActive: Bool
    @State private var phase: Double = 0

    var body: some View {
        ZStack {
            Color.divinityDeep

            // Gradient orbs
            ForEach(0..<3, id: \.self) { index in
                Circle()
                    .fill(
                        RadialGradient(
                            colors: [
                                (index == 0 ? Color.divinityGold : index == 1 ? Color.divinityTeal : Color.faithBuddhism).opacity(0.15),
                                .clear
                            ],
                            center: .center,
                            startRadius: 0,
                            endRadius: 200
                        )
                    )
                    .frame(width: 400, height: 400)
                    .offset(
                        x: cos(phase + Double(index) * 2.1) * 100,
                        y: sin(phase + Double(index) * 2.1) * 150
                    )
                    .blur(radius: 60)
            }
        }
        .onAppear {
            if isActive {
                startAnimation()
            }
        }
        .onChange(of: isActive) { _, newValue in
            if newValue {
                startAnimation()
            }
        }
    }

    private func startAnimation() {
        withAnimation(.easeInOut(duration: 20).repeatForever(autoreverses: true)) {
            phase = .pi * 2
        }
    }
}

// MARK: - Meditation State
class MeditationState: ObservableObject {
    @Published var remainingSeconds: Int = 0
    @Published var isPlaying = false
    @Published var hasStarted = false
    @Published var isSoundMuted = false
    @Published var breathingPhase: BreathingPhase = .inhale

    private var timer: Timer?
    private var breathingTimer: Timer?
    private var totalSeconds: Int = 0

    var formattedTime: String {
        let minutes = remainingSeconds / 60
        let seconds = remainingSeconds % 60
        return String(format: "%d:%02d", minutes, seconds)
    }

    var breathingInstruction: String {
        breathingPhase.instruction
    }

    func start(duration: Int, sound: AmbientSound) {
        totalSeconds = duration * 60
        remainingSeconds = totalSeconds
        hasStarted = true
        resume()
        startBreathingCycle()
        // TODO: Start audio playback with AudioEngine
    }

    func pause() {
        isPlaying = false
        timer?.invalidate()
        breathingTimer?.invalidate()
    }

    func resume() {
        isPlaying = true
        timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { [weak self] _ in
            self?.tick()
        }
        startBreathingCycle()
    }

    func reset(duration: Int) {
        pause()
        remainingSeconds = duration * 60
        hasStarted = false
        breathingPhase = .inhale
    }

    func toggleSound() {
        isSoundMuted.toggle()
        // TODO: Mute/unmute audio
    }

    private func tick() {
        if remainingSeconds > 0 {
            remainingSeconds -= 1
        } else {
            complete()
        }
    }

    private func complete() {
        pause()
        HapticManager.shared.notification(.success)
        // TODO: Show completion UI
    }

    private func startBreathingCycle() {
        breathingTimer?.invalidate()
        cycleBreathing()
    }

    private func cycleBreathing() {
        guard isPlaying else { return }

        withAnimation(.easeInOut(duration: breathingPhase.duration)) {
            breathingPhase = breathingPhase.next
        }

        breathingTimer = Timer.scheduledTimer(withTimeInterval: breathingPhase.duration, repeats: false) { [weak self] _ in
            self?.cycleBreathing()
        }
    }
}

// MARK: - Breathing Phase
enum BreathingPhase {
    case inhale
    case holdIn
    case exhale
    case holdOut

    var instruction: String {
        switch self {
        case .inhale: return "Breathe in..."
        case .holdIn: return "Hold..."
        case .exhale: return "Breathe out..."
        case .holdOut: return "Rest..."
        }
    }

    var duration: Double {
        switch self {
        case .inhale: return 4.0
        case .holdIn: return 4.0
        case .exhale: return 6.0
        case .holdOut: return 2.0
        }
    }

    var scale: CGFloat {
        switch self {
        case .inhale, .holdIn: return 1.3
        case .exhale, .holdOut: return 0.8
        }
    }

    var next: BreathingPhase {
        switch self {
        case .inhale: return .holdIn
        case .holdIn: return .exhale
        case .exhale: return .holdOut
        case .holdOut: return .inhale
        }
    }
}

// MARK: - Settings View (placeholder)
struct QuietSpaceSettingsView: View {
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            List {
                Section("Breathing Pattern") {
                    Text("4-4-6-2 (Default)")
                    Text("4-7-8 (Relaxing)")
                    Text("Box Breathing (4-4-4-4)")
                }

                Section("Background") {
                    Text("Animated Orbs")
                    Text("Still Gradient")
                    Text("Particles")
                }

                Section("Haptics") {
                    Toggle("Breathing Haptics", isOn: .constant(true))
                    Toggle("Completion Haptics", isOn: .constant(true))
                }
            }
            .navigationTitle("Settings")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") { dismiss() }
                }
            }
        }
    }
}

// MARK: - Preview
#Preview {
    QuietSpaceView()
        .environmentObject(AppState())
}
