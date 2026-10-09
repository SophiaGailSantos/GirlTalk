/*
 * Health topics hub data.
 *
 * `articles` links a category to slugs from data/articles.js so every topic
 * connects to real reading material, and `journeys` / `symptoms` power the
 * "how can I use this?" entry points at the top of the in-app hub.
 */

export const JOURNEYS = [
  {
    id: 'cycle',
    emoji: '🌸',
    title: 'Understand my cycle',
    text: 'Phases, symptoms and what is normal for your body.',
    categories: ['Menstrual Health'],
    articles: ['understanding-your-menstrual-cycle', 'simple-ways-to-practice-self-care-during-your-period', 'when-should-you-pay-attention-to-changes-in-your-cycle'],
  },
  {
    id: 'birth-control',
    emoji: '💊',
    title: 'Stay on my birth control',
    text: 'Reminders, missed doses and questions worth asking.',
    categories: ['Birth Control'],
    articles: [],
  },
  {
    id: 'conceive',
    emoji: '🤰',
    title: 'I want to get pregnant',
    text: 'Fertility, ovulation and preparing for appointments.',
    categories: ['Pregnancy', 'Reproductive Health'],
    articles: ['understanding-your-menstrual-cycle'],
  },
  {
    id: 'condition',
    emoji: '🩺',
    title: 'Manage a condition',
    text: 'PCOS, endometriosis, fibroids — symptoms and check-ups.',
    categories: ['General Health', 'Menstrual Health'],
    articles: ['when-should-you-pay-attention-to-changes-in-your-cycle'],
  },
  {
    id: 'mind',
    emoji: '🌙',
    title: 'Feel better, day to day',
    text: 'Sleep, mood, energy and self-care that actually fits.',
    categories: ['Mental Wellness', 'Self-Care', 'Fitness'],
    articles: ['sleep-energy-and-your-cycle-what-to-expect', 'gentle-nutrition-tips-for-every-phase-of-your-cycle', 'cycle-synced-journaling-a-beginner-friendly-practice'],
  },
]

export const SYMPTOMS = [
  'Cramps', 'Bloating', 'Fatigue', 'Headaches', 'Acne', 'Low mood',
  'Poor sleep', 'Heavy flow', 'Stress', 'Low energy', 'Back pain', 'Brain fog',
]

export const SYMPTOM_GUIDE = {
  Cramps: ['Menstrual Health', 'Self-Care'],
  Bloating: ['Nutrition', 'Menstrual Health'],
  Fatigue: ['Sleep', 'Mental Wellness'],
  Headaches: ['General Health', 'Nutrition'],
  Acne: ['Nutrition', 'Self-Care'],
  'Low mood': ['Mental Wellness'],
  'Poor sleep': ['Mental Wellness', 'Self-Care'],
  'Heavy flow': ['Menstrual Health', 'General Health'],
  Stress: ['Mental Wellness', 'Self-Care'],
  'Low energy': ['Fitness', 'Nutrition'],
  'Back pain': ['Fitness', 'Menstrual Health'],
  'Brain fog': ['Sleep', 'Nutrition'],
}

/* Sleep is a real category people search for; keep it out of the marketing list. */
export const EXTRA_CATEGORIES = [
  {
    name: 'Sleep',
    icon: 'moon',
    desc: 'Rest, recovery and why sleep changes across your cycle',
    blurb:
      'Sleep is one of the easiest things to fix and one of the biggest levers on how you feel. Here is how sleep shifts with your hormones, and the small changes that help you fall asleep and stay asleep.',
    topics: [
      'Sleep during your period',
      'Why you wake up at 3am',
      'Wind-down routines',
      'Caffeine and cycle hormones',
    ],
    articles: ['sleep-energy-and-your-cycle-what-to-expect'],
  },
]

