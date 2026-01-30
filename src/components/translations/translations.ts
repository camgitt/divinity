/**
 * DivinityAGI Multi-Language Translation System
 * 
 * Supported Languages:
 * - English (en) - Primary
 * - Spanish (es) - 500M+ speakers
 * - Arabic (ar) - 400M+ speakers, RTL
 * - Hindi (hi) - 600M+ speakers
 * - Chinese (zh) - 1.3B+ speakers
 * - French (fr) - 300M+ speakers
 * - Portuguese (pt) - 250M+ speakers
 * - Russian (ru) - 250M+ speakers
 * - German (de) - 130M+ speakers
 * - Japanese (ja) - 125M+ speakers
 */

export type Language = 'en' | 'es' | 'ar' | 'hi' | 'zh' | 'fr' | 'pt' | 'ru' | 'de' | 'ja';

// Translation keys organized by feature area
export const translationKeys = {
  // Common
  common_welcome: 'common_welcome',
  common_loading: 'common_loading',
  common_save: 'common_save',
  common_cancel: 'common_cancel',
  common_delete: 'common_delete',
  common_edit: 'common_edit',
  common_back: 'common_back',
  common_next: 'common_next',
  common_continue: 'common_continue',
  common_skip: 'common_skip',
  common_done: 'common_done',
  common_close: 'common_close',
  common_language: 'common_language',
  
  // Navigation
  nav_guides: 'nav_guides',
  nav_circle: 'nav_circle',
  nav_chat: 'nav_chat',
  nav_leaders: 'nav_leaders',
  nav_profile: 'nav_profile',
  nav_journal: 'nav_journal',
  nav_goals: 'nav_goals',
  nav_privacy: 'nav_privacy',
  
  // Home/Landing
  home_hero_title: 'home_hero_title',
  home_hero_subtitle: 'home_hero_subtitle',
  home_get_started: 'home_get_started',
  
  // Registration
  reg_title: 'reg_title',
  reg_subtitle: 'reg_subtitle',
  reg_name_label: 'reg_name_label',
  reg_email_label: 'reg_email_label',
  reg_age_label: 'reg_age_label',
  reg_create_account: 'reg_create_account',
  reg_sign_in: 'reg_sign_in',
  reg_terms_agree: 'reg_terms_agree',
  
  // Spiritual Journal
  journal_title: 'journal_title',
  journal_subtitle: 'journal_subtitle',
  journal_create_entry: 'journal_create_entry',
  journal_mood_label: 'journal_mood_label',
  journal_prompt_label: 'journal_prompt_label',
  journal_entry_saved: 'journal_entry_saved',
  journal_entry_deleted: 'journal_entry_deleted',
  journal_no_entries: 'journal_no_entries',
  journal_todays_prompt: 'journal_todays_prompt',
  journal_write_tab: 'journal_write_tab',
  journal_history_tab: 'journal_history_tab',
  
  // Spiritual Goals
  goals_title: 'goals_title',
  goals_subtitle: 'goals_subtitle',
  goals_create_goal: 'goals_create_goal',
  goals_mark_complete: 'goals_mark_complete',
  goals_streak: 'goals_streak',
  goals_milestone_7: 'goals_milestone_7',
  goals_milestone_30: 'goals_milestone_30',
  goals_milestone_100: 'goals_milestone_100',
  goals_category_meditation: 'goals_category_meditation',
  goals_category_prayer: 'goals_category_prayer',
  goals_category_study: 'goals_category_study',
  goals_category_service: 'goals_category_service',
  goals_category_gratitude: 'goals_category_gratitude',
  goals_category_custom: 'goals_category_custom',
  
  // Crisis Support
  crisis_title: 'crisis_title',
  crisis_subtitle: 'crisis_subtitle',
  crisis_need_help: 'crisis_need_help',
  crisis_not_alone: 'crisis_not_alone',
  crisis_call_now: 'crisis_call_now',
  crisis_text_support: 'crisis_text_support',
  crisis_web_chat: 'crisis_web_chat',
  crisis_disclaimer: 'crisis_disclaimer',
  
  // Privacy Dashboard
  privacy_title: 'privacy_title',
  privacy_subtitle: 'privacy_subtitle',
  privacy_export_data: 'privacy_export_data',
  privacy_delete_all: 'privacy_delete_all',
  privacy_analytics: 'privacy_analytics',
  privacy_marketing: 'privacy_marketing',
  privacy_location: 'privacy_location',
  privacy_commitment: 'privacy_commitment',
  
  // Chat
  chat_title: 'chat_title',
  chat_send_message: 'chat_send_message',
  chat_type_message: 'chat_type_message',
  chat_select_guide: 'chat_select_guide',
  
  // Guides
  guides_title: 'guides_title',
  guides_browse_all: 'guides_browse_all',
  guides_create_custom: 'guides_create_custom',
  guides_saved: 'guides_saved',
  
  // Profile
  profile_title: 'profile_title',
  profile_edit: 'profile_edit',
  profile_subscription: 'profile_subscription',
  profile_settings: 'profile_settings',
  
  // Faith Traditions
  faith_christianity: 'faith_christianity',
  faith_islam: 'faith_islam',
  faith_hinduism: 'faith_hinduism',
  faith_buddhism: 'faith_buddhism',
  faith_judaism: 'faith_judaism',
  faith_sikhism: 'faith_sikhism',
  faith_taoism: 'faith_taoism',
  faith_shinto: 'faith_shinto',
  faith_jainism: 'faith_jainism',
  faith_bahai: 'faith_bahai',
  faith_confucianism: 'faith_confucianism',
  faith_polytheism: 'faith_polytheism',
  
  // Subscription
  sub_free_tier: 'sub_free_tier',
  sub_premium_tier: 'sub_premium_tier',
  sub_upgrade_now: 'sub_upgrade_now',
  sub_current_plan: 'sub_current_plan',
  
  // Time Greetings
  greeting_morning: 'greeting_morning',
  greeting_afternoon: 'greeting_afternoon',
  greeting_evening: 'greeting_evening',
  greeting_night: 'greeting_night',
  
  // Moods
  mood_joyful: 'mood_joyful',
  mood_peaceful: 'mood_peaceful',
  mood_grateful: 'mood_grateful',
  mood_contemplative: 'mood_contemplative',
  mood_struggling: 'mood_struggling',
  mood_hopeful: 'mood_hopeful',
} as const;

