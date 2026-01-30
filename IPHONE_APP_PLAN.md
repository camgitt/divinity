# DivinityAGI iPhone Native App Implementation Plan

## Executive Summary

Convert the existing React/TypeScript web application to a **native iOS app using SwiftUI** that maintains 100% feature parity and design fidelity with the Figma designs.

**Figma Reference:** https://www.figma.com/design/XMEJbakwej3r0XarncQCPW/DivinityAGI-Spirit-Guide-App--2026--Copy-

---

## Technology Stack Recommendation

### Primary Stack: **SwiftUI + Swift**

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **UI Framework** | SwiftUI | Modern declarative UI, matches React component patterns |
| **Architecture** | MVVM + Clean Architecture | Separation of concerns, testability |
| **State Management** | Combine + @Observable | Native reactive programming (replaces React Context) |
| **Navigation** | NavigationStack | Native iOS navigation patterns |
| **Networking** | URLSession + async/await | Native, performant API calls |
| **Database** | Supabase Swift SDK | Maintain existing backend |
| **Payments** | StoreKit 2 | Native iOS subscriptions (replaces Stripe web) |
| **Video Chat** | D-ID iOS SDK / WKWebView | AI avatar conversations |
| **Audio** | AVFoundation | Ambient sounds, meditation audio |
| **Haptics** | Core Haptics | Native haptic feedback |
| **Analytics** | Firebase Analytics | Cross-platform analytics |
| **Push Notifications** | APNs + Firebase Cloud Messaging | User engagement |

### Alternative: React Native (If cross-platform needed later)
- Expo + React Native
- Reuse significant TypeScript logic
- Trade-off: Less native feel, potential performance issues with video

**Recommendation: SwiftUI** - Better performance, native feel, optimal for App Store approval.

---

## Phase 1: Project Setup & Foundation

### 1.1 Xcode Project Configuration
```
DivinityAGI/
├── App/
│   ├── DivinityAGIApp.swift          # App entry point
│   ├── AppDelegate.swift             # App lifecycle
│   └── ContentView.swift             # Root view
├── Core/
│   ├── Models/                       # Data models
│   ├── Services/                     # API services
│   ├── Utilities/                    # Helper functions
│   └── Extensions/                   # Swift extensions
├── Features/
│   ├── Authentication/               # Auth flows
│   ├── Onboarding/                   # Onboarding screens
│   ├── CircleOfFaiths/               # Faith selection
│   ├── SpiritGuides/                 # Guide browsing/matching
│   ├── Chat/                         # AI chat interface
│   ├── QuietSpace/                   # Meditation features
│   ├── Journal/                      # Journaling
│   ├── Goals/                        # Spiritual goals
│   ├── Community/                    # Community hub
│   ├── Profile/                      # User profile
│   ├── Subscription/                 # In-app purchases
│   ├── Leaders/                      # Verified leaders
│   └── Admin/                        # Admin dashboard
├── Design/
│   ├── Theme/                        # Colors, fonts, spacing
│   ├── Components/                   # Reusable UI components
│   └── Assets.xcassets/              # Images, icons
├── Resources/
│   ├── Sounds/                       # Audio files
│   ├── Localization/                 # Strings files
│   └── Fonts/                        # Custom fonts
└── Configuration/
    ├── Info.plist
    ├── Development.xcconfig
    └── Production.xcconfig
```

### 1.2 Dependencies (Swift Package Manager)

```swift
// Package.swift dependencies
dependencies: [
    .package(url: "https://github.com/supabase/supabase-swift", from: "2.0.0"),
    .package(url: "https://github.com/firebase/firebase-ios-sdk", from: "10.0.0"),
    .package(url: "https://github.com/Alamofire/Alamofire", from: "5.0.0"),
    .package(url: "https://github.com/kean/Nuke", from: "12.0.0"),        // Image loading
    .package(url: "https://github.com/airbnb/lottie-ios", from: "4.0.0"), // Animations
]
```

### 1.3 Design System Setup

**Colors (from Figma):**
```swift
extension Color {
    // Primary Blues
    static let divinityPrimary = Color(hex: "#497EBC")
    static let divinityDeep = Color(hex: "#1E3A5F")
    static let divinityMedium = Color(hex: "#3A6BA5")

    // Secondary Teals
    static let divinityTeal = Color(hex: "#05bfa0")
    static let divinityDarkTeal = Color(hex: "#0a4d68")

    // Accent Gold/Orange
    static let divinityGold = Color(hex: "#FFD700")
    static let divinityOrange = Color(hex: "#FF6F00")

    // Backgrounds
    static let divinityBackground = Color(hex: "#0a0a0a")
    static let divinitySurface = Color(hex: "#1a1a2e")
}
```

