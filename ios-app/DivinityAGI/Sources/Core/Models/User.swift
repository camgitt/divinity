// User.swift
// User data models

import Foundation

struct User: Codable, Identifiable {
    let id: UUID
    var email: String
    var username: String?
    var fullName: String?
    var bio: String?
    var location: String?
    var avatarURL: URL?
    var faithTradition: FaithTradition?
    var subscriptionTier: SubscriptionTier
    var tokenBalance: TokenBalance
    var isVerifiedLeader: Bool
    var createdAt: Date

    init(
        id: UUID = UUID(),
        email: String,
        username: String? = nil,
        fullName: String? = nil,
        bio: String? = nil,
        location: String? = nil,
        avatarURL: URL? = nil,
        faithTradition: FaithTradition? = nil,
        subscriptionTier: SubscriptionTier = .seeker,
        tokenBalance: TokenBalance = TokenBalance(),
        isVerifiedLeader: Bool = false,
        createdAt: Date = Date()
    ) {
        self.id = id
        self.email = email
        self.username = username
        self.fullName = fullName
        self.bio = bio
        self.location = location
        self.avatarURL = avatarURL
        self.faithTradition = faithTradition
        self.subscriptionTier = subscriptionTier
        self.tokenBalance = tokenBalance
        self.isVerifiedLeader = isVerifiedLeader
        self.createdAt = createdAt
    }
}

// MARK: - Subscription Tier
enum SubscriptionTier: String, Codable, CaseIterable {
    case seeker = "seeker"
    case subscriber = "subscriber"
    case devotee = "devotee"
    case enlightened = "enlightened"

    var displayName: String {
        rawValue.capitalized
    }

    var monthlyPrice: Decimal? {
        switch self {
        case .seeker, .subscriber: return nil
        case .devotee: return 9.99
        case .enlightened: return 14.99
        }
    }

    var dailyTokens: Int {
        switch self {
        case .seeker: return 10
        case .subscriber: return 25
        case .devotee: return 100
        case .enlightened: return -1 // Unlimited
        }
    }

    var features: [String] {
        switch self {
        case .seeker:
            return ["Basic AI chat", "Limited avatars", "Daily inspiration"]
        case .subscriber:
            return ["All Seeker features", "Community access", "More avatars"]
        case .devotee:
            return ["All Subscriber features", "Full avatar access", "Token rewards", "Exclusive content"]
        case .enlightened:
            return ["All Devotee features", "Unlimited tokens", "Priority support", "Live Q&A sessions"]
        }
    }
}

// MARK: - Token Balance
struct TokenBalance: Codable {
    var daily: Int
    var purchased: Int
    var earned: Int

    var total: Int { daily + purchased + earned }

    init(daily: Int = 10, purchased: Int = 0, earned: Int = 0) {
        self.daily = daily
        self.purchased = purchased
        self.earned = earned
    }

    mutating func use(_ amount: Int) -> Bool {
        guard total >= amount else { return false }

        var remaining = amount

        // Use daily tokens first
        if daily >= remaining {
            daily -= remaining
            return true
        } else {
            remaining -= daily
            daily = 0
        }

        // Then purchased
        if purchased >= remaining {
            purchased -= remaining
            return true
        } else {
            remaining -= purchased
            purchased = 0
        }

        // Finally earned
        if earned >= remaining {
            earned -= remaining
            return true
        }

        return false
    }
}
