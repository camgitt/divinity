// JournalView.swift
// Spiritual journaling feature

import SwiftUI

struct JournalView: View {
    @EnvironmentObject var appState: AppState
    @State private var entries: [JournalEntry] = []
    @State private var showingNewEntry = false
    @State private var selectedEntry: JournalEntry?

    var body: some View {
        NavigationStack {
            ZStack {
                Color.divinityDeep
                    .ignoresSafeArea()

                if entries.isEmpty {
                    emptyStateView
                } else {
                    entriesListView
                }
            }
            .navigationTitle("Journal")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: { showingNewEntry = true }) {
                        Image(systemName: "plus.circle.fill")
                            .foregroundColor(.divinityGold)
                    }
                }
            }
            .sheet(isPresented: $showingNewEntry) {
                JournalEntryEditor(mode: .new) { entry in
                    entries.insert(entry, at: 0)
                }
            }
            .sheet(item: $selectedEntry) { entry in
                JournalEntryEditor(mode: .edit(entry)) { updatedEntry in
                    if let index = entries.firstIndex(where: { $0.id == updatedEntry.id }) {
                        entries[index] = updatedEntry
                    }
                }
            }
        }
    }

    // MARK: - Empty State
    private var emptyStateView: some View {
        VStack(spacing: 24) {
            Image(systemName: "book.closed")
                .font(.system(size: 60))
                .foregroundColor(.divinityGold.opacity(0.6))

            VStack(spacing: 8) {
                Text("Begin Your Journal")
                    .font(.title2)
                    .fontWeight(.semibold)
                    .foregroundColor(.divinityTextPrimary)

                Text("Capture your spiritual thoughts,\nreflections, and prayers")
                    .font(.subheadline)
                    .foregroundColor(.divinityTextSecondary)
                    .multilineTextAlignment(.center)
            }

            Button(action: { showingNewEntry = true }) {
                HStack {
                    Image(systemName: "plus")
                    Text("Write First Entry")
                }
                .fontWeight(.semibold)
                .foregroundColor(.divinityDeep)
                .padding(.horizontal, 24)
                .padding(.vertical, 14)
                .background(Color.divinityGold)
                .cornerRadius(25)
            }
        }
    }

    // MARK: - Entries List
    private var entriesListView: some View {
        ScrollView {
            LazyVStack(spacing: 16) {
                ForEach(entries) { entry in
                    JournalEntryCard(entry: entry)
                        .onTapGesture {
                            selectedEntry = entry
                        }
                }
            }
            .padding()
        }
    }
}

// MARK: - Journal Entry Model
struct JournalEntry: Identifiable {
    let id: String
    var title: String
    var content: String
    var mood: JournalMood
    var tags: [String]
    var createdAt: Date
    var updatedAt: Date

    init(id: String = UUID().uuidString, title: String, content: String, mood: JournalMood = .peaceful, tags: [String] = [], createdAt: Date = Date()) {
        self.id = id
        self.title = title
        self.content = content
        self.mood = mood
        self.tags = tags
        self.createdAt = createdAt
        self.updatedAt = createdAt
    }
}

enum JournalMood: String, CaseIterable {
    case joyful
    case grateful
    case peaceful
    case contemplative
    case seeking
    case struggling

    var icon: String {
        switch self {
        case .joyful: return "sun.max.fill"
        case .grateful: return "heart.fill"
        case .peaceful: return "leaf.fill"
        case .contemplative: return "moon.stars.fill"
        case .seeking: return "magnifyingglass"
        case .struggling: return "cloud.rain.fill"
        }
    }

    var color: Color {
        switch self {
        case .joyful: return .yellow
        case .grateful: return .pink
        case .peaceful: return .green
        case .contemplative: return .purple
        case .seeking: return .blue
        case .struggling: return .gray
        }
    }
}

// MARK: - Journal Entry Card
struct JournalEntryCard: View {
    let entry: JournalEntry

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Image(systemName: entry.mood.icon)
                    .foregroundColor(entry.mood.color)

                Text(entry.title)
                    .font(.headline)
                    .foregroundColor(.divinityTextPrimary)

                Spacer()

                Text(formatDate(entry.createdAt))
                    .font(.caption)
                    .foregroundColor(.divinityTextSecondary)
            }

            Text(entry.content)
                .font(.subheadline)
                .foregroundColor(.divinityTextSecondary)
                .lineLimit(3)

            if !entry.tags.isEmpty {
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 8) {
                        ForEach(entry.tags, id: \.self) { tag in
                            Text("#\(tag)")
                                .font(.caption)
                                .foregroundColor(.divinityTeal)
                                .padding(.horizontal, 8)
                                .padding(.vertical, 4)
                                .background(Color.divinityTeal.opacity(0.15))
                                .cornerRadius(8)
                        }
                    }
                }
            }
        }
        .padding()
        .background(Color.divinitySurface)
        .cornerRadius(16)
    }

    private func formatDate(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        return formatter.string(from: date)
    }
}

