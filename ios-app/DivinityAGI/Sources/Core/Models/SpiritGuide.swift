// SpiritGuide.swift
// Spirit Guide models and matching system

import SwiftUI

// MARK: - Spirit Guide
struct SpiritGuide: Identifiable, Codable {
    let id: String
    let name: String
    let faith: FaithTradition
    let imageURL: String
    let chatURL: String?
    let personality: GuidePersonality
    let archetype: GuideArchetype
    let specialties: [SpiritualGoal]
    let ageRange: AgeRange
    let journeyLevel: JourneyLevel
    let welcomeMessage: String
    let description: String
    let voiceStyle: VoiceStyle

    var displayImageURL: URL? {
        URL(string: imageURL)
    }
}

// MARK: - Guide Personality
enum GuidePersonality: String, Codable, CaseIterable {
    case compassionate
    case wise
    case peaceful
    case joyful
    case mystical
    case grounded
    case nurturing
    case scholarly

    var displayName: String {
        rawValue.capitalized
    }

    var description: String {
        switch self {
        case .compassionate: return "Deeply empathetic and understanding"
        case .wise: return "Offers profound insights and guidance"
        case .peaceful: return "Brings calm and tranquility"
        case .joyful: return "Radiates positivity and light"
        case .mystical: return "Connects to deeper mysteries"
        case .grounded: return "Practical and centered approach"
        case .nurturing: return "Warm and supportive presence"
        case .scholarly: return "Knowledge-focused and analytical"
        }
    }
}

// MARK: - Guide Archetype
enum GuideArchetype: String, Codable, CaseIterable {
    case advisor
    case healer
    case scholar
    case celebrant
    case mystic
    case elder

    var displayName: String {
        rawValue.capitalized
    }

    var icon: String {
        switch self {
        case .advisor: return "lightbulb"
        case .healer: return "heart"
        case .scholar: return "book"
        case .celebrant: return "star"
        case .mystic: return "sparkles"
        case .elder: return "person.crop.circle"
        }
    }

    var matchingPoints: Int {
        25 // Max points for archetype matching
    }
}

// MARK: - Age Range
enum AgeRange: String, Codable, CaseIterable {
    case young
    case middleAged
    case elder

    var displayName: String {
        switch self {
        case .young: return "Young"
        case .middleAged: return "Middle-aged"
        case .elder: return "Elder"
        }
    }

    var matchingPoints: Int {
        20 // Max points for age matching
    }
}

// MARK: - Journey Level
enum JourneyLevel: String, Codable, CaseIterable {
    case beginner
    case intermediate
    case advanced

    var displayName: String {
        rawValue.capitalized
    }

    var description: String {
        switch self {
        case .beginner: return "Just starting your spiritual journey"
        case .intermediate: return "Growing in your practice"
        case .advanced: return "Deep spiritual experience"
        }
    }

    var matchingPoints: Int {
        15 // Max points for journey level matching
    }
}

// MARK: - Spiritual Goal
enum SpiritualGoal: String, Codable, CaseIterable, Identifiable {
    case innerPeace
    case spiritualGrowth
    case lifeGuidance
    case healingTrauma
    case findingPurpose
    case deepeningFaith
    case mindfulness
    case community
    case creativity
    case relationships

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .innerPeace: return "Inner Peace"
        case .spiritualGrowth: return "Spiritual Growth"
        case .lifeGuidance: return "Life Guidance"
        case .healingTrauma: return "Healing & Recovery"
        case .findingPurpose: return "Finding Purpose"
        case .deepeningFaith: return "Deepening Faith"
        case .mindfulness: return "Mindfulness"
        case .community: return "Community Connection"
        case .creativity: return "Creative Expression"
        case .relationships: return "Relationships"
        }
    }

    var icon: String {
        switch self {
        case .innerPeace: return "leaf"
        case .spiritualGrowth: return "arrow.up.heart"
        case .lifeGuidance: return "compass.drawing"
        case .healingTrauma: return "heart.circle"
        case .findingPurpose: return "target"
        case .deepeningFaith: return "hands.sparkles"
        case .mindfulness: return "brain.head.profile"
        case .community: return "person.3"
        case .creativity: return "paintpalette"
        case .relationships: return "heart.text.square"
        }
    }

    var matchingPoints: Int {
        25 // Max points for goal matching
    }
}