**Typography (from Figma):**
```swift
extension Font {
    static let divinityHeadline = Font.custom("Poppins-Bold", size: 28)
    static let divinityTitle = Font.custom("Butler-Medium", size: 24)
    static let divinityBody = Font.custom("Raleway-Regular", size: 16)
    static let divinityCaption = Font.custom("Raleway-Medium", size: 14)
}
```

---

## Phase 2: Core Infrastructure

### 2.1 Data Models

```swift
// User.swift
struct User: Codable, Identifiable {
    let id: UUID
    var email: String
    var username: String
    var bio: String?
    var location: String?
    var faithTradition: FaithTradition?
    var subscriptionTier: SubscriptionTier
    var tokenBalance: TokenBalance
    var createdAt: Date
}

// SpiritGuide.swift
struct SpiritGuide: Codable, Identifiable {
    let id: String
    let name: String
    let faith: FaithTradition
    let title: String
    let specialty: String
    let personality: String
    let welcomeMessage: String
    let imageURL: URL
    let didChatURL: URL
    let isVerified: Bool
}

// FaithTradition.swift
enum FaithTradition: String, Codable, CaseIterable {
    case christianity, islam, judaism, buddhism
    case hinduism, taoism, sikhism, jainism
    case shinto, confucianism, bahai, polytheism
    case universal

    var displayName: String { ... }
    var primaryColor: Color { ... }
    var ambiance: FaithAmbiance { ... }
}

// SubscriptionTier.swift
enum SubscriptionTier: String, Codable {
    case seeker = "seeker"           // Free, limited
    case subscriber = "subscriber"   // Free with account
    case devotee = "devotee"         // $9.99/month
    case enlightened = "enlightened" // $14.99/month

    var monthlyPrice: Decimal? { ... }
    var dailyTokens: Int { ... }
    var features: [Feature] { ... }
}

// TokenBalance.swift
struct TokenBalance: Codable {
    var daily: Int
    var purchased: Int
    var earned: Int
    var total: Int { daily + purchased + earned }
}

// MeditationSession.swift
struct MeditationSession: Codable, Identifiable {
    let id: UUID
    let atmosphere: Atmosphere
    let duration: TimeInterval
    let completedAt: Date
    var reflections: String?
}

// JournalEntry.swift
struct JournalEntry: Codable, Identifiable {
    let id: UUID
    var content: String
    var mood: Mood?
    var tags: [String]
    let createdAt: Date
    var updatedAt: Date
}
```

### 2.2 Services Layer

```swift
// SupabaseService.swift
@MainActor
class SupabaseService: ObservableObject {
    static let shared = SupabaseService()
    private let client: SupabaseClient

    func signUp(email: String, password: String) async throws -> User
    func signIn(email: String, password: String) async throws -> User
    func signOut() async throws
    func getCurrentUser() async throws -> User?
    func updateUser(_ user: User) async throws
}

// GuideService.swift
class GuideService {
    func fetchGuides(for faith: FaithTradition?) async throws -> [SpiritGuide]
    func matchGuide(for user: User) async throws -> SpiritGuide
    func saveGuide(_ guide: SpiritGuide) async throws
    func getSavedGuides() async throws -> [SpiritGuide]
}

// ChatService.swift
class ChatService {
    func createSession(with guide: SpiritGuide) async throws -> ChatSession
    func sendMessage(_ message: String, session: ChatSession) async throws -> ChatResponse
    func getSessionHistory() async throws -> [ChatSession]
}

// DIDService.swift (D-ID Video Integration)
class DIDService {
    func createVideoAgent(for guide: SpiritGuide) async throws -> VideoAgent
    func startConversation(agent: VideoAgent) async throws -> ConversationStream
    func sendMessage(_ message: String, to stream: ConversationStream) async throws
}

// SubscriptionService.swift
class SubscriptionService {
    func fetchProducts() async throws -> [Product]
    func purchase(_ product: Product) async throws -> Transaction
    func restorePurchases() async throws -> [Transaction]
    func checkSubscriptionStatus() async throws -> SubscriptionTier
}

// MeditationService.swift
class MeditationService {
    func startSession(atmosphere: Atmosphere) -> MeditationSession
    func endSession(_ session: MeditationSession, reflection: String?) async throws
    func getSessionHistory() async throws -> [MeditationSession]
}

// AudioService.swift
class AudioService: ObservableObject {
    @Published var isPlaying: Bool = false
    @Published var volume: Float = 0.7

    func playAmbientSound(_ sound: AmbientSound)
    func stopAmbientSound()
    func playHapticFeedback(_ type: HapticType)
}
```

