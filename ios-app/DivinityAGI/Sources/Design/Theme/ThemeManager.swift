// ThemeManager.swift
// Manages app-wide theme settings

import SwiftUI

@MainActor
class ThemeManager: ObservableObject {
    @Published var colorScheme: ColorScheme = .dark
    @Published var hapticEnabled: Bool = true
    @Published var soundEnabled: Bool = true
    @Published var accentColor: Color = .divinityGold

    // MARK: - Haptic Feedback
    func impact(_ style: UIImpactFeedbackGenerator.FeedbackStyle = .medium) {
        guard hapticEnabled else { return }
        let generator = UIImpactFeedbackGenerator(style: style)
        generator.impactOccurred()
    }

    func selection() {
        guard hapticEnabled else { return }
        let generator = UISelectionFeedbackGenerator()
        generator.selectionChanged()
    }

    func notification(_ type: UINotificationFeedbackGenerator.FeedbackType) {
        guard hapticEnabled else { return }
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(type)
    }
}
