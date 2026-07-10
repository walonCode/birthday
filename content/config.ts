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

export type Balloon = {
  message: string;
  color: string;
};

// ── The star of the show ──
const name = "Mary Amelda Animata Sannoh";

// ── Photo gallery (real photos live in public/images/; edit captions freely) ──
const photos: Photo[] = [
  {
    src: "/images/birthday1.jpeg",
    alt: "A favorite photo of Amelda",
    emoji: "📸",
    gradient: "from-rose-400/50 to-amber-300/40",
    caption: "The smile that lights up every room",
  },
  {
    src: "/images/birthday2.jpeg",
    alt: "Amelda celebrating",
    emoji: "🥳",
    gradient: "from-amber-400/50 to-pink-400/40",
    caption: "Pure joy, captured",
  },
  {
    src: "/images/birthday3.jpeg",
    alt: "Amelda in golden light",
    emoji: "🌅",
    gradient: "from-pink-500/40 to-orange-300/40",
    caption: "Golden hour, golden girl",
  },
  {
    src: "/images/birthday4.jpeg",
    alt: "A quiet, happy moment of Amelda",
    emoji: "☕",
    gradient: "from-orange-300/40 to-rose-400/40",
    caption: "Soft, happy, and glowing",
  },
  {
    src: "/images/birthday5.jpeg",
    alt: "Amelda shining",
    emoji: "💃",
    gradient: "from-fuchsia-400/40 to-amber-300/40",
    caption: "Born to shine",
  },
  {
    src: "/images/birthday6.jpeg",
    alt: "Amelda, radiant as always",
    emoji: "🫶",
    gradient: "from-amber-300/50 to-rose-500/40",
    caption: "Effortlessly radiant",
  },
  {
    src: "/images/birthday7.jpeg",
    alt: "Amelda — here's to 23",
    emoji: "🎂",
    gradient: "from-rose-500/40 to-amber-400/40",
    caption: "Here's to 23 💛",
  },
];

// ── Videos (real clips live in public/videos/; edit titles freely) ──
const videos: Video[] = [
  {
    src: "/videos/video1.mp4",
    title: "Amelda, being unforgettable",
    emoji: "🎬",
    gradient: "from-rose-500/40 to-amber-400/40",
  },
  {
    src: "/videos/video2.mp4",
    title: "The highlight reel of you",
    emoji: "✨",
    gradient: "from-amber-400/40 to-fuchsia-400/30",
  },
  {
    src: "/videos/video3.mp4",
    title: "One more of you being you 💛",
    emoji: "💛",
    gradient: "from-fuchsia-400/40 to-rose-500/40",
  },
];

// ── Guest wishes wall ──
const wishes: Wish[] = [
  // {
  //   from: "",
  //   message:
  //     "From your first breath you've been my greatest gift. Watching you become who you are is the joy of my life.",
  //   emoji: "💝",
  // },
  {
    from: "Swaray",
    message:
      "Happy birthday to the friend who shows up — every single time. You make everyone around you braver.",
    emoji: "🎈",
  },
  {
    from: "Walon",
    message:
      "Another year of you being effortlessly amazing. Save me a slice of cake!",
    emoji: "🍰",
  },
  {
    from: "Haffy",
    message:
      "My darling, may your year be as sweet as you've made all of mine.",
    emoji: "🌹",
  },
  {
    from: "Conrad",
    message:
      "You laughed with me when things were good and sat with me when they weren't. Happiest of birthdays.",
    emoji: "🫂",
  },
  {
    from: "Zainab",
    message:
      "To the person with the biggest heart I know — today the universe celebrates YOU.",
    emoji: "🌟",
  },
  {
    from: "Hawa",
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
  poemTitle: "A Few Words From Us the friends",
  poemLines: [
    "You arrived without an announcement.",
    "No grand entrance. No promise that you'd stay.",
    "Just a quiet presence that settled into the empty spaces of my life,",
    "as though you had always known where the silence hurts the most.",
    "You never asked for the pieces of me that were broken —",
    "you simply held conversations with the part of me",
    "I thought no one would understand.",
    "People often say that friends are the family we choose.",
    "But I didn't choose you. Life did.",
    "And perhaps, for the first time in a long while,",
    "life was unbelievably kind to my gentle heart.",
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

  // ── Her birth date (EDIT ME — used for the "birthday in numbers" stats) ──
  // Turning 23 on 2026-07-11.
  birthDate: "2003-07-11",

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

  // ── Countdown (counts down to her birthday; celebrates on the day) ──
  countdownLabel: `Until ${name.split(" ")[1]} turns ${
    new Date().getFullYear() - new Date("2003-07-11").getFullYear()
  }`,
  countdownCelebrate: `🎉 It's your birthday, ${name.split(" ")[1]}! 🎉`,

  // ── Easter egg (tap her name 5× to unlock) ──
  secretMessage:
    "You found the secret 💛 — of everyone who's ever been celebrated here, none deserved it more than you.",

  // ── Closing starfield ──
  starfieldTagline: "Forever one of our brightest stars ✨",

  // ── Footer ──
  footerText: "Made with love, just for you 💛",

  // ── Hosting (EDIT ME once deployed — used for sitemap, robots, and
  //    social-share previews) ──
  siteUrl: "https://birthday.walonfoundation.com",
};