export const CATEGORIES = [
  {
    name: 'Menstrual Health',
    icon: 'drop',
    desc: 'Cycles, periods, symptoms and tracking',
    blurb:
      'Your period is one part of a four-phase cycle. Understanding each phase helps you know what is normal, what is worth tracking, and what is worth asking a doctor about.',
    topics: ['Understanding your cycle', 'PMS and period symptoms', 'Irregular periods', 'When to see a doctor'],
    articles: ['understanding-your-menstrual-cycle', 'simple-ways-to-practice-self-care-during-your-period', 'when-should-you-pay-attention-to-changes-in-your-cycle'],
  },
  {
    name: 'Reproductive Health',
    icon: 'orbit',
    desc: 'Fertility, ovulation and reproductive care',
    blurb:
      'Fertility is one of the most common reasons people track their cycle. Learn how ovulation works, what the signs are, and how to plan ahead with a clinician.',
    topics: ['Fertility basics', 'Signs of ovulation', 'PCOS explained', 'Planning ahead'],
    articles: ['understanding-your-menstrual-cycle'],
  },
  {
    name: 'Sexual Health',
    icon: 'shield',
    desc: 'Consent, protection and open conversations',
    blurb:
      'Good sexual health is physical, emotional and practical. This covers protection, testing, consent conversations and what changes in libido across your cycle.',
    topics: ['Safe practices', 'Talking with a partner', 'STI basics', 'Changes in libido'],
    articles: [],
  },
  {
    name: 'Birth Control',
    icon: 'pill',
    desc: 'Methods, schedules and common questions',
    blurb:
      'Every method has its own rhythm. Set reminders here so you never miss a dose, and see what to do when you do — plus which questions to ask at your next appointment.',
    topics: ['Pill reminders', 'IUDs explained', 'What to do about missed doses', 'Choosing a method'],
    articles: [],
  },
  {
    name: 'Pregnancy',
    icon: 'calendar',
    desc: 'Trimesters, preparation and care',
    blurb:
      'From planning to postpartum, a calm checklist for each stage — including the appointments worth booking and the vitamins worth taking.',
    topics: ['Trimester guide', 'Prenatal vitamins', 'Appointment checklist', 'Postpartum basics'],
    articles: [],
  },
  {
    name: 'Nutrition',
    icon: 'leaf',
    desc: 'Everyday eating for energy and wellbeing',
    blurb:
      'No strict diets — just gentle, practical food ideas matched to what your body needs at different points in your cycle.',
    topics: ['Iron-rich foods', 'Cycle-friendly meals', 'Hydration habits', 'Simple meal prep'],
    articles: ['gentle-nutrition-tips-for-every-phase-of-your-cycle'],
  },
  {
    name: 'Mental Wellness',
    icon: 'moon',
    desc: 'Mood, stress, sleep and self-awareness',
    blurb:
      'Hormones influence mood more than most people realise. Track patterns, manage stress, and build small habits that hold up on the hard days.',
    topics: ['Managing stress', 'Sleep habits', 'Mood swings across your cycle', 'Mindfulness basics'],
    articles: ['sleep-energy-and-your-cycle-what-to-expect', 'cycle-synced-journaling-a-beginner-friendly-practice'],
  },
  {
    name: 'Fitness',
    icon: 'dumbbell',
    desc: 'Movement that fits your cycle and life',
    blurb:
      'Training does not have to stop when you have your period. Learn which intensity suits each phase and how to keep moving without burning out.',
    topics: ['Exercise across your cycle', 'Beginner workouts', 'Why rest days matter', 'Staying active at your desk'],
    articles: ['sleep-energy-and-your-cycle-what-to-expect'],
  },
  {
    name: 'Self-Care',
    icon: 'sparkle',
    desc: 'Routines that help you recharge',
    blurb:
      'Self-care only works if it fits your real life. Start with two-minute habits, then build the routines that genuinely help on low-energy days.',
    topics: ['Evening routines', 'Digital detox', 'Skin and body care', 'Setting boundaries'],
    articles: ['simple-ways-to-practice-self-care-during-your-period', 'cycle-synced-journaling-a-beginner-friendly-practice'],
  },
  {
    name: 'General Health',
    icon: 'pulse',
    desc: 'Everyday health habits and checkups',
    blurb:
      'The unglamorous essentials: check-ups, vitamins, symptoms worth writing down, and knowing when something deserves a doctor’s attention.',
    topics: ['Annual checkups', 'Vitamins and supplements', 'Healthy daily habits', 'Building a symptom journal'],
    articles: ['when-should-you-pay-attention-to-changes-in-your-cycle'],
  },
  ...EXTRA_CATEGORIES,
]

/* All categories including the extra ones, in display order. */
export const ALL_CATEGORIES = CATEGORIES