export type TranslationKey = typeof translationKeys[keyof typeof translationKeys];

// English translations (primary/reference)
const en: Record<TranslationKey, string> = {
  // Common
  common_welcome: 'Welcome',
  common_loading: 'Loading...',
  common_save: 'Save',
  common_cancel: 'Cancel',
  common_delete: 'Delete',
  common_edit: 'Edit',
  common_back: 'Back',
  common_next: 'Next',
  common_continue: 'Continue',
  common_skip: 'Skip',
  common_done: 'Done',
  common_close: 'Close',
  common_language: 'Language',
  
  // Navigation
  nav_guides: 'Guides',
  nav_circle: 'Circle',
  nav_chat: 'Chat',
  nav_leaders: 'Leaders',
  nav_profile: 'Profile',
  nav_journal: 'Journal',
  nav_goals: 'Goals',
  nav_privacy: 'Privacy',
  
  // Home/Landing
  home_hero_title: 'Your Spiritual Guide, Personalized',
  home_hero_subtitle: 'Experience ethical AI guidance across all faith traditions with 50+ spiritual avatars',
  home_get_started: 'Get Started',
  
  // Registration
  reg_title: 'Begin Your Spiritual Journey',
  reg_subtitle: 'Create your account to unlock personalized guidance',
  reg_name_label: 'Full Name',
  reg_email_label: 'Email Address',
  reg_age_label: 'I am 13 years or older',
  reg_create_account: 'Create Account',
  reg_sign_in: 'Sign In',
  reg_terms_agree: 'I agree to the Terms of Service and Privacy Policy',
  
  // Spiritual Journal
  journal_title: 'Spiritual Journal',
  journal_subtitle: 'Reflect on your spiritual journey with guided prompts',
  journal_create_entry: 'Create Entry',
  journal_mood_label: 'How are you feeling?',
  journal_prompt_label: "Today's Prompt",
  journal_entry_saved: 'Entry saved successfully',
  journal_entry_deleted: 'Entry deleted',
  journal_no_entries: 'No journal entries yet. Start your first entry today!',
  journal_todays_prompt: "Today's Prompt",
  journal_write_tab: 'Write',
  journal_history_tab: 'History',
  
  // Spiritual Goals
  goals_title: 'Spiritual Goals',
  goals_subtitle: 'Build lasting spiritual habits with daily tracking',
  goals_create_goal: 'Create Goal',
  goals_mark_complete: 'Mark Complete',
  goals_streak: '{count} day streak',
  goals_milestone_7: '7-Day Warrior',
  goals_milestone_30: '30-Day Master',
  goals_milestone_100: '100-Day Legend',
  goals_category_meditation: 'Meditation',
  goals_category_prayer: 'Prayer',
  goals_category_study: 'Scripture Study',
  goals_category_service: 'Service',
  goals_category_gratitude: 'Gratitude',
  goals_category_custom: 'Custom',
  
  // Crisis Support
  crisis_title: 'Crisis Support Resources',
  crisis_subtitle: 'You are not alone. Help is available 24/7',
  crisis_need_help: 'Need Help?',
  crisis_not_alone: "You're Not Alone",
  crisis_call_now: 'Call Now',
  crisis_text_support: 'Text Support',
  crisis_web_chat: 'Web Chat',
  crisis_disclaimer: 'DivinityAGI is an AI tool and cannot provide emergency support. If you are in immediate danger, please call emergency services.',
  
  // Privacy Dashboard
  privacy_title: 'Privacy & Data',
  privacy_subtitle: 'Your data, your control',
  privacy_export_data: 'Export Data',
  privacy_delete_all: 'Delete All Data',
  privacy_analytics: 'Usage Analytics',
  privacy_marketing: 'Marketing Communications',
  privacy_location: 'Location Services',
  privacy_commitment: 'We store your data locally and never sell your personal information.',
  
  // Chat
  chat_title: 'Divinity Chat',
  chat_send_message: 'Send',
  chat_type_message: 'Type your message...',
  chat_select_guide: 'Select a spiritual guide to begin',
  
  // Guides
  guides_title: 'Spirit Guides',
  guides_browse_all: 'Browse All Guides',
  guides_create_custom: 'Create Custom Guide',
  guides_saved: 'Saved Guides',
  
  // Profile
  profile_title: 'Your Profile',
  profile_edit: 'Edit Profile',
  profile_subscription: 'Subscription',
  profile_settings: 'Settings',
  
  // Faith Traditions
  faith_christianity: 'Christianity',
  faith_islam: 'Islam',
  faith_hinduism: 'Hinduism',
  faith_buddhism: 'Buddhism',
  faith_judaism: 'Judaism',
  faith_sikhism: 'Sikhism',
  faith_taoism: 'Taoism',
  faith_shinto: 'Shinto',
  faith_jainism: 'Jainism',
  faith_bahai: "Bahá'í Faith",
  faith_confucianism: 'Confucianism',
  faith_polytheism: 'Polytheism',
  
  // Subscription
  sub_free_tier: 'Free Tier',
  sub_premium_tier: 'Premium',
  sub_upgrade_now: 'Upgrade Now',
  sub_current_plan: 'Current Plan',
  
  // Time Greetings
  greeting_morning: 'Good Morning',
  greeting_afternoon: 'Good Afternoon',
  greeting_evening: 'Good Evening',
  greeting_night: 'Good Night',
  
  // Moods
  mood_joyful: 'Joyful',
  mood_peaceful: 'Peaceful',
  mood_grateful: 'Grateful',
  mood_contemplative: 'Contemplative',
  mood_struggling: 'Struggling',
  mood_hopeful: 'Hopeful',
};

