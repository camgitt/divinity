import React, { useState, useEffect } from "react";
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
import { JewishFaithGroups } from "./jewish-faith-groups";
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
  X
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import heroImage from 'figma:asset/2b487e890d405e7d0bb5a8acedc5c667c36961c5.png';
import cosmicSpiritualImage from 'figma:asset/a131b5c5a7b658d8d80b1a1ef545f5a67a41aa30.png';
import jewishStarImage from 'figma:asset/532b77a8055b3f3bfa779f53d47983f1f35c038f.png';
import rabbiEliyahuImage from 'figma:asset/9efc95896fb65fe0d296701fe5d3fa3d55a8bea4.png';
import rabbiMiriamImage from 'figma:asset/ef268f75ad551966f3af62b7c76d2d740e372be7.png';
import rabbiDavidImage from 'figma:asset/f93c5bdf7e377023235b9f1080d9aaab787b87b8.png';
import rabbiShmuelsImage from 'figma:asset/a50236061f10574200ed82dde7a07349af1ed586.png';
import leahBrennerImage from 'figma:asset/398a5651f3b60a714d9ea0972a0fa3371dfaf501.png';
import rabbiEzraKleinImage from 'figma:asset/cdbfe89b0feb8e50ca975218cd5fb76036fa8d2f.png';
import rabbiChavahGoldsteinImage from 'figma:asset/533c13bdb52355ef5d7fbd9300a00f9b77ee60d6.png';
import rebbetzinEstherLevyImage from 'figma:asset/ea62589213fb0c87c9f6296d30eb2a41da4f750d.png';
import rabbiMichaelSteinImage from 'figma:asset/e0db2ccd3c914ca52867924669e5dfaf38d7753c.png';
import ruthGoldbergLeeImage from 'figma:asset/f49bbf38a94e27e1c6ca1cb62436dcdeeaf05693.png';
import taliaImage from 'figma:asset/e97cc32dd4134875c6d7af61e7409275c1e4832f.png';
import synagogueInteriorImage from 'figma:asset/f55d743a4f2c99717bedd0636e977a05793c23f4.png';

