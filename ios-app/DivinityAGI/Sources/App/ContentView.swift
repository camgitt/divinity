// ContentView.swift
// Main content view with tab navigation

import SwiftUI

struct ContentView: View {
    @EnvironmentObject var appState: AppState
    @State private var showOnboarding = true

    var body: some View {
        Group {
            if showOnboarding && !appState.isAuthenticated {
                OnboardingView(showOnboarding: $showOnboarding)
            } else {
                MainTabView()
            }
        }
        .animation(.easeInOut, value: showOnboarding)
    }
}

// MARK: - Main Tab View
struct MainTabView: View {
    @EnvironmentObject var appState: AppState

    var body: some View {
        TabView(selection: $appState.selectedTab) {
            CircleOfFaithsView()
                .tabItem {
                    Label(AppState.Tab.faiths.title, systemImage: AppState.Tab.faiths.icon)
                }
                .tag(AppState.Tab.faiths)

            GuidesTabView()
                .tabItem {
                    Label(AppState.Tab.guides.title, systemImage: AppState.Tab.guides.icon)
                }
                .tag(AppState.Tab.guides)

            QuietSpaceView()
                .tabItem {
                    Label(AppState.Tab.quiet.title, systemImage: AppState.Tab.quiet.icon)
                }
                .tag(AppState.Tab.quiet)

            JournalView()
                .tabItem {
                    Label(AppState.Tab.journal.title, systemImage: AppState.Tab.journal.icon)
                }
                .tag(AppState.Tab.journal)

            ProfileView()
                .tabItem {
                    Label(AppState.Tab.profile.title, systemImage: AppState.Tab.profile.icon)
                }
                .tag(AppState.Tab.profile)
        }
        .tint(Color.divinityGold)
    }
}

// MARK: - Guides Tab View
struct GuidesTabView: View {
    @EnvironmentObject var appState: AppState

    var body: some View {
        NavigationStack {
            if let faith = appState.selectedFaith {
                SpiritGuidesView(faith: faith)
            } else {
                VStack(spacing: 24) {
                    Image(systemName: "person.2.circle")
                        .font(.system(size: 60))
                        .foregroundColor(.divinityGold.opacity(0.6))

                    Text("Select a Faith First")
                        .font(.title2)
                        .fontWeight(.semibold)
                        .foregroundColor(.divinityTextPrimary)

                    Text("Choose your spiritual tradition\nin the Faiths tab to see guides")
                        .font(.subheadline)
                        .foregroundColor(.divinityTextSecondary)
                        .multilineTextAlignment(.center)

                    Button(action: {
                        appState.selectedTab = .faiths
                    }) {
                        Text("Go to Faiths")
                            .fontWeight(.semibold)
                            .foregroundColor(.divinityDeep)
                            .padding(.horizontal, 24)
                            .padding(.vertical, 12)
                            .background(Color.divinityGold)
                            .cornerRadius(25)
                    }
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .background(Color.divinityDeep)
                .navigationTitle("Spirit Guides")
            }
        }
    }
}

// MARK: - Onboarding View
struct OnboardingView: View {
    @Binding var showOnboarding: Bool
    @EnvironmentObject var appState: AppState
    @State private var currentPage = 0

    let pages = [
        OnboardingPage(
            title: "Welcome to DivinityAGI",
            subtitle: "Your personal spiritual companion",
            icon: "sparkles",
            color: .divinityGold
        ),
        OnboardingPage(
            title: "100+ Spirit Guides",
            subtitle: "Connect with guides from 14 faith traditions",
            icon: "person.2.circle",
            color: .divinityTeal
        ),
        OnboardingPage(
            title: "Find Inner Peace",
            subtitle: "Meditation, breathing exercises, and more",
            icon: "leaf.circle",
            color: .divinityPrimary
        )
    ]

    var body: some View {
        ZStack {
            // Background gradient
            LinearGradient(
                colors: [Color.divinityBackground, Color.divinitySurface],
                startPoint: .top,
                endPoint: .bottom
            )
            .ignoresSafeArea()

            VStack(spacing: 40) {
                Spacer()

                // Page content
                TabView(selection: $currentPage) {
                    ForEach(0..<pages.count, id: \.self) { index in
                        VStack(spacing: 20) {
                            Image(systemName: pages[index].icon)
                                .font(.system(size: 80))
                                .foregroundStyle(pages[index].color)

                            Text(pages[index].title)
                                .font(.largeTitle)
                                .fontWeight(.bold)
                                .foregroundColor(.white)

                            Text(pages[index].subtitle)
                                .font(.body)
                                .foregroundColor(.gray)
                                .multilineTextAlignment(.center)
                                .padding(.horizontal, 40)
                        }
                        .tag(index)
                    }
                }
                .tabViewStyle(.page(indexDisplayMode: .always))
                .frame(height: 350)

                Spacer()

                // Buttons
                VStack(spacing: 15) {
                    Button {
                        showOnboarding = false
                    } label: {
                        Text("Get Started")
                            .font(.headline)
                            .foregroundColor(.black)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.divinityGold)
                            .cornerRadius(12)
                    }

                    Button {
                        appState.isAuthenticated = false
                        showOnboarding = false
                    } label: {
                        Text("Continue as Guest")
                            .font(.subheadline)
                            .foregroundColor(.gray)
                    }
                }
                .padding(.horizontal, 30)
                .padding(.bottom, 50)
            }
        }
    }
}

struct OnboardingPage {
    let title: String
    let subtitle: String
    let icon: String
    let color: Color
}

#Preview {
    ContentView()
        .environmentObject(AppState())
        .environmentObject(ThemeManager())
}
