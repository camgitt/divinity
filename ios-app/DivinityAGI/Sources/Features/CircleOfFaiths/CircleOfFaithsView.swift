// CircleOfFaithsView.swift
// The main faith selection interface

import SwiftUI

struct CircleOfFaithsView: View {
    @EnvironmentObject var appState: AppState
    @State private var selectedFaith: FaithTradition?
    @State private var showingGuides = false
    @State private var animationPhase: Double = 0

    private let faiths = FaithTradition.allCases

    var body: some View {
        NavigationStack {
            ZStack {
                // Background
                Color.divinityDeep
                    .ignoresSafeArea()

                // Ambient particles
                ParticleView(pattern: selectedFaith?.ambiance.particleType ?? .stars)
                    .ignoresSafeArea()

                VStack(spacing: 0) {
                    // Header
                    headerView

                    // Faith Circle
                    faithCircleView
                        .padding(.vertical, 32)

                    // Selected Faith Info
                    if let faith = selectedFaith {
                        selectedFaithCard(faith)
                            .transition(.move(edge: .bottom).combined(with: .opacity))
                    }

                    Spacer()
                }
            }
            .navigationDestination(isPresented: $showingGuides) {
                if let faith = selectedFaith {
                    SpiritGuidesView(faith: faith)
                }
            }
        }
    }

    // MARK: - Header
    private var headerView: some View {
        VStack(spacing: 8) {
            Text("Circle of Faiths")
                .font(.largeTitle)
                .fontWeight(.bold)
                .foregroundColor(.divinityGold)

            Text("Choose your spiritual tradition")
                .font(.subheadline)
                .foregroundColor(.divinityTextSecondary)
        }
        .padding(.top, 16)
    }

    // MARK: - Faith Circle
    private var faithCircleView: some View {
        GeometryReader { geometry in
            let center = CGPoint(x: geometry.size.width / 2, y: geometry.size.height / 2)
            let radius = min(geometry.size.width, geometry.size.height) * 0.38

            ZStack {
                // Center emblem
                Circle()
                    .fill(
                        RadialGradient(
                            colors: [.divinityGold.opacity(0.3), .clear],
                            center: .center,
                            startRadius: 0,
                            endRadius: 60
                        )
                    )
                    .frame(width: 120, height: 120)
                    .position(center)

                Image(systemName: "sparkle")
                    .font(.system(size: 32))
                    .foregroundColor(.divinityGold)
                    .position(center)
                    .rotationEffect(.degrees(animationPhase * 360))

                // Faith icons arranged in circle
                ForEach(Array(faiths.enumerated()), id: \.element.id) { index, faith in
                    let angle = (Double(index) / Double(faiths.count)) * 2 * .pi - .pi / 2
                    let x = center.x + radius * cos(angle)
                    let y = center.y + radius * sin(angle)

                    FaithIconButton(
                        faith: faith,
                        isSelected: selectedFaith == faith,
                        action: {
                            withAnimation(.spring(response: 0.4, dampingFraction: 0.7)) {
                                if selectedFaith == faith {
                                    selectedFaith = nil
                                } else {
                                    selectedFaith = faith
                                    HapticManager.shared.selection()
                                }
                            }
                        }
                    )
                    .position(x: x, y: y)
                }
            }
        }
        .frame(height: 340)
        .onAppear {
            withAnimation(.linear(duration: 30).repeatForever(autoreverses: false)) {
                animationPhase = 1
            }
        }
    }

    // MARK: - Selected Faith Card
    private func selectedFaithCard(_ faith: FaithTradition) -> some View {
        VStack(spacing: 16) {
            // Faith header
            HStack(spacing: 12) {
                Image(systemName: faith.icon)
                    .font(.title)
                    .foregroundColor(faith.primaryColor)

                VStack(alignment: .leading, spacing: 4) {
                    Text(faith.displayName)
                        .font(.title2)
                        .fontWeight(.semibold)
                        .foregroundColor(.divinityTextPrimary)

                    Text(faith.description)
                        .font(.caption)
                        .foregroundColor(.divinityTextSecondary)
                }

                Spacer()
            }

            // Affirmation
            if let affirmation = faith.affirmations.randomElement() {
                Text("\"\(affirmation)\"")
                    .font(.callout)
                    .italic()
                    .foregroundColor(faith.primaryColor.opacity(0.8))
                    .multilineTextAlignment(.center)
            }

            // Find Guides button
            Button(action: {
                HapticManager.shared.impact(.medium)
                showingGuides = true
            }) {
                HStack {
                    Text("Find Spirit Guides")
                        .fontWeight(.semibold)
                    Image(systemName: "arrow.right")
                }
                .foregroundColor(.divinityDeep)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 14)
                .background(faith.primaryColor)
                .cornerRadius(12)
            }
        }
        .padding(20)
        .background(Color.divinitySurface)
        .cornerRadius(20)
        .padding(.horizontal, 20)
    }
}

// MARK: - Faith Icon Button
struct FaithIconButton: View {
    let faith: FaithTradition
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            ZStack {
                Circle()
                    .fill(isSelected ? faith.primaryColor : Color.divinitySurface)
                    .frame(width: 56, height: 56)
                    .shadow(color: isSelected ? faith.primaryColor.opacity(0.5) : .clear, radius: 8)

                Image(systemName: faith.icon)
                    .font(.system(size: 22))
                    .foregroundColor(isSelected ? .divinityDeep : faith.primaryColor)
            }
            .scaleEffect(isSelected ? 1.15 : 1.0)
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Particle View (placeholder)
struct ParticleView: View {
    let pattern: FaithAmbiance.ParticleType

    var body: some View {
        // Placeholder for SpriteKit particle effects
        GeometryReader { geometry in
            ForEach(0..<20, id: \.self) { index in
                Circle()
                    .fill(Color.divinityGold.opacity(Double.random(in: 0.1...0.3)))
                    .frame(width: CGFloat.random(in: 2...6))
                    .position(
                        x: CGFloat.random(in: 0...geometry.size.width),
                        y: CGFloat.random(in: 0...geometry.size.height)
                    )
            }
        }
    }
}

// MARK: - Preview
#Preview {
    CircleOfFaithsView()
        .environmentObject(AppState())
}
