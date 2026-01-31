// DivinityAGIApp.swift
// Main entry point for DivinityAGI iOS app

import SwiftUI

@main
struct DivinityAGIApp: App {
    @StateObject private var appState = AppState()
    @StateObject private var themeManager = ThemeManager()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(appState)
                .environmentObject(themeManager)
                .preferredColorScheme(.dark)
        }
    }
}

// MARK: - App State
@MainActor
class AppState: ObservableObject {
    @Published var currentUser: User?
    @Published var isAuthenticated: Bool = false
    @Published var selectedTab: Tab = .circleOfFaiths
    @Published var subscriptionTier: SubscriptionTier = .seeker

    var isGuest: Bool {
        currentUser == nil
    }
}

// MARK: - Tab Enum
enum Tab: String, CaseIterable {
    case circleOfFaiths = "Faiths"
    case guides = "Guides"
    case quietSpace = "Meditate"
    case community = "Community"
    case profile = "Profile"

    var icon: String {
        switch self {
        case .circleOfFaiths: return "circle.hexagongrid"
        case .guides: return "person.2"
        case .quietSpace: return "leaf"
        case .community: return "person.3"
        case .profile: return "person.circle"
        }
    }
}