### 2.3 State Management (Observable)

```swift
// AppState.swift
@Observable
class AppState {
    var currentUser: User?
    var isAuthenticated: Bool { currentUser != nil }
    var subscriptionTier: SubscriptionTier { currentUser?.subscriptionTier ?? .seeker }
    var tokenBalance: TokenBalance { currentUser?.tokenBalance ?? TokenBalance() }

    // Navigation state
    var selectedTab: Tab = .circleOfFaiths
    var navigationPath = NavigationPath()

    // Feature states
    var selectedFaith: FaithTradition?
    var activeGuide: SpiritGuide?
    var activeMeditationSession: MeditationSession?
}

// ThemeState.swift
@Observable
class ThemeState {
    var colorScheme: ColorScheme = .dark
    var accentColor: Color = .divinityGold
    var hapticEnabled: Bool = true
    var soundEnabled: Bool = true
}

// MeditationState.swift
@Observable
class MeditationState {
    var currentAtmosphere: Atmosphere?
    var ambientSound: AmbientSound?
    var breathingPattern: BreathingPattern?
    var sessionDuration: TimeInterval = 0
    var isActive: Bool = false
}
```

---

## Phase 3: Screen-by-Screen Implementation

### 3.1 Authentication Flow

| Screen | Description | Priority |
|--------|-------------|----------|
| `SplashView` | App launch with logo animation | P0 |
| `OnboardingView` | 3-step welcome carousel | P0 |
| `AgeGateView` | 18+ verification modal | P0 |
| `SignUpView` | Email/password registration (3 steps) | P0 |
| `SignInView` | Email/password login | P0 |
| `EmailConfirmationView` | Confirmation helper screen | P0 |
| `GuestModeView` | Limited anonymous access | P1 |

**Implementation Details:**
```swift
// SignUpView.swift
struct SignUpView: View {
    @State private var step: SignUpStep = .credentials
    @State private var email = ""
    @State private var password = ""
    @State private var username = ""
    @State private var age: Int?
    @State private var agreedToTerms = false

    // Step 2: Profile
    @State private var bio = ""
    @State private var location = ""
    @State private var faithTradition: FaithTradition?

    // Step 3: Preferences
    @State private var interests: [String] = []

    var body: some View {
        NavigationStack {
            VStack {
                StepIndicator(currentStep: step)

                switch step {
                case .credentials:
                    CredentialsStepView(...)
                case .profile:
                    ProfileStepView(...)
                case .preferences:
                    PreferencesStepView(...)
                }
            }
            .background(GradientBackground())
        }
    }
}
```

### 3.2 Main Tab Navigation

```swift
// MainTabView.swift
struct MainTabView: View {
    @Environment(AppState.self) var appState

    var body: some View {
        TabView(selection: $appState.selectedTab) {
            CircleOfFaithsView()
                .tabItem { Label("Faiths", systemImage: "circle.hexagongrid") }
                .tag(Tab.circleOfFaiths)

            SpiritGuidesView()
                .tabItem { Label("Guides", systemImage: "person.2") }
                .tag(Tab.guides)

            QuietSpaceView()
                .tabItem { Label("Meditate", systemImage: "leaf") }
                .tag(Tab.quietSpace)

            CommunityView()
                .tabItem { Label("Community", systemImage: "person.3") }
                .tag(Tab.community)

            ProfileView()
                .tabItem { Label("Profile", systemImage: "person.circle") }
                .tag(Tab.profile)
        }
    }
}
```

### 3.3 Circle of Faiths (Main Hub)

| Component | Description |
|-----------|-------------|
| `CircleOfFaithsView` | Main faith selection with animated circle |
| `FaithCardView` | Individual faith tradition card |
| `FaithDetailView` | Detailed view of selected faith |
| `FaithAmbianceView` | Atmospheric background for each faith |
| `FaithAffirmationsView` | Faith-specific affirmations |