// Spanish translations
const es: Record<TranslationKey, string> = {
  // Common
  common_welcome: 'Bienvenido',
  common_loading: 'Cargando...',
  common_save: 'Guardar',
  common_cancel: 'Cancelar',
  common_delete: 'Eliminar',
  common_edit: 'Editar',
  common_back: 'Atrás',
  common_next: 'Siguiente',
  common_continue: 'Continuar',
  common_skip: 'Omitir',
  common_done: 'Hecho',
  common_close: 'Cerrar',
  common_language: 'Idioma',
  
  // Navigation
  nav_guides: 'Guías',
  nav_circle: 'Círculo',
  nav_chat: 'Chat',
  nav_leaders: 'Líderes',
  nav_profile: 'Perfil',
  nav_journal: 'Diario',
  nav_goals: 'Metas',
  nav_privacy: 'Privacidad',
  
  // Home/Landing
  home_hero_title: 'Tu Guía Espiritual, Personalizada',
  home_hero_subtitle: 'Experimenta orientación ética de IA a través de todas las tradiciones de fe con más de 50 avatares espirituales',
  home_get_started: 'Comenzar',
  
  // Registration
  reg_title: 'Comienza Tu Viaje Espiritual',
  reg_subtitle: 'Crea tu cuenta para desbloquear orientación personalizada',
  reg_name_label: 'Nombre Completo',
  reg_email_label: 'Correo Electrónico',
  reg_age_label: 'Tengo 13 años o más',
  reg_create_account: 'Crear Cuenta',
  reg_sign_in: 'Iniciar Sesión',
  reg_terms_agree: 'Acepto los Términos de Servicio y la Política de Privacidad',
  
  // Spiritual Journal
  journal_title: 'Diario Espiritual',
  journal_subtitle: 'Reflexiona sobre tu viaje espiritual con indicaciones guiadas',
  journal_create_entry: 'Crear Entrada',
  journal_mood_label: '¿Cómo te sientes?',
  journal_prompt_label: 'Indicación de Hoy',
  journal_entry_saved: 'Entrada guardada exitosamente',
  journal_entry_deleted: 'Entrada eliminada',
  journal_no_entries: '¡Aún no hay entradas en el diario. Comienza tu primera entrada hoy!',
  journal_todays_prompt: 'Indicación de Hoy',
  journal_write_tab: 'Escribir',
  journal_history_tab: 'Historial',
  
  // Spiritual Goals
  goals_title: 'Metas Espirituales',
  goals_subtitle: 'Construye hábitos espirituales duraderos con seguimiento diario',
  goals_create_goal: 'Crear Meta',
  goals_mark_complete: 'Marcar Completo',
  goals_streak: 'Racha de {count} días',
  goals_milestone_7: 'Guerrero de 7 Días',
  goals_milestone_30: 'Maestro de 30 Días',
  goals_milestone_100: 'Leyenda de 100 Días',
  goals_category_meditation: 'Meditación',
  goals_category_prayer: 'Oración',
  goals_category_study: 'Estudio de Escrituras',
  goals_category_service: 'Servicio',
  goals_category_gratitude: 'Gratitud',
  goals_category_custom: 'Personalizado',
  
  // Crisis Support
  crisis_title: 'Recursos de Apoyo en Crisis',
  crisis_subtitle: 'No estás solo. La ayuda está disponible 24/7',
  crisis_need_help: '¿Necesitas Ayuda?',
  crisis_not_alone: 'No Estás Solo',
  crisis_call_now: 'Llamar Ahora',
  crisis_text_support: 'Apoyo por Texto',
  crisis_web_chat: 'Chat Web',
  crisis_disclaimer: 'DivinityAGI es una herramienta de IA y no puede proporcionar apoyo de emergencia. Si estás en peligro inmediato, llama a los servicios de emergencia.',
  
  // Privacy Dashboard
  privacy_title: 'Privacidad y Datos',
  privacy_subtitle: 'Tus datos, tu control',
  privacy_export_data: 'Exportar Datos',
  privacy_delete_all: 'Eliminar Todos los Datos',
  privacy_analytics: 'Análisis de Uso',
  privacy_marketing: 'Comunicaciones de Marketing',
  privacy_location: 'Servicios de Ubicación',
  privacy_commitment: 'Almacenamos tus datos localmente y nunca vendemos tu información personal.',
  
  // Chat
  chat_title: 'Chat Divinity',
  chat_send_message: 'Enviar',
  chat_type_message: 'Escribe tu mensaje...',
  chat_select_guide: 'Selecciona una guía espiritual para comenzar',
  
  // Guides
  guides_title: 'Guías Espirituales',
  guides_browse_all: 'Explorar Todas las Guías',
  guides_create_custom: 'Crear Guía Personalizada',
  guides_saved: 'Guías Guardadas',
  
  // Profile
  profile_title: 'Tu Perfil',
  profile_edit: 'Editar Perfil',
  profile_subscription: 'Suscripción',
  profile_settings: 'Configuración',
  
  // Faith Traditions
  faith_christianity: 'Cristianismo',
  faith_islam: 'Islam',
  faith_hinduism: 'Hinduismo',
  faith_buddhism: 'Budismo',
  faith_judaism: 'Judaísmo',
  faith_sikhism: 'Sijismo',
  faith_taoism: 'Taoísmo',
  faith_shinto: 'Sintoísmo',
  faith_jainism: 'Jainismo',
  faith_bahai: 'Fe Bahái',
  faith_confucianism: 'Confucianismo',
  faith_polytheism: 'Politeísmo',
  
  // Subscription
  sub_free_tier: 'Nivel Gratuito',
  sub_premium_tier: 'Premium',
  sub_upgrade_now: 'Actualizar Ahora',
  sub_current_plan: 'Plan Actual',
  
  // Time Greetings
  greeting_morning: 'Buenos Días',
  greeting_afternoon: 'Buenas Tardes',
  greeting_evening: 'Buenas Tardes',
  greeting_night: 'Buenas Noches',
  
  // Moods
  mood_joyful: 'Alegre',
  mood_peaceful: 'Pacífico',
  mood_grateful: 'Agradecido',
  mood_contemplative: 'Contemplativo',
  mood_struggling: 'Luchando',
  mood_hopeful: 'Esperanzado',
};

