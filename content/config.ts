// ─────────────────────────────────────────────────────────────
// 🎂 EDIT THIS FILE to personalize the birthday page.
// Everything the page displays lives here — name, poem, photos,
// videos, wishes, and the music file.
//
// To add real photos/videos: drop files into `public/photos/` or
// `public/videos/`, then fill in the `src` field below
// (e.g. src: "/photos/1.jpg"). Leave `src` out to keep the
// placeholder gradient + emoji.
// ─────────────────────────────────────────────────────────────

export type Photo = {
  src?: string;
  alt: string;
  emoji: string;
  gradient: string;
  caption?: string;
};

export type Video = {
  src?: string;
  title: string;
  emoji: string;
  gradient: string;
};

export type Wish = {
  from: string;
  message: string;
  emoji: string;
};

export type Song = {
  src: string;
  title: string;
  credit?: string;
};

export type Balloon = {
  message: string;
  color: string;
};

// ── The star of the show ──
const name = "Mary Amelda Animata Sannoh";

// ── Photo gallery (placeholders — add `src` to use real photos) ──
const photos: Photo[] = [
  {
    alt: "A favorite memory together",
    emoji: "📸",
    gradient: "from-rose-400/50 to-amber-300/40",
    caption: "That day we couldn't stop laughing",
  },
  {
    alt: "Celebrating together",
    emoji: "🥳",
    gradient: "from-amber-400/50 to-pink-400/40",
    caption: "Celebration mode: always on",
  },
  {
    alt: "An adventure we shared",
    emoji: "🌅",
    gradient: "from-pink-500/40 to-orange-300/40",
    caption: "Chasing sunsets",
  },
  {
    alt: "A quiet happy moment",
    emoji: "☕",
    gradient: "from-orange-300/40 to-rose-400/40",
    caption: "The little moments",
  },
  {
    alt: "Dancing the night away",
    emoji: "💃",
    gradient: "from-fuchsia-400/40 to-amber-300/40",
    caption: "Dance floor royalty",
  },
  {
    alt: "Friends forever",
    emoji: "🫶",
    gradient: "from-amber-300/50 to-rose-500/40",
    caption: "Forever kind of friends",
  },
];

// ── Videos (placeholders — add `src` to use real videos) ──
const videos: Video[] = [
  {
    title: "A message from everyone who loves you",
    emoji: "🎬",
    gradient: "from-rose-500/40 to-amber-400/40",
  },
  {
    title: "The highlight reel of your year",
    emoji: "✨",
    gradient: "from-amber-400/40 to-fuchsia-400/30",
  },
];

// ── Guest wishes wall ──
const wishes: Wish[] = [
  {
    from: "Mom",
    message:
      "From your first breath you've been my greatest gift. Watching you become who you are is the joy of my life.",
    emoji: "💝",
  },
  {
    from: "Alex",
    message:
      "Happy birthday to the friend who shows up — every single time. You make everyone around you braver.",
    emoji: "🎈",
  },
  {
    from: "Jordan",
    message:
      "Another year of you being effortlessly amazing. Save me a slice of cake!",
    emoji: "🍰",
  },
  {
    from: "Nana",
    message:
      "My darling, may your year be as sweet as you've made all of mine.",
    emoji: "🌹",
  },
  {
    from: "Sam",
    message:
      "You laughed with me when things were good and sat with me when they weren't. Happiest of birthdays.",
    emoji: "🫂",
  },
  {
    from: "Riley",
    message:
      "To the person with the biggest heart I know — today the universe celebrates YOU.",
    emoji: "🌟",
  },
  {
    from: "Taylor",
    message:
      "Cheers to you! May your candles burn bright and your wishes all come true.",
    emoji: "🥂",
  },
];

