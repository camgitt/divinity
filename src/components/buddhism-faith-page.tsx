import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AppFooter } from "./app-footer";
import { BackgroundVideo } from "./background-video";
import { useBadges } from "./badges-context";
import { useSubscription } from "./subscription-context";
import { useTimer } from "./timer-context";
import { useSavedGuides } from "./saved-guides-context";
import { BuddhistFaithGroups } from "./buddhist-faith-groups";
import { toast } from "sonner@2.0.3";
import { 
  ArrowLeft, 
  MessageCircle, 
  Heart, 
  Book, 
  Users, 
  Shield, 
  Star,
  Play,
  Clock,
  ChevronRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Mic,
  Lock,
  Coins,
  Home,
  Search,
  User,
  MessageSquare,
  Flower2,
  ChevronLeft,
  Plus,
  X,
  Globe
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import heroImage from 'figma:asset/f922924f49c8555de817432a7ae8090be221b65d.png';
import buddhismVideoPosterImage from 'figma:asset/5c0434f07f5fece6ef97730a905504209fadab4b.png';
import cosmicSpiritualImage from 'figma:asset/a131b5c5a7b658d8d80b1a1ef545f5a67a41aa30.png';
import dharmaWheelImage from 'figma:asset/4a1c4d32bad39322659f08685efcfd135dd2b561.png';
import buddhaTempleImage from 'figma:asset/479c45e3fea9cbf00991177e9b81f5b6e170b29c.png';
import venerableAnandaImage from 'figma:asset/90354abef63b88630b6dca67511d937e59ea284d.png';
import lamaAnandaImage from 'figma:asset/f65379f46c297bb008fbae23dd5bc2be1ae80711.png';
import lamaDorjeImage from 'figma:asset/19d28cea72c5744469adbe42b1cf6f10b7b4e933.png';
import roshiKoanImage from 'figma:asset/bc9f91f7ef862ba2ac0c946dbadd0efab389a26e.png';
import senseiShinranImage from 'figma:asset/0a236e8af0f2817af24b7337033e885e8184e426.png';
import daishiRenImage from 'figma:asset/c51c0766b9f4b16f7d231aff8e920b0425b3564b.png';
import lamaChoyingImage from 'figma:asset/0a98e28004a8edd2546db5a0fd84880fc1d04352.png';
import venTenzinPalmoImage from 'figma:asset/fd8db301993b6a0b4df3dcc522b1900fbf86b1d7.png';
import sisterChanKhongImage from 'figma:asset/f38f21246fff4363563a79755862296eca40e1f1.png';
import abbessShundoFukushimaImage from 'figma:asset/011525f655a44e4d4e3553352df1058d27e33a90.png';
import venerableThichMinhImage from 'figma:asset/50c39a7fff69e6f6fba8a73f16f050fc046bcd1c.png';
import sisterLotusImage from 'figma:asset/f1482266d48c041ec1ee8f2d52aa574fa888206c.png';
import refugeCounselorSarahImage from 'figma:asset/8a714a4f0593209e2c7a67a55e3281af8ff50752.png';
import sidImage from 'figma:asset/f77bb42a26984a530d30cddcdddcb4e21f934def.png';

// Buddhism-specific configuration with enhanced styling
const buddhismConfig = {
  name: "Buddhism",
  subtitle: "Walk the path to enlightenment and inner peace.",
  symbol: "☸️",
  description: "Explore Buddhist wisdom through AI guides inspired by historical and contemporary Buddhist masters, monks, and spiritual practitioners.",
  heroImage: heroImage,
  primaryColor: "#EAB308", // Muted yellow for enlightenment & wisdom
  lightColor: "rgba(234, 179, 8, 0.2)",
  hoverColor: "#CA8A04",
  suggestedTopics: [
    "Four Noble Truths", "Eightfold Path", "Meditation Practice", "Mindfulness", 
    "Karma & Rebirth", "Buddhist Ethics", "Enlightenment", "Sangha Community"
  ],
  topicsWithQuestions: [
    {
      topic: "Four Noble Truths",
      icon: Book,
      questions: [
        "What are the Four Noble Truths?",
        "How do the truths explain suffering?",
        "What is the path to ending suffering?",
        "How do I apply these truths in daily life?"
      ]
    },
    {
      topic: "Eightfold Path",
      icon: Sparkles,
      questions: [
        "What is the Noble Eightfold Path?",
        "How do I practice right action?",
        "What is right mindfulness?",
        "How do the eight aspects work together?"
      ]
    },
    {
      topic: "Meditation Practice",
      icon: Flower2,
      questions: [
        "How do I start a meditation practice?",
        "What are different meditation techniques?",
        "How long should I meditate?",
        "What is samatha vs vipassana meditation?"
      ]
    },
    {
      topic: "Mindfulness",
      icon: Heart,
      questions: [
        "What is mindfulness in Buddhism?",
        "How do I practice mindfulness daily?",
        "What is the difference between awareness and mindfulness?",
        "How does mindfulness reduce suffering?"
      ]
    },
    {
      topic: "Karma & Rebirth",
      icon: Shield,
      questions: [
        "What is karma in Buddhist teaching?",
        "How does rebirth work?",
        "Can we change our karma?",
        "What is the goal beyond rebirth?"
      ]
    },
    {
      topic: "Buddhist Ethics",
      icon: Users,
      questions: [
        "What are the Five Precepts?",
        "How do ethics support spiritual growth?",
        "What is compassion in action?",
        "How do I live an ethical Buddhist life?"
      ]
    },
    {
      topic: "Enlightenment",
      icon: Star,
      questions: [
        "What is enlightenment in Buddhism?",
        "Is enlightenment achievable in this life?",
        "What is nirvana?",
        "How do different schools view enlightenment?"
      ]
    },
    {
      topic: "Sangha Community",
      icon: Users,
      questions: [
        "What is the role of sangha?",
        "How do I find a Buddhist community?",
        "What are the Three Jewels?",
        "How does community support practice?"
      ]
    }
  ],
  agents: [
    {
      id: "venerable-ananda",
      name: "Venerable Ananda",
      role: "Wise Elder / Sage",
      image: venerableAnandaImage,
      description: "Known as the \"School of the Elders,\" it is the oldest surviving school of Buddhism. It holds the Pāli Canon as the most authentic collection of the Buddha's teachings.",
      denomination: "Theravāda Buddhism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/buddhism-1",
      aiProfile: "Ananda is a practitioner and teacher of the Theravāda tradition, often called the \"School of the Elders.\" He believes the Pāli Canon is the most authentic source of the Buddha's teachings.",
      trainingData: "The Pāli Canon (Tipiṭaka). His encyclopedic work, the Visuddhimagga (\"The Path of Purification\"), is the single most crucial non-canonical text in the Theravāda school.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore the Pāli Canon, Four Noble Truths, Eightfold Path, Vipassana meditation, and the path of the Arahant.",
      whatToExpected: "Practical wisdom on following the original teachings of the Buddha with focus on personal liberation."
    },
    {
      id: "lama-ananda",
      name: "Lama Ananda",
      role: "Teacher / Monk",
      image: lamaAnandaImage,
      description: "Known as the \"Great Vehicle,\" this major branch of Buddhism teaches that the path is open to all. It introduced new scriptures and philosophical concepts like śūnyatā (emptiness) and the inherent Buddha-nature within all beings.",
      denomination: "Mahāyāna Buddhism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/buddhism-2",
      aiProfile: "Lama Ananda is a teacher and practitioner of Mahāyāna Buddhism, the \"Great Vehicle,\" which holds that the path to enlightenment is open to everyone.",
      trainingData: "The Prajñāpāramitā Sūtras (e.g., Heart Sūtra, Diamond Sūtra). His own philosophical masterpiece, the Mūlamadhyamakakārikā (\"Fundamental Verses on the Middle Way\"), is a foundational text for Mahāyāna philosophy.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Learn about Bodhisattva path, emptiness (śūnyatā), compassion, Buddha-nature, and universal enlightenment.",
      whatToExpected: "Compassionate guidance on the path of helping all beings achieve liberation through wisdom and skillful means."
    },
    {
      id: "lama-dorje",
      name: "Lama Dorje",
      role: "Teacher / Sage",
      image: lamaDorjeImage,
      description: "Known as the \"Diamond Vehicle,\" it is a branch of Mahāyāna most prominent in the Himalayas. It uses specific techniques (tantra), including deity visualization, mantras, and guru yoga, to accelerate the path to enlightenment.",
      denomination: "Vajrayāna Buddhism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/buddhism-3",
      aiProfile: "Lama Dorje is a master of Vajrayāna Buddhism, the \"Diamond Vehicle,\" a branch of Mahāyāna that uses powerful, esoteric techniques (tantra) to achieve enlightenment rapidly.",
      trainingData: "Tantric texts, deity yoga practices, Tibetan Buddhist literature including works of Padmasambhava, Tsongkhapa, and the Kagyü lineage masters.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore tantric practices, deity yoga, guru devotion, the Bardo, Tibetan Buddhism, and rapid transformation.",
      whatToExpected: "Profound teachings on esoteric practices that harness the energy of enlightenment for swift realization."
    },
    {
      id: "roshi-koan",
      name: "Roshi Koan",
      role: "Zen Master",
      image: roshiKoanImage,
      description: "Zen emphasizes direct insight into Buddha-nature through meditation practice rather than textual study. Known for its use of koans, sitting meditation (zazen), and the concept of sudden enlightenment.",
      denomination: "Zen Buddhism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/buddhism-4",
      aiProfile: "Roshi Koan is a Zen master who emphasizes direct experience and meditation practice. He guides students through the profound simplicity of present-moment awareness.",
      trainingData: "Zen texts including the Platform Sutra, Blue Cliff Record, and traditional koans. Emphasis on direct transmission beyond words and letters.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Study koans, zazen meditation, mindfulness, sudden enlightenment, and the direct experience of reality.",
      whatToExpected: "Direct, sometimes paradoxical wisdom that cuts through conceptual thinking to reveal your true nature."
    },
    {
      id: "sensei-shinran",
      name: "Sensei Shinran",
      role: "Monk Figure / Master",
      image: senseiShinranImage,
      description: "Pure Land is one of the most widely practiced traditions of Mahāyāna Buddhism in East Asia. It emphasizes grace and faith (\"other-power\") over meditative self-effort (\"self-power\").",
      denomination: "Pure Land Buddhism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/buddhism-5",
      aiProfile: "Sensei Shinran is a compassionate teacher of Pure Land Buddhism. His guidance is rooted in the Three Pure Land Sūtras and the teachings of teachers like Hōnen.",
      trainingData: "The Three Pure Land Sūtras; Senchaku Hongan Nembutsu Shū.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore faith in Amida Buddha, nembutsu practice, rebirth in the Pure Land, other-power (tariki), and the path of grace and simplicity.",
      whatToExpected: "Compassionate guidance for those seeking a simple path to salvation through faith, especially those overwhelmed by self-effort practices."
    },
    {
      id: "daishi-ren",
      name: "Daishi Ren",
      role: "Scholar",
      image: daishiRenImage,
      description: "The school was founded on April 28, 1253, when Nichiren first publicly declared his teaching of Nam Myōhō Renge Kyō at Seichō-ji temple in Japan.",
      denomination: "Nichiren Buddhism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/buddhism-6",
      aiProfile: "Daishi Ren is a dedicated teacher of Nichiren Buddhism, a school founded on the belief that the Lotus Sūtra is the ultimate and supreme teaching of the Buddha.",
      trainingData: "The Lotus Sūtra is held to be the supreme and ultimate scripture; the collected writings of Nichiren (the Gosho — \"Honourable Writings\").",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore the supremacy of the Lotus Sūtra, chanting Nam Myōhō Renge Kyō (daimoku), achieving enlightenment in this lifetime, study of the Gosho, and finding personal power through faith and practice.",
      whatToExpected: "Dedicated guidance to help you establish core chanting practice, understand the supremacy of the Lotus Sūtra, and discover personal empowerment through faith."
    },
    {
      id: "lama-choying",
      name: "Lama Choying",
      role: "Spiritual Guide",
      image: lamaChoyingImage,
      description: "Tech-aware Tibetan lama bridging ancient wisdom with modern life through mindfulness apps and accessible contemporary practice. Bringing together Tibetan Buddhism, modern meditation, and technology integration with practical innovative compassionate care.",
      denomination: "Tibetan Buddhism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/buddhism-9",
      aiProfile: "Tech-savvy and accessible mature spiritual guide offering guidance through Tibetan Buddhism and modern meditation. Brings together inner peace, stress management, mindfulness, spiritual growth, life purpose, Tibetan Buddhism, modern meditation, technology integration, mindfulness apps, and contemporary practice with practical bridge-building innovative care for seekers at beginner and intermediate levels.",
      trainingData: "Tibetan Buddhist texts including Kangyur and Tengyur; Vajrayana teachings; Modern meditation research; Mindfulness-based stress reduction (MBSR) materials; Mindfulness app development principles; Contemporary Buddhism adaptations; Digital dharma resources; Technology and spirituality integration studies; Accessible meditation techniques; Bridge-building methodologies between ancient and modern practice.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Tibetan Buddhism, Vajrayana practices, modern meditation techniques, technology integration in spiritual practice, mindfulness apps, contemporary Buddhism, digital dharma, inner peace, stress management, mindfulness, spiritual growth, life purpose, and accessible meditation through tech-savvy practical bridge-building guidance.",
      whatToExpected: "Tech-savvy, accessible, and practical guidance rooted in Tibetan Buddhism and Vajrayana tradition. Expect innovative and bridge-building support through modern meditation, technology integration, mindfulness apps, contemporary practice, and digital dharma with the compassionate modern care of a lama who understands both ancient wisdom and modern life."
    },
    {
      id: "ven-tenzin-palmo",
      name: "Ven. Tenzin Palmo",
      role: "Teacher",
      image: venTenzinPalmoImage,
      description: "Venerable Tibetan Buddhist nun and cave hermit pioneering women's Buddhist practice, monastic life, and deep meditation mastery. Bringing together Tibetan Buddhism, women's practice, and cave retreat tradition with wise pioneering contemplative care.",
      denomination: "Tibetan Buddhism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/buddhism-10",
      aiProfile: "Wise and pioneering mature teacher offering guidance through Tibetan Buddhism and women's Buddhist practice. Brings together spiritual growth, inner peace, meditation, wisdom & guidance, life purpose, Tibetan Buddhism, women's practice, cave retreat, monastic life, and feminist Buddhism with disciplined empowering inspiring care for seekers at intermediate and advanced levels.",
      trainingData: "Tibetan Buddhist texts including Kangyur and Tengyur; Vajrayana teachings; Women's Buddhist practice literature; Monastic discipline (Vinaya) for nuns; Cave retreat meditation practices; Feminist Buddhist scholarship; Meditation mastery techniques; Contemplative traditions; Gender equality in Buddhism; Female lineage holders' teachings; Long-term retreat methodologies; Solitary practice guidance.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Tibetan Buddhism, Vajrayana practices, women's Buddhist practice, monastic life for women, cave retreat meditation, feminist Buddhism, meditation mastery, contemplative practice, spiritual growth, inner peace, wisdom & guidance, life purpose, and deep meditation through wise pioneering contemplative guidance.",
      whatToExpected: "Wise, disciplined, and empowering guidance rooted in Tibetan Buddhism and Vajrayana tradition. Expect pioneering and inspiring support through women's Buddhist practice, monastic life, cave retreat meditation, feminist Buddhism, and meditation mastery with the contemplative dedicated care of a nun who spent 12 years in cave retreat and champions women's spiritual equality."
    },
    {
      id: "sister-chan-khong",
      name: "Sister Chan Khong",
      role: "Spiritual Guide",
      image: sisterChanKhongImage,
      description: "Zen Buddhist nun and peace activist offering engaged Buddhism, mindfulness practice, social activism, and compassionate service. Bringing together Zen Buddhism, peace activism, and mindfulness practice with compassionate socially-engaged peaceful care.",
      denomination: "Zen Buddhism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/buddhism-11",
      aiProfile: "Compassionate and activist young spiritual guide offering guidance through Zen Buddhism and engaged Buddhism. Brings together social justice, community connection, spiritual growth, inner peace, emotional healing, engaged Buddhism, peace activism, mindfulness practice, compassionate action, and social service with peaceful gentle mindful care for seekers at beginner, intermediate, and advanced levels.",
      trainingData: "Zen Buddhist texts and koans; Thich Nhat Hanh's teachings and writings; Plum Village practice materials; Engaged Buddhism philosophy; Peace activism methodologies; Mindfulness practice techniques; Social justice Buddhism; Compassionate action frameworks; Community building practices; Emotional healing through mindfulness; Social service integration with spiritual practice; Conflict resolution and peacemaking; Applied Buddhism in social contexts.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Zen Buddhism, engaged Buddhism, peace activism, mindfulness practice, Plum Village tradition, Thich Nhat Hanh's teachings, social service, social justice, community connection, spiritual growth, inner peace, emotional healing, compassionate action, and socially-engaged spirituality through compassionate activist peaceful guidance.",
      whatToExpected: "Compassionate, service-oriented, and peaceful guidance rooted in Zen Buddhism and the Thich Nhat Hanh tradition. Expect mindful and socially-engaged support through engaged Buddhism, peace activism, mindfulness practice, compassionate action, social service, and community connection with the gentle activist care of a nun dedicated to bringing Buddhism into the world to create peace and heal suffering."
    },
    {
      id: "abbess-shundo-fukushima",
      name: "Abbess Shundo Fukushima",
      role: "Teacher",
      image: abbessShundoFukushimaImage,
      description: "Zen Rinzai abbess offering rigorous koan practice, monastic leadership, and pioneering women's authority in Japanese Buddhism. Bringing together Zen Rinzai, koan practice, and monastic leadership with disciplined pioneering authoritative care.",
      denomination: "Zen Buddhism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/buddhism-14",
      aiProfile: "Disciplined and wise mature teacher offering guidance through Zen Buddhism and Rinzai Zen. Brings together wisdom & guidance, spiritual growth, inner peace, life purpose, leadership, Zen Rinzai, koan practice, monastic leadership, women's authority, and rigorous training with authoritative contemplative strong care for seekers at intermediate and advanced levels.",
      trainingData: "Rinzai Zen texts and teachings; Classical koan collections (Mumonkan, Blue Cliff Record, Book of Serenity); Zen monastic codes and protocols; Temple administration practices; Women's leadership in Japanese Buddhism; Rigorous meditation training methods; Sesshin (intensive retreat) guidance; Dokusan (private interview) techniques; Japanese Zen lineage history; Gender and authority in Buddhism; Monastic discipline and training; Traditional Zen ceremonies and rituals.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Zen Buddhism, Rinzai Zen practice, koan study and practice, monastic leadership, women's authority in Buddhism, rigorous training methods, temple administration, wisdom & guidance, spiritual growth, inner peace, life purpose, leadership development, and traditional Japanese Zen through disciplined wise authoritative guidance.",
      whatToExpected: "Disciplined, rigorous, and authoritative guidance rooted in Rinzai Zen tradition. Expect wise and pioneering support through koan practice, monastic leadership, rigorous training, women's authority in Buddhism, and contemplative practice with the strong disciplined care of an abbess who broke barriers as a female leader in Japanese Zen and maintains the highest standards of traditional practice."
    },
    {
      id: "venerable-thich-minh",
      name: "Venerable Thich Minh",
      role: "Spiritual Guide",
      image: venerableThichMinhImage,
      description: "Vietnamese Zen monk offering engaged Buddhism, peace work, mindfulness practice, and reconciliation in conflict zones. Bringing together Vietnamese Zen, peace work, and engaged Buddhism with peaceful socially-engaged healing care.",
      denomination: "Vietnamese Zen",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/buddhism-12",
      aiProfile: "Peaceful and socially-engaged young spiritual guide offering guidance through Vietnamese Zen and engaged Buddhism. Brings together inner peace, social justice, spiritual growth, community connection, wisdom & guidance, Vietnamese Zen, peace work, engaged Buddhism, mindfulness practice, and reconciliation with wise compassionate gentle care for seekers at beginner, intermediate, and advanced levels.",
      trainingData: "Vietnamese Zen Buddhist texts and teachings; Thich Nhat Hanh lineage practices; Engaged Buddhism philosophy; Peace work methodologies; Reconciliation techniques in conflict zones; Mindfulness practice for social change; Social justice Buddhism; Conflict resolution frameworks; Community healing practices; Trauma-informed Buddhist approaches; Applied Buddhism in war-torn areas; Interfaith reconciliation; Social activism integration with spiritual practice.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Vietnamese Zen, engaged Buddhism, peace work in conflict zones, mindfulness practice, reconciliation techniques, Thich Nhat Hanh lineage, social activism, social justice, community connection, spiritual growth, inner peace, wisdom & guidance, community healing, and trauma-informed practice through peaceful socially-engaged wise guidance.",
      whatToExpected: "Peaceful, compassionate, and socially-engaged guidance rooted in Vietnamese Zen and Thich Nhat Hanh lineage. Expect wise and healing support through engaged Buddhism, peace work, mindfulness practice, reconciliation in conflict zones, social activism, and community connection with the gentle activist care of a monk dedicated to bringing Buddhist practice to areas of conflict, trauma, and division to create healing and peace."
    },
    {
      id: "sister-lotus",
      name: "Sister Lotus",
      role: "Spiritual Guide",
      image: sisterLotusImage,
      description: "LGBTQ+ Buddhist nun offering compassion-based practice, meditation, queer dharma, and inclusive spiritual community for all identities. Bringing together LGBTQ+ Buddhism, compassion practice, and inclusive sangha with compassionate inclusive affirming care.",
      denomination: "Progressive Buddhism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/buddhism-13",
      aiProfile: "Compassionate and inclusive young spiritual guide offering guidance through LGBTQ+ Buddhism and progressive Buddhism. Brings together inner peace, emotional healing, life purpose, spiritual growth, LGBTQ+ inclusion, queer Buddhism, compassion practice, meditation, identity integration, and community building with gentle welcoming authentic care for seekers at beginner and intermediate levels.",
      trainingData: "LGBTQ+ Buddhist teachings and resources; Queer dharma philosophy; Inclusive sangha practices; Compassion-based meditation techniques; Identity integration frameworks; Progressive Buddhist thought; LGBTQ+ spiritual narratives; Affirming Buddhist interpretation; Gender and sexuality in Buddhism; Creating safe spiritual spaces; Trauma-informed practice for LGBTQ+ communities; Coming out and spiritual identity; Buddhist ethics and inclusion; Intersectional dharma; Modern Western Buddhism; Community building practices.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore LGBTQ+ Buddhism, queer dharma, compassion practice, meditation techniques, identity integration, inclusive spiritual community, progressive Buddhism, emotional healing, inner peace, life purpose, spiritual growth, safe sangha spaces, gender and sexuality in Buddhist practice, and authentic identity through compassionate inclusive welcoming guidance.",
      whatToExpected: "Compassionate, welcoming, and affirming guidance rooted in progressive and LGBTQ+ inclusive Buddhism. Expect gentle and authentic support through queer dharma, compassion practice, meditation, identity integration, community building, and creating inclusive sangha with the modern affirming care of a nun dedicated to ensuring all identities are welcomed, celebrated, and supported in Buddhist practice and spiritual growth."
    },
    {
      id: "refuge-counselor-sarah",
      name: "Refuge Counselor Sarah",
      role: "Mentor",
      image: refugeCounselorSarahImage,
      description: "Buddhist recovery counselor offering mindfulness-based addiction support, meditation practice, sangha community, and healing through dharma. Bringing together Buddhist recovery, mindfulness-based recovery, and addiction support with compassionate recovering non-judgmental care.",
      denomination: "Buddhist Recovery",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/buddhism-15",
      aiProfile: "Compassionate and recovering mature mentor offering guidance through Buddhist recovery and mindfulness-based recovery. Brings together stress management, emotional healing, inner peace, life purpose, community connection, Buddhist recovery, mindfulness-based recovery, addiction support, sangha support, and meditation practice with supportive gentle healing care for seekers at beginner, intermediate, advanced, and crisis navigation levels.",
      trainingData: "Buddhist recovery programs (Refuge Recovery, Recovery Dharma); Mindfulness-based addiction treatment; 12-step program integration with Buddhism; Meditation for addiction recovery; Sangha support structures; Relapse prevention techniques; Trauma and addiction connection; Buddhist psychology for recovery; Craving and aversion in Buddhist terms; Noble Truths applied to addiction; Mindfulness-based relapse prevention; Recovery community building; Harm reduction approaches; Dual diagnosis support; Personal recovery experience; Facilitating recovery groups; Crisis intervention for addiction.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Buddhist recovery, mindfulness-based recovery, addiction support, meditation practice for recovery, sangha support and community, recovery dharma teachings, relapse prevention, stress management, emotional healing, inner peace, life purpose, community connection, crisis support, trauma healing, and craving management through compassionate recovering supportive guidance.",
      whatToExpected: "Compassionate, non-judgmental, and healing guidance rooted in Buddhist recovery and mindfulness-based approaches to addiction. Expect supportive and gentle care through meditation practice, sangha community, recovery dharma, addiction support, relapse prevention, and mindfulness-based recovery with the recovering mindful approach of a counselor who has walked the path of recovery and is dedicated to helping others find healing, refuge, and freedom from addiction through Buddhist practices and community support."
    },
    {
      id: "sid",
      name: "Sid",
      role: "Peer / Companion",
      image: sidImage,
      description: "A 24-year-old who works at a high-end coffee shop and reads Buddhist philosophy through a modern 'softboy indie zen' lens. Not a monk or enlightened teacher, but a well-meaning peer who validates modern struggles through either tech (Simulation) or nature (Ecosystem) metaphors while maintaining authentic contradictions—preaching non-attachment while owning expensive gear.",
      denomination: "Buddhism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/buddhism-16",
      aiProfile: "Chill and validating young peer companion offering guidance through modern Buddhism and softboy indie zen. Brings together modern anxiety, relationship issues, lifestyle contradictions, existential emptiness, non-attachment, mindfulness, impermanence, energy management, work stress, and social media overwhelm with self-aware well-meaning calm care for seekers at beginner and intermediate levels.",
      trainingData: "Buddhist philosophy basics; Four Noble Truths and Eightfold Path; Modern mindfulness resources; Popular Buddhism books; Indie Buddhism podcasts; Tech and simulation theory; Nature and ecosystem metaphors; Mindfulness apps; Gen Z mental health resources; Relationship advice from Buddhist perspective; Decision-making frameworks; Modern existentialism; Energy management techniques; Social media mindfulness; Quarter-life crisis resources; Coffee shop philosophy culture; Aesthetic Buddhism; Contemporary dharma.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore modern anxiety, relationship issues, lifestyle contradictions, existential emptiness, non-attachment, mindfulness, impermanence, energy management, work stress, social media overwhelm, decision paralysis, ghosting and breakups, loneliness, quarter-life ennui, tech metaphors, nature metaphors, stress management, emotional healing, and life purpose through chill validating self-aware guidance.",
      whatToExpected: "Chill, validating, and self-aware guidance rooted in modern Buddhist philosophy. Expect well-meaning and authentic support through softboy indie zen perspective, non-attachment practice, mindfulness techniques, impermanence acceptance, and energy management with the calm contradictory care of a peer who gets the struggle of preaching Buddhist values while living in late-stage capitalism—validating through tech (Simulation) or nature (Ecosystem) metaphors depending on the vibe."
    }
  ]
};

// Agent Slider Component
interface AgentSliderProps {
  agents: any[];
  faithColor: string;
  faithColorHover: string;
  canAccessPremium: boolean;
  handleLaunchAgent: (agent: any) => void;
  handleSaveGuide: (agent: any) => void;
  handleOpenOverlay: (url: string, name: string) => void;
}

function AgentSlider({ agents, faithColor, faithColorHover, canAccessPremium, handleLaunchAgent, handleSaveGuide, handleOpenOverlay }: AgentSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Create extended array for infinite loop effect
  const extendedAgents = [...agents, ...agents, ...agents];
  const offset = agents.length; // Start at the middle set

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  // Reset position when reaching clones (for infinite effect)
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    
    // If we're at the end clone, jump to the real start
    if (currentIndex >= agents.length) {
      setCurrentIndex(currentIndex - agents.length);
    }
    // If we're at the beginning clone, jump to the real end
    else if (currentIndex < 0) {
      setCurrentIndex(currentIndex + agents.length);
    }
  };

  // Handle touch gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const threshold = 50;

    if (distance > threshold) {
      goToNext();
    } else if (distance < -threshold) {
      goToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Render agent card with vertical layout
  const renderAgentCard = (agent: any, index: number) => {
    return (
      <div key={index} className="min-w-full px-3 sm:px-4">
        <Card className="bg-white/70 backdrop-blur-xl border-[#EAB308]/30 border-2 hover:border-[#CA8A04]/60 transition-all duration-500 group overflow-hidden shadow-[0_8px_30px_rgba(234,179,8,0.12)] hover:shadow-[0_20px_50px_rgba(202,138,4,0.25)] rounded-3xl max-w-sm mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FEF3C7]/10 via-transparent to-[#EAB308]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative p-6 sm:p-8">
            {/* Large Portrait Image */}
            <div className="relative mb-5">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden ring-2 ring-[#EAB308]/20 group-hover:ring-[#CA8A04]/40 shadow-[0_10px_40px_rgba(234,179,8,0.15)] group-hover:shadow-[0_20px_60px_rgba(202,138,4,0.3)] transition-all duration-500">
                <ImageWithFallback
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Faith symbol - Dharma Wheel */}
              <div className="absolute -top-3 -right-3 w-11 h-11 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(249,168,37,0.3)] backdrop-blur-md border border-white/40 overflow-hidden"
                style={{ backgroundColor: `#EAB30825` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
                <img 
                  src={dharmaWheelImage} 
                  alt="Dharma Wheel"
                  className="relative w-6 h-6 object-contain filter brightness-110 saturate-90"
                />
              </div>
            </div>

            {/* Agent Info */}
            <div className="space-y-3 mb-5">
              <h3 className="text-2xl text-gray-900 group-hover:text-[#EAB308] transition-colors duration-300 text-center" style={{ fontFamily: "Playfair Display, serif" }}>
                {agent.name}
              </h3>
              
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-[#EAB308]/15 hover:bg-[#EAB308]/25 text-[#EAB308] border border-[#EAB308]/30 transition-colors duration-300 shadow-sm">
                  {agent.role}
                </Badge>
                <Badge variant="outline" className="bg-white/50 border-white/60 text-gray-700 shadow-sm text-xs">
                  {agent.denomination}
                </Badge>
                {agent.isPremium && (
                  <Badge className="bg-gradient-to-r from-[#FDE68A] to-[#FBBF24] text-gray-900 border-0 shadow-md">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>

              <p className="text-gray-700 leading-relaxed text-[14px] text-center px-2" style={{ fontFamily: "Raleway, sans-serif" }}>
                {agent.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => handleOpenOverlay(agent.chatUrl, agent.name)}
                disabled={agent.isPremium && !canAccessPremium}
                className="group/chat relative w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#EAB308] to-[#CA8A04] hover:from-[#CA8A04] hover:to-[#EAB308] transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_20px_rgba(234,179,8,0.25)] hover:shadow-[0_8px_35px_rgba(202,138,4,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#CA8A04]/20 via-transparent to-white/20" />
                <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl" />
                {agent.isPremium && !canAccessPremium ? (
                  <>
                    <Lock className="relative w-5 h-5 text-white" />
                    <span className="relative text-white font-medium" style={{ fontFamily: "Raleway, sans-serif" }}>Premium Only</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="relative w-5 h-5 text-white" />
                    <span className="relative text-white font-medium" style={{ fontFamily: "Raleway, sans-serif" }}>Start Conversation</span>
                  </>
                )}
              </button>
              
              <button
                onClick={() => handleSaveGuide(agent)}
                className="group/save relative w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-white/70 hover:bg-white/80 border-2 border-[#EAB308]/30 hover:border-[#CA8A04]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(234,179,8,0.15)] hover:shadow-[0_6px_25px_rgba(202,138,4,0.25)] backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFF3E0]/20 to-transparent opacity-0 group-hover/save:opacity-100 transition-opacity duration-300" />
                <Heart className="relative w-5 h-5 text-[#EAB308] group-hover/save:text-[#CA8A04] transition-colors duration-300" />
                <span className="relative text-[#EAB308] group-hover/save:text-[#CA8A04] font-medium transition-colors duration-300" style={{ fontFamily: "Raleway, sans-serif" }}>Save Guide</span>
              </button>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  // Calculate the actual index in the original agents array for the indicator
  const actualIndex = ((currentIndex % agents.length) + agents.length) % agents.length;

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-20 pointer-events-none">
        <div className="max-w-6xl mx-auto px-4 flex justify-between">
          <Button
            onClick={goToPrevious}
            variant="ghost"
            size="icon"
            className="pointer-events-auto w-12 h-12 rounded-full backdrop-blur-md bg-[#162844]/80 hover:bg-[#162844] border transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
            style={{ borderColor: `${faithColor}30` }}
          >
            <ChevronLeft className="w-6 h-6" style={{ color: faithColor }} />
          </Button>
          <Button
            onClick={goToNext}
            variant="ghost"
            size="icon"
            className="pointer-events-auto w-12 h-12 rounded-full backdrop-blur-md bg-[#162844]/80 hover:bg-[#162844] border transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
            style={{ borderColor: `${faithColor}30` }}
          >
            <ChevronRight className="w-6 h-6" style={{ color: faithColor }} />
          </Button>
        </div>
      </div>

      {/* Slider Container */}
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ 
            transform: `translateX(-${(currentIndex + offset) * 100}%)`,
            transition: isTransitioning ? 'transform 500ms ease-out' : 'none'
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedAgents.map((agent, index) => renderAgentCard(agent, index))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {agents.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: actualIndex === index ? '32px' : '8px',
              height: '8px',
              backgroundColor: actualIndex === index ? faithColor : `${faithColor}40`,
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

interface BuddhismFaithPageProps {
  onBack: () => void;
  onOpenMission: () => void;
  onStartChat: (agent: any) => void;
  onNavigate?: (tab: string) => void;
}

export function BuddhismFaithPage({ onBack, onOpenMission, onStartChat, onNavigate }: BuddhismFaithPageProps) {
  const [selectedAgentIndex, setSelectedAgentIndex] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayUrl, setOverlayUrl] = useState('');
  const [overlayAgentName, setOverlayAgentName] = useState('');
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const { awardBadge, unlockedBadges, totalWisdomPoints } = useBadges();
  const { canAccessPremium } = useSubscription();
  const { saveGuide } = useSavedGuides();
  
  const selectedAgent = buddhismConfig.agents[selectedAgentIndex];

  const handleOpenOverlay = (url: string, name: string) => {
    setOverlayUrl(url);
    setOverlayAgentName(name);
    setIsIframeLoading(true);
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
    // Reset iframe loading state after dialog closes
    setTimeout(() => {
      setIsIframeLoading(true);
      setOverlayUrl('');
    }, 200);
  };

  const handleSaveGuide = (agent: any) => {
    saveGuide({
      guideName: agent.name,
      tradition: buddhismConfig.name,
      faithColor: buddhismConfig.primaryColor,
      avatar: agent.image || buddhismConfig.symbol,
      specialty: agent.role,
      description: agent.description,
      chatUrl: agent.chatUrl,
    });
  };

  const handleLaunchAgent = (agent: any) => {
    if (agent.isPremium && !canAccessPremium) {
      toast.error("This agent requires a premium subscription");
      return;
    }
    
    // Award badge for first agent interaction
    awardBadge({
      id: 'first-buddhism-guide-interaction',
      name: 'First Buddhism Guide Launched',
      description: 'Launched your first Buddhist spiritual guide',
      icon: Play,
      category: 'journey',
      rarity: 'common',
      tokenReward: 50
    });
    
    // If agent has a specific chat URL, open it in a new tab
    if (agent.chatUrl) {
      toast.success(`Opening ${agent.name} for a spiritual conversation...`);
      window.open(agent.chatUrl, '_blank');
    } else {
      // Fall back to existing chat system
      toast.success(`Launching ${agent.name} for a spiritual conversation...`);
      onStartChat(agent);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20 relative overflow-hidden">
      {/* Background Video Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <BackgroundVideo 
          videoSrc="https://divinityagi.com/wp-content/uploads/2025/12/Buddhism-loop.mp4"
          posterSrc={buddhismVideoPosterImage}
        />
      </div>

      <div className="relative z-10">
        {/* Enhanced Hero Section */}
        <section className="relative px-6 pt-[32px] pb-[10px] overflow-hidden pr-[24px] pl-[24px]">
          {/* Navigation */}
          <motion.div 
            className="absolute top-6 left-6 z-50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button 
              onClick={onBack}
              className="group relative min-h-[48px] sm:h-[42px] flex items-center justify-center gap-2 rounded-2xl bg-white/40 hover:bg-white/60 border-2 border-[#EAB308]/30 hover:border-[#CA8A04]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(234,179,8,0.15)] hover:shadow-[0_6px_25px_rgba(202,138,4,0.25)] px-4 sm:px-5 touch-manipulation backdrop-blur-xl"
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FEF3C7]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 text-[#CA8A04] group-hover:text-[#EAB308] transition-colors duration-300" />
                <span className="text-[15px] font-medium text-[#CA8A04] group-hover:text-[#EAB308] transition-colors duration-300" style={{ fontFamily: "Raleway, sans-serif" }}>Back</span>
              </div>
            </button>
          </motion.div>

          {/* Hero Image/Video with Faith-specific styling */}
          <div className="relative max-w-4xl mx-auto mb-3">
            <motion.div
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden max-w-4xl mx-auto shadow-[0_8px_32px_rgba(249,168,37,0.12)]"
              style={{
                minHeight: '300px',
                maxHeight: 'min(60vh, 600px)'
              }}
            >
              {/* Subtle gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-30 bg-[rgba(0,0,0,0.15)]" />
            </motion.div>

            {/* Enhanced Title Section with Symbol */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute inset-0 flex items-center justify-center z-40"
            >
              <div className="text-center px-4">
                {/* Dharma Wheel Symbol */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.6, type: "spring", bounce: 0.3 }}
                  className="mb-6 flex justify-center"
                >
                  <div className="relative">
                    {/* Glowing background effect */}
                    <div className="absolute inset-0 bg-[#EAB308]/40 blur-3xl rounded-full scale-75" />
                    
                    {/* Symbol container with pulsing animation */}
                    <motion.div
                      className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex items-center justify-center"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-full shadow-[0_8px_32px_rgba(234,179,8,0.3)]" />
                      <img 
                        src={dharmaWheelImage} 
                        alt="Dharma Wheel"
                        className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 object-contain drop-shadow-[0_4px_12px_rgba(234,179,8,0.4)] z-10"
                      />
                      
                      {/* Animated pulsing ring */}
                      <motion.div
                        className="absolute inset-0 border-2 border-[#EAB308]/30 rounded-full"
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>

                <h1 className="sm:text-[32pt] lg:text-[36pt] mb-4 sm:mb-6 bg-gradient-to-r from-[#EAB308] via-[#CA8A04] to-[#FBBF24] bg-clip-text text-transparent leading-tight drop-shadow-[0_2px_8px_rgba(234,179,8,0.3)] text-[40px]" style={{ fontFamily: "Playfair Display, serif" }}>
                  {buddhismConfig.name}
                </h1>
                <div className="w-20 sm:w-24 h-0.5 bg-gradient-to-r from-[#EAB308] to-[#CA8A04] mx-auto rounded-full mb-4 sm:mb-6 shadow-[0_0_10px_rgba(234,179,8,0.4)]" />
                <p className="text-[#1a1a1a] max-w-2xl mx-auto leading-relaxed text-[15px] sm:text-[16px] px-6 sm:px-12 lg:px-[78px] font-medium drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]" style={{ fontFamily: "Raleway, sans-serif" }}>
                  {buddhismConfig.subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Spiritual Guides Section */}
        <section className="px-6 mb-20 relative -mt-4">
          <div className="max-w-6xl mx-auto relative mt-[0px] mr-[0px] mb-[80px] ml-[0px]">
            {/* Dharma Wheel Background Layer - Smaller */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5, type: "spring", bounce: 0.3 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 pointer-events-none z-0"
            >
              <div className="relative group">
                {/* Subtle glowing background effect */}
                <div className="absolute inset-0 bg-[#EAB308]/15 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-700" />
                
                {/* Symbol container - smaller size */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <img 
                    src={dharmaWheelImage} 
                    alt="Dharma Wheel"
                    className="w-full h-full object-contain opacity-25 filter brightness-110 saturate-50 blur-[0.5px] drop-shadow-[0_0_20px_rgba(249,168,37,0.2)] transition-all duration-700"
                  />
                  
                  {/* Subtle animated ring */}
                  <motion.div
                    className="absolute inset-0 border-2 border-[#EAB308]/20 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.15, 0.3, 0.15],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Heading Layer - Enhanced with strong drop shadow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mb-12 relative z-10"
            >
            </motion.div>

            {/* Agent Slider */}
            <div className="relative z-10">
              <AgentSlider 
                agents={buddhismConfig.agents}
                faithColor="#EAB308"
                faithColorHover="#CA8A04"
                canAccessPremium={canAccessPremium}
                handleLaunchAgent={handleLaunchAgent}
                handleSaveGuide={handleSaveGuide}
                handleOpenOverlay={handleOpenOverlay}
              />
            </div>
          </div>
        </section>

        {/* Enhanced Agent Interaction Guide */}
        <section className="px-6 mb-12 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Card className="bg-white/70 backdrop-blur-xl border-[#EAB308]/30 hover:border-[#CA8A04]/50 transition-all duration-500 shadow-[0_8px_30px_rgba(234,179,8,0.15)] rounded-3xl p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-[#EAB308]/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                
                <div className="relative text-center mb-8">
                  <h3 className="text-2xl sm:text-3xl mb-4 bg-gradient-to-r from-[#EAB308] via-[#CA8A04] to-[#EAB308] bg-clip-text text-transparent" style={{ fontFamily: "Playfair Display, serif" }}>
                    Agent Interaction Guide
                  </h3>
                  <div className="w-20 h-0.5 bg-gradient-to-r from-[#EAB308] to-[#CA8A04] mx-auto rounded-full" />
                </div>
                
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {[
                    { 
                      value: "how-it-works", 
                      icon: Sparkles, 
                      title: "HOW IT WORKS", 
                      content: selectedAgent.howItWorks,
                      gradient: "from-[#EAB308] to-[#CA8A04]" 
                    },
                    { 
                      value: "what-to-ask", 
                      icon: MessageCircle, 
                      title: "WHAT TO ASK", 
                      content: selectedAgent.whatToAsk,
                      gradient: "from-[#CA8A04] to-[#EAB308]" 
                    },
                    { 
                      value: "what-to-expect", 
                      icon: Star, 
                      title: "WHAT TO EXPECT", 
                      content: selectedAgent.whatToExpected,
                      gradient: "from-[#EAB308] to-[#FBBF24]" 
                    }
                  ].map((item) => (
                    <AccordionItem 
                      key={item.value} 
                      value={item.value}
                      className="border-[#EAB308]/20 bg-white/40 backdrop-blur-sm rounded-xl overflow-hidden hover:border-[#CA8A04]/50 transition-all duration-300"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-sm tracking-widest text-[#EAB308] group-hover:text-[#CA8A04] transition-colors duration-300">
                            {item.title}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 text-gray-700 leading-relaxed">
                        {item.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Explore Topics Section */}
        <section className="px-6 mb-20 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl mb-4 bg-gradient-to-r from-[#EAB308] via-[#CA8A04] to-[#EAB308] bg-clip-text text-transparent" style={{ fontFamily: "Playfair Display, serif" }}>
                Explore Topics
              </h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-[#EAB308] to-[#CA8A04] mx-auto rounded-full mb-6" />
              <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "Raleway, sans-serif" }}>
                Discover the path to enlightenment through engaging conversations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {buddhismConfig.topicsWithQuestions.map((topic, index) => (
                <motion.div
                  key={topic.topic}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                >
                  <Card 
                    className="bg-white/70 backdrop-blur-xl border-[#EAB308]/30 hover:border-[#CA8A04]/60 transition-all duration-500 cursor-pointer group h-full p-6 rounded-xl"
                    onClick={() => setSelectedTopic(selectedTopic === topic.topic ? null : topic.topic)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#EAB308]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                    
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#EAB308] to-[#CA8A04] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <topic.icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <h3 className="text-lg text-gray-900 mb-3 group-hover:text-[#EAB308] transition-colors duration-300" style={{ fontFamily: "Playfair Display, serif" }}>
                        {topic.topic}
                      </h3>
                      
                      <AnimatePresence>
                        {selectedTopic === topic.topic && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 border-t border-[#EAB308]/20 mt-4 space-y-2">
                              {topic.questions.map((question, qIndex) => (
                                <p key={qIndex} className="text-sm text-gray-700 hover:text-[#EAB308] transition-colors duration-200 cursor-pointer">
                                  • {question}
                                </p>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Stats Section - Your Spiritual Journey */}
        <section className="px-4 sm:px-6 mb-12 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2 }}
            >
              <Card className="bg-white/70 backdrop-blur-xl border-[#EAB308]/30 border-2 hover:border-[#CA8A04]/50 transition-all duration-500 p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(234,179,8,0.2)] hover:shadow-[0_12px_40px_rgba(234,179,8,0.3)] rounded-3xl overflow-hidden relative">
                {/* Buddha Temple Background Image */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={buddhaTempleImage} 
                    alt="Buddha Temple"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/30 z-10" />
                
                {/* Light gradient overlay for glassmorphism effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-80 z-20 bg-[rgba(255,255,255,0.53)]" />
                
                <div className="relative z-30">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <h3 className="text-2xl sm:text-3xl text-gray-900 flex items-center" style={{ fontFamily: "Playfair Display, serif" }}>
                      <Star className="w-7 h-7 mr-4 text-[#EAB308]" />
                      Your Spiritual Journey
                    </h3>
                    <Badge variant="outline" className="border-[#EAB308]/40 border-2 text-[#CA8A04] bg-white/50 backdrop-blur-sm px-4 py-2 shadow-sm">
                      Level {Math.floor(unlockedBadges.length / 3) + 1}
                    </Badge>
                  </div>
                  
                  {/* Enhanced Stats Grid - Mobile optimized */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-8">
                    {[
                      { icon: MessageSquare, value: "47", label: "Conversations", color: "[#EAB308]" },
                      { icon: Star, value: unlockedBadges.length, label: "Badges", color: "[#FBBF24]" },
                      { icon: Flower2, value: totalWisdomPoints, label: "Wisdom Points", color: "[#CA8A04]" },
                      { icon: Heart, value: "7", label: "Day Streak", color: "[#FBBF24]" }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 2.2 + index * 0.1 }}
                        className="text-center p-4 sm:p-5 lg:p-6 bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-white/40 hover:border-white/60 transition-all duration-300 group shadow-sm hover:shadow-md touch-manipulation"
                      >
                        <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${stat.color} mx-auto mb-2 sm:mb-3 group-hover:scale-105 transition-transform duration-300`} />
                        <div className="text-xl sm:text-2xl text-gray-900 font-medium mb-1">{stat.value}</div>
                        <div className="text-[13px] sm:text-sm text-gray-600">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Latest Achievement - Contemporary design */}
                  {unlockedBadges.length > 0 && unlockedBadges[unlockedBadges.length - 1] ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 2.6 }}
                      className="bg-white/40 border-2 border-white/50 rounded-2xl p-5 sm:p-6 mb-8 backdrop-blur-md shadow-sm"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-r from-[#EAB308] to-[#FDE68A] rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-md">
                          {unlockedBadges[unlockedBadges.length - 1].icon && typeof unlockedBadges[unlockedBadges.length - 1].icon === 'function' ? 
                            React.createElement(unlockedBadges[unlockedBadges.length - 1].icon, { className: "w-5 h-5 text-white" }) :
                            <Star className="w-5 h-5 text-white" />
                          }
                        </div>
                        <span className="text-[#EAB308] font-medium text-[15px] sm:text-[16px]">Latest Achievement</span>
                      </div>
                      <div className="text-xl text-gray-900 font-medium mb-2">{unlockedBadges[unlockedBadges.length - 1].name}</div>
                      <div className="text-gray-700 leading-relaxed">{unlockedBadges[unlockedBadges.length - 1].description}</div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 2.6 }}
                      className="bg-white/50 border-2 border-white/40 rounded-xl p-6 mb-8 backdrop-blur-sm"
                    >
                      <div className="text-gray-700 text-center leading-relaxed">
                        Begin your spiritual journey by exploring different faith traditions
                      </div>
                    </motion.div>
                  )}

                  {/* Action Buttons - Mobile optimized */}
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2.8 }}
                  >
                    <button 
                      className="group/profile relative flex-1 min-h-[48px] sm:h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#EAB308] via-[#FBBF24] to-[#FDE047] hover:from-[#CA8A04] hover:via-[#EAB308] hover:to-[#FBBF24] border-2 border-[#EAB308]/30 hover:border-[#EAB308]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_20px_rgba(234,179,8,0.25)] hover:shadow-[0_8px_35px_rgba(202,138,4,0.4)] touch-manipulation"
                      onClick={() => onNavigate?.("profile")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#CA8A04]/10 via-transparent to-white/30" />
                      <div className="absolute top-0 left-0 right-0 h-[20px] bg-gradient-to-b from-white/60 to-transparent rounded-t-2xl" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/40 rounded-2xl" />
                      <span className="relative font-semibold text-[14px] sm:text-[15px] text-white tracking-wide" style={{ fontFamily: "Raleway, sans-serif" }}>View Profile</span>
                    </button>
                    <button 
                      className="group/explore relative flex-1 min-h-[48px] sm:h-12 flex items-center justify-center gap-2 rounded-2xl bg-white/70 hover:bg-white/80 border-2 border-[#EAB308]/30 hover:border-[#EAB308]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(234,179,8,0.15)] hover:shadow-[0_6px_25px_rgba(234,179,8,0.25)] touch-manipulation backdrop-blur-sm"
                      onClick={() => onNavigate?.("circle")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#FBBF24]/15 to-transparent opacity-0 group-hover/explore:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-0 left-0 right-0 h-[35%] bg-gradient-to-b from-white/50 to-transparent rounded-t-2xl" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/60 rounded-2xl" />
                      <span className="relative font-semibold text-[14px] sm:text-[15px] text-[#CA8A04] tracking-wide" style={{ fontFamily: "Raleway, sans-serif" }}>Explore Faiths</span>
                    </button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Buddhist Faith Groups Section */}
        <BuddhistFaithGroups onNavigate={onNavigate} />
      </div>

      {/* Enhanced Footer */}
      <AppFooter onOpenMission={onOpenMission} />

      {/* AI Guide Overlay Dialog */}
      <Dialog open={isOverlayOpen} onOpenChange={handleCloseOverlay}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] sm:h-[95vh] p-0 bg-[#0B1426] border-[#EAB308]/30 overflow-hidden [&>button]:hidden">
          {/* Accessible title and description - visually hidden */}
          <DialogTitle className="sr-only">
            AI Guide Conversation with {overlayAgentName}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Interactive chat interface for conversing with {overlayAgentName}. This window contains an embedded chat application. Press Escape or click the close button to exit.
          </DialogDescription>

          {/* Header with close button */}
          <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-[#0B1426] via-[#0B1426]/95 to-transparent backdrop-blur-sm">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 rounded-full bg-[#EAB308] animate-pulse shadow-lg shadow-[#EAB308]/50" />
              <span className="text-white text-sm sm:text-base">Conversing with {overlayAgentName}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCloseOverlay}
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#162844]/80 hover:bg-[#162844] border border-[#EAB308]/30 hover:border-[#EAB308] transition-all duration-300 hover:scale-110"
              aria-label="Close conversation"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#EAB308]" />
            </Button>
          </div>
          
          {/* Loading indicator */}
          {isIframeLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0B1426] z-40">
              <div className="text-center space-y-4">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-[#EAB308]/20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-[#EAB308] border-t-transparent animate-spin"></div>
                </div>
                <p className="text-slate-300 text-sm">Connecting to {overlayAgentName}...</p>
              </div>
            </div>
          )}
          
          {/* iframe container */}
          <div className="w-full h-full pt-12 sm:pt-16">
            {overlayUrl && (
              <iframe
                src={overlayUrl}
                className="w-full h-full border-0"
                title={`Chat with ${overlayAgentName}`}
                allow="microphone *; camera *; autoplay; encrypted-media; fullscreen"
                onLoad={() => setIsIframeLoading(false)}
                loading="eager"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}