```swift
// CircleOfFaithsView.swift
struct CircleOfFaithsView: View {
    @State private var selectedFaith: FaithTradition?
    @State private var rotation: Angle = .zero

    let faiths = FaithTradition.allCases

    var body: some View {
        ZStack {
            // Animated cosmic background
            CosmicBackgroundView()

            // Interactive faith circle
            GeometryReader { geo in
                ForEach(Array(faiths.enumerated()), id: \.element) { index, faith in
                    FaithOrbView(faith: faith, isSelected: selectedFaith == faith)
                        .position(orbPosition(for: index, in: geo.size))
                        .onTapGesture {
                            withAnimation(.spring()) {
                                selectedFaith = faith
                            }
                        }
                }
            }

            // Central info display
            if let faith = selectedFaith {
                FaithInfoCard(faith: faith)
                    .transition(.scale.combined(with: .opacity))
            }
        }
        .sheet(item: $selectedFaith) { faith in
            FaithDetailView(faith: faith)
        }
    }
}
```

### 3.4 Spirit Guides

| Component | Description |
|-----------|-------------|
| `SpiritGuidesView` | Browse/search all guides |
| `GuideCardView` | Individual guide card with avatar |
| `GuideCardSliderView` | Horizontal swipeable guide cards |
| `GuideDetailView` | Full guide profile |
| `GuideMatchingView` | Personality-based guide matching |
| `SavedGuidesView` | User's saved/favorite guides |

```swift
// GuideCardView.swift
struct GuideCardView: View {
    let guide: SpiritGuide
    @State private var isPressed = false

    var body: some View {
        VStack(spacing: 12) {
            // Guide avatar with glow effect
            AsyncImage(url: guide.imageURL) { image in
                image
                    .resizable()
                    .aspectRatio(contentMode: .fill)
            } placeholder: {
                ProgressView()
            }
            .frame(width: 120, height: 120)
            .clipShape(Circle())
            .overlay(
                Circle()
                    .stroke(guide.faith.primaryColor, lineWidth: 3)
            )
            .shadow(color: guide.faith.primaryColor.opacity(0.5), radius: 10)

            // Guide info
            VStack(spacing: 4) {
                Text(guide.name)
                    .font(.divinityTitle)
                    .foregroundColor(.white)

                Text(guide.title)
                    .font(.divinityCaption)
                    .foregroundColor(.gray)

                Text(guide.specialty)
                    .font(.divinityCaption)
                    .foregroundColor(guide.faith.primaryColor)
            }
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 20)
                .fill(Color.divinitySurface)
        )
        .scaleEffect(isPressed ? 0.95 : 1.0)
        .animation(.spring(), value: isPressed)
    }
}
```

### 3.5 AI Chat Interface

| Component | Description |
|-----------|-------------|
| `ChatView` | Main chat interface with guide |
| `ChatMessageView` | Individual message bubble |
| `ChatInputView` | Text input with send button |
| `VideoChatView` | D-ID video avatar view |
| `ChatHistoryView` | Past conversation sessions |
| `TypingIndicatorView` | Guide is typing animation |

```swift
// ChatView.swift
struct ChatView: View {
    let guide: SpiritGuide
    @StateObject private var viewModel: ChatViewModel

    var body: some View {
        VStack(spacing: 0) {
            // Guide header with avatar
            ChatHeaderView(guide: guide)

            // Video avatar (D-ID)
            if viewModel.isVideoEnabled {
                DIDVideoView(agentURL: guide.didChatURL)
                    .frame(height: 200)
            }

            // Messages list
            ScrollViewReader { proxy in
                ScrollView {
                    LazyVStack(spacing: 12) {
                        ForEach(viewModel.messages) { message in
                            ChatMessageView(message: message, guide: guide)
                                .id(message.id)
                        }

                        if viewModel.isTyping {
                            TypingIndicatorView()
                        }
                    }
                    .padding()
                }
                .onChange(of: viewModel.messages.count) { _ in
                    withAnimation {
                        proxy.scrollTo(viewModel.messages.last?.id)
                    }
                }
            }

            // Input area
            ChatInputView(
                text: $viewModel.inputText,
                onSend: viewModel.sendMessage
            )
        }
        .background(guide.faith.ambiance.backgroundGradient)
    }
}

// DIDVideoView.swift (WebView wrapper for D-ID)
struct DIDVideoView: UIViewRepresentable {
    let agentURL: URL

    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.allowsInlineMediaPlayback = true
        config.mediaTypesRequiringUserActionForPlayback = []

        let webView = WKWebView(frame: .zero, configuration: config)
        webView.load(URLRequest(url: agentURL))
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {}
}
```