export const config = {
  name,
  headline: `Happy Birthday, ${name.split(" ")[1]}!`,
  subheadline:
    "Today the world pauses to celebrate the most wonderful soul we know 💛",

  // ── Intro gate ──
  introEyebrow: "Someone made this just for you…",
  introText: "Tap to open your surprise",

  // ── Poem ──
  poemTitle: "A Few Words From the Heart",
  poemLines: [
    "Some people walk into your life",
    "and quietly turn the lights on.",
    "You are laughter in the hard weeks,",
    "the warm hand when the road gets long.",
    "Every room is softer when you're in it,",
    "every story better when you tell it.",
    "So today, for once, let us hold the light —",
    "and shine it all on you.",
    "May this year hand you every dream",
    "you were too humble to ask for.",
    "Happy birthday, beautiful soul.",
    "The best is still ahead. 💛",
  ],

  // ── Section titles ──
  galleryTitle: "Moments We Treasure",
  gallerySubtitle: "A few of the memories that made us smile",
  videosTitle: "Press Play on the Memories",
  wishesTitle: "Words From People Who Love You",

  photos,
  videos,
  wishes,

  // ── Cake finale ──
  cakeTitle: "Make a Wish",
  cakeSubtitle: "Tap each candle to blow it out",
  cakeDoneMessage: "Your wish is on its way… Happy Birthday! 🎉",
  relightLabel: "Relight the candles",
  candleCount: 5,

  // ── Music playlist (all files live in public/audio/) ──
  songs: [
    {
      src: "/audio/birthday-song.mp3",
      title: "Happy Birthday to You (instrumental)",
      // Public domain — Pracchia-78, Wikimedia Commons
    },
    {
      src: "/audio/happy-birthday-vocal.mp3",
      title: "Happy Birthday to You (sung)",
      // CC-BY-SA 3.0 — Alexander Stephens / Hanns Christian Müller, Wikimedia Commons
      credit: "Alexander Stephens, CC-BY-SA 3.0, via Wikimedia Commons",
    },
    {
      src: "/audio/happy-birthday-jazz-trio.mp3",
      title: "Happy Birthday (jazz trio)",
      // CC0 — vole.wtf/happy-birthday
    },
    {
      src: "/audio/happy-birthday-orchestral.mp3",
      title: "Happy Birthday (orchestral)",
      // CC0 — vole.wtf/happy-birthday
    },
    {
      src: "/audio/happy-birthday-acoustic-guitar.mp3",
      title: "Happy Birthday (acoustic guitar)",
      // CC0 — vole.wtf/happy-birthday
    },
  ] as Song[],

  // ── Her birth date (EDIT ME — used for the "birthday in numbers" stats) ──
  birthDate: "1998-07-09",

  // ── Pop-the-balloons (each balloon hides a message) ──
  balloonsTitle: "Pop a Balloon",
  balloonsSubtitle: "There's a little something inside each one",
  balloons: [
    { message: "You have the kindest heart we know 💛", color: "#e8788a" },
    { message: "Your hugs fix bad days 🤗", color: "#d4a24e" },
    { message: "You're braver than you believe 🦁", color: "#b83b5e" },
    { message: "The room lights up when you walk in ✨", color: "#f3d9a4" },
    { message: "You deserve every good thing coming 🌈", color: "#e8788a" },
    { message: "Never stop being exactly you 💫", color: "#d4a24e" },
  ] as Balloon[],

  // ── Birthday in numbers ──
  statsTitle: "You, In Numbers",
  statsSubtitle: "A little math on how amazing you've been",

  // ── Piñata ──
  pinataTitle: "Give It a Whack!",
  pinataSubtitle: "Tap the piñata until it bursts",
  pinataHits: 7,
  pinataMessage: "Sweet — just like you! 🍬",

  // ── Fireworks ──
  fireworksTitle: "A Sky Full of You",
  fireworksButton: "Light up the sky 🎆",

  // ── Little love notes that pop up while scrolling ──
  loveNotes: [
    "You're someone's favorite person, you know 💛",
    "The world got luckier the day you were born ✨",
    "Your laugh is somebody's favorite sound 🎶",
    "You make ordinary days feel golden 🌟",
    "Someone is smiling right now thinking of you 🥰",
    "Never forget how loved you are 💌",
  ],

  // ── One last surprise (after the cake) ──
  finalTitle: "One More Thing…",
  finalButtonLabel: "Open your letter 💌",
  finalLetter: [
    `Dear ${name.split(" ")[1]},`,
    "If you've scrolled all the way here, know this: every word, every color, every little sparkle on this page was chosen for you.",
    "You give so much of yourself to everyone around you — today we wanted to give a little back.",
    "May this new year of your life be soft where you need rest, bright where you need joy, and full of people who love you exactly as you are.",
    "Happy birthday. We love you more than this page could ever say.",
    "— Everyone who loves you",
  ],

  // ── Footer ──
  footerText: "Made with love, just for you 💛",

  // ── Hosting (EDIT ME once deployed — used for sitemap, robots, and
  //    social-share previews) ──
  siteUrl: "https://birthday.example.com",
};