// MARK: - Voice Style
enum VoiceStyle: String, Codable, CaseIterable {
    case gentle
    case warm
    case authoritative
    case soothing
    case energetic
    case meditative

    var displayName: String {
        rawValue.capitalized
    }
}

// MARK: - Guide Matching
struct GuideMatchingCriteria {
    var faith: FaithTradition?
    var goals: [SpiritualGoal] = []
    var preferredArchetype: GuideArchetype?
    var preferredAge: AgeRange?
    var journeyLevel: JourneyLevel = .beginner
    var preferredPersonality: GuidePersonality?
}

struct GuideMatchResult: Identifiable {
    let id = UUID()
    let guide: SpiritGuide
    let matchScore: Int
    let matchPercentage: Double

    var formattedPercentage: String {
        "\(Int(matchPercentage))% match"
    }
}

// MARK: - Guide Matcher
class GuideMatcher {
    static let shared = GuideMatcher()

    private init() {}

    /// Calculate match score between a guide and user criteria
    /// Maximum score: 100 points
    func calculateMatchScore(guide: SpiritGuide, criteria: GuideMatchingCriteria) -> Int {
        var score = 0

        // Faith match (required - filter, not scored)
        if let preferredFaith = criteria.faith, guide.faith != preferredFaith {
            return 0
        }

        // Spiritual goals match (25 points max)
        if !criteria.goals.isEmpty {
            let matchingGoals = guide.specialties.filter { criteria.goals.contains($0) }
            let goalScore = (matchingGoals.count * 25) / max(criteria.goals.count, 1)
            score += min(goalScore, 25)
        } else {
            score += 15 // Base score if no goals specified
        }

        // Archetype match (25 points)
        if let preferredArchetype = criteria.preferredArchetype {
            if guide.archetype == preferredArchetype {
                score += 25
            } else {
                score += 5 // Partial credit
            }
        } else {
            score += 15 // Base score if no preference
        }

        // Age preference (20 points)
        if let preferredAge = criteria.preferredAge {
            if guide.ageRange == preferredAge {
                score += 20
            } else {
                score += 5 // Partial credit
            }
        } else {
            score += 12 // Base score if no preference
        }

        // Journey level (15 points)
        if guide.journeyLevel == criteria.journeyLevel {
            score += 15
        } else {
            // Adjacent levels get partial credit
            let guideLevelIndex = JourneyLevel.allCases.firstIndex(of: guide.journeyLevel) ?? 0
            let criteriaLevelIndex = JourneyLevel.allCases.firstIndex(of: criteria.journeyLevel) ?? 0
            if abs(guideLevelIndex - criteriaLevelIndex) == 1 {
                score += 8
            } else {
                score += 3
            }
        }

        // Personality match (10 points)
        if let preferredPersonality = criteria.preferredPersonality {
            if guide.personality == preferredPersonality {
                score += 10
            } else {
                score += 2
            }
        } else {
            score += 5
        }

        // Bonus: Guide with more specialties (5 points max)
        let specialtyBonus = min(guide.specialties.count, 5)
        score += specialtyBonus

        return min(score, 100)
    }

    /// Find best matching guides for given criteria
    func findMatches(from guides: [SpiritGuide], criteria: GuideMatchingCriteria, limit: Int = 10) -> [GuideMatchResult] {
        let results = guides.compactMap { guide -> GuideMatchResult? in
            let score = calculateMatchScore(guide: guide, criteria: criteria)
            guard score > 0 else { return nil }
            return GuideMatchResult(
                guide: guide,
                matchScore: score,
                matchPercentage: Double(score)
            )
        }

        return results
            .sorted { $0.matchScore > $1.matchScore }
            .prefix(limit)
            .map { $0 }
    }
}