### 3.6 Quiet Space (Meditation)

| Component | Description |
|-----------|-------------|
| `QuietSpaceView` | Main meditation interface |
| `AtmospherePickerView` | Select meditation atmosphere |
| `BreathingExerciseView` | Guided breathing animation |
| `AmbientSoundControlView` | Sound selection/volume |
| `SessionTimerView` | Meditation timer display |
| `SessionCompleteView` | Post-meditation reflection |
| `MeditationHistoryView` | Past session history |

```swift
// QuietSpaceView.swift
struct QuietSpaceView: View {
    @Environment(MeditationState.self) var meditationState
    @StateObject private var viewModel = QuietSpaceViewModel()

    var body: some View {
        ZStack {
            // Animated atmospheric background
            AtmosphericBackgroundView(atmosphere: meditationState.currentAtmosphere)

            VStack(spacing: 24) {
                // Atmosphere selection
                if !meditationState.isActive {
                    AtmospherePickerView(selected: $meditationState.currentAtmosphere)
                }

                Spacer()

                // Central breathing orb
                BreathingOrbView(pattern: meditationState.breathingPattern)

                // Timer
                SessionTimerView(duration: meditationState.sessionDuration)

                Spacer()

                // Controls
                HStack(spacing: 40) {
                    AmbientSoundButton()

                    StartStopButton(isActive: meditationState.isActive) {
                        viewModel.toggleSession()
                    }

                    AffirmationButton()
                }
            }
            .padding()
        }
        .sheet(isPresented: $viewModel.showSessionComplete) {
            SessionCompleteView(session: viewModel.completedSession)
        }
    }
}

// BreathingOrbView.swift
struct BreathingOrbView: View {
    let pattern: BreathingPattern?
    @State private var scale: CGFloat = 1.0
    @State private var opacity: Double = 0.6

    var body: some View {
        Circle()
            .fill(
                RadialGradient(
                    colors: [.divinityTeal, .divinityDeep],
                    center: .center,
                    startRadius: 0,
                    endRadius: 150
                )
            )
            .frame(width: 200, height: 200)
            .scaleEffect(scale)
            .opacity(opacity)
            .shadow(color: .divinityTeal.opacity(0.5), radius: 30)
            .onAppear {
                startBreathingAnimation()
            }
    }

    private func startBreathingAnimation() {
        guard let pattern = pattern else { return }

        // Inhale
        withAnimation(.easeInOut(duration: pattern.inhale)) {
            scale = 1.4
            opacity = 1.0
        }

        // Hold, then exhale...
        // (Full breathing cycle implementation)
    }
}
```

### 3.7 Journal

| Component | Description |
|-----------|-------------|
| `JournalView` | Main journal list |
| `JournalEntryView` | Individual entry display |
| `JournalEditorView` | Create/edit entry |
| `JournalPromptView` | Daily reflection prompts |
| `JournalCalendarView` | Calendar view of entries |

### 3.8 Spiritual Goals

| Component | Description |
|-----------|-------------|
| `GoalsView` | Main goals list |
| `GoalCardView` | Individual goal progress |
| `CreateGoalView` | New goal creation |
| `GoalDetailView` | Goal details/milestones |
| `GoalCompletionView` | Celebration on completion |

### 3.9 Community Hub

| Component | Description |
|-----------|-------------|
| `CommunityView` | Main community feed |
| `FaithCircleView` | Faith-specific communities |
| `PostCardView` | User post display |
| `CreatePostView` | New post creation |
| `CommentsView` | Post comments |
| `LeaderProfileView` | View verified leaders |

### 3.10 User Profile

| Component | Description |
|-----------|-------------|
| `ProfileView` | User profile page |
| `EditProfileView` | Edit profile modal |
| `BadgesView` | Achievement badges display |
| `ActivityHistoryView` | User activity log |
| `SettingsView` | App settings |
| `PrivacyDashboardView` | Privacy controls |

### 3.11 Subscription System

| Component | Description |
|-----------|-------------|
| `SubscriptionView` | Subscription tiers display |
| `SubscriptionDetailView` | Tier benefits comparison |
| `PaywallView` | Upgrade prompt modal |
| `TokenBalanceView` | Token balance display |
| `BillingHistoryView` | Purchase history |