// Arabic translations (RTL)
const ar: Record<TranslationKey, string> = {
  // Common
  common_welcome: 'أهلا بك',
  common_loading: 'جاري التحميل...',
  common_save: 'حفظ',
  common_cancel: 'إلغاء',
  common_delete: 'حذف',
  common_edit: 'تعديل',
  common_back: 'رجوع',
  common_next: 'التالي',
  common_continue: 'متابعة',
  common_skip: 'تخطي',
  common_done: 'تم',
  common_close: 'إغلاق',
  common_language: 'اللغة',
  
  // Navigation
  nav_guides: 'الأدلة',
  nav_circle: 'الدائرة',
  nav_chat: 'المحادثة',
  nav_leaders: 'القادة',
  nav_profile: 'الملف الشخصي',
  nav_journal: 'المذكرات',
  nav_goals: 'الأهداف',
  nav_privacy: 'الخصوصية',
  
  // Home/Landing
  home_hero_title: 'مرشدك الروحي المخصص',
  home_hero_subtitle: 'اختبر التوجيه الأخلاقي للذكاء الاصطناعي عبر جميع التقاليد الإيمانية مع أكثر من 50 صورة رمزية روحانية',
  home_get_started: 'ابدأ',
  
  // Registration
  reg_title: 'ابدأ رحلتك الروحية',
  reg_subtitle: 'أنشئ حسابك للحصول على إرشادات مخصصة',
  reg_name_label: 'الاسم الكامل',
  reg_email_label: 'البريد الإلكتروني',
  reg_age_label: 'عمري 13 سنة أو أكثر',
  reg_create_account: 'إنشاء حساب',
  reg_sign_in: 'تسجيل الدخول',
  reg_terms_agree: 'أوافق على شروط الخدمة وسياسة الخصوصية',
  
  // Spiritual Journal
  journal_title: 'المذكرات الروحية',
  journal_subtitle: 'تأمل في رحلتك الروحية مع مطالبات موجهة',
  journal_create_entry: 'إنشاء إدخال',
  journal_mood_label: 'كيف تشعر؟',
  journal_prompt_label: 'مطالبة اليوم',
  journal_entry_saved: 'تم حفظ الإدخال بنجاح',
  journal_entry_deleted: 'تم حذف الإدخال',
  journal_no_entries: 'لا توجد إدخالات في المذكرات بعد. ابدأ إدخالك الأول اليوم!',
  journal_todays_prompt: 'مطالبة اليوم',
  journal_write_tab: 'كتابة',
  journal_history_tab: 'السجل',
  
  // Spiritual Goals
  goals_title: 'الأهداف الروحية',
  goals_subtitle: 'بناء عادات روحية دائمة مع التتبع اليومي',
  goals_create_goal: 'إنشاء هدف',
  goals_mark_complete: 'وضع علامة مكتمل',
  goals_streak: 'سلسلة {count} يوم',
  goals_milestone_7: 'محارب 7 أيام',
  goals_milestone_30: 'سيد 30 يوم',
  goals_milestone_100: 'أسطورة 100 يوم',
  goals_category_meditation: 'التأمل',
  goals_category_prayer: 'الصلاة',
  goals_category_study: 'دراسة الكتاب المقدس',
  goals_category_service: 'الخدمة',
  goals_category_gratitude: 'الامتنان',
  goals_category_custom: 'مخصص',
  
  // Crisis Support
  crisis_title: 'موارد دعم الأزمات',
  crisis_subtitle: 'أنت لست وحدك. المساعدة متاحة على مدار الساعة طوال أيام الأسبوع',
  crisis_need_help: 'تحتاج مساعدة؟',
  crisis_not_alone: 'أنت لست وحدك',
  crisis_call_now: 'اتصل الآن',
  crisis_text_support: 'دعم نصي',
  crisis_web_chat: 'محادثة ويب',
  crisis_disclaimer: 'DivinityAGI هي أداة ذكاء اصطناعي ولا يمكنها تقديم دعم طارئ. إذا كنت في خطر فوري، يرجى الاتصال بخدمات الطوارئ.',
  
  // Privacy Dashboard
  privacy_title: 'الخصوصية والبيانات',
  privacy_subtitle: 'بياناتك، سيطرتك',
  privacy_export_data: 'تصدير البيانات',
  privacy_delete_all: 'حذف جميع البيانات',
  privacy_analytics: 'تحليلات الاستخدام',
  privacy_marketing: 'اتصالات التسويق',
  privacy_location: 'خدمات الموقع',
  privacy_commitment: 'نحن نخزن بياناتك محليًا ولا نبيع معلوماتك الشخصية أبدًا.',
  
  // Chat
  chat_title: 'محادثة Divinity',
  chat_send_message: 'إرسال',
  chat_type_message: 'اكتب رسالتك...',
  chat_select_guide: 'اختر مرشدًا روحيًا للبدء',
  
  // Guides
  guides_title: 'الأدلة الروحية',
  guides_browse_all: 'تصفح جميع الأدلة',
  guides_create_custom: 'إنشاء دليل مخصص',
  guides_saved: 'الأدلة المحفوظة',
  
  // Profile
  profile_title: 'ملفك الشخصي',
  profile_edit: 'تعديل الملف الشخصي',
  profile_subscription: 'الاشتراك',
  profile_settings: 'الإعدادات',
  
  // Faith Traditions
  faith_christianity: 'المسيحية',
  faith_islam: 'الإسلام',
  faith_hinduism: 'الهندوسية',
  faith_buddhism: 'البوذية',
  faith_judaism: 'اليهودية',
  faith_sikhism: 'السيخية',
  faith_taoism: 'الطاوية',
  faith_shinto: 'الشنتو',
  faith_jainism: 'الجاينية',
  faith_bahai: 'البهائية',
  faith_confucianism: 'الكونفوشيوسية',
  faith_polytheism: 'تعدد الآلهة',
  
  // Subscription
  sub_free_tier: 'المستوى المجاني',
  sub_premium_tier: 'بريميوم',
  sub_upgrade_now: 'ترقية الآن',
  sub_current_plan: 'الخطة الحالية',
  
  // Time Greetings
  greeting_morning: 'صباح الخير',
  greeting_afternoon: 'مساء الخير',
  greeting_evening: 'مساء الخير',
  greeting_night: 'ليلة سعيدة',
  
  // Moods
  mood_joyful: 'مبهج',
  mood_peaceful: 'هادئ',
  mood_grateful: 'ممتن',
  mood_contemplative: 'تأملي',
  mood_struggling: 'يكافح',
  mood_hopeful: 'متفائل',
};

