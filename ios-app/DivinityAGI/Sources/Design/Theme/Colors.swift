// Colors.swift
// DivinityAGI color palette - matching Figma designs

import SwiftUI

extension Color {
    // MARK: - Primary Colors
    static let divinityPrimary = Color(hex: "#497EBC")
    static let divinityDeep = Color(hex: "#1E3A5F")
    static let divinityMedium = Color(hex: "#3A6BA5")

    // MARK: - Accent Colors
    static let divinityGold = Color(hex: "#FFD700")
    static let divinityOrange = Color(hex: "#FF6F00")
    static let divinityTeal = Color(hex: "#05BFA0")
    static let divinityDarkTeal = Color(hex: "#0A4D68")

    // MARK: - Background Colors
    static let divinityBackground = Color(hex: "#0A0A0A")
    static let divinitySurface = Color(hex: "#1A1A2E")
    static let divinityCard = Color(hex: "#252540")

    // MARK: - Faith-Specific Colors
    static let faithChristianity = Color(hex: "#FFD700")  // Gold
    static let faithIslam = Color(hex: "#008080")         // Teal
    static let faithBuddhism = Color(hex: "#FF6F00")      // Orange
    static let faithHinduism = Color(hex: "#FF8C00")      // Dark Orange
    static let faithJudaism = Color(hex: "#6495ED")       // Cornflower Blue
    static let faithTaoism = Color(hex: "#808080")        // Gray
    static let faithSikhism = Color(hex: "#FFA500")       // Orange
    static let faithJainism = Color(hex: "#FFFFFF")       // White
    static let faithShinto = Color(hex: "#DC143C")        // Crimson
    static let faithConfucianism = Color(hex: "#008080")  // Teal
    static let faithBahai = Color(hex: "#7A4FFF")         // Purple
    static let faithPolytheism = Color(hex: "#9370DB")    // Medium Purple
    static let faithUniversal = Color(hex: "#7A4FFF")     // Purple

    // MARK: - Semantic Colors
    static let divinitySuccess = Color(hex: "#22C55E")
    static let divinityWarning = Color(hex: "#EAB308")
    static let divinityError = Color(hex: "#EF4444")

    // MARK: - Text Colors
    static let textPrimary = Color.white
    static let textSecondary = Color(hex: "#A0A0A0")
    static let textMuted = Color(hex: "#6B7280")
}

// MARK: - Hex Color Initializer
extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue:  Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

// MARK: - Gradients
extension LinearGradient {
    static let divinityBackground = LinearGradient(
        colors: [Color.divinityBackground, Color.divinitySurface],
        startPoint: .top,
        endPoint: .bottom
    )

    static let goldAccent = LinearGradient(
        colors: [Color.divinityGold, Color.divinityOrange],
        startPoint: .leading,
        endPoint: .trailing
    )

    static let tealAccent = LinearGradient(
        colors: [Color.divinityTeal, Color.divinityDarkTeal],
        startPoint: .top,
        endPoint: .bottom
    )
}
