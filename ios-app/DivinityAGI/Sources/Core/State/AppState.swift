// AppState.swift
// Global application state management

import SwiftUI

@MainActor
class AppState: ObservableObject {
    // MARK: - User State
    @Published var currentUser: User?
    @Published var isAuthenticated = false
    @Published var hasCompletedOnboarding = false

    // MARK: - Faith Selection
    @Published var selectedFaith: FaithTradition?
    @Published var selectedGuide: SpiritGuide?

    // MARK: - Subscription
    @Published var subscriptionTier: SubscriptionTier = .seeker
    @Published var tokenBalance = TokenBalance()

    // MARK: - UI State
    @Published var selectedTab: Tab = .faiths
    @Published var showingOnboarding = false
    @Published var isLoading = false

    // MARK: - Tab
    enum Tab: String, CaseIterable {
        case faiths
        case guides
        case quiet
        case journal
        case profile

        var icon: String {
            switch self {
            case .faiths: return "circle.hexagongrid"
            case .guides: return "person.2"
            case .quiet: return "leaf"
            case .journal: return "book"
            case .profile: return "person.circle"
            }
        }

        var title: String {
            switch self {
            case .faiths: return "Faiths"
            case .guides: return "Guides"
            case .quiet: return "Quiet Space"
            case .journal: return "Journal"
            case .profile: return "Profile"
            }
        }
    }

    // MARK: - Initialization
    init() {
        loadPersistedState()
    }

    // MARK: - Authentication
    func signIn(email: String, password: String) async throws {
        isLoading = true
        defer { isLoading = false }

        // TODO: Integrate with Supabase auth
        // Simulate auth for now
        try await Task.sleep(nanoseconds: 1_000_000_000)

        currentUser = User(
            id: UUID().uuidString,
            email: email,
            displayName: "Spiritual Seeker",
            faithTradition: selectedFaith ?? .universal,
            subscriptionTier: .seeker,
            tokenBalance: TokenBalance()
        )
        isAuthenticated = true
    }

    func signOut() {
        currentUser = nil
        isAuthenticated = false
        selectedGuide = nil
    }

    // MARK: - Onboarding
    func completeOnboarding() {
        hasCompletedOnboarding = true
        UserDefaults.standard.set(true, forKey: "hasCompletedOnboarding")
    }

    // MARK: - Faith Selection
    func selectFaith(_ faith: FaithTradition) {
        selectedFaith = faith
        if var user = currentUser {
            user.faithTradition = faith
            currentUser = user
        }
    }

    func selectGuide(_ guide: SpiritGuide) {
        selectedGuide = guide
    }

    // MARK: - Tokens
    func useTokens(_ amount: Int) -> Bool {
        guard tokenBalance.total >= amount else { return false }

        if tokenBalance.daily >= amount {
            tokenBalance.daily -= amount
        } else {
            let remaining = amount - tokenBalance.daily
            tokenBalance.daily = 0
            tokenBalance.purchased -= remaining
        }

        return true
    }

    func addTokens(_ amount: Int) {
        tokenBalance.purchased += amount
    }

    // MARK: - Persistence
    private func loadPersistedState() {
        hasCompletedOnboarding = UserDefaults.standard.bool(forKey: "hasCompletedOnboarding")

        if let faithRaw = UserDefaults.standard.string(forKey: "selectedFaith"),
           let faith = FaithTradition(rawValue: faithRaw) {
            selectedFaith = faith
        }
    }

    func persistState() {
        if let faith = selectedFaith {
            UserDefaults.standard.set(faith.rawValue, forKey: "selectedFaith")
        }
    }
}

// MARK: - Haptic Manager
class HapticManager {
    static let shared = HapticManager()

    private let selectionGenerator = UISelectionFeedbackGenerator()
    private let impactLight = UIImpactFeedbackGenerator(style: .light)
    private let impactMedium = UIImpactFeedbackGenerator(style: .medium)
    private let impactHeavy = UIImpactFeedbackGenerator(style: .heavy)
    private let notificationGenerator = UINotificationFeedbackGenerator()

    private init() {
        prepareGenerators()
    }

    func prepareGenerators() {
        selectionGenerator.prepare()
        impactLight.prepare()
        impactMedium.prepare()
        impactHeavy.prepare()
        notificationGenerator.prepare()
    }

    func selection() {
        selectionGenerator.selectionChanged()
    }

    func impact(_ style: UIImpactFeedbackGenerator.FeedbackStyle) {
        switch style {
        case .light:
            impactLight.impactOccurred()
        case .medium:
            impactMedium.impactOccurred()
        case .heavy:
            impactHeavy.impactOccurred()
        default:
            impactMedium.impactOccurred()
        }
    }

    func notification(_ type: UINotificationFeedbackGenerator.FeedbackType) {
        notificationGenerator.notificationOccurred(type)
    }
}