// Hindi translations
const hi: Record<TranslationKey, string> = {
  // Common
  common_welcome: 'स्वागत है',
  common_loading: 'लोड हो रहा है...',
  common_save: 'सहेजें',
  common_cancel: 'रद्द करें',
  common_delete: 'हटाएं',
  common_edit: 'संपादित करें',
  common_back: 'वापस',
  common_next: 'अगला',
  common_continue: 'जारी रखें',
  common_skip: 'छोड़ें',
  common_done: 'पूर्ण',
  common_close: 'बंद करें',
  common_language: 'भाषा',
  
  // Navigation
  nav_guides: 'मार्गदर्शक',
  nav_circle: 'वृत्त',
  nav_chat: 'चैट',
  nav_leaders: 'नेता',
  nav_profile: 'प्रोफ़ाइल',
  nav_journal: 'डायरी',
  nav_goals: 'लक्ष्य',
  nav_privacy: 'गोपनीयता',
  
  // Home/Landing
  home_hero_title: 'आपका व्यक्तिगत आध्यात्मिक मार्गदर्शक',
  home_hero_subtitle: '50+ आध्यात्मिक अवतारों के साथ सभी धार्मिक परंपराओं में नैतिक AI मार्गदर्शन का अनुभव करें',
  home_get_started: 'शुरू करें',
  
  // Registration
  reg_title: 'अपनी आध्यात्मिक यात्रा शुरू करें',
  reg_subtitle: 'व्यक्तिगत मार्गदर्शन अनलॉक करने के लिए अपना खाता बनाएं',
  reg_name_label: 'पूरा नाम',
  reg_email_label: 'ईमेल पता',
  reg_age_label: 'मैं 13 वर्ष या उससे अधिक उम्र का हूं',
  reg_create_account: 'खाता बनाएं',
  reg_sign_in: 'साइन इन करें',
  reg_terms_agree: 'मैं सेवा की शर्तों और गोपनीयता नीति से सहमत हूं',
  
  // Spiritual Journal
  journal_title: 'आध्यात्मिक डायरी',
  journal_subtitle: 'निर्देशित संकेतों के साथ अपनी आध्यात्मिक यात्रा पर विचार करें',
  journal_create_entry: 'प्रविष्टि बनाएं',
  journal_mood_label: 'आप कैसा महसूस कर रहे हैं?',
  journal_prompt_label: 'आज का संकेत',
  journal_entry_saved: 'प्रविष्टि सफलतापूर्वक सहेजी गई',
  journal_entry_deleted: 'प्रविष्टि हटा दी गई',
  journal_no_entries: 'अभी तक कोई डायरी प्रविष्टि नहीं। आज अपनी पहली प्रविष्टि शुरू करें!',
  journal_todays_prompt: 'आज का संकेत',
  journal_write_tab: 'लिखें',
  journal_history_tab: 'इतिहास',
  
  // Spiritual Goals
  goals_title: 'आध्यात्मिक लक्ष्य',
  goals_subtitle: 'दैनिक ट्रैकिंग के साथ स्थायी आध्यात्मिक आदतें बनाएं',
  goals_create_goal: 'लक्ष्य बनाएं',
  goals_mark_complete: 'पूर्ण चिह्नित करें',
  goals_streak: '{count} दिन की लकीर',
  goals_milestone_7: '7 दिन का योद्धा',
  goals_milestone_30: '30 दिन का मास्टर',
  goals_milestone_100: '100 दिन की किंवदंती',
  goals_category_meditation: 'ध्यान',
  goals_category_prayer: 'प्रार्थना',
  goals_category_study: 'शास्त्र अध्ययन',
  goals_category_service: 'सेवा',
  goals_category_gratitude: 'कृतज्ञता',
  goals_category_custom: 'कस्टम',
  
  // Crisis Support
  crisis_title: 'संकट समर्थन संसाधन',
  crisis_subtitle: 'आप अकेले नहीं हैं। मदद 24/7 उपलब्ध है',
  crisis_need_help: 'मदद चाहिए?',
  crisis_not_alone: 'आप अकेले नहीं हैं',
  crisis_call_now: 'अभी कॉल करें',
  crisis_text_support: 'टेक्स्ट समर्थन',
  crisis_web_chat: 'वेब चैट',
  crisis_disclaimer: 'DivinityAGI एक AI उपकरण है और आपातकालीन समर्थन प्रदान नहीं कर सकता। यदि आप तत्काल खतरे में हैं, तो कृपया आपातकालीन सेवाओं को कॉल करें।',
  
  // Privacy Dashboard
  privacy_title: 'गोपनीयता और डेटा',
  privacy_subtitle: 'आपका डेटा, आपका नियंत्रण',
  privacy_export_data: 'डेटा निर्यात करें',
  privacy_delete_all: 'सभी डेटा हटाएं',
  privacy_analytics: 'उपयोग विश्लेषण',
  privacy_marketing: 'विपणन संचार',
  privacy_location: 'स्थान सेवाएं',
  privacy_commitment: 'हम आपके डेटा को स्थानीय रूप से संग्रहीत करते हैं और कभी भी आपकी व्यक्तिगत जानकारी नहीं बेचते हैं।',
  
  // Chat
  chat_title: 'Divinity चैट',
  chat_send_message: 'भेजें',
  chat_type_message: 'अपना संदेश टाइप करें...',
  chat_select_guide: 'शुरू करने के लिए एक आध्यात्मिक मार्गदर्शक चुनें',
  
  // Guides
  guides_title: 'आत्मा मार्गदर्शक',
  guides_browse_all: 'सभी मार्गदर्शकों को ब्राउज़ करें',
  guides_create_custom: 'कस्टम मार्गदर्शक बनाएं',
  guides_saved: 'सहेजे गए मार्गदर्शक',
  
  // Profile
  profile_title: 'आपकी प्रोफ़ाइल',
  profile_edit: 'प्रोफ़ाइल संपादित करें',
  profile_subscription: 'सदस्यता',
  profile_settings: 'सेटिंग्स',
  
  // Faith Traditions
  faith_christianity: 'ईसाई धर्म',
  faith_islam: 'इस्लाम',
  faith_hinduism: 'हिंदू धर्म',
  faith_buddhism: 'बौद्ध धर्म',
  faith_judaism: 'यहूदी धर्म',
  faith_sikhism: 'सिख धर्म',
  faith_taoism: 'ताओवाद',
  faith_shinto: 'शिंतो',
  faith_jainism: 'जैन धर्म',
  faith_bahai: 'बहाई धर्म',
  faith_confucianism: 'कन्फ्यूशीवाद',
  faith_polytheism: 'बहुदेववाद',
  
  // Subscription
  sub_free_tier: 'मुफ्त स्तर',
  sub_premium_tier: 'प्रीमियम',
  sub_upgrade_now: 'अभी अपग्रेड करें',
  sub_current_plan: 'वर्तमान योजना',
  
  // Time Greetings
  greeting_morning: 'सुप्रभात',
  greeting_afternoon: 'शुभ दोपहर',
  greeting_evening: 'शुभ संध्या',
  greeting_night: 'शुभ रात्रि',
  
  // Moods
  mood_joyful: 'खुशहाल',
  mood_peaceful: 'शांतिपूर्ण',
  mood_grateful: 'कृतज्ञ',
  mood_contemplative: 'चिंतनशील',
  mood_struggling: 'संघर्षरत',
  mood_hopeful: 'आशान्वित',
};

