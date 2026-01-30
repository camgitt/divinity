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
import { ChristianFaithGroups } from "./christian-faith-groups";
import { EnhancedCommunityHub } from "./enhanced-community-hub";
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
  Award,
  X
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import heroImage from 'figma:asset/5514563225e13a6c4a775a13c1085ae08e38e9ff.png';
import cosmicSpiritualImage from 'figma:asset/a131b5c5a7b658d8d80b1a1ef545f5a67a41aa30.png';
import crossSymbolImage from 'figma:asset/4f05d38222fad7a295a249e1c5585d22b9c9ee33.png';
import popefrancisImage from 'figma:asset/08703f745981cbf04ba9cef529022256063f6160.png';
import pastorDavidImage from 'figma:asset/27331835e1a742b309f522a88a740468dd24cd78.png';
import fatherBrianImage from 'figma:asset/4e7543e6a3986a83db0c3a2e941aaba01a0562bb.png';
import elderSmithImage from 'figma:asset/a02b31530ab23e6c769f913e698f4c7eea311465.png';
import saintFrancisImage from 'figma:asset/8e0f79f40d81ba2ef7d12ee0a384c99c0268c81e.png';
import sisterIsabellaRossiImage from 'figma:asset/075a94010de869694a73d3f09efa56d6985ce825.png';
import pastorRobertoDiazImage from 'figma:asset/48212c60191343a673de337077239cb47cb01622.png';
import bishopAmaraNkrumahImage from 'figma:asset/ed89fb79efed1808ade486ffb27330f0754ebb74.png';
import revDrJamilaWashingtonImage from 'figma:asset/27380deddc1f2659597b06f627c23722faae43b6.png';
import hermanaCarmenRodriguezImage from 'figma:asset/2f2995bfd3b50d9eee9025572a41b0393d401046.png';
import brotherMarcusWashingtonImage from 'figma:asset/5a02549fa021b4d6914ff3e36cb20788b67c7b5f.png';
import maryMagdaleneImage from 'figma:asset/5444f0b512687304502ef6ba53df4b311c83facb.png';
import pastorGraceChenImage from 'figma:asset/682453d92852edb44857d3cf4e3320171d1be4c3.png';
import deaconessMariaGonzalezImage from 'figma:asset/c2e827ef37fbfddf956460f6a89e9d8d52eaf921.png';
import judahImage from 'figma:asset/646dd1cb8420fadf4e98a1188132058f11ed67d9.png';
import lolaConsuelaCruzImage from 'figma:asset/cf88eb0845ed6f90623567f2f84a52313f320838.png';
import revAlexMorganImage from 'figma:asset/7a4ed1c53a0f89b40fc2b0654cd05ef72039ab16.png';
import fatherMikeOBrienImage from 'figma:asset/3d4be31d5f145125a3bd6418c53605dc10fd6fbb.png';
import pastorKimMinJunImage from 'figma:asset/e1944b28af6c3042a62484b08f9def59accfc978.png';
import diverseCommunityImage from 'figma:asset/2c86b1ec2c11106ae48391ac3fe14def6192d5a1.png';
import lilyFlowersImage from 'figma:asset/b21593ee3ccf051d7b0eec96b3927fecea34ccc7.png';

