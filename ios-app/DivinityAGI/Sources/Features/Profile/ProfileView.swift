// ProfileView.swift
// User profile and settings

import SwiftUI

struct ProfileView: View {
    @EnvironmentObject var appState: AppState
    @EnvironmentObject var themeManager: ThemeManager
    @State private var showingSubscription = false
    @State private var showingSettings = false
    @State private var showingSignOutAlert = false

    var body: some View {
        NavigationStack {
            ZStack {
                Color.divinityDeep
                    .ignoresSafeArea()

                ScrollView {
                    VStack(spacing: 24) {
                        // Profile Header
                        profileHeader

                        // Subscription Card
                        subscriptionCard

                        // Stats Grid
                        statsGrid

                        // Quick Actions
                        quickActions

                        // Settings
                        settingsList
                    }
                    .padding()
                }
            }
            .navigationTitle("Profile")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: { showingSettings = true }) {
                        Image(systemName: "gearshape")
                            .foregroundColor(.divinityGold)
                    }
                }
            }
            .sheet(isPresented: $showingSubscription) {
                SubscriptionView()
            }
            .sheet(isPresented: $showingSettings) {
                SettingsView()
            }
            .alert("Sign Out", isPresented: $showingSignOutAlert) {
                Button("Cancel", role: .cancel) { }
                Button("Sign Out", role: .destructive) {
                    appState.signOut()
                }
            } message: {
                Text("Are you sure you want to sign out?")
            }
        }
    }

    // MARK: - Profile Header
    private var profileHeader: some View {
        VStack(spacing: 16) {
            // Avatar
            ZStack {
                Circle()
                    .fill(
                        LinearGradient(
                            colors: [.divinityGold, .divinityTeal],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .frame(width: 100, height: 100)

                Text(initials)
                    .font(.system(size: 36, weight: .semibold))
                    .foregroundColor(.divinityDeep)
            }

            VStack(spacing: 4) {
                Text(appState.currentUser?.displayName ?? "Spiritual Seeker")
                    .font(.title2)
                    .fontWeight(.bold)
                    .foregroundColor(.divinityTextPrimary)

                Text(appState.currentUser?.email ?? "guest@divinity.app")
                    .font(.subheadline)
                    .foregroundColor(.divinityTextSecondary)
            }

            // Faith badge
            if let faith = appState.selectedFaith {
                HStack(spacing: 6) {
                    Image(systemName: faith.icon)
                    Text(faith.displayName)
                }
                .font(.caption)
                .foregroundColor(faith.primaryColor)
                .padding(.horizontal, 12)
                .padding(.vertical, 6)
                .background(faith.primaryColor.opacity(0.15))
                .cornerRadius(16)
            }
        }
    }

    private var initials: String {
        let name = appState.currentUser?.displayName ?? "S"
        let components = name.components(separatedBy: " ")
        if components.count >= 2 {
            return String(components[0].prefix(1) + components[1].prefix(1))
        }
        return String(name.prefix(2)).uppercased()
    }

    // MARK: - Subscription Card
    private var subscriptionCard: some View {
        Button(action: { showingSubscription = true }) {
            HStack {
                VStack(alignment: .leading, spacing: 8) {
                    HStack {
                        Image(systemName: appState.subscriptionTier.icon)
                        Text(appState.subscriptionTier.displayName)
                            .fontWeight(.semibold)
                    }
                    .foregroundColor(appState.subscriptionTier.color)

                    Text(appState.subscriptionTier.description)
                        .font(.caption)
                        .foregroundColor(.divinityTextSecondary)
                }

                Spacer()

                // Token balance
                VStack(alignment: .trailing, spacing: 4) {
                    Text("\(appState.tokenBalance.total)")
                        .font(.title2)
                        .fontWeight(.bold)
                        .foregroundColor(.divinityGold)
                    Text("tokens")
                        .font(.caption)
                        .foregroundColor(.divinityTextSecondary)
                }

                Image(systemName: "chevron.right")
                    .foregroundColor(.divinityTextSecondary)
            }
            .padding()
            .background(Color.divinitySurface)
            .cornerRadius(16)
        }
        .buttonStyle(.plain)
    }

    // MARK: - Stats Grid
    private var statsGrid: some View {
        LazyVGrid(columns: [
            GridItem(.flexible()),
            GridItem(.flexible()),
            GridItem(.flexible())
        ], spacing: 16) {
            StatCard(value: "12", label: "Sessions", icon: "message.fill")
            StatCard(value: "5", label: "Entries", icon: "book.fill")
            StatCard(value: "3h", label: "Quiet Time", icon: "leaf.fill")
        }
    }

    // MARK: - Quick Actions
    private var quickActions: some View {
        VStack(spacing: 12) {
            ProfileActionRow(
                icon: "person.fill",
                title: "Edit Profile",
                action: { }
            )

            ProfileActionRow(
                icon: "bell.fill",
                title: "Notifications",
                action: { }
            )

            ProfileActionRow(
                icon: "bookmark.fill",
                title: "Saved Guides",
                action: { }
            )

            ProfileActionRow(
                icon: "trophy.fill",
                title: "Achievements",
                action: { }
            )
        }
        .padding()
        .background(Color.divinitySurface)
        .cornerRadius(16)
    }

    // MARK: - Settings List
    private var settingsList: some View {
        VStack(spacing: 12) {
            ProfileActionRow(
                icon: "questionmark.circle",
                title: "Help & Support",
                action: { }
            )

            ProfileActionRow(
                icon: "doc.text",
                title: "Terms & Privacy",
                action: { }
            )

            ProfileActionRow(
                icon: "arrow.right.square",
                title: "Sign Out",
                iconColor: .red,
                action: { showingSignOutAlert = true }
            )
        }
        .padding()
        .background(Color.divinitySurface)
        .cornerRadius(16)
    }
}

// MARK: - Stat Card
struct StatCard: View {
    let value: String
    let label: String
    let icon: String

    var body: some View {
        VStack(spacing: 8) {
            Image(systemName: icon)
                .font(.title2)
                .foregroundColor(.divinityGold)

            Text(value)
                .font(.title3)
                .fontWeight(.bold)
                .foregroundColor(.divinityTextPrimary)

            Text(label)
                .font(.caption)
                .foregroundColor(.divinityTextSecondary)
        }
        .frame(maxWidth: .infinity)
        .padding()
        .background(Color.divinitySurface)
        .cornerRadius(12)
    }
}

// MARK: - Profile Action Row
struct ProfileActionRow: View {
    let icon: String
    let title: String
    var iconColor: Color = .divinityGold
    let action: () -> Void

    var body: some View {
        Button(action: {
            HapticManager.shared.selection()
            action()
        }) {
            HStack {
                Image(systemName: icon)
                    .font(.title3)
                    .foregroundColor(iconColor)
                    .frame(width: 32)

                Text(title)
                    .foregroundColor(.divinityTextPrimary)

                Spacer()

                Image(systemName: "chevron.right")
                    .font(.caption)
                    .foregroundColor(.divinityTextSecondary)
            }
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Subscription View (placeholder)
struct SubscriptionView: View {
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            VStack(spacing: 24) {
                Text("Upgrade Your Journey")
                    .font(.title)
                    .foregroundColor(.divinityGold)

                Text("StoreKit integration coming soon")
                    .foregroundColor(.divinityTextSecondary)

                Spacer()
            }
            .padding()
            .background(Color.divinityDeep.ignoresSafeArea())
            .navigationTitle("Subscription")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") { dismiss() }
                }
            }
        }
    }
}