// Judaism-specific configuration with enhanced styling
const judaismConfig = {
  name: "Judaism",
  subtitle: "Scroll through traditions of the Jewish faith.",
  symbol: "✡️",
  description: "Explore Jewish wisdom through AI guides inspired by historical and contemporary Jewish leaders, rabbis, and spiritual advisors.",
  heroImage: heroImage,
  primaryColor: "#6394C7", // Muted blue for wisdom & depth
  lightColor: "rgba(99, 148, 199, 0.2)",
  hoverColor: "#5282B5",
  suggestedTopics: [
    "Torah Study", "Talmudic Discussion", "Jewish History", "Ethics & Mitzvot", 
    "Prayer & Liturgy", "Life Cycle Events", "Jewish Philosophy", "Kabbalah"
  ],
  topicsWithQuestions: [
    {
      topic: "Torah Study",
      icon: Book,
      questions: [
        "What is the weekly Torah portion about?",
        "How do I start studying Torah as a beginner?",
        "What are the different commentaries on Torah?",
        "How is Torah studied in different Jewish traditions?"
      ]
    },
    {
      topic: "Talmudic Discussion",
      icon: Users,
      questions: [
        "What is the Talmud and how is it structured?",
        "How do I approach a page of Talmud?",
        "What are the main disagreements in Talmudic law?",
        "Can you explain a famous Talmudic story?"
      ]
    },
    {
      topic: "Jewish History",
      icon: Book,
      questions: [
        "What are the major periods in Jewish history?",
        "How did Judaism survive persecution?",
        "What is the significance of the Temple?",
        "How did different Jewish movements emerge?"
      ]
    },
    {
      topic: "Ethics & Mitzvot",
      icon: Heart,
      questions: [
        "What are the 613 commandments?",
        "How do I practice ethical living daily?",
        "What does Jewish law say about modern issues?",
        "How do mitzvot create spiritual connection?"
      ]
    },
    {
      topic: "Prayer & Liturgy",
      icon: Sparkles,
      questions: [
        "What is the structure of daily prayers?",
        "How do I develop a meaningful prayer practice?",
        "What are the different prayer traditions?",
        "Can you explain the Shema and its significance?"
      ]
    },
    {
      topic: "Life Cycle Events",
      icon: Star,
      questions: [
        "What happens during a Bar/Bat Mitzvah?",
        "How are Jewish weddings conducted?",
        "What are the mourning practices in Judaism?",
        "How do we celebrate Jewish holidays?"
      ]
    },
    {
      topic: "Jewish Philosophy",
      icon: Book,
      questions: [
        "What is the Jewish concept of God?",
        "How does Judaism view the purpose of life?",
        "What did Maimonides teach?",
        "How do we reconcile faith and reason?"
      ]
    },
    {
      topic: "Kabbalah",
      icon: Sparkles,
      questions: [
        "What is Kabbalah and who can study it?",
        "What are the Sefirot?",
        "How does mysticism fit into Judaism?",
        "What is the Tree of Life?"
      ]
    }
  ],
  agents: [
    {
      id: "rabbi-eliyahu-stein",
      name: "Rabbi Eliyahu Stein",
      role: "Counsellor",
      image: rabbiEliyahuImage,
      description: "Orthodox Judaism adheres strictly to traditional Jewish law (halakha) as interpreted by rabbinic authorities. Believes the Torah is divine and unchanging, requiring complete observance of commandments.",
      denomination: "Orthodox",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/judaism-1",
      aiProfile: "Spiritual Counselor and Halakhic Guide who balances compassion with firm adherence to halakha. Offers practical, halakhically sound advice while modeling humility, discipline, and faithfulness.",
      trainingData: "Torah (Written Law), Talmud (Oral Law), Mishneh Torah (Maimonides' code), Shulchan Aruch (with classical commentaries such as Rashi and Tosafot)",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Guides are excellent for engagement on a variety of related study topics.",
      whatToExpected: "Guides utilize natural language processing to comprehend your text or voice input, and then provide relevant responses."
    },
    {
      id: "rabbi-miriam-levin",
      name: "Rabbi Miriam Levin",
      role: "Counsellor",
      image: rabbiMiriamImage,
      description: "Conservative Judaism seeks to conserve traditional Judaism while allowing for modernization. Balances tradition with modern scholarship, allowing gradual changes in practice when harmonious with Jewish tradition.",
      denomination: "Conservative",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/judaism-2",
      aiProfile: "Trusted counsellor offering guidance rooted in Torah, Talmud, and Conservative halakhic interpretation.",
      trainingData: "Torah, Talmud, Conservative movement Law Committee rulings, Solomon Schechter's scholarly works, Etz Hayim Torah commentary",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Guides are excellent for engagement on a variety of related study topics.",
      whatToExpected: "Guides utilize natural language processing to comprehend your text or voice input, and then provide relevant responses."
    },
    {
      id: "rabbi-david-levin",
      name: "Rabbi David Levin",
      role: "Counsellor",
      image: rabbiDavidImage,
      description: "Reform Judaism emphasizes ethical monotheism and prophetic ideals over ritual observance. Focuses on social justice and universal ethics.",
      denomination: "Reform",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/judaism-3",
      aiProfile: "Trusted counsellor and educator within the movement, guiding individuals on integrating Jewish identity with modern life while upholding ethical and spiritual values.",
      trainingData: "Torah (Written Law), Talmud (Oral Law), Mishneh Torah (Maimonides' code), Shulchan Aruch (with classical commentaries)",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Guides are excellent for engagement on a variety of related study topics.",
      whatToExpected: "Guides utilize natural language processing to comprehend your text or voice input, and then provide relevant responses."
    },
    {
      id: "rabbi-shmuel-ben-eliezer",
      name: "Rabbi Shmuel Ben Eliezer",
      role: "Counsellor",
      image: rabbiShmuelsImage,
      description: "Hasidic Judaism emphasizes mystical devotion, joyous worship, and personal connection to God. Focuses on inner spiritual experience over legalistic observance.",
      denomination: "Hasidic",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/judaism-4",
      aiProfile: "Hasidic counsellor and guide within the community; encourages connection to God through joy, music, and sincerity rather than rigid formality.",
      trainingData: "Torah, Talmud, Kabbalistic texts (e.g., Zohar), Hasidic tales and teachings",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Guides are excellent for engagement on a variety of related study topics.",
      whatToExpected: "Guides utilize natural language processing to comprehend your text or voice input, and then provide relevant responses."
    },
    {
      id: "leah-brenner-reconstructionist",
      name: "Leah Brenner",
      role: "Counsellor",
      image: leahBrennerImage,
      description: "Reconstructionist Judaism views Judaism as an evolving religious civilization rather than a revealed religion. Views religious practices as folkways that can be adapted or rejected.",
      denomination: "Reconstructionist",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/judaism-5",
      aiProfile: "Trusted community counselor, guiding individuals through questions of Jewish identity, practice, and meaning. Specializes in helping seekers redefine their Jewish practice, navigate questions of cultural vs. religious identity, and participate in a democratic, evolving faith community.",
      trainingData: "Torah, Talmud, Mordecai Kaplan's writings, Reconstructionist prayer books",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Guides are excellent for engagement on a variety of related study topics.",
      whatToExpected: "Guides utilize natural language processing to comprehend your text or voice input, and then provide relevant responses."
    },
    {
      id: "rabbi-ezra-klein",
      name: "Rabbi Ezra Klein",
      role: "Spiritual Guide",
      image: rabbiEzraKleinImage,
      description: "Reconstructionist trans/non-binary rabbi offering radical LGBTQ+ inclusion, queer theology, and progressive Jewish wisdom for all seekers. Specializing in LGBTQ+ inclusion, trans/non-binary leadership, queer theology, and modern ethics.",
      denomination: "Reconstructionist Judaism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/judaism-7",
      aiProfile: "Inclusive and progressive young rabbi offering spiritual guidance through Reconstructionist Judaism and queer theology. Brings together LGBTQ+ inclusion, trans/non-binary identity, modern ethics, and radical welcome with compassionate justice-oriented support for seekers at all levels.",
      trainingData: "Torah, Talmud, Reconstructionist Judaism resources, Queer theology literature, LGBTQ+ Jewish resources, Modern ethics materials, Progressive Judaism writings, Trans/non-binary inclusive texts, Jewish Renewal resources.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore LGBTQ+ inclusion, trans/non-binary identity, queer theology, Reconstructionist Judaism, modern ethics, life purpose, community connection, social justice, spiritual growth, progressive Judaism, Jewish Renewal, and radical welcome through inclusive authentic compassionate guidance.",
      whatToExpected: "Inclusive, progressive, and compassionate guidance rooted in Reconstructionist Judaism. Expect welcoming and authentic support through queer theology, LGBTQ+ inclusion, modern ethics, trans/non-binary leadership, and justice-oriented spiritual care with the warmth and radical welcome of progressive Jewish tradition."
    },
    {
      id: "rabbi-chavah-goldstein",
      name: "Rabbi Chavah Goldstein",
      role: "Spiritual Guide",
      image: rabbiChavahGoldsteinImage,
      description: "Jewish Renewal rabbi offering feminist Judaism, eco-spirituality, mystical practice, and progressive inclusive community building. Specializing in ecological stewardship, Jewish Renewal, feminist Judaism, eco-spirituality, and mystical practice.",
      denomination: "Jewish Renewal",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/judaism-8",
      aiProfile: "Progressive and mystical young rabbi offering spiritual guidance through Jewish Renewal and feminist Judaism. Brings together eco-spirituality, ecological stewardship, mystical practice, and gender equity with innovative inclusive spiritual care for seekers at intermediate and advanced levels.",
      trainingData: "Torah, Talmud, Jewish Renewal resources, Feminist Judaism literature, Eco-spirituality materials, Jewish mysticism and Kabbalah texts, Progressive Judaism writings, Gender equity resources, Ecological stewardship guides.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Jewish Renewal, feminist Judaism, eco-spirituality, ecological stewardship, mystical practice, gender equity, spiritual growth, social justice, community connection, wisdom and guidance, progressive Judaism, Kabbalah, and innovative inclusive practices through progressive mystical ecological guidance.",
      whatToExpected: "Progressive, mystical, and ecological guidance rooted in Jewish Renewal. Expect innovative and inclusive support through feminist Judaism, eco-spirituality, mystical practice, gender equity, and ecological stewardship with the spiritual depth and progressive wisdom of Jewish Renewal tradition."
    },
    {
      id: "rebbetzin-esther-levy",
      name: "Rebbetzin Esther Levy",
      role: "Mentor",
      image: rebbetzinEstherLevyImage,
      description: "Orthodox rebbetzin offering mentorship in family life, Jewish home building, women's Torah learning, and community leadership. Specializing in Orthodox Judaism, women's learning, family support, Jewish home, and community leadership.",
      denomination: "Orthodox Judaism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/judaism-6",
      aiProfile: "Warm and traditional young mentor offering guidance through Orthodox Judaism and the rebbetzin role. Brings together women's learning, family life, Jewish home building, and community leadership with maternal supportive nurturing care for seekers at all levels.",
      trainingData: "Torah, Talmud, Orthodox Judaism resources, Women's Torah learning materials, Jewish home and family life guides, Community leadership resources, Traditional women's wisdom teachings, Rebbetzin role literature, Family support materials.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Orthodox Judaism, women's learning, family life, Jewish home building, community leadership, rebbetzin role, traditional women's wisdom, community connection, family support, wisdom and guidance, spiritual growth, inner peace, and nurturing guidance through warm traditional maternal support.",
      whatToExpected: "Warm, traditional, and wise guidance rooted in Orthodox Judaism. Expect maternal and community-oriented support through women's learning, family life, Jewish home building, community leadership, and traditional women's wisdom with the nurturing warmth and supportive care of the rebbetzin role."
    },
    {
      id: "rabbi-michael-stein",
      name: "Rabbi Michael Stein",
      role: "Scholar",
      image: rabbiMichaelSteinImage,
      description: "Autistic rabbi creating inclusive Torah spaces, sensory-friendly worship, neurodiversity celebration, and disability justice in Jewish practice. Specializing in neurodiversity, autistic Judaism, inclusive Torah spaces, sensory-friendly worship, and disability justice.",
      denomination: "Judaism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/judaism-11",
      aiProfile: "Scholarly and neurodivergent mature rabbi offering guidance through Judaism and autistic leadership. Brings together neurodiversity, inclusive Torah spaces, sensory-friendly worship, disability justice, and accommodating practice with compassionate innovative inclusive care for seekers at all levels.",
      trainingData: "Torah, Talmud, Judaism resources, Neurodiversity materials, Autistic leadership literature, Inclusive Torah space guides, Sensory-friendly worship resources, Disability justice writings, Accommodation practice materials, Torah study resources.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore neurodiversity, autistic Judaism, inclusive Torah spaces, sensory-friendly worship, disability justice, accommodation, Torah study, wisdom and guidance, community connection, spiritual growth, and innovative inclusive practices through scholarly neurodivergent compassionate guidance.",
      whatToExpected: "Scholarly, neurodivergent, and inclusive guidance rooted in Judaism. Expect accommodating and wise support through neurodiversity celebration, autistic leadership, inclusive Torah spaces, sensory-friendly worship, and disability justice with the compassionate innovation and inclusive care of neurodivergent Jewish practice."
    },
    {
      id: "ruth-goldberg-lee",
      name: "Ruth Goldberg-Lee",
      role: "Mentor",
      image: ruthGoldbergLeeImage,
      description: "Jewish convert offering interfaith parenting guidance, conversion journey support, interfaith marriage counseling, and children's Jewish education. Specializing in interfaith parenting, Jewish convert experience, conversion journey, interfaith marriage, and children's Jewish education.",
      denomination: "Judaism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/judaism-9",
      aiProfile: "Welcoming and wise mature mentor offering guidance through Judaism and Jewish convert experience. Brings together interfaith parenting, conversion journey, interfaith marriage, children's Jewish education, and identity integration with supportive practical inclusive care for seekers at all levels.",
      trainingData: "Torah, Talmud, Judaism resources, Jewish convert literature, Interfaith parenting guides, Conversion journey materials, Interfaith marriage resources, Children's Jewish education materials, Identity integration writings, Jews-by-choice community resources.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore interfaith parenting, Jewish convert experience, conversion journey, interfaith marriage, children's Jewish education, identity integration, community connection, family life, wisdom and guidance, life purpose, and Jews-by-choice community through welcoming wise bridge-building guidance.",
      whatToExpected: "Welcoming, wise, and bridge-building guidance rooted in Judaism. Expect maternal and supportive support through interfaith parenting, conversion journey, interfaith marriage, children's Jewish education, and identity integration with the practical inclusive care and wisdom of the Jewish convert experience."
    },
    {
      id: "talia",
      name: "Talia",
      role: "Cultural Translator / Hype Woman",
      image: taliaImage,
      description: "A 22-year-old Jewish grad student in Media Studies who serves as a cultural translator and protector for Jewish Gen Z. Not a rabbi or therapist, but a witty big sister who validates internal Jewish struggles with warmth and sets fierce boundaries against appropriation and antisemitism.",
      denomination: "Judaism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/judaism-10",
      aiProfile: "Gen Z cultural commentator and fierce protector offering guidance through Jewish identity navigation, pop culture, and boundary setting. Brings together Big Tent Judaism, cultural boundaries, antisemitism response, and Tikkun Olam with witty warm fierce validating support for seekers at beginner and intermediate levels.",
      trainingData: "Torah, Talmud, Jewish cultural history, Pop culture and media studies, Big Tent Judaism resources, Reform/Conservative/Orthodox perspectives, Antisemitism recognition materials, Cultural appropriation literature, Tikkun Olam teachings, Modern Jewish identity resources, Internet culture and Gen Z communication.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Jewish identity, cultural boundaries, pop culture Judaism, interfaith dynamics, antisemitism response, Tikkun Olam, internal Jewish struggles, appropriation vs appreciation, closed practices, Big Tent Judaism, patrilineal descent, secular vs religious tensions, and Gen Z Jewish life through witty warm protective guidance.",
      whatToExpected: "Witty, warm, and fiercely protective guidance rooted in Gen Z Jewish experience. Expect culturally fluent and internet-savvy support through three voice modes (Hype Woman, Grad Student, Iron Dome) that validate internal Jewish struggles while setting firm boundaries against appropriation and antisemitism with the warmth and fierce protection of a big sister."
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
        <Card className="bg-white/60 backdrop-blur-xl border-[#6394C7]/30 border-2 hover:border-[#5282B5]/60 transition-all duration-500 group overflow-hidden shadow-[0_8px_30px_rgba(99,148,199,0.12)] hover:shadow-[0_20px_50px_rgba(82,130,181,0.25)] rounded-3xl max-w-sm mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-[#E8F1F9]/10 via-transparent to-[#6394C7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative p-6 sm:p-8">
            {/* Large Portrait Image */}
            <div className="relative mb-5">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden ring-2 ring-[#6394C7]/20 group-hover:ring-[#5282B5]/40 shadow-[0_10px_40px_rgba(99,148,199,0.15)] group-hover:shadow-[0_20px_60px_rgba(82,130,181,0.3)] transition-all duration-500">
                <ImageWithFallback
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Faith symbol - Star of David */}
              <div className="absolute -top-3 -right-3 w-11 h-11 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(99,148,199,0.3)] backdrop-blur-md border border-white/40 overflow-hidden"
                style={{ backgroundColor: `#6394C725` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
                <img 
                  src={jewishStarImage} 
                  alt="Star of David"
                  className="relative w-6 h-6 object-contain filter brightness-110 saturate-90"
                />
              </div>
            </div>

            {/* Agent Info */}
            <div className="space-y-3 mb-5">
              <h3 className="text-2xl text-gray-900 group-hover:text-[#6394C7] transition-colors duration-300 text-center" style={{ fontFamily: "Playfair Display, serif" }}>
                {agent.name}
              </h3>
              
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-[#6394C7]/15 hover:bg-[#6394C7]/25 text-[#6394C7] border border-[#6394C7]/30 transition-colors duration-300 shadow-sm">
                  {agent.role}
                </Badge>
                <Badge variant="outline" className="bg-white/50 border-white/60 text-gray-700 shadow-sm text-xs">
                  {agent.denomination}
                </Badge>
                {agent.isPremium && (
                  <Badge className="bg-gradient-to-r from-[#FFD369] to-[#FFA726] text-gray-900 border-0 shadow-md">
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
                className="group/chat relative w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#6394C7] to-[#5282B5] hover:from-[#5282B5] hover:to-[#6394C7] transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_20px_rgba(99,148,199,0.25)] hover:shadow-[0_8px_35px_rgba(82,130,181,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5282B5]/20 via-transparent to-white/20" />
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
                className="group/save relative w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-white/90 hover:bg-white border-2 border-[#6394C7]/30 hover:border-[#5282B5]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(99,148,199,0.15)] hover:shadow-[0_6px_25px_rgba(82,130,181,0.25)] backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#E3F2FD]/15 to-transparent opacity-0 group-hover/save:opacity-100 transition-opacity duration-300" />
                <Heart className="relative w-5 h-5 text-[#6394C7] group-hover/save:text-[#5282B5] transition-colors duration-300" />
                <span className="relative text-[#5282B5] group-hover/save:text-[#6394C7] font-medium transition-colors duration-300" style={{ fontFamily: "Raleway, sans-serif" }}>Save Guide</span>
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

interface JudaismFaithPageProps {
  onBack: () => void;
  onOpenMission: () => void;
  onStartChat: (agent: any) => void;
  onNavigate?: (tab: string) => void;
}

export function JudaismFaithPage({ onBack, onOpenMission, onStartChat, onNavigate }: JudaismFaithPageProps) {
  const [selectedAgentIndex, setSelectedAgentIndex] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayUrl, setOverlayUrl] = useState('');
  const [overlayAgentName, setOverlayAgentName] = useState('');
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const { awardBadge, unlockedBadges, totalWisdomPoints } = useBadges();
  const { canAccessPremium } = useSubscription();
  const { saveGuide } = useSavedGuides();
  
  const selectedAgent = judaismConfig.agents[selectedAgentIndex];

  // Prevent layout shift by ensuring page starts at top and stays there
  useEffect(() => {
    // Force scroll to top immediately and lock it briefly
    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };
    
    // Initial scroll
    scrollToTop();
    
    // Prevent any scroll events during initial load
    const preventScroll = (e: Event) => {
      window.scrollTo(0, 0);
    };
    
    // Lock scroll position for the first 500ms
    window.addEventListener('scroll', preventScroll, { passive: false });
    
    const lockTimer = setTimeout(() => {
      window.removeEventListener('scroll', preventScroll);
      setIsPageLoaded(true);
    }, 500);
    
    return () => {
      clearTimeout(lockTimer);
      window.removeEventListener('scroll', preventScroll);
    };
  }, []);

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
      tradition: judaismConfig.name,
      faithColor: judaismConfig.primaryColor,
      avatar: agent.image || judaismConfig.symbol,
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
      id: 'first-jewish-guide-interaction',
      name: 'First Jewish Guide Launched',
      description: 'Launched your first Jewish spiritual guide',
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
          videoSrc="https://divinityagi.com/wp-content/uploads/2025/12/Jewish-loop-1.mp4"
          posterSrc={heroImage}
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
              className="group relative min-h-[48px] sm:h-[42px] flex items-center justify-center gap-2 rounded-2xl bg-white/40 hover:bg-white/60 border-2 border-[#6394C7]/30 hover:border-[#5282B5]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(99,148,199,0.15)] hover:shadow-[0_6px_25px_rgba(82,130,181,0.25)] px-4 sm:px-5 touch-manipulation backdrop-blur-xl"
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#E8F1F9]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 text-[#5282B5] group-hover:text-[#6394C7] transition-colors duration-300" />
                <span className="text-[15px] font-medium text-[#5282B5] group-hover:text-[#6394C7] transition-colors duration-300" style={{ fontFamily: "Raleway, sans-serif" }}>Back</span>
              </div>
            </button>
          </motion.div>

          {/* Hero Image/Video with Faith-specific styling */}
          <div className="relative max-w-4xl mx-auto mb-3">
            <motion.div
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden max-w-4xl mx-auto shadow-[0_8px_32px_rgba(99,148,199,0.12)]"
              style={{
                minHeight: '300px',
                maxHeight: 'min(60vh, 600px)'
              }}
            >
              {/* Subtle gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-30 bg-[rgba(0,0,0,0.15)]" />
            </motion.div>

            {/* Enhanced Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute inset-0 flex items-center justify-center z-40"
            >
              <div className="text-center px-4">
                {/* Star of David - Above Title */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.7, type: "spring", bounce: 0.3 }}
                  className="mb-6 flex justify-center"
                >
                  <div className="relative group">
                    {/* Subtle glowing background effect */}
                    <div className="absolute inset-0 bg-[#6394C7]/15 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-700" />
                    
                    {/* Star container */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#6394C7] to-[#5282B5] rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30">
                      <svg className="w-12 h-12 sm:w-14 sm:h-14 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <text x="12" y="18" fontSize="18" textAnchor="middle" fill="white">✡</text>
                      </svg>
                      
                      {/* Subtle animated ring */}
                      <motion.div
                        className="absolute inset-0 border-2 border-[#6394C7]/20 rounded-full"
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

                <h1 className="font-bold sm:text-[32pt] lg:text-[36pt] mb-4 sm:mb-6 bg-gradient-to-r from-[#6394C7] via-[#5282B5] to-[#6394C7] bg-clip-text text-transparent leading-tight drop-shadow-[0_2px_8px_rgba(99,148,199,0.3)] text-[40px]" style={{ fontFamily: "Playfair Display, serif" }}>
                  {judaismConfig.name}
                </h1>
                <div className="w-20 sm:w-24 h-0.5 bg-gradient-to-r from-[#6394C7] to-[#5282B5] mx-auto rounded-full mb-4 sm:mb-6 shadow-[0_0_10px_rgba(99,148,199,0.4)]" />
                <p className="text-[rgb(255,255,255)] max-w-2xl mx-auto leading-relaxed sm:text-[16px] px-6 sm:px-12 lg:px-[78px] font-medium drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] text-[16px]" style={{ fontFamily: "Raleway, sans-serif" }}>
                  {judaismConfig.subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Spiritual Guides Section */}
        <section className="px-6 mb-20 relative -mt-4">
          <div className="max-w-6xl mx-auto relative mt-[0px] mr-[0px] mb-[80px] ml-[0px]">
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
                agents={judaismConfig.agents}
                faithColor="#6394C7"
                faithColorHover="#5282B5"
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
              <Card className="bg-white/70 backdrop-blur-xl border-[#6394C7] border-2 hover:border-[#5282B5] transition-all duration-500 shadow-[0_10px_40px_rgba(99,148,199,0.15)] hover:shadow-[0_15px_50px_rgba(82,130,181,0.25)] p-8 rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6394C7]/5 to-transparent opacity-80 rounded-3xl" />
                
                <div className="relative text-center mb-8">
                  <h3 className="text-2xl sm:text-3xl mb-4 bg-gradient-to-r from-[#6394C7] via-[#5282B5] to-[#6394C7] bg-clip-text text-transparent" style={{ fontFamily: "Playfair Display, serif" }}>
                    Agent Interaction Guide
                  </h3>
                  <div className="w-20 h-0.5 bg-gradient-to-r from-[#6394C7] to-[#5282B5] mx-auto rounded-full" />
                </div>
                
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {[
                    { 
                      value: "how-it-works", 
                      icon: Sparkles, 
                      title: "HOW IT WORKS", 
                      content: selectedAgent.howItWorks,
                      gradient: "from-[#6394C7] to-[#5282B5]" 
                    },
                    { 
                      value: "what-to-ask", 
                      icon: MessageCircle, 
                      title: "WHAT TO ASK", 
                      content: selectedAgent.whatToAsk,
                      gradient: "from-[#5282B5] to-[#6394C7]" 
                    },
                    { 
                      value: "what-to-expect", 
                      icon: Star, 
                      title: "WHAT TO EXPECT", 
                      content: selectedAgent.whatToExpected,
                      gradient: "from-[#6394C7] to-[#6394C7]" 
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={item.value}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                    >
                      <AccordionItem value={item.value} className="border-[#6394C7]/30 bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm">
                        <AccordionTrigger className="text-gray-900 hover:text-[#6394C7] transition-all duration-300 px-6 py-4 hover:bg-[#6394C7]/5">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${item.gradient} flex items-center justify-center shadow-md`}>
                              <item.icon className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-medium tracking-wide">{item.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-700 px-6 pb-4 leading-relaxed bg-white/40">
                          {item.content}
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
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
              <h2 className="text-3xl sm:text-4xl mb-4 bg-gradient-to-r from-[#6394C7] via-[#5282B5] to-[#6394C7] bg-clip-text text-transparent" style={{ fontFamily: "Playfair Display, serif" }}>
                Explore Topics
              </h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-[#6394C7] via-[#5282B5] to-[#6394C7] mx-auto rounded-full mb-6" />
              <p className="text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: "Raleway, sans-serif" }}>
                Discover Jewish wisdom and traditions through engaging conversations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-[rgba(0,0,0,0)]">
              {judaismConfig.topicsWithQuestions.map((topic, index) => (
                <motion.div
                  key={topic.topic}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                >
                  <Card 
                    className="bg-white/70 backdrop-blur-xl border-[#6394C7] border-2 hover:border-[#5282B5] transition-all duration-500 cursor-pointer group shadow-[0_8px_30px_rgba(99,148,199,0.12)] hover:shadow-[0_15px_40px_rgba(82,130,181,0.25)] h-full p-6 rounded-3xl"
                    onClick={() => setSelectedTopic(selectedTopic === topic.topic ? null : topic.topic)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6394C7]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                    
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6394C7] to-[#5282B5] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <topic.icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <h3 className="text-lg text-gray-900 mb-3 group-hover:text-[#6394C7] transition-colors duration-300" style={{ fontFamily: "Playfair Display, serif" }}>
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
                            <div className="pt-4 border-t border-[#6394C7]/30 mt-4 space-y-2">
                              {topic.questions.map((question, qIndex) => (
                                <p key={qIndex} className="text-sm text-gray-700 hover:text-[#6394C7] transition-colors duration-200 cursor-pointer">
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

        {/* Enhanced Spiritual Journey */}
        <section className="px-6 mb-12 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2 }}
            >
              <Card className="bg-white/70 backdrop-blur-xl border-[#6394C7] border-2 hover:border-[#5282B5] transition-all duration-500 shadow-[0_10px_40px_rgba(99,148,199,0.15)] hover:shadow-[0_15px_50px_rgba(82,130,181,0.25)] p-8 rounded-3xl overflow-hidden relative">
                {/* Synagogue Interior Background Image */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={synagogueInteriorImage} 
                    alt="Synagogue Interior"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/30 z-10" />
                
                {/* Light gradient overlay for glassmorphism effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-80 z-20 bg-[rgba(255,255,255,0.9)]" />
                
                <div className="relative z-30">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl sm:text-3xl text-gray-900 flex items-center" style={{ fontFamily: "Playfair Display, serif" }}>
                      <Star className="w-7 h-7 mr-4 text-[#6394C7]" />
                      Your Spiritual Journey
                    </h3>
                    <Badge variant="outline" className="border-[#6394C7] text-[#6394C7] bg-[#6394C7]/10 backdrop-blur-sm px-4 py-2 shadow-sm">
                      Level {Math.floor(unlockedBadges.length / 3) + 1}
                    </Badge>
                  </div>
                  
                  {/* Enhanced Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                      { icon: MessageSquare, value: "47", label: "Conversations", color: "[#6394C7]" },
                      { icon: Star, value: unlockedBadges.length, label: "Badges", color: "[#5282B5]" },
                      { icon: Flower2, value: totalWisdomPoints, label: "Wisdom Points", color: "[#6394C7]" },
                      { icon: Heart, value: "7", label: "Day Streak", color: "[#5282B5]" }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 2.2 + index * 0.1 }}
                        className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border-2 border-[#6394C7]/40 hover:border-[#6394C7] transition-all duration-300 group shadow-md hover:shadow-lg"
                      >
                        <stat.icon className={`w-6 h-6 text-${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`} />
                        <div className="text-2xl text-gray-900 font-medium mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-700">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Latest Achievement */}
                  {unlockedBadges.length > 0 && unlockedBadges[unlockedBadges.length - 1] ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 2.6 }}
                      className="bg-white/80 backdrop-blur-sm border-2 border-[#6394C7]/50 rounded-2xl p-6 mb-8 shadow-lg"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#6394C7] to-[#5282B5] rounded-full flex items-center justify-center mr-4 shadow-md">
                          {unlockedBadges[unlockedBadges.length - 1].icon && typeof unlockedBadges[unlockedBadges.length - 1].icon === 'function' ? 
                            React.createElement(unlockedBadges[unlockedBadges.length - 1].icon, { className: "w-5 h-5 text-white" }) :
                            <Star className="w-5 h-5 text-white" />
                          }
                        </div>
                        <span className="text-[#6394C7] font-medium">Latest Achievement</span>
                      </div>
                      <div className="text-xl text-gray-900 font-medium mb-2">{unlockedBadges[unlockedBadges.length - 1].name}</div>
                      <div className="text-gray-700 leading-relaxed">{unlockedBadges[unlockedBadges.length - 1].description}</div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 2.6 }}
                      className="bg-white/70 backdrop-blur-sm border-2 border-[#6394C7]/30 rounded-2xl p-6 mb-8 shadow-md"
                    >
                      <div className="text-gray-700 text-center leading-relaxed">
                        Begin your spiritual journey by exploring different faith traditions
                      </div>
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <motion.div 
                    className="flex gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2.8 }}
                  >
                    <Button 
                      variant="outline" 
                      className="flex-1 border-[#6394C7] border-2 bg-white/60 text-[rgb(255,255,255)] hover:bg-[#6394C7] hover:text-white transition-all duration-300 backdrop-blur-sm h-12 rounded-2xl shadow-md hover:shadow-lg"
                      onClick={() => onNavigate?.("profile")}
                      style={{ fontFamily: "Raleway, sans-serif" }}
                    >
                      View Profile
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 border-[#5282B5] border-2 bg-white/60 text-[rgb(255,255,255)] hover:bg-[#5282B5] hover:text-white transition-all duration-300 backdrop-blur-sm h-12 rounded-2xl shadow-md hover:shadow-lg"
                      onClick={() => onNavigate?.("circle")}
                      style={{ fontFamily: "Raleway, sans-serif" }}
                    >
                      Explore Faiths
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Jewish Faith Groups Section */}
        <JewishFaithGroups onNavigate={onNavigate} />
      </div>
      
      {/* Footer */}
      <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />

      {/* AI Guide Overlay Dialog */}
      <Dialog open={isOverlayOpen} onOpenChange={handleCloseOverlay}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] sm:h-[95vh] p-0 bg-[#0B1426] border-[#6394C7]/30 overflow-hidden [&>button]:hidden">
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
              <div className="w-2 h-2 rounded-full bg-[#6394C7] animate-pulse shadow-lg shadow-[#6394C7]/50" />
              <span className="text-white text-sm sm:text-base">Conversing with {overlayAgentName}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCloseOverlay}
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#162844]/80 hover:bg-[#162844] border border-[#6394C7]/30 hover:border-[#6394C7] transition-all duration-300 hover:scale-110"
              aria-label="Close conversation"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#6394C7]" />
            </Button>
          </div>
          
          {/* Loading indicator */}
          {isIframeLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0B1426] z-40">
              <div className="text-center space-y-4">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-[#6394C7]/20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-[#6394C7] border-t-transparent animate-spin"></div>
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