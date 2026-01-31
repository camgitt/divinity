// GuideChatView.swift
// Chat interface with a spirit guide

import SwiftUI
import AVFoundation

struct GuideChatView: View {
    let guide: SpiritGuide

    @Environment(\.dismiss) private var dismiss
    @StateObject private var chatState = ChatState()
    @State private var messageText = ""
    @State private var showingVideoChat = false
    @FocusState private var isInputFocused: Bool

    var body: some View {
        NavigationStack {
            ZStack {
                // Background
                LinearGradient(
                    colors: FaithAmbiance.ambiance(for: guide.faith).gradientColors,
                    startPoint: .top,
                    endPoint: .bottom
                )
                .ignoresSafeArea()

                VStack(spacing: 0) {
                    // Guide Header
                    guideHeader

                    // Messages
                    messagesView

                    // Input Area
                    inputArea
                }
            }
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Close") {
                        dismiss()
                    }
                    .foregroundColor(guide.faith.primaryColor)
                }

                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: { showingVideoChat = true }) {
                        Image(systemName: "video.fill")
                            .foregroundColor(guide.faith.primaryColor)
                    }
                }
            }
            .sheet(isPresented: $showingVideoChat) {
                VideoChatView(guide: guide)
            }
            .onAppear {
                // Add welcome message
                if chatState.messages.isEmpty {
                    chatState.addMessage(ChatMessage(
                        id: UUID().uuidString,
                        role: .guide,
                        content: guide.welcomeMessage,
                        timestamp: Date()
                    ))
                }
            }
        }
    }

    // MARK: - Guide Header
    private var guideHeader: some View {
        HStack(spacing: 12) {
            // Avatar
            AsyncImage(url: guide.displayImageURL) { image in
                image
                    .resizable()
                    .aspectRatio(contentMode: .fill)
            } placeholder: {
                Circle()
                    .fill(guide.faith.primaryColor.opacity(0.3))
                    .overlay(
                        Image(systemName: "person.fill")
                            .foregroundColor(guide.faith.primaryColor)
                    )
            }
            .frame(width: 50, height: 50)
            .clipShape(Circle())
            .overlay(
                Circle()
                    .stroke(guide.faith.primaryColor, lineWidth: 2)
            )

            VStack(alignment: .leading, spacing: 2) {
                Text(guide.name)
                    .font(.headline)
                    .foregroundColor(.divinityTextPrimary)

                HStack(spacing: 4) {
                    Circle()
                        .fill(Color.green)
                        .frame(width: 8, height: 8)
                    Text("Online")
                        .font(.caption)
                        .foregroundColor(.divinityTextSecondary)
                }
            }

            Spacer()

            // Faith icon
            Image(systemName: guide.faith.icon)
                .font(.title2)
                .foregroundColor(guide.faith.primaryColor)
        }
        .padding()
        .background(Color.divinitySurface.opacity(0.9))
    }

    // MARK: - Messages View
    private var messagesView: some View {
        ScrollViewReader { proxy in
            ScrollView {
                LazyVStack(spacing: 16) {
                    ForEach(chatState.messages) { message in
                        MessageBubble(message: message, guide: guide)
                            .id(message.id)
                    }

                    if chatState.isTyping {
                        TypingIndicator(guide: guide)
                            .id("typing")
                    }
                }
                .padding()
            }
            .onChange(of: chatState.messages.count) { _, _ in
                withAnimation {
                    proxy.scrollTo(chatState.messages.last?.id ?? "typing", anchor: .bottom)
                }
            }
        }
    }

    // MARK: - Input Area
    private var inputArea: some View {
        VStack(spacing: 0) {
            Divider()
                .background(Color.divinityBorder)

            HStack(spacing: 12) {
                // Microphone button
                Button(action: {
                    HapticManager.shared.impact(.light)
                    // TODO: Implement voice input
                }) {
                    Image(systemName: "mic.fill")
                        .font(.title3)
                        .foregroundColor(.divinityTextSecondary)
                        .frame(width: 44, height: 44)
                        .background(Color.divinitySurface)
                        .clipShape(Circle())
                }

                // Text input
                HStack {
                    TextField("Type a message...", text: $messageText, axis: .vertical)
                        .foregroundColor(.divinityTextPrimary)
                        .focused($isInputFocused)
                        .lineLimit(1...5)

                    if !messageText.isEmpty {
                        Button(action: sendMessage) {
                            Image(systemName: "arrow.up.circle.fill")
                                .font(.title2)
                                .foregroundColor(guide.faith.primaryColor)
                        }
                    }
                }
                .padding(12)
                .background(Color.divinitySurface)
                .cornerRadius(25)
            }
            .padding()
            .background(Color.divinityDeep.opacity(0.95))
        }
    }

    // MARK: - Send Message
    private func sendMessage() {
        guard !messageText.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else { return }

        let userMessage = ChatMessage(
            id: UUID().uuidString,
            role: .user,
            content: messageText,
            timestamp: Date()
        )

        HapticManager.shared.impact(.light)
        chatState.addMessage(userMessage)
        let sentText = messageText
        messageText = ""

        // Simulate guide response
        chatState.isTyping = true
        DispatchQueue.main.asyncAfter(deadline: .now() + Double.random(in: 1.5...3.0)) {
            chatState.isTyping = false
            chatState.addMessage(ChatMessage(
                id: UUID().uuidString,
                role: .guide,
                content: generateResponse(to: sentText),
                timestamp: Date()
            ))
        }
    }

    private func generateResponse(to message: String) -> String {
        // Placeholder - in production, use AI API
        let responses = [
            "I sense your seeking heart. Let us explore this together.",
            "That is a profound question. Consider this perspective...",
            "Your journey is unique and sacred. Trust in the process.",
            "The divine works in mysterious ways. Have patience.",
            "I feel your struggle. Know that you are not alone.",
            "Let us meditate on this together. Breathe deeply."
        ]
        return responses.randomElement() ?? guide.welcomeMessage
    }
}