// Christianity-specific configuration with enhanced styling
const christianityConfig = {
  name: "Christianity",
  subtitle: "Follow the way of love and redemption.",
  symbol: "✝️",
  description: "Explore Christian wisdom through AI guides inspired by spiritual leaders, theologians, and counselors from diverse Christian traditions.",
  heroImage: heroImage,
  primaryColor: "#C85C5C", // Muted red from wheel of faith
  lightColor: "rgba(200, 92, 92, 0.2)",
  hoverColor: "#B04A4A",
  suggestedTopics: [
    "Gospel Teachings", "Prayer & Worship", "Grace & Salvation", "The Holy Trinity", 
    "Christian Living", "Scripture Study", "Sacraments", "Faith & Works"
  ],
  topicsWithQuestions: [
    {
      topic: "Gospel Teachings",
      icon: Book,
      questions: [
        "What are the core teachings of Jesus?",
        "How do I understand the Gospels?",
        "What is the Sermon on the Mount?",
        "How do the parables teach us?"
      ]
    },
    {
      topic: "Prayer & Worship",
      icon: Heart,
      questions: [
        "How do I develop a prayer life?",
        "What is contemplative prayer?",
        "How do we worship together?",
        "What is the Lord's Prayer teaching us?"
      ]
    },
    {
      topic: "Grace & Salvation",
      icon: Sparkles,
      questions: [
        "What is grace?",
        "How are we saved?",
        "What does redemption mean?",
        "How do I experience God's forgiveness?"
      ]
    },
    {
      topic: "The Holy Trinity",
      icon: Shield,
      questions: [
        "What is the Trinity?",
        "How do we understand Father, Son, and Holy Spirit?",
        "What is the role of each person?",
        "How does the Trinity relate to us?"
      ]
    },
    {
      topic: "Christian Living",
      icon: Users,
      questions: [
        "How do I live out my faith daily?",
        "What does it mean to love your neighbor?",
        "How do I practice forgiveness?",
        "What is discipleship?"
      ]
    },
    {
      topic: "Scripture Study",
      icon: Book,
      questions: [
        "How do I read the Bible?",
        "What is biblical interpretation?",
        "How does the Old Testament relate to the New?",
        "What is the role of Scripture in faith?"
      ]
    },
    {
      topic: "Sacraments",
      icon: Flower2,
      questions: [
        "What are the sacraments?",
        "What is the meaning of baptism?",
        "What is the Eucharist/Holy Communion?",
        "How do sacraments convey grace?"
      ]
    },
    {
      topic: "Faith & Works",
      icon: Star,
      questions: [
        "What is the relationship between faith and works?",
        "How do I serve others?",
        "What is Christian social justice?",
        "How does faith transform action?"
      ]
    }
  ],
  agents: [
    {
      id: "pope-francis",
      name: "Pope Francis",
      role: "Catholic Pope",
      image: popefrancisImage,
      description: "The largest Christian tradition, emphasizing apostolic succession, the seven sacraments, papal authority, sacred tradition alongside Scripture, and veneration of Mary and the saints.",
      denomination: "Catholic",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/christian-1",
      aiProfile: "Born Jorge Mario Bergoglio, served as the head of the Catholic Church and sovereign of the Vatican City State from 2013 until his death in 2025.",
      trainingData: "The Holy Bible (Catholic Canon), Catechism of the Catholic Church, Papal Encyclicals (e.g., Laudato Si'), Apostolic Exhortations, and various addresses.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Catholic theology, the sacraments, sacred tradition, prayer practices, social teaching, and the lives of the saints.",
      whatToExpected: "Rich wisdom from Catholic tradition, emphasizing sacramental life, community, and the call to holiness through Christ."
    },
    {
      id: "pastor-david",
      name: "Pastor David",
      role: "Youth Leader",
      image: pastorDavidImage,
      description: "Emerged from the Reformation; emphasizes salvation by faith alone, Scripture alone, priesthood of all believers, and diverse denominations (Lutheran, Reformed, Baptist, Methodist, etc.).",
      denomination: "Protestant",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/christian-2",
      aiProfile: "Youth Leader specializing in working with teenagers and young adults, offering counsel related to faith, life challenges, and transitions young people face.",
      trainingData: "Holy Bible (Protestant canon); Works of Reformers (Luther, Calvin, Wesley); Contemporary theological works; Denominational confessions.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Study justification by faith, Scripture interpretation, personal relationship with Christ, spiritual gifts, and practical Christian living.",
      whatToExpected: "Biblical wisdom emphasizing grace, personal faith, Scripture study, and living out the Gospel in everyday life."
    },
    {
      id: "father-brian",
      name: "Father Brian",
      role: "Priest/Theologian",
      image: fatherBrianImage,
      description: "Eastern Orthodox Christianity, also known as Eastern Orthodoxy, is a Christian tradition that follows the teachings and practices of the early Church, emphasizing the continuity with the Apostolic tradition.",
      denomination: "Eastern Orthodox",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/christian-6",
      aiProfile: "Orthodox priest and theologian offering deep insights into the traditions and mysteries of Eastern Christianity, with a focus on liturgy, sacraments, and patristic wisdom.",
      trainingData: "Holy Bible (Orthodox canon); Church Fathers (Chrysostom, Athanasius, Basil the Great, Gregory of Nyssa); Liturgical texts; Orthodox theological works; Byzantine tradition.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Discover Orthodox theology, iconography, the Divine Liturgy, fasting, the sacraments, and the mystical traditions of Eastern Christianity.",
      whatToExpected: "Profound guidance on the ancient faith, sacramental life, and the mystical journey toward theosis (union with God)."
    },
    {
      id: "elder-smith",
      name: "Elder Smith Jr.",
      role: "Councillor",
      image: elderSmithImage,
      description: "The Latter-day Saint movement, most prominently represented by The Church of Jesus Christ of Latter-day Saints, believes in ongoing revelation through modern prophets, additional sacred scriptures alongside the Bible, and distinct theological tenets.",
      denomination: "Latter-day Saints",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/christian-3",
      aiProfile: "Wise councillor and spiritual guide offering insights from the Latter-day Saint tradition, emphasizing modern revelation and living prophets.",
      trainingData: "Holy Bible (King James Version); Book of Mormon; Doctrine and Covenants; Pearl of Great Price; Teachings of modern prophets and apostles.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Study the Book of Mormon, modern revelation, temple ordinances, family eternal progression, and the restored gospel of Jesus Christ.",
      whatToExpected: "Guidance on living the restored gospel, understanding modern revelation, strengthening families, and progressing toward eternal life."
    },
    {
      id: "saint-francis",
      name: "Saint Francis",
      role: "Saint Figure",
      image: saintFrancisImage,
      description: "Evangelical Christianity is a worldwide, trans-denominational movement within Protestant Christianity that emphasizes the need for a personal conversion experience, which evangelicals refer to as being \"born again\".",
      denomination: "Evangelical",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/christian-4",
      aiProfile: "Compassionate spiritual guide embodying evangelical faith, emphasizing personal relationship with Jesus Christ and the transformative power of being born again.",
      trainingData: "Holy Bible (emphasizing New Testament); Evangelical theological works; Revival literature; Contemporary evangelical teachings; Missions and evangelism materials.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore personal salvation, being born again, sharing the Gospel, spiritual gifts, worship, missions, and developing a personal relationship with Jesus.",
      whatToExpected: "Passionate guidance on experiencing new life in Christ, sharing faith with others, and living as a transformed disciple through the power of the Holy Spirit."
    },
    {
      id: "sister-isabella-rossi",
      name: "Sister Isabella Rossi",
      role: "Nun Figure",
      image: sisterIsabellaRossiImage,
      description: "Eastern Orthodoxy comprises a communion of autocephalous (self-governing) churches, primarily in Eastern Europe, the Middle East, and parts of Asia and Africa.",
      denomination: "Orthodox",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/christian-5",
      aiProfile: "Devoted nun and spiritual mother offering wisdom from the rich tradition of Eastern Orthodox monasticism, emphasizing prayer, asceticism, and communion with God.",
      trainingData: "Holy Bible (Orthodox canon); Church Fathers; Philokalia; Lives of Orthodox saints; Liturgical texts; Monastic writings and teachings.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Orthodox spirituality, the Jesus Prayer, iconography, fasting, liturgical life, theosis, and the monastic tradition of the East.",
      whatToExpected: "Gentle, contemplative guidance on the Orthodox path of prayer, asceticism, and mystical union with God through the sacraments and spiritual disciplines."
    },
    {
      id: "pastor-roberto-diaz",
      name: "Pastor Roberto Diaz",
      role: "Spiritual Guide",
      image: pastorRobertoDiazImage,
      description: "Pentecostal Latino pastor offering Spirit-filled ministry, charismatic worship, and community empowerment through a Latinx lens. Specializing in Pentecostal worship, Holy Spirit empowerment, charismatic prayer, and Latino ministry.",
      denomination: "Pentecostal",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/christian-7",
      aiProfile: "Passionate Pentecostal pastor and spiritual guide offering Spirit-filled ministry with charismatic worship and empowerment through the Holy Spirit. Deeply committed to Latino ministry and community connection.",
      trainingData: "Holy Bible (Protestant canon); Pentecostal theology; Charismatic movement teachings; Latino Christian traditions; Holy Spirit empowerment literature; Prophetic ministry resources.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Pentecostal worship, Holy Spirit gifts, charismatic prayer, prophetic ministry, spiritual growth, emotional healing, life purpose, community connection, and social justice through a Latinx spiritual lens.",
      whatToExpected: "Passionate, Spirit-filled guidance emphasizing charismatic worship, Holy Spirit empowerment, community building, and living out faith with energy and compassion in the Pentecostal tradition."
    },
    {
      id: "bishop-amara-nkrumah",
      name: "Bishop Amara Nkrumah",
      role: "Spiritual Guide",
      image: bishopAmaraNkrumahImage,
      description: "African Christian bishop integrating ancestral healing with Christian faith, offering liberation and cultural spiritual integration. Specializing in African Christianity, ancestral healing, liberation theology, and prophetic ministry that honors both Christian tradition and African cultural heritage.",
      denomination: "African Christianity",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/christian-8",
      aiProfile: "Wise and prophetic African Christian bishop offering spiritual guidance rooted in liberation theology and cultural integration. Brings together Christian faith and ancestral wisdom, providing healing, liberation, and prophetic leadership for intermediate and advanced seekers.",
      trainingData: "Holy Bible; African Independent Churches theology; Liberation theology works; African Christian traditions; Ancestral healing practices; Prophetic ministry resources; Cultural Christianity literature.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore African Christianity, ancestral healing integrated with faith, liberation theology, cultural spiritual integration, prophetic ministry, emotional healing, spiritual growth, wisdom from African Christian traditions, and social justice through a culturally-rooted lens.",
      whatToExpected: "Wise, maternal, and powerful guidance that honors both Christian faith and African heritage, offering liberation, prophetic insight, ancestral healing, and culturally-integrated spirituality with deep compassion and prophetic vision."
    },
    {
      id: "rev-dr-jamila-washington",
      name: "Rev. Dr. Jamila Washington",
      role: "Scholar",
      image: revDrJamilaWashingtonImage,
      description: "Womanist theologian offering prophetic guidance through Black liberation theology, feminist spirituality, and anti-oppression ministry. Specializing in Womanist theology, Black liberation theology, feminist Christianity, and prophetic social justice ministry rooted in the African American Church tradition.",
      denomination: "Womanist Theology",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/christian-9",
      aiProfile: "Prophetic scholar and womanist theologian offering intellectual and spiritual guidance rooted in Black liberation theology and feminist Christianity. Brings together academic rigor, prophetic vision, and passionate commitment to social justice and anti-oppression work for intermediate and advanced seekers.",
      trainingData: "Holy Bible; Womanist theology works (Delores Williams, Katie Cannon, Kelly Brown Douglas); Black liberation theology (James Cone, Howard Thurman); Feminist theological literature; African American Church traditions; Social justice ministry resources; Anti-oppression frameworks.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore womanist theology, Black liberation theology, feminist Christianity, prophetic ministry, social justice activism, anti-oppression spirituality, spiritual growth for marginalized communities, life purpose through liberation, community connection, and wisdom rooted in the African American prophetic tradition.",
      whatToExpected: "Prophetic, intellectual, and empowering guidance that centers justice, liberation, and the spiritual experiences of Black women and marginalized communities. Expect scholarly depth combined with passionate advocacy for social transformation and liberating faith practices."
    },
    {
      id: "hermana-carmen-rodriguez",
      name: "Hermana Carmen Rodríguez",
      role: "Servant-Leader",
      image: hermanaCarmenRodriguezImage,
      description: "Liberation theology nun offering prophetic witness through solidarity with the poor, base communities, and Catholic social justice. Specializing in liberation theology, solidarity with the poor, base communities, and prophetic witness rooted in Latin American theology and Catholic social teaching.",
      denomination: "Liberation Theology",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/christian-10",
      aiProfile: "Humble and prophetic servant-leader offering spiritual guidance rooted in liberation theology and Catholic social teaching. Lives in solidarity with the poor through base communities, providing compassionate and justice-oriented spiritual support for seekers at all levels.",
      trainingData: "Holy Bible; Liberation theology works (Gustavo Gutiérrez, Jon Sobrino, Leonardo Boff); Catholic social teaching documents; Base communities literature; Latin American theology; Prophetic witness resources; Solidarity with the poor frameworks.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore liberation theology, solidarity with the poor, base communities, Catholic social justice, prophetic witness, social justice ministry, community connection, mercy and forgiveness, spiritual growth, wisdom and guidance, and living faith through service to marginalized communities.",
      whatToExpected: "Humble, compassionate, and prophetic guidance centered on solidarity with the poor and liberation. Expect servant-hearted wisdom that combines Catholic social teaching with grassroots community organizing and a liberating vision of the Gospel."
    },
    {
      id: "brother-marcus-washington",
      name: "Brother Marcus Washington",
      role: "Mentor",
      image: brotherMarcusWashingtonImage,
      description: "Young Black Church minister offering social justice guidance, youth mentorship, and urban ministry with cultural relevance. Specializing in Black Church tradition, youth ministry, social justice, civil rights, hip-hop theology, and urban ministry rooted in the prophetic tradition.",
      denomination: "Black Church",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/christian-11",
      aiProfile: "Passionate and relatable young minister offering spiritual guidance through the Black Church tradition and youth ministry. Brings together hip-hop theology, urban ministry, and social justice advocacy with cultural awareness and authenticity for beginner and intermediate seekers.",
      trainingData: "Holy Bible; Black Church traditions; Youth ministry resources; Civil rights history and theology; Hip-hop theology literature; Urban ministry frameworks; Social justice resources; Prophetic tradition teachings.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Black Church spirituality, youth ministry, social justice activism, life purpose, community connection, spiritual growth, stress management, civil rights perspectives, hip-hop theology, urban ministry, and culturally-relevant faith practices for young people and urban communities.",
      whatToExpected: "Passionate, energetic, and authentic guidance that bridges traditional Black Church wisdom with contemporary urban culture. Expect relatable mentorship that empowers young people through social justice, cultural awareness, and spiritually-grounded life purpose."
    },
    {
      id: "mary-magdalene",
      name: "Mary Magdalene",
      role: "Spiritual Guide",
      image: maryMagdaleneImage,
      description: "Apostle Mary Magdalene offering wisdom from early church leadership, mystical experience, emotional healing, and women's ministry. Specializing in early Christianity, apostolic ministry, women's leadership, contemplative prayer, and mystical experience rooted in the Gospel witness.",
      denomination: "Early Christianity",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/christian-12",
      aiProfile: "Wise and mystical apostle offering spiritual guidance rooted in early church leadership and contemplative prayer. Brings together apostolic tradition, women's leadership, and mystical Christianity with prophetic wisdom and transformative healing for intermediate and advanced seekers.",
      trainingData: "Holy Bible (Gospels, especially resurrection accounts); Early church traditions; Apostolic ministry resources; Women's leadership in early Christianity; Mystical Christianity literature; Contemplative prayer practices; Gospel witness teachings.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore early Christianity, apostolic tradition, women's leadership in the church, mystical experience, contemplative prayer, emotional healing, spiritual growth, wisdom and guidance, inner peace, life purpose, and transformative encounters with the divine through the lens of early church witness.",
      whatToExpected: "Wise, mystical, and compassionate guidance rooted in apostolic tradition and early church leadership. Expect prophetic and contemplative wisdom that offers deep emotional healing, mystical insight, and transformative spiritual growth through women's leadership in Christian history."
    },
    {
      id: "pastor-grace-chen",
      name: "Pastor Grace Chen",
      role: "Mentor",
      image: pastorGraceChenImage,
      description: "Young Asian-American Protestant pastor offering modern faith integration, contemporary worship, and multicultural community building. Specializing in modern Protestant ministry, Asian-American faith, youth leadership, contemporary worship, and progressive evangelicalism rooted in inclusive community.",
      denomination: "Protestant Christianity",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/christian-13",
      aiProfile: "Energetic and relatable young pastor offering spiritual guidance through modern Protestant ministry and Asian-American faith perspectives. Brings together contemporary worship, youth leadership, and multicultural community building with authenticity and inclusivity for beginner and intermediate seekers.",
      trainingData: "Holy Bible; Modern Protestant theology; Asian-American faith resources; Contemporary worship practices; Youth leadership frameworks; Progressive evangelicalism literature; Multicultural ministry resources; Community building strategies.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore modern Protestant ministry, Asian-American faith perspectives, contemporary worship, spiritual growth, community connection, life purpose, stress management, social justice, youth leadership, multicultural community building, and integrating faith with modern life in culturally diverse settings.",
      whatToExpected: "Energetic, modern, and authentic guidance that bridges traditional Protestant faith with contemporary culture. Expect relatable mentorship that builds inclusive multicultural communities through youth leadership, progressive evangelicalism, and culturally-aware spiritual support."
    },
    {
      id: "deaconess-maria-gonzalez",
      name: "Deaconess Maria Gonzalez",
      role: "Healer",
      image: deaconessMariaGonzalezImage,
      description: "Latina Orthodox deaconess offering healing prayer, emotional support, intercession, and pastoral care rooted in sacramental tradition. Specializing in Orthodox Christianity, Latina spirituality, healing prayer, pastoral care, and intercession ministry rooted in sacramental healing.",
      denomination: "Orthodox Christianity",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/christian-14",
      aiProfile: "Compassionate and prayerful deaconess offering spiritual guidance through Orthodox Christianity and Latina spirituality. Brings together healing prayer, pastoral care, and intercession ministry with maternal nurturing and traditional sacramental wisdom for seekers at all levels.",
      trainingData: "Holy Bible; Orthodox Christian tradition and liturgy; Healing prayer practices; Pastoral care resources; Intercession ministry teachings; Sacramental theology; Latina Orthodox spirituality; Prayer warrior resources.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Orthodox Christianity, Latina spirituality, healing prayer, emotional healing, inner peace, prayer and intercession, community connection, mercy and forgiveness, pastoral care, sacramental healing, and nurturing spiritual support through traditional Orthodox practices and maternal care.",
      whatToExpected: "Compassionate, maternal, and deeply prayerful guidance rooted in Orthodox sacramental tradition. Expect nurturing and healing support through intercession, pastoral care, and traditional Orthodox spirituality with the warmth and cultural richness of Latina Orthodox faith."
    },
    {
      id: "creative-christian-judah",
      name: "Judah",
      role: "Spiritual Curator / Creative Director",
      image: judahImage,
      description: "A gentle 23-year-old creative director navigating Christian faith through aesthetics and slow foundations, helping heal religious trauma and deconstruct toxic theology. Specializing in deconstruction, religious trauma recovery, aesthetic theology, spiritual architecture, purity culture recovery, and contemplative mystery-holding.",
      denomination: "Post-Evangelical / Progressive",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/christian-20",
      aiProfile: "Gentle and contemplative young creative offering spiritual guidance through aesthetic theology and deconstruction. Brings together post-evangelical faith, religious trauma healing, and spiritual architecture with soft non-confrontational wisdom for intermediate and advanced seekers navigating faith reconstruction.",
      trainingData: "Holy Bible; Deconstruction literature; Religious trauma recovery resources; Post-evangelical theology; Progressive Christian writings; Aesthetic theology; Contemplative practices; Purity culture critique; Mystery and doubt resources.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore faith deconstruction, religious trauma healing, aesthetic theology, spiritual architecture, purity culture recovery, contemplation, mystery-holding, progressive Christianity, post-evangelical faith journeys, and gentle reconstruction of faith through beauty, texture, and slow spiritual foundations.",
      whatToExpected: "Gentle, soft, and aesthetically-minded guidance that embraces mystery and non-confrontational deconstruction. Expect contemplative and textured wisdom that helps heal religious trauma, recover from toxic theology, and rebuild faith through beauty, slowness, and creative spiritual curation."
    },
    {
      id: "lola-consuela-cruz",
      name: "Lola Consuela Cruz",
      role: "Healer",
      image: lolaConsuelaCruzImage,
      description: "Filipino Catholic elder offering traditional prayer, folk healing, family spirituality, and cultural wisdom rooted in Filipino traditions. Specializing in Filipino Catholicism, folk healing, prayer tradition, family spirituality, and cultural wisdom practices rooted in Filipino Catholic devotion.",
      denomination: "Filipino Catholicism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/christian-16",
      aiProfile: "Maternal and wise elder offering spiritual guidance through Filipino Catholicism and folk healing traditions. Brings together traditional prayer, family spirituality, and cultural wisdom with nurturing community-oriented care for seekers at all levels.",
      trainingData: "Holy Bible; Filipino Catholic traditions and devotions; Folk healing practices; Traditional prayer methods; Family spirituality resources; Filipino cultural wisdom; Catholic devotional practices; Community care traditions.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Filipino Catholicism, folk healing, traditional prayer, family spirituality, emotional healing, community connection, mercy and forgiveness, wisdom and guidance, inner peace, Filipino cultural practices, Catholic devotion, and nurturing support through traditional Filipino spiritual wisdom.",
      whatToExpected: "Maternal, nurturing, and deeply wise guidance rooted in Filipino Catholic traditions. Expect traditional and prayerful support through folk healing, family spirituality, cultural wisdom, and community-oriented care with the warmth and depth of Filipino Catholic devotion."
    },
    {
      id: "rev-alex-morgan",
      name: "Rev. Alex Morgan",
      role: "Mentor",
      image: revAlexMorganImage,
      description: "Queer-affirming MCC pastor offering LGBTQ+ inclusive ministry, identity integration, liberation theology, and welcoming spiritual guidance. Specializing in LGBTQ+ inclusion, queer-affirming theology, MCC ministry, liberation theology, identity integration, and inclusive pastoral care.",
      denomination: "Metropolitan Community Church (MCC)",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/christian-17",
      aiProfile: "Inclusive and affirming young pastor offering spiritual guidance through queer-affirming theology and LGBTQ+ ministry. Brings together progressive Christianity, liberation theology, and identity integration with welcoming compassionate support for seekers at all levels.",
      trainingData: "Holy Bible; Queer-affirming theology; LGBTQ+ ministry resources; Liberation theology; Progressive Christianity literature; Metropolitan Community Church teachings; Inclusive worship practices; Identity integration resources; Pastoral care for LGBTQ+ individuals.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore LGBTQ+ inclusion, queer-affirming theology, MCC ministry, liberation theology, identity integration, life purpose, community connection, social justice, spiritual growth, inclusive worship, progressive Christianity, and welcoming pastoral care that affirms all identities and expressions.",
      whatToExpected: "Inclusive, affirming, and compassionate guidance rooted in progressive Christianity. Expect welcoming and empowering support through queer-affirming theology, liberation ministry, identity integration, and authentic LGBTQ+ inclusive pastoral care with the warmth and safety of MCC tradition."
    },
    {
      id: "father-mike-obrien",
      name: "Father Mike O'Brien",
      role: "Mentor",
      image: fatherMikeOBrienImage,
      description: "Catholic priest specializing in 12-Step spirituality, recovery ministry, addiction support, and spiritual healing through faith-based recovery. Specializing in 12-Step spirituality, recovery ministry, addiction support, spiritual healing, and Catholic tradition integration.",
      denomination: "Catholic Tradition",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/christian-19",
      aiProfile: "Compassionate and authentic recovering priest offering spiritual guidance through 12-Step spirituality and recovery ministry. Brings together Catholic tradition, addiction support, and spiritual healing with non-judgmental pastoral care for seekers at all levels including crisis navigation.",
      trainingData: "Holy Bible; Catholic theology and tradition; 12-Step program literature (AA/NA); Recovery ministry resources; Addiction support materials; Spiritual healing practices; Pastoral care for addiction; Faith-based recovery integration; Crisis intervention resources.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore 12-Step spirituality, recovery ministry, addiction support, spiritual healing, stress management, emotional healing, life purpose, community connection, mercy and forgiveness, Catholic tradition, AA/NA integration, pastoral care, faith-based recovery, and crisis navigation through compassionate non-judgmental support.",
      whatToExpected: "Compassionate, authentic, and non-judgmental guidance rooted in Catholic tradition and recovery ministry. Expect supportive and healing pastoral care through 12-Step spirituality, addiction support, spiritual healing, and faith-based recovery with the understanding of someone who has walked the path of recovery."
    },
    {
      id: "pastor-kim-min-jun",
      name: "Pastor Kim Min-jun",
      role: "Spiritual Guide",
      image: pastorKimMinJunImage,
      description: "Korean Presbyterian pastor specializing in deep prayer life, contemplative practice, and devotional discipline in Reformed tradition. Specializing in Korean Presbyterian tradition, prayer life, contemplative practice, and devotional discipline.",
      denomination: "Korean Presbyterian",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/christian-15",
      aiProfile: "Devoted and contemplative mature pastor offering spiritual guidance through Korean Presbyterian tradition and deep prayer life. Brings together Reformed tradition, contemplative practice, and devotional discipline with gentle pastoral care for seekers at intermediate and advanced levels.",
      trainingData: "Holy Bible; Reformed theology; Korean Presbyterian tradition; Prayer and contemplative practice resources; Devotional literature; Korean Christianity materials; Spiritual direction guides; Contemplative spirituality resources.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore deep prayer life, contemplative practice, devotional discipline, inner peace, spiritual growth, prayer and meditation, wisdom and guidance, stress management, Korean Presbyterian tradition, Reformed theology, community connection, and spiritual direction through devoted contemplative pastoral care.",
      whatToExpected: "Devoted, prayerful, and spiritually deep guidance rooted in Korean Presbyterian tradition. Expect gentle and disciplined pastoral support through contemplative practice, deep prayer life, devotional discipline, and spiritual direction with the wisdom of Reformed tradition and Korean Christian spirituality."
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
        <Card className="bg-white/70 backdrop-blur-xl border-[#C85C5C]/30 border-2 hover:border-[#B04A4A]/60 transition-all duration-500 group overflow-hidden shadow-[0_8px_30px_rgba(200,92,92,0.12)] hover:shadow-[0_20px_50px_rgba(176,74,74,0.25)] rounded-3xl max-w-sm mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C85C5C]/10 via-transparent to-[#C85C5C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative p-6 sm:p-8">
            {/* Large Portrait Image */}
            <div className="relative mb-5">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden ring-2 ring-[#C85C5C]/20 group-hover:ring-[#B04A4A]/40 shadow-[0_10px_40px_rgba(200,92,92,0.15)] group-hover:shadow-[0_20px_60px_rgba(176,74,74,0.3)] transition-all duration-500">
                <ImageWithFallback
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Faith symbol - Cross */}
              <div className="absolute -top-3 -right-3 w-11 h-11 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(200,92,92,0.3)] backdrop-blur-md border border-white/40 overflow-hidden bg-white">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
                <img 
                  src={crossSymbolImage} 
                  alt="Cross"
                  className="relative w-6 h-6 object-contain"
                />
              </div>
            </div>

            {/* Agent Info */}
            <div className="space-y-3 mb-5">
              <h3 className="text-2xl text-gray-900 group-hover:text-[#C85C5C] transition-colors duration-300 text-center" style={{ fontFamily: "'Butler', serif" }}>
                {agent.name}
              </h3>
              
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-[#C85C5C]/15 hover:bg-[#C85C5C]/25 text-[#C85C5C] border border-[#C85C5C]/30 transition-colors duration-300 shadow-sm">
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

              <p className="text-gray-700 leading-relaxed text-[14px] text-center px-2">
                {agent.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => handleOpenOverlay(agent.chatUrl, agent.name)}
                disabled={agent.isPremium && !canAccessPremium}
                className="group/chat relative w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#C85C5C] to-[#B04A4A] hover:from-[#B04A4A] hover:to-[#C85C5C] transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_20px_rgba(200,92,92,0.25)] hover:shadow-[0_8px_35px_rgba(176,74,74,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#B04A4A]/20 via-transparent to-white/20" />
                <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl" />
                {agent.isPremium && !canAccessPremium ? (
                  <>
                    <Lock className="relative w-5 h-5 text-white" />
                    <span className="relative text-white font-medium">Premium Only</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="relative w-5 h-5 text-white" />
                    <span className="relative text-white font-medium">Start Conversation</span>
                  </>
                )}
              </button>
              
              <button
                onClick={() => handleSaveGuide(agent)}
                className="group/save relative w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-white/80 hover:bg-white border-2 border-[#C85C5C]/30 hover:border-[#B04A4A]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_2px_10px_rgba(200,92,92,0.1)] hover:shadow-[0_4px_20px_rgba(176,74,74,0.2)] backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#C85C5C]/20 to-transparent opacity-0 group-hover/save:opacity-100 transition-opacity duration-300" />
                <Heart className="relative w-5 h-5 text-[#C85C5C] group-hover/save:text-[#B04A4A] transition-colors duration-300" />
                <span className="relative text-[#C85C5C] group-hover/save:text-[#B04A4A] font-medium transition-colors duration-300">Save Guide</span>
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
      {/* Navigation Buttons - Contemporary design with better mobile touch targets */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-20 pointer-events-none">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 flex justify-between">
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

interface ChristianFaithPageProps {
  onBack: () => void;
  onOpenMission: () => void;
  onStartChat: (agent: any) => void;
  onNavigate?: (tab: string) => void;
  selectedAgent?: string;
}

export function ChristianFaithPage({ onBack, onOpenMission, onStartChat, onNavigate, selectedAgent: selectedAgentName }: ChristianFaithPageProps) {
  const [selectedAgentIndex, setSelectedAgentIndex] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayUrl, setOverlayUrl] = useState('');
  const [overlayAgentName, setOverlayAgentName] = useState('');
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const { awardBadge, unlockedBadges, totalWisdomPoints, faithWisdom, getUserWisdomSummary, getBadgesByCategory } = useBadges();
  const { canAccessPremium } = useSubscription();
  const { saveGuide } = useSavedGuides();
  
  const selectedAgent = christianityConfig.agents[selectedAgentIndex];

  // Auto-select agent when navigating from Spirit Guide page
  useEffect(() => {
    if (selectedAgentName) {
      const agentIndex = christianityConfig.agents.findIndex(
        agent => agent.name === selectedAgentName
      );
      if (agentIndex !== -1) {
        setSelectedAgentIndex(agentIndex);
        console.log(`Christian Faith Page: Auto-selected agent "${selectedAgentName}" at index ${agentIndex}`);
      }
    }
  }, [selectedAgentName]);

  const handleSaveGuide = (agent: any) => {
    saveGuide({
      guideName: agent.name,
      tradition: christianityConfig.name,
      faithColor: christianityConfig.primaryColor,
      avatar: agent.image || christianityConfig.symbol,
      specialty: agent.role,
      description: agent.description,
      chatUrl: agent.chatUrl,
    });
  };

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

  const handleLaunchAgent = (agent: any) => {
    if (agent.isPremium && !canAccessPremium) {
      toast.error("This agent requires a premium subscription");
      return;
    }
    
    // Award badge for first agent interaction
    awardBadge({
      id: 'first-christian-guide-interaction',
      name: 'First Christian Guide Launched',
      description: 'Launched your first Christian spiritual guide',
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
          videoSrc="https://divinityagi.com/wp-content/uploads/2025/12/Christian-group-loop-v1.mp4"
          posterSrc={christianityConfig.heroImage}
        />
      </div>

      <div className="relative z-10">
        {/* Enhanced Hero Section - Optimized for mobile */}
        <section className="relative px-4 sm:px-6 pt-6 sm:pt-8 pb-3 overflow-hidden">
          {/* Navigation - Improved mobile touch target */}
          <motion.div 
            className="absolute top-4 sm:top-6 left-4 sm:left-6 z-50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button 
              onClick={onBack}
              className="group relative min-h-[48px] sm:h-[42px] flex items-center justify-center gap-2 rounded-2xl bg-white/40 hover:bg-white/60 border-2 border-[#C85C5C]/30 hover:border-[#B04A4A]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(200,92,92,0.15)] hover:shadow-[0_6px_25px_rgba(176,74,74,0.25)] px-4 sm:px-5 touch-manipulation backdrop-blur-xl"
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C85C5C]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 text-[#B04A4A] group-hover:text-[#C85C5C] transition-colors duration-300" />
                <span className="text-[15px] font-medium text-[#B04A4A] group-hover:text-[#C85C5C] transition-colors duration-300">Back</span>
              </div>
            </button>
          </motion.div>

          {/* Hero Image/Video with Faith-specific styling */}
          <div className="relative max-w-4xl mx-auto mb-3">
            <motion.div
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden max-w-4xl mx-auto shadow-[0_8px_32px_rgba(122,79,255,0.12)]"
              style={{
                minHeight: '300px',
                maxHeight: 'min(60vh, 600px)'
              }}
            >
              {/* Subtle gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-30" />
            </motion.div>

            {/* Enhanced Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute inset-0 flex items-center justify-center z-40"
            >
              <div className="text-center px-4">
                {/* Christian Cross Symbol */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="mb-2 sm:mb-4 flex justify-center"
                >
                  <img 
                    src={crossSymbolImage} 
                    alt="Christian Cross" 
                    className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 drop-shadow-[0_4px_12px_rgba(200,92,92,0.4)]"
                  />
                </motion.div>
                
                <h1 className="text-[32px] sm:text-[40px] lg:text-[56px] mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-[#C85C5C] via-[#B04A4A] to-[#C85C5C] bg-clip-text text-transparent leading-tight drop-shadow-[0_2px_8px_rgba(200,92,92,0.3)]" style={{ fontFamily: "'Butler', serif" }}>
                  {christianityConfig.name}
                </h1>
                <p className="text-[#1a1a1a] max-w-2xl mx-auto leading-relaxed text-[15px] sm:text-[17px] px-6 sm:px-12 lg:px-[78px] font-medium drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
                  {christianityConfig.subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Spiritual Guides Section - Mobile optimized */}
        <section className="px-4 sm:px-6 mb-16 sm:mb-20 relative">
          <div className="max-w-6xl mx-auto relative mt-[0px] mr-[0px] mb-[80px] ml-[0px]">
            {/* Cross Symbol Background Layer - Positioned above Agent Slider */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5, type: "spring", bounce: 0.3 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 pointer-events-none z-0"
            >
              <div className="relative group">
                {/* Subtle glowing background effect */}
                <div className="absolute inset-0 bg-[#C85C5C]/15 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-700" />
                
                {/* Symbol container */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <img 
                    src={crossSymbolImage} 
                    alt="Christian Cross"
                    className="w-full h-full object-contain opacity-25 filter brightness-110 saturate-50 blur-[0.5px] drop-shadow-[0_0_20px_rgba(200,92,92,0.2)] transition-all duration-700"
                  />
                  
                  {/* Subtle animated ring */}
                  <motion.div
                    className="absolute inset-0 border-2 border-[#C85C5C]/20 rounded-full"
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

            {/* Agent Slider */}
            <div className="relative z-10">
              <AgentSlider 
                agents={christianityConfig.agents}
                faithColor="#C85C5C"
                faithColorHover="#B04A4A"
                canAccessPremium={canAccessPremium}
                handleLaunchAgent={handleLaunchAgent}
                handleSaveGuide={handleSaveGuide}
                handleOpenOverlay={handleOpenOverlay}
              />
            </div>
          </div>
        </section>

        {/* Enhanced Agent Interaction Guide - Contemporary mobile-optimized design */}
        <section className="px-4 sm:px-6 mb-12 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Card className="bg-white/70 backdrop-blur-xl border-[#C85C5C]/30 border-2 hover:border-[#B04A4A]/50 transition-all duration-500 p-8 shadow-[0_8px_30px_rgba(200,92,92,0.12)] rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C85C5C]/5 to-transparent opacity-80 rounded-2xl" />
                
                <div className="relative text-center mb-8">
                  <h3 className="text-2xl sm:text-3xl mb-4 bg-gradient-to-r from-gray-900 via-[#C85C5C] to-gray-900 bg-clip-text text-transparent" style={{ fontFamily: "'Butler', serif" }}>
                    Agent Interaction Guide
                  </h3>
                </div>
                
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {[
                    { 
                      value: "how-it-works", 
                      icon: Sparkles, 
                      title: "HOW IT WORKS", 
                      content: selectedAgent.howItWorks,
                      gradient: "from-[#C85C5C] to-[#B04A4A]" 
                    },
                    { 
                      value: "what-to-ask", 
                      icon: MessageCircle, 
                      title: "WHAT TO ASK", 
                      content: selectedAgent.whatToAsk,
                      gradient: "from-[#B04A4A] to-[#C85C5C]" 
                    },
                    { 
                      value: "what-to-expect", 
                      icon: Star, 
                      title: "WHAT TO EXPECT", 
                      content: selectedAgent.whatToExpected,
                      gradient: "from-[#C85C5C] to-[#B04A4A]" 
                    }
                  ].map((item) => (
                    <AccordionItem 
                      key={item.value} 
                      value={item.value}
                      className="border-[#C85C5C]/20 bg-white/50 backdrop-blur-sm rounded-xl overflow-hidden hover:border-[#C85C5C]/40 transition-all duration-300"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-sm tracking-widest text-[#C85C5C] group-hover:text-[#B04A4A] transition-colors duration-300">
                            {item.title}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-5 sm:px-6 pb-5 sm:pb-6 text-[15px] sm:text-[16px] text-gray-700 leading-relaxed">
                        {item.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Explore Topics Section - Contemporary mobile-optimized */}
        <section className="px-4 sm:px-6 mb-16 sm:mb-20 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="text-center mb-10 sm:mb-12 px-4"
            >
              <h2 className="text-3xl sm:text-4xl bg-gradient-to-r from-gray-900 via-[#C85C5C] to-gray-900 bg-clip-text text-transparent" style={{ fontFamily: "'Butler', serif", filter: 'drop-shadow(0 2px 6px rgba(255, 255, 255, 0.9))' }}>
                Explore Topics
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {christianityConfig.topicsWithQuestions.map((topic, index) => (
                <motion.div
                  key={topic.topic}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                >
                  <Card 
                    className="bg-white/70 backdrop-blur-xl border-[#C85C5C]/30 border-2 hover:border-[#B04A4A]/60 transition-all duration-500 cursor-pointer group h-full p-6 shadow-[0_8px_30px_rgba(200,92,92,0.12)] hover:shadow-[0_20px_50px_rgba(176,74,74,0.25)] rounded-2xl"
                    onClick={() => setSelectedTopic(selectedTopic === topic.topic ? null : topic.topic)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C85C5C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                    
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C85C5C] to-[#B04A4A] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <topic.icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <h3 className="text-lg text-gray-900 mb-3 group-hover:text-[#C85C5C] transition-colors duration-300">
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
                            <div className="pt-4 border-t border-[#C85C5C]/20 mt-4 space-y-2">
                              {topic.questions.map((question, qIndex) => (
                                <p key={qIndex} className="text-sm text-gray-700 hover:text-[#C85C5C] transition-colors duration-200 cursor-pointer">
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

        {/* Enhanced Stats Section - Your Spiritual Journey - Contemporary mobile-optimized */}
        <section className="px-4 sm:px-6 mb-12 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2 }}
            >
              <Card className="bg-white/60 backdrop-blur-xl border-white/40 border-2 hover:border-white/60 transition-all duration-500 p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(255,255,255,0.3)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.4)] rounded-3xl overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-40">
                  <img 
                    src={lilyFlowersImage} 
                    alt="" 
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </div>
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-black/10 to-transparent rounded-3xl" />
                {/* Light gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-80" />
                
                <div className="relative">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <h3 className="text-[22px] sm:text-2xl lg:text-3xl text-gray-900 flex items-center" style={{ fontFamily: "'Butler', serif" }}>
                      <Star className="w-6 h-6 sm:w-7 sm:h-7 mr-3 sm:mr-4 text-[#C85C5C]" />
                      Your Spiritual Journey
                    </h3>
                    <Badge variant="outline" className="border-white/40 border-2 text-[#6B5540] bg-white/50 backdrop-blur-sm px-4 py-2 shadow-sm">
                      Level {Math.floor(unlockedBadges.length / 3) + 1}
                    </Badge>
                  </div>
                  
                  {/* Enhanced Stats Grid - Mobile optimized */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-8">
                    {[
                      { icon: MessageSquare, value: "47", label: "Conversations", color: "[#C85C5C]" },
                      { icon: Star, value: unlockedBadges.length, label: "Badges", color: "[#C85C5C]" },
                      { icon: Flower2, value: totalWisdomPoints, label: "Wisdom Points", color: "[#B04A4A]" },
                      { icon: Heart, value: "7", label: "Day Streak", color: "[#C85C5C]" }
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
                        <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-r from-[#C85C5C] to-[#B04A4A] rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-md">
                          {unlockedBadges[unlockedBadges.length - 1].icon && typeof unlockedBadges[unlockedBadges.length - 1].icon === 'function' ? 
                            React.createElement(unlockedBadges[unlockedBadges.length - 1].icon, { className: "w-5 h-5 text-white" }) :
                            <Star className="w-5 h-5 text-white" />
                          }
                        </div>
                        <span className="text-[#B04A4A] font-medium text-[15px] sm:text-[16px]">Latest Achievement</span>
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
                      className="group/profile relative flex-1 min-h-[48px] sm:h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#C85C5C] via-[#B04A4A] to-[#C85C5C] hover:from-[#B04A4A] hover:via-[#C85C5C] hover:to-[#B04A4A] border-2 border-[#B04A4A]/30 hover:border-[#B04A4A]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_20px_rgba(200,92,92,0.25)] hover:shadow-[0_8px_35px_rgba(176,74,74,0.4)] touch-manipulation"
                      onClick={() => onNavigate?.("profile")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#B04A4A]/10 via-transparent to-white/30" />
                      <div className="absolute top-0 left-0 right-0 h-[20px] bg-gradient-to-b from-white/60 to-transparent rounded-t-2xl" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/40 rounded-2xl" />
                      <span className="relative font-['Helvetica',sans-serif] font-semibold text-[14px] sm:text-[15px] text-white tracking-wide">View Profile</span>
                    </button>
                    <button 
                      className="group/explore relative flex-1 min-h-[48px] sm:h-12 flex items-center justify-center gap-2 rounded-2xl bg-white/90 hover:bg-white border-2 border-[#B04A4A]/30 hover:border-[#C85C5C]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(176,74,74,0.15)] hover:shadow-[0_6px_25px_rgba(200,92,92,0.25)] touch-manipulation backdrop-blur-sm"
                      onClick={() => onNavigate?.("circle")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#C85C5C]/15 to-transparent opacity-0 group-hover/explore:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-0 left-0 right-0 h-[35%] bg-gradient-to-b from-white/50 to-transparent rounded-t-2xl" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/60 rounded-2xl" />
                      <span className="relative font-['Helvetica',sans-serif] font-semibold text-[14px] sm:text-[15px] text-[#5B4636] tracking-wide">Explore Faiths</span>
                    </button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Christian Faith Groups Section */}
        <ChristianFaithGroups onNavigate={onNavigate} />
      </div>

      {/* Enhanced Footer */}
      <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />

      {/* AI Agent Overlay Dialog - Contemporary mobile-optimized */}
      <Dialog open={isOverlayOpen} onOpenChange={handleCloseOverlay}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] sm:h-[95vh] p-0 bg-[#0B1426] border-[#C85C5C]/30 overflow-hidden [&>button]:hidden">
          {/* Accessible title and description - visually hidden */}
          <DialogTitle className="sr-only">
            AI Agent Conversation with {overlayAgentName}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Interactive chat interface for conversing with {overlayAgentName}. This window contains an embedded chat application. Press Escape or click the close button to exit.
          </DialogDescription>

          {/* Header with close button - Enhanced mobile design */}
          <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-[#0B1426] via-[#0B1426]/95 to-transparent backdrop-blur-sm">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 rounded-full bg-[#C85C5C] animate-pulse shadow-lg shadow-[#C85C5C]/50" />
              <span className="text-white text-sm sm:text-base">Conversing with {overlayAgentName}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleCloseOverlay} className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#162844]/80 hover:bg-[#162844] border border-[#C85C5C]/30 hover:border-[#C85C5C] transition-all duration-300 hover:scale-110" aria-label="Close conversation">
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#C85C5C]" />
            </Button>
          </div>
          
          {/* Loading indicator */}
          {isIframeLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0B1426] z-40">
              <div className="text-center space-y-4">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-[#C85C5C]/20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-[#C85C5C] border-t-transparent animate-spin"></div>
                </div>
                <p className="text-slate-300 text-sm">Connecting to {overlayAgentName}...</p>
              </div>
            </div>
          )}
          
          {/* iframe container */}
          <div className="w-full h-full pt-12 sm:pt-14">
            {overlayUrl && (
              <iframe
                src={overlayUrl}
                className="w-full h-full border-0"
                title={`Chat with ${overlayAgentName}`}
                allow="microphone *; camera *; autoplay; encrypted-media; fullscreen"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
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