// Chinese (Simplified) translations
const zh: Record<TranslationKey, string> = {
  // Common
  common_welcome: '欢迎',
  common_loading: '加载中...',
  common_save: '保存',
  common_cancel: '取消',
  common_delete: '删除',
  common_edit: '编辑',
  common_back: '返回',
  common_next: '下一步',
  common_continue: '继续',
  common_skip: '跳过',
  common_done: '完成',
  common_close: '关闭',
  common_language: '语言',
  
  // Navigation
  nav_guides: '指南',
  nav_circle: '圈子',
  nav_chat: '聊天',
  nav_leaders: '领袖',
  nav_profile: '个人资料',
  nav_journal: '日记',
  nav_goals: '目标',
  nav_privacy: '隐私',
  
  // Home/Landing
  home_hero_title: '您的个性化精神向导',
  home_hero_subtitle: '体验跨越所有信仰传统的道德AI指导，拥有50多个精神化身',
  home_get_started: '开始',
  
  // Registration
  reg_title: '开始您的精神之旅',
  reg_subtitle: '创建您的账户以解锁个性化指导',
  reg_name_label: '全名',
  reg_email_label: '电子邮件地址',
  reg_age_label: '我已年满13岁',
  reg_create_account: '创建账户',
  reg_sign_in: '登录',
  reg_terms_agree: '我同意服务条款和隐私政策',
  
  // Spiritual Journal
  journal_title: '精神日记',
  journal_subtitle: '通过引导提示反思您的精神之旅',
  journal_create_entry: '创建条目',
  journal_mood_label: '您感觉如何？',
  journal_prompt_label: '今日提示',
  journal_entry_saved: '条目已成功保存',
  journal_entry_deleted: '条目已删除',
  journal_no_entries: '还没有日记条目。今天开始您的第一个条目！',
  journal_todays_prompt: '今日提示',
  journal_write_tab: '写作',
  journal_history_tab: '历史',
  
  // Spiritual Goals
  goals_title: '精神目标',
  goals_subtitle: '通过每日跟踪建立持久的精神习惯',
  goals_create_goal: '创建目标',
  goals_mark_complete: '标记完成',
  goals_streak: '{count}天连续',
  goals_milestone_7: '7天战士',
  goals_milestone_30: '30天大师',
  goals_milestone_100: '100天传奇',
  goals_category_meditation: '冥想',
  goals_category_prayer: '祈祷',
  goals_category_study: '经文学习',
  goals_category_service: '服务',
  goals_category_gratitude: '感恩',
  goals_category_custom: '自定义',
  
  // Crisis Support
  crisis_title: '危机支持资源',
  crisis_subtitle: '您并不孤单。24/7提供帮助',
  crisis_need_help: '需要帮助？',
  crisis_not_alone: '您并不孤单',
  crisis_call_now: '立即致电',
  crisis_text_support: '短信支持',
  crisis_web_chat: '在线聊天',
  crisis_disclaimer: 'DivinityAGI是一个AI工具，无法提供紧急支持。如果您处于紧急危险中，请致电紧急服务。',
  
  // Privacy Dashboard
  privacy_title: '隐私和数据',
  privacy_subtitle: '您的数据，您的控制',
  privacy_export_data: '导出数据',
  privacy_delete_all: '删除所有数据',
  privacy_analytics: '使用分析',
  privacy_marketing: '营销通讯',
  privacy_location: '位置服务',
  privacy_commitment: '我们在本地存储您的数据，绝不出售您的个人信息。',
  
  // Chat
  chat_title: 'Divinity聊天',
  chat_send_message: '发送',
  chat_type_message: '输入您的消息...',
  chat_select_guide: '选择一个精神向导开始',
  
  // Guides
  guides_title: '精神向导',
  guides_browse_all: '浏览所有向导',
  guides_create_custom: '创建自定义向导',
  guides_saved: '已保存的向导',
  
  // Profile
  profile_title: '您的个人资料',
  profile_edit: '编辑个人资料',
  profile_subscription: '订阅',
  profile_settings: '设置',
  
  // Faith Traditions
  faith_christianity: '基督教',
  faith_islam: '伊斯兰教',
  faith_hinduism: '印度教',
  faith_buddhism: '佛教',
  faith_judaism: '犹太教',
  faith_sikhism: '锡克教',
  faith_taoism: '道教',
  faith_shinto: '神道教',
  faith_jainism: '耆那教',
  faith_bahai: '巴哈伊教',
  faith_confucianism: '儒教',
  faith_polytheism: '多神教',
  
  // Subscription
  sub_free_tier: '免费层',
  sub_premium_tier: '高级版',
  sub_upgrade_now: '立即升级',
  sub_current_plan: '当前计划',
  
  // Time Greetings
  greeting_morning: '早上好',
  greeting_afternoon: '下午好',
  greeting_evening: '晚上好',
  greeting_night: '晚安',
  
  // Moods
  mood_joyful: '快乐',
  mood_peaceful: '平静',
  mood_grateful: '感恩',
  mood_contemplative: '沉思',
  mood_struggling: '挣扎',
  mood_hopeful: '充满希望',
};

// Additional languages with minimal translations (can be expanded)
const fr: Record<TranslationKey, string> = { ...en }; // French - to be completed
const pt: Record<TranslationKey, string> = { ...en }; // Portuguese - to be completed
const ru: Record<TranslationKey, string> = { ...en }; // Russian - to be completed
const de: Record<TranslationKey, string> = { ...en }; // German - to be completed
const ja: Record<TranslationKey, string> = { ...en }; // Japanese - to be completed

// Export all translations
export const translations: Record<Language, Record<TranslationKey, string>> = {
  en,
  es,
  ar,
  hi,
  zh,
  fr,
  pt,
  ru,
  de,
  ja,
};
