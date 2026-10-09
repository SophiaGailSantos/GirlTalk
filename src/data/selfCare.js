/*
 * Daily self-care engine.
 *
 * Turns a check-in (mood, energy, symptoms) plus the user's cycle data into a
 * small, specific care plan for today — this is what powers the
 * "Today's care plan" card on the dashboard.
 */

const PHASES = [
  { key: 'menstrual', label: 'Menstrual phase', range: [1, 5] },
  { key: 'follicular', label: 'Follicular phase', range: [6, 13] },
  { key: 'ovulation', label: 'Ovulation', range: [14, 16] },
  { key: 'luteal', label: 'Luteal phase', range: [17, 28] },
]

export function getPhase(day, length = 28) {
  const scaled = Math.round((day / length) * 28)
  const clamped = Math.min(28, Math.max(1, scaled))
  return PHASES.find((p) => clamped >= p.range[0] && clamped <= p.range[1]) || PHASES[3]
}

const TIPS = {
  cycle: {
    menstrual: [
      { icon: '🔥', title: 'Warmth for cramps', detail: 'A heating pad or warm bath eases cramps more effectively than most medicines.' },
      { icon: '💧', title: 'Drink water', detail: 'You lose extra fluid during your period — keep a bottle within reach.' },
      { icon: '🍫', title: 'Iron + something vitamin C', detail: 'Lentils, spinach or meat with berries or citrus helps replace what you lose.' },
      { icon: '🛌', title: 'Earlier nights', detail: 'Energy dips during your period. Protect your sleep window tonight.' },
    ],
    follicular: [
      { icon: '🏃', title: 'Push your training', detail: 'Rising estrogen usually means more strength and stamina right now.' },
      { icon: '🥗', title: 'Fresh, colourful food', detail: 'Vegetables, grains and lean protein support your rising energy.' },
      { icon: '🧠', title: 'Good window for hard work', detail: 'Focus and motivation tend to peak — schedule the demanding task.' },
    ],
    ovulation: [
      { icon: '⚡', title: 'Use your peak energy', detail: 'Many people feel most social and confident around ovulation.' },
      { icon: '💧', title: 'Stay hydrated', detail: 'Keep water close, especially if you exercise today.' },
      { icon: '❤️', title: 'Check in with yourself', detail: 'A quick mood note makes patterns easier to spot later.' },
    ],
    luteal: [
      { icon: '🧘', title: 'Gentle movement only', detail: 'Walks, stretching or yoga beat intense workouts this week.' },
      { icon: '🍌', title: 'Magnesium-rich snacks', detail: 'Bananas, pumpkin seeds and dark chocolate ease cramps and mood swings.' },
      { icon: '📓', title: 'Two minutes of journaling', detail: 'Notice the pattern now so you can plan around it next month.' },
      { icon: '🫖', title: 'Cut the caffeine after 2pm', detail: 'Progesterone makes caffeine hit harder in this phase.' },
    ],
  },
  mood: {
    Struggling: [
      { icon: '🤝', title: 'Reach out to someone', detail: 'Message a friend — you do not have to explain anything.' },
      { icon: '🌤️', title: 'Get morning light', detail: 'Ten minutes outside within an hour of waking lifts mood noticeably.' },
      { icon: '🫂', title: 'Lower the bar today', detail: 'One small thing counts. Rest is productive.' },
    ],
    Low: [
      { icon: '🎧', title: 'Music, not feeds', detail: 'Fifteen minutes of your favourite playlist instead of scrolling.' },
      { icon: '☀️', title: 'Light and movement', detail: 'A short walk lifts low moods faster than forcing yourself.' },
    ],
    Okay: [
      { icon: '🌿', title: 'One small nice thing', detail: 'A flower, a nice meal, a warm shower — small lifts count.' },
    ],
    Good: [
      { icon: '🔥', title: 'Ride the momentum', detail: 'Good day for something you have been putting off.' },
    ],
    Great: [
      { icon: '💛', title: 'Note what worked', detail: 'Write down why today felt good — it helps you repeat it.' },
    ],
  },
  energy: {
    Low: [
      { icon: '🪫', title: 'Lower your output', detail: 'Reschedule one thing. Rest is part of the plan, not a break from it.' },
      { icon: '🥚', title: 'Easy energy food', detail: 'Protein plus complex carbs beats sugar when energy is low.' },
    ],
    Okay: [
      { icon: '🚶', title: 'Ten-minute walk', detail: 'A short walk reliably turns okay energy into good energy.' },
    ],
    Good: [
      { icon: '💧', title: 'Use the energy well', detail: 'Deep work now, then genuinely rest — not more scrolling.' },
    ],
  },
  symptoms: {
    Cramps: [
      { icon: '🔥', title: 'Heat + gentle stretch', detail: 'Heat on the lower abdomen for 15 minutes is your best first move.' },
      { icon: '🫖', title: 'Ginger or chamomile', detail: 'Warm herbal tea helps relax the cramping muscles.' },
    ],
    Headache: [
      { icon: '💧', title: 'Water first', detail: 'Dehydration is the most common cause — drink a full glass.' },
      { icon: '🖥️', title: 'Dim the screen', detail: 'Reduce bright light and take a screen break for an hour.' },
    ],
    Bloating: [
      { icon: '🧂', title: 'Go easy on salt', detail: 'Salt retains water, which makes bloating visibly worse.' },
      { icon: '🚶', title: 'Move for ten minutes', detail: 'A short walk helps your digestion settle.' },
    ],
    Fatigue: [
      { icon: '🛌', title: 'Nap without guilt', detail: 'Twenty minutes, before 3pm — it restores energy without wrecking tonight.' },
      { icon: '🌞', title: 'Morning daylight', detail: 'Bright light early resets your energy for the whole day.' },
    ],
    Other: [
      { icon: '📝', title: 'Write it down', detail: 'Log anything unusual so you can mention it at a check-up.' },
    ],
  },
}

function dedupe(tips) {
  const seen = new Set()
  return tips.filter((t) => {
    if (seen.has(t.title)) return false
    seen.add(t.title)
    return true
  })
}

/*
 * Builds today's care plan. Returns 3–6 concrete actions ranked by what the
 * check-in said matters most today.
 */
export function buildCarePlan({ mood, energy, symptoms = [], cycleDay = null, cycleLength = 28 }) {
  const tips = []

  // Symptoms are the most specific signal, so they lead.
  symptoms.forEach((s) => tips.push(...(TIPS.symptoms[s] || [])))

  if (energy) tips.push(...(TIPS.energy[energy] || []))
  if (mood) tips.push(...(TIPS.mood[mood] || []))

  const phase = cycleDay ? getPhase(cycleDay, cycleLength) : null
  if (phase) tips.push(...(TIPS.cycle[phase.key] || []))

  const plan = dedupe(tips).slice(0, 6)

  return {
    phase,
    tips: plan,
    focus: plan.length
      ? plan[0].title
      : 'Log a check-in and your daily care plan will appear here.',
  }
}

/* Suggestions for the check-in screen, so users tap instead of typing. */
export const MOOD_OPTIONS = ['Struggling', 'Low', 'Okay', 'Good', 'Great']
export const ENERGY_OPTIONS = ['Low', 'Okay', 'Good']
export const SYMPTOM_OPTIONS = ['Cramps', 'Headache', 'Bloating', 'Fatigue', 'Other']