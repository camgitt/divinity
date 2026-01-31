// SpiritGuidesView.swift
// Browse and select spirit guides for a faith tradition

import SwiftUI

struct SpiritGuidesView: View {
    let faith: FaithTradition

    @EnvironmentObject var appState: AppState
    @State private var guides: [SpiritGuide] = []
    @State private var selectedGuide: SpiritGuide?
    @State private var showingChat = false
    @State private var searchText = ""
    @State private var selectedArchetype: GuideArchetype?
    @State private var isLoading = true

    private var filteredGuides: [SpiritGuide] {
        var result = guides

        if !searchText.isEmpty {
            result = result.filter { guide in
                guide.name.localizedCaseInsensitiveContains(searchText) ||
                guide.description.localizedCaseInsensitiveContains(searchText)
            }
        }

        if let archetype = selectedArchetype {
            result = result.filter { $0.archetype == archetype }
        }

        return result
    }

    var body: some View {
        ZStack {
            // Background with faith-specific gradient
            LinearGradient(
                colors: FaithAmbiance.ambiance(for: faith).gradientColors,
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            .ignoresSafeArea()

            VStack(spacing: 0) {
                // Search and Filter
                searchAndFilterBar
                    .padding(.horizontal)
                    .padding(.top, 8)

                if isLoading {
                    loadingView
                } else if filteredGuides.isEmpty {
                    emptyStateView
                } else {
                    // Guides Grid
                    ScrollView {
                        LazyVGrid(columns: [
                            GridItem(.flexible(), spacing: 16),
                            GridItem(.flexible(), spacing: 16)
                        ], spacing: 16) {
                            ForEach(filteredGuides) { guide in
                                GuideCard(guide: guide, isSelected: selectedGuide?.id == guide.id)
                                    .onTapGesture {
                                        withAnimation(.spring(response: 0.3)) {
                                            selectedGuide = guide
                                            HapticManager.shared.selection()
                                        }
                                    }
                            }
                        }
                        .padding()
                    }
                }

                // Selected Guide Actions
                if let guide = selectedGuide {
                    selectedGuideFooter(guide)
                        .transition(.move(edge: .bottom))
                }
            }
        }
        .navigationTitle(faith.displayName)
        .navigationBarTitleDisplayMode(.large)
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                Image(systemName: faith.icon)
                    .foregroundColor(faith.primaryColor)
            }
        }
        .sheet(isPresented: $showingChat) {
            if let guide = selectedGuide {
                GuideChatView(guide: guide)
            }
        }
        .onAppear {
            loadGuides()
        }
    }

    // MARK: - Search and Filter Bar
    private var searchAndFilterBar: some View {
        VStack(spacing: 12) {
            // Search
            HStack {
                Image(systemName: "magnifyingglass")
                    .foregroundColor(.divinityTextSecondary)

                TextField("Search guides...", text: $searchText)
                    .foregroundColor(.divinityTextPrimary)

                if !searchText.isEmpty {
                    Button(action: { searchText = "" }) {
                        Image(systemName: "xmark.circle.fill")
                            .foregroundColor(.divinityTextSecondary)
                    }
                }
            }
            .padding(12)
            .background(Color.divinitySurface)
            .cornerRadius(12)

            // Archetype Filter
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 8) {
                    FilterChip(
                        title: "All",
                        isSelected: selectedArchetype == nil,
                        action: { selectedArchetype = nil }
                    )

                    ForEach(GuideArchetype.allCases, id: \.self) { archetype in
                        FilterChip(
                            title: archetype.displayName,
                            icon: archetype.icon,
                            isSelected: selectedArchetype == archetype,
                            action: { selectedArchetype = archetype }
                        )
                    }
                }
            }
        }
    }

    // MARK: - Loading View
    private var loadingView: some View {
        VStack(spacing: 16) {
            ProgressView()
                .progressViewStyle(CircularProgressViewStyle(tint: faith.primaryColor))
                .scaleEffect(1.5)

            Text("Finding guides for you...")
                .foregroundColor(.divinityTextSecondary)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    // MARK: - Empty State
    private var emptyStateView: some View {
        VStack(spacing: 16) {
            Image(systemName: "person.crop.circle.badge.questionmark")
                .font(.system(size: 60))
                .foregroundColor(.divinityTextSecondary)

            Text("No guides found")
                .font(.title3)
                .fontWeight(.medium)
                .foregroundColor(.divinityTextPrimary)

            Text("Try adjusting your search or filters")
                .font(.subheadline)
                .foregroundColor(.divinityTextSecondary)

            if selectedArchetype != nil || !searchText.isEmpty {
                Button("Clear Filters") {
                    searchText = ""
                    selectedArchetype = nil
                }
                .foregroundColor(faith.primaryColor)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    // MARK: - Selected Guide Footer
    private func selectedGuideFooter(_ guide: SpiritGuide) -> some View {
        VStack(spacing: 12) {
            HStack(spacing: 12) {
                // Guide avatar
                AsyncImage(url: guide.displayImageURL) { image in
                    image
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                } placeholder: {
                    Circle()
                        .fill(faith.primaryColor.opacity(0.3))
                        .overlay(
                            Image(systemName: "person.fill")
                                .foregroundColor(faith.primaryColor)
                        )
                }
                .frame(width: 50, height: 50)
                .clipShape(Circle())

                VStack(alignment: .leading, spacing: 2) {
                    Text(guide.name)
                        .font(.headline)
                        .foregroundColor(.divinityTextPrimary)

                    Text(guide.archetype.displayName)
                        .font(.caption)
                        .foregroundColor(.divinityTextSecondary)
                }

                Spacer()

                // Start Chat button
                Button(action: {
                    HapticManager.shared.impact(.medium)
                    showingChat = true
                }) {
                    HStack {
                        Image(systemName: "message.fill")
                        Text("Chat")
                    }
                    .fontWeight(.semibold)
                    .foregroundColor(.divinityDeep)
                    .padding(.horizontal, 20)
                    .padding(.vertical, 12)
                    .background(faith.primaryColor)
                    .cornerRadius(25)
                }
            }
        }
        .padding()
        .background(Color.divinitySurface)
    }

    // MARK: - Load Guides
    private func loadGuides() {
        // Simulate loading - in production, fetch from GuideService
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
            guides = SampleGuides.forFaith(faith)
            isLoading = false
        }
    }
}

// MARK: - Guide Card
struct GuideCard: View {
    let guide: SpiritGuide
    let isSelected: Bool

    var body: some View {
        VStack(spacing: 12) {
            // Avatar
            AsyncImage(url: guide.displayImageURL) { image in
                image
                    .resizable()
                    .aspectRatio(contentMode: .fill)
            } placeholder: {
                Circle()
                    .fill(guide.faith.primaryColor.opacity(0.2))
                    .overlay(
                        Image(systemName: "person.fill")
                            .font(.system(size: 30))
                            .foregroundColor(guide.faith.primaryColor)
                    )
            }
            .frame(width: 80, height: 80)
            .clipShape(Circle())
            .overlay(
                Circle()
                    .stroke(isSelected ? guide.faith.primaryColor : .clear, lineWidth: 3)
            )
            .shadow(color: isSelected ? guide.faith.primaryColor.opacity(0.5) : .clear, radius: 8)

            // Name
            Text(guide.name)
                .font(.headline)
                .foregroundColor(.divinityTextPrimary)
                .lineLimit(1)

            // Archetype badge
            HStack(spacing: 4) {
                Image(systemName: guide.archetype.icon)
                    .font(.caption2)
                Text(guide.archetype.displayName)
                    .font(.caption2)
            }
            .foregroundColor(guide.faith.primaryColor)
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .background(guide.faith.primaryColor.opacity(0.15))
            .cornerRadius(8)

            // Personality
            Text(guide.personality.displayName)
                .font(.caption)
                .foregroundColor(.divinityTextSecondary)
        }
        .padding(16)
        .frame(maxWidth: .infinity)
        .background(Color.divinitySurface)
        .cornerRadius(16)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(isSelected ? guide.faith.primaryColor : .clear, lineWidth: 2)
        )
        .scaleEffect(isSelected ? 1.02 : 1.0)
    }
}

// MARK: - Filter Chip
struct FilterChip: View {
    let title: String
    var icon: String? = nil
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: {
            HapticManager.shared.selection()
            action()
        }) {
            HStack(spacing: 4) {
                if let icon = icon {
                    Image(systemName: icon)
                        .font(.caption)
                }
                Text(title)
                    .font(.subheadline)
            }
            .foregroundColor(isSelected ? .divinityDeep : .divinityTextPrimary)
            .padding(.horizontal, 12)
            .padding(.vertical, 8)
            .background(isSelected ? Color.divinityGold : Color.divinitySurface)
            .cornerRadius(20)
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Sample Guides (placeholder data)
struct SampleGuides {
    static func forFaith(_ faith: FaithTradition) -> [SpiritGuide] {
        // Sample guides for testing - in production, fetch from API
        return [
            SpiritGuide(
                id: "guide-1",
                name: "Elder \(faith.displayName.prefix(4)) Guide",
                faith: faith,
                imageURL: "",
                chatURL: nil,
                personality: .wise,
                archetype: .elder,
                specialties: [.spiritualGrowth, .deepeningFaith],
                ageRange: .elder,
                journeyLevel: .advanced,
                welcomeMessage: "Welcome, seeker of wisdom.",
                description: "A wise elder with deep spiritual knowledge.",
                voiceStyle: .soothing
            ),
            SpiritGuide(
                id: "guide-2",
                name: "Healer of \(faith.displayName)",
                faith: faith,
                imageURL: "",
                chatURL: nil,
                personality: .compassionate,
                archetype: .healer,
                specialties: [.healingTrauma, .innerPeace],
                ageRange: .middleAged,
                journeyLevel: .intermediate,
                welcomeMessage: "I am here to help you heal.",
                description: "A compassionate healer focused on recovery.",
                voiceStyle: .gentle
            ),
            SpiritGuide(
                id: "guide-3",
                name: "Scholar of Light",
                faith: faith,
                imageURL: "",
                chatURL: nil,
                personality: .scholarly,
                archetype: .scholar,
                specialties: [.spiritualGrowth, .findingPurpose],
                ageRange: .middleAged,
                journeyLevel: .advanced,
                welcomeMessage: "Let us explore the sacred texts together.",
                description: "A learned scholar with vast knowledge.",
                voiceStyle: .authoritative
            ),
            SpiritGuide(
                id: "guide-4",
                name: "Joyful Celebrant",
                faith: faith,
                imageURL: "",
                chatURL: nil,
                personality: .joyful,
                archetype: .celebrant,
                specialties: [.community, .creativity],
                ageRange: .young,
                journeyLevel: .beginner,
                welcomeMessage: "Let us celebrate the divine together!",
                description: "A joyful guide who celebrates life.",
                voiceStyle: .energetic
            )
        ]
    }
}

// MARK: - Preview
#Preview {
    NavigationStack {
        SpiritGuidesView(faith: .buddhism)
            .environmentObject(AppState())
    }
}
