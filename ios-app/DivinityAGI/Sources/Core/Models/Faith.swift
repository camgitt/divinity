// Faith.swift
// Faith tradition models and configurations

import SwiftUI

// MARK: - Faith Tradition
enum FaithTradition: String, Codable, CaseIterable, Identifiable {
    case christianity
    case islam
    case judaism
    case buddhism
    case hinduism
    case taoism
    case sikhism
    case jainism
    case shinto
    case confucianism
    case bahai
    case polytheism
    case universal

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .christianity: return "Christianity"
        case .islam: return "Islam"
        case .judaism: return "Judaism"
        case .buddhism: return "Buddhism"
        case .hinduism: return "Hinduism"
        case .taoism: return "Taoism"
        case .sikhism: return "Sikhism"
        case .jainism: return "Jainism"
        case .shinto: return "Shinto"
        case .confucianism: return "Confucianism"
        case .bahai: return "Bahá'í"
        case .polytheism: return "Polytheism"
        case .universal: return "Universal"
        }
    }

    var icon: String {
        switch self {
        case .christianity: return "cross"
        case .islam: return "moon.stars"
        case .judaism: return "star.of.david"
        case .buddhism: return "circle.circle"
        case .hinduism: return "flame"
        case .taoism: return "yin.yang"
        case .sikhism: return "seal"
        case .jainism: return "hand.raised"
        case .shinto: return "leaf"
        case .confucianism: return "book"
        case .bahai: return "star"
        case .polytheism: return "sparkles"
        case .universal: return "globe"
        }
    }

    var primaryColor: Color {
        switch self {
        case .christianity: return .faithChristianity
        case .islam: return .faithIslam
        case .judaism: return .faithJudaism
        case .buddhism: return .faithBuddhism
        case .hinduism: return .faithHinduism
        case .taoism: return .faithTaoism
        case .sikhism: return .faithSikhism
        case .jainism: return .faithJainism
        case .shinto: return .faithShinto
        case .confucianism: return .faithConfucianism
        case .bahai: return .faithBahai
        case .polytheism: return .faithPolytheism
        case .universal: return .faithUniversal
        }
    }

    var description: String {
        switch self {
        case .christianity: return "Follow the teachings of Jesus Christ"
        case .islam: return "Submit to the will of Allah"
        case .judaism: return "Covenant with the God of Abraham"
        case .buddhism: return "Path to enlightenment and liberation"
        case .hinduism: return "Eternal dharma and spiritual liberation"
        case .taoism: return "Harmony with the Tao"
        case .sikhism: return "Devotion to one God and service"
        case .jainism: return "Non-violence and spiritual purity"
        case .shinto: return "Reverence for kami and nature"
        case .confucianism: return "Ethical harmony and virtue"
        case .bahai: return "Unity of humanity and religions"
        case .polytheism: return "Honor the many divine beings"
        case .universal: return "Spiritual wisdom from all traditions"
        }
    }

    var affirmations: [String] {
        switch self {
        case .christianity:
            return [
                "You are blessed and beloved",
                "Grace surrounds you",
                "Peace be with you",
                "You are held in divine love"
            ]
        case .islam:
            return [
                "Peace be upon you",
                "Trust in Allah's plan",
                "You are protected",
                "Divine mercy surrounds you"
            ]
        case .buddhism:
            return [
                "May you be at peace",
                "Compassion flows through you",
                "This moment is perfect",
                "You are awakening"
            ]
        case .hinduism:
            return [
                "You are divine consciousness",
                "Om Shanti, peace be with you",
                "Your soul is eternal",
                "Namaste, the divine in me honors you"
            ]
        default:
            return [
                "You are connected to the divine",
                "Peace flows through you",
                "You are loved",
                "Light guides your path"
            ]
        }
    }

    var ambiance: FaithAmbiance {
        FaithAmbiance.ambiance(for: self)
    }
}

// MARK: - Faith Ambiance
struct FaithAmbiance {
    let faith: FaithTradition
    let gradientColors: [Color]
    let particleType: ParticleType
    let audioLayer: AmbientSound

    enum ParticleType {
        case beams
        case lotus
        case fire
        case geometry
        case crescents
        case stars
        case waves
    }

    static func ambiance(for faith: FaithTradition) -> FaithAmbiance {
        switch faith {
        case .christianity:
            return FaithAmbiance(
                faith: faith,
                gradientColors: [.divinityGold.opacity(0.3), .divinityDeep],
                particleType: .beams,
                audioLayer: .bells
            )
        case .islam:
            return FaithAmbiance(
                faith: faith,
                gradientColors: [.faithIslam.opacity(0.3), .divinityDeep],
                particleType: .crescents,
                audioLayer: .wind
            )
        case .buddhism:
            return FaithAmbiance(
                faith: faith,
                gradientColors: [.faithBuddhism.opacity(0.3), .divinitySurface],
                particleType: .lotus,
                audioLayer: .bells
            )
        case .hinduism:
            return FaithAmbiance(
                faith: faith,
                gradientColors: [.faithHinduism.opacity(0.4), .divinityDeep],
                particleType: .fire,
                audioLayer: .bells
            )
        default:
            return FaithAmbiance(
                faith: faith,
                gradientColors: [faith.primaryColor.opacity(0.3), .divinityDeep],
                particleType: .stars,
                audioLayer: .wind
            )
        }
    }
}

// MARK: - Ambient Sound
enum AmbientSound: String, CaseIterable {
    case rain
    case ocean
    case forest
    case wind
    case bells
    case synthPad

    var displayName: String {
        switch self {
        case .rain: return "Rain"
        case .ocean: return "Ocean Waves"
        case .forest: return "Forest"
        case .wind: return "Wind"
        case .bells: return "Singing Bowls"
        case .synthPad: return "Synth Pad"
        }
    }

    var icon: String {
        switch self {
        case .rain: return "cloud.rain"
        case .ocean: return "water.waves"
        case .forest: return "leaf"
        case .wind: return "wind"
        case .bells: return "bell"
        case .synthPad: return "waveform"
        }
    }
}