```swift
// SubscriptionView.swift
struct SubscriptionView: View {
    @StateObject private var viewModel = SubscriptionViewModel()

    let tiers: [SubscriptionTierInfo] = [
        .init(tier: .seeker, price: nil, features: [...]),
        .init(tier: .subscriber, price: nil, features: [...]),
        .init(tier: .devotee, price: 9.99, features: [...]),
        .init(tier: .enlightened, price: 14.99, features: [...])
    ]

    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                ForEach(tiers) { tierInfo in
                    SubscriptionTierCard(
                        info: tierInfo,
                        isCurrentTier: viewModel.currentTier == tierInfo.tier,
                        onSelect: { viewModel.selectTier(tierInfo.tier) }
                    )
                }
            }
            .padding()
        }
        .background(CosmicBackgroundView())
    }
}
```

### 3.12 Admin Dashboard (iPad optimized)

| Component | Description |
|-----------|-------------|
| `AdminDashboardView` | Main admin overview |
| `AdminUsersView` | User management |
| `AdminAnalyticsView` | Usage analytics |
| `AdminRevenueView` | Revenue metrics |
| `AdminErrorsView` | Error monitoring |

---

## Phase 4: Native iOS Features

### 4.1 Haptic Feedback
```swift
// HapticManager.swift
class HapticManager {
    static let shared = HapticManager()
    private let generator = UIImpactFeedbackGenerator()

    func impact(_ style: UIImpactFeedbackGenerator.FeedbackStyle) {
        generator.impactOccurred(intensity: style.intensity)
    }

    func selection() {
        UISelectionFeedbackGenerator().selectionChanged()
    }

    func notification(_ type: UINotificationFeedbackGenerator.FeedbackType) {
        UINotificationFeedbackGenerator().notificationOccurred(type)
    }
}
```

### 4.2 Audio Engine
```swift
// AudioEngine.swift
class AudioEngine: ObservableObject {
    private var audioPlayer: AVAudioPlayer?
    private var ambientPlayers: [String: AVAudioPlayer] = [:]

    func playAmbient(_ sound: AmbientSound, fadeDuration: TimeInterval = 2.0) async {
        // Crossfade ambient sounds
    }

    func playUISound(_ sound: UISound) {
        // Immediate UI feedback sounds
    }

    func setVolume(_ volume: Float, for sound: AmbientSound) {
        // Individual volume control
    }
}
```

### 4.3 Push Notifications
```swift
// NotificationManager.swift
class NotificationManager {
    func requestPermission() async throws -> Bool
    func scheduleDailyReminder(at time: DateComponents)
    func scheduleMeditationReminder(session: MeditationSession)
    func handleNotificationResponse(_ response: UNNotificationResponse)
}
```

### 4.4 HealthKit Integration (Optional)
```swift
// HealthKitManager.swift
class HealthKitManager {
    func requestAuthorization() async throws
    func logMeditationSession(_ session: MeditationSession) async throws
    func getMindfulMinutes(for period: DateInterval) async throws -> TimeInterval
}
```

### 4.5 Widgets (iOS 17+)
```swift
// DivinityWidgets.swift
struct DailyAffirmationWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: "DailyAffirmation", provider: AffirmationProvider()) { entry in
            AffirmationWidgetView(entry: entry)
        }
        .configurationDisplayName("Daily Affirmation")
        .description("Receive spiritual inspiration")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

struct MeditationStreakWidget: Widget {
    // Show meditation streak/stats
}
```

### 4.6 App Intents / Siri Shortcuts
```swift
// AppIntents.swift
struct StartMeditationIntent: AppIntent {
    static var title: LocalizedStringResource = "Start Meditation"

    @Parameter(title: "Duration")
    var duration: Int

    func perform() async throws -> some IntentResult {
        // Launch app to meditation with specified duration
    }
}
```

---

## Phase 5: Asset Migration

### 5.1 Image Assets
- Export all 300+ PNG images from web `/src/assets/` to `Assets.xcassets`
- Create 1x, 2x, 3x versions for Retina displays
- Optimize with ImageOptim or similar tool
- Consider using SF Symbols where appropriate

### 5.2 Audio Assets
- Migrate ambient sound files to `Resources/Sounds/`
- Convert to AAC/M4A for iOS optimization
- Create audio asset catalog