// MARK: - Journal Entry Editor
struct JournalEntryEditor: View {
    enum Mode {
        case new
        case edit(JournalEntry)
    }

    let mode: Mode
    let onSave: (JournalEntry) -> Void

    @Environment(\.dismiss) private var dismiss
    @State private var title = ""
    @State private var content = ""
    @State private var mood: JournalMood = .peaceful
    @State private var tagInput = ""
    @State private var tags: [String] = []

    var body: some View {
        NavigationStack {
            Form {
                Section("Title") {
                    TextField("What's on your mind?", text: $title)
                }

                Section("Content") {
                    TextEditor(text: $content)
                        .frame(minHeight: 150)
                }

                Section("Mood") {
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 12) {
                            ForEach(JournalMood.allCases, id: \.self) { moodOption in
                                Button(action: { mood = moodOption }) {
                                    VStack(spacing: 4) {
                                        Image(systemName: moodOption.icon)
                                            .font(.title2)
                                            .foregroundColor(mood == moodOption ? moodOption.color : .gray)
                                        Text(moodOption.rawValue.capitalized)
                                            .font(.caption)
                                            .foregroundColor(mood == moodOption ? .primary : .secondary)
                                    }
                                    .padding(8)
                                    .background(mood == moodOption ? moodOption.color.opacity(0.15) : Color.clear)
                                    .cornerRadius(8)
                                }
                                .buttonStyle(.plain)
                            }
                        }
                    }
                }

                Section("Tags") {
                    HStack {
                        TextField("Add tag...", text: $tagInput)
                        Button("Add") {
                            guard !tagInput.isEmpty else { return }
                            tags.append(tagInput.lowercased())
                            tagInput = ""
                        }
                        .disabled(tagInput.isEmpty)
                    }

                    if !tags.isEmpty {
                        FlowLayout(spacing: 8) {
                            ForEach(tags, id: \.self) { tag in
                                HStack(spacing: 4) {
                                    Text("#\(tag)")
                                    Button(action: { tags.removeAll { $0 == tag } }) {
                                        Image(systemName: "xmark.circle.fill")
                                            .font(.caption)
                                    }
                                }
                                .font(.caption)
                                .padding(.horizontal, 8)
                                .padding(.vertical, 4)
                                .background(Color.divinityTeal.opacity(0.15))
                                .cornerRadius(8)
                            }
                        }
                    }
                }
            }
            .navigationTitle(isNewEntry ? "New Entry" : "Edit Entry")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Save") {
                        saveEntry()
                        dismiss()
                    }
                    .disabled(title.isEmpty || content.isEmpty)
                }
            }
            .onAppear {
                if case .edit(let entry) = mode {
                    title = entry.title
                    content = entry.content
                    mood = entry.mood
                    tags = entry.tags
                }
            }
        }
    }

    private var isNewEntry: Bool {
        if case .new = mode { return true }
        return false
    }

    private func saveEntry() {
        let entry: JournalEntry
        if case .edit(let existing) = mode {
            entry = JournalEntry(
                id: existing.id,
                title: title,
                content: content,
                mood: mood,
                tags: tags,
                createdAt: existing.createdAt
            )
        } else {
            entry = JournalEntry(
                title: title,
                content: content,
                mood: mood,
                tags: tags
            )
        }
        onSave(entry)
    }
}

// MARK: - Flow Layout
struct FlowLayout: Layout {
    var spacing: CGFloat = 8

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let result = arrange(proposal: proposal, subviews: subviews)
        return result.size
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        let result = arrange(proposal: proposal, subviews: subviews)
        for (index, frame) in result.frames.enumerated() {
            subviews[index].place(at: CGPoint(x: bounds.minX + frame.minX, y: bounds.minY + frame.minY), proposal: ProposedViewSize(frame.size))
        }
    }

    private func arrange(proposal: ProposedViewSize, subviews: Subviews) -> (size: CGSize, frames: [CGRect]) {
        let maxWidth = proposal.width ?? .infinity
        var frames: [CGRect] = []
        var x: CGFloat = 0
        var y: CGFloat = 0
        var rowHeight: CGFloat = 0

        for subview in subviews {
            let size = subview.sizeThatFits(.unspecified)
            if x + size.width > maxWidth {
                x = 0
                y += rowHeight + spacing
                rowHeight = 0
            }
            frames.append(CGRect(origin: CGPoint(x: x, y: y), size: size))
            x += size.width + spacing
            rowHeight = max(rowHeight, size.height)
        }

        return (CGSize(width: maxWidth, height: y + rowHeight), frames)
    }
}

// MARK: - Preview
#Preview {
    JournalView()
        .environmentObject(AppState())
}