// MARK: - Chat State
class ChatState: ObservableObject {
    @Published var messages: [ChatMessage] = []
    @Published var isTyping = false

    func addMessage(_ message: ChatMessage) {
        messages.append(message)
    }
}

// MARK: - Chat Message
struct ChatMessage: Identifiable {
    let id: String
    let role: MessageRole
    let content: String
    let timestamp: Date

    enum MessageRole {
        case user
        case guide
    }
}

// MARK: - Message Bubble
struct MessageBubble: View {
    let message: ChatMessage
    let guide: SpiritGuide

    private var isUser: Bool { message.role == .user }

    var body: some View {
        HStack(alignment: .bottom, spacing: 8) {
            if isUser { Spacer(minLength: 60) }

            if !isUser {
                // Guide avatar
                AsyncImage(url: guide.displayImageURL) { image in
                    image.resizable().aspectRatio(contentMode: .fill)
                } placeholder: {
                    Circle().fill(guide.faith.primaryColor.opacity(0.3))
                }
                .frame(width: 32, height: 32)
                .clipShape(Circle())
            }

            VStack(alignment: isUser ? .trailing : .leading, spacing: 4) {
                Text(message.content)
                    .font(.body)
                    .foregroundColor(isUser ? .white : .divinityTextPrimary)
                    .padding(.horizontal, 16)
                    .padding(.vertical, 12)
                    .background(
                        isUser
                            ? guide.faith.primaryColor
                            : Color.divinitySurface
                    )
                    .cornerRadius(20, corners: isUser ? [.topLeft, .topRight, .bottomLeft] : [.topLeft, .topRight, .bottomRight])

                Text(formatTime(message.timestamp))
                    .font(.caption2)
                    .foregroundColor(.divinityTextSecondary)
            }

            if !isUser { Spacer(minLength: 60) }
        }
    }

    private func formatTime(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.timeStyle = .short
        return formatter.string(from: date)
    }
}

// MARK: - Typing Indicator
struct TypingIndicator: View {
    let guide: SpiritGuide
    @State private var animationPhase = 0

    var body: some View {
        HStack(alignment: .bottom, spacing: 8) {
            AsyncImage(url: guide.displayImageURL) { image in
                image.resizable().aspectRatio(contentMode: .fill)
            } placeholder: {
                Circle().fill(guide.faith.primaryColor.opacity(0.3))
            }
            .frame(width: 32, height: 32)
            .clipShape(Circle())

            HStack(spacing: 4) {
                ForEach(0..<3, id: \.self) { index in
                    Circle()
                        .fill(guide.faith.primaryColor)
                        .frame(width: 8, height: 8)
                        .opacity(animationPhase == index ? 1 : 0.4)
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 14)
            .background(Color.divinitySurface)
            .cornerRadius(20, corners: [.topLeft, .topRight, .bottomRight])

            Spacer()
        }
        .onAppear {
            withAnimation(.easeInOut(duration: 0.6).repeatForever()) {
                animationPhase = (animationPhase + 1) % 3
            }
        }
    }
}

// MARK: - Video Chat View (placeholder)
struct VideoChatView: View {
    let guide: SpiritGuide
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        ZStack {
            Color.divinityDeep.ignoresSafeArea()

            VStack(spacing: 24) {
                Spacer()

                Image(systemName: "video.fill")
                    .font(.system(size: 60))
                    .foregroundColor(guide.faith.primaryColor)

                Text("Video Chat with \(guide.name)")
                    .font(.title2)
                    .foregroundColor(.divinityTextPrimary)

                Text("D-ID video integration coming soon")
                    .font(.subheadline)
                    .foregroundColor(.divinityTextSecondary)

                Spacer()

                Button("Close") {
                    dismiss()
                }
                .foregroundColor(guide.faith.primaryColor)
                .padding()
            }
        }
    }
}

// MARK: - Corner Radius Extension
extension View {
    func cornerRadius(_ radius: CGFloat, corners: UIRectCorner) -> some View {
        clipShape(RoundedCorner(radius: radius, corners: corners))
    }
}

struct RoundedCorner: Shape {
    var radius: CGFloat = .infinity
    var corners: UIRectCorner = .allCorners

    func path(in rect: CGRect) -> Path {
        let path = UIBezierPath(
            roundedRect: rect,
            byRoundingCorners: corners,
            cornerRadii: CGSize(width: radius, height: radius)
        )
        return Path(path.cgPath)
    }
}

// MARK: - Preview
#Preview {
    GuideChatView(guide: SampleGuides.forFaith(.buddhism).first!)
}