// MARK: - Settings View (placeholder)
struct SettingsView: View {
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            List {
                Section("Appearance") {
                    Toggle("Dark Mode", isOn: .constant(true))
                    Toggle("Haptic Feedback", isOn: .constant(true))
                }

                Section("Audio") {
                    Toggle("Ambient Sounds", isOn: .constant(true))
                    Toggle("Notifications", isOn: .constant(true))
                }

                Section("About") {
                    HStack {
                        Text("Version")
                        Spacer()
                        Text("1.0.0")
                            .foregroundColor(.secondary)
                    }
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

// MARK: - Subscription Tier Extension
extension SubscriptionTier {
    var icon: String {
        switch self {
        case .seeker: return "sparkle"
        case .believer: return "star.fill"
        case .devotee: return "crown.fill"
        }
    }

    var color: Color {
        switch self {
        case .seeker: return .gray
        case .believer: return .divinityGold
        case .devotee: return .purple
        }
    }

    var description: String {
        switch self {
        case .seeker: return "Free tier with limited tokens"
        case .believer: return "Enhanced spiritual journey"
        case .devotee: return "Full access to all features"
        }
    }
}

// MARK: - Preview
#Preview {
    ProfileView()
        .environmentObject(AppState())
        .environmentObject(ThemeManager())
}