### 5.3 Font Assets
- Add Raleway, Poppins, Butler font files
- Register in Info.plist under `UIAppFonts`

### 5.4 Localization
- Migrate translations from `translations.ts` to `Localizable.strings`
- Support for multiple languages

---

## Phase 6: Testing Strategy

### 6.1 Unit Tests
```swift
// GuideServiceTests.swift
class GuideServiceTests: XCTestCase {
    func testFetchGuides() async throws {
        let service = GuideService()
        let guides = try await service.fetchGuides(for: .buddhism)
        XCTAssertFalse(guides.isEmpty)
    }

    func testGuideMatching() async throws {
        let user = User.mock(faithTradition: .hinduism)
        let service = GuideService()
        let matched = try await service.matchGuide(for: user)
        XCTAssertEqual(matched.faith, .hinduism)
    }
}
```

### 6.2 UI Tests
```swift
// OnboardingUITests.swift
class OnboardingUITests: XCTestCase {
    func testSignUpFlow() throws {
        let app = XCUIApplication()
        app.launch()

        // Complete sign up steps
        app.textFields["email"].tap()
        app.textFields["email"].typeText("test@example.com")
        // ...
    }
}
```

### 6.3 Snapshot Tests
- Use `swift-snapshot-testing` for UI regression tests
- Capture all major screens

---

## Phase 7: App Store Preparation

### 7.1 App Store Assets
- App icon (1024x1024)
- Screenshots for all device sizes
- App preview videos
- App description and keywords

### 7.2 Privacy & Compliance
- Privacy policy URL
- Data collection disclosure
- IDFA usage (if applicable)
- Age rating (17+ for spiritual content)

### 7.3 In-App Purchase Setup
- Configure products in App Store Connect
- Subscription tiers: Devotee, Enlightened
- Consumable: Token packages
- Restore purchases functionality

---

## Implementation Timeline

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| **Phase 1: Setup** | Week 1-2 | Project structure, design system, core models |
| **Phase 2: Infrastructure** | Week 3-4 | Services, state management, Supabase integration |
| **Phase 3A: Auth + Navigation** | Week 5-6 | Auth flow, tab navigation, onboarding |
| **Phase 3B: Circle of Faiths** | Week 7-8 | Faith selection, faith detail pages |
| **Phase 3C: Spirit Guides** | Week 9-10 | Guide browsing, matching, detail views |
| **Phase 3D: Chat** | Week 11-13 | Chat interface, D-ID integration |
| **Phase 3E: Quiet Space** | Week 14-16 | Meditation, breathing, ambient sounds |
| **Phase 3F: Journal + Goals** | Week 17-18 | Journaling, spiritual goals |
| **Phase 3G: Community** | Week 19-20 | Community hub, posts, comments |
| **Phase 3H: Profile + Settings** | Week 21-22 | Profile, settings, privacy |
| **Phase 3I: Subscriptions** | Week 23-24 | StoreKit 2, subscription UI |
| **Phase 4: Native Features** | Week 25-26 | Haptics, audio, notifications, widgets |
| **Phase 5: Assets** | Week 27 | Image/audio migration, optimization |
| **Phase 6: Testing** | Week 28-30 | Unit, UI, snapshot tests |
| **Phase 7: App Store** | Week 31-32 | Submission, review, launch |

**Total Estimated Duration: 32 weeks (8 months)**

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| D-ID SDK limitations on iOS | Use WKWebView wrapper as fallback |
| Complex animations performance | Profile with Instruments, optimize |
| Supabase iOS SDK issues | Direct REST API calls as backup |
| App Store rejection (spiritual content) | Clear age rating, content guidelines |
| Audio playback in background | Proper AVAudioSession configuration |
| Large asset bundle size | On-demand resources, asset catalogs |

---

## Success Metrics

- **Performance**: Cold launch < 2s, smooth 60fps animations
- **Reliability**: Crash-free rate > 99.5%
- **User Experience**: Match Figma designs with 100% fidelity
- **Feature Parity**: All web features available on iOS
- **App Store**: 4.5+ star rating target

---

## Next Steps

1. **Immediate**: Set up Xcode project with SwiftUI template
2. **Week 1**: Import design system from Figma (colors, fonts, spacing)
3. **Week 1**: Create core data models matching web app
4. **Week 2**: Set up Supabase Swift SDK connection
5. **Week 2**: Implement authentication flow

---

*This plan is a living document and should be updated as development progresses.*
