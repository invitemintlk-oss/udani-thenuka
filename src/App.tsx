import React, { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Sparkles, MapPin, ChevronDown, Volume2, VolumeX, X, Hotel, MailOpen, Heart, Stars } from "lucide-react";
import { useInView } from 'react-intersection-observer';
import { readGuestFromLocation } from "./guest";

/**
 * Premium Sri Lankan Wedding Invitation Theme
 * Names: Udani & Thenuka
 * Background: Cream/Sand
 * Accents: Green/Brown
 */

const gateBackground = encodeURI("/Elegant Sage and Gold Wedding Arch.png");
const logoImage = "/WhatsApp_Image_2026-11-09_at_06.44.05-removebg-preview.png";
const heroBackground = "/download.jpg";
const frameTop = "/frame_top.jpg";
const frameMid = "/frame_mid.jpg";
const frameBottom = "/frame_bottom.jpg";
const scrollCard = "/bg_scroll.jpg";
const backgroundMusic = "/ama_anjana_flute.mp3";
const googleScriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL?.trim() || "";

/** iOS / Android block unmuted autoplay; iPadOS may report as MacIntel. */
function isLikelyMobileOrTablet() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  if (/iPhone|iPad|iPod|Android/i.test(ua)) return true;
  if (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) return true;
  return false;
}

function FloatingPetals() {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [petals, setPetals] = useState<
    Array<{
      id: number;
      x: number;
      size: number;
      rotation: number;
      duration: number;
      delay: number;
      color: string;
      drift: number;
    }>
  >([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    setIsLowPowerMode(reduceMotion || isMobile);

    if (reduceMotion) {
      setPetals([]);
      return;
    }

    const colors = ["#e8b4b0", "#f3d1cc", "#d9bc72", "#c9d3b8", "#fbe9e4", "#ffffff"];
    const petalCount = isMobile ? 15 : 25;
    const newPetals = Array.from({ length: petalCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 8 + 6,
      rotation: Math.random() * 360,
      duration: Math.random() * 12 + 14,
      delay: Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: Math.random() * 30 - 15,
    }));

    setPetals(newPetals);
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-0 overflow-hidden z-40 ${isLowPowerMode ? "opacity-70" : ""
        }`}
    >
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute drop-shadow-[0_2px_6px_rgba(227,207,172,0.4)]"
          style={{ color: petal.color }}
          initial={{
            x: `${petal.x}vw`,
            y: "-10vh",
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: `${petal.x + petal.drift}vw`,
            rotate: petal.rotation + (isLowPowerMode ? 360 : 720),
            opacity: [0, 0.9, 0.8, 0],
          }}
          transition={{
            duration: isLowPowerMode ? petal.duration * 1.2 : petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="drop-shadow-sm"
          >
            <path d="M12,2C12,2 10,6 10,10C10,14 12,22 12,22C12,22 14,14 14,10C14,6 12,2 12,2Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function CountdownTimer() {
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  const targetDate = useMemo(() => new Date("February 4, 2027 10:30:00").getTime(), []);

  const getTimeLeft = (): { days: number; hours: number; minutes: number; seconds: number } => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const countdownItems = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  const floatingHearts = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 8 + Math.random() * 14,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 8,
  })), []);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-36 bg-gradient-to-br from-[#43573a] via-[#5f7553] to-[#43573a] flex flex-col items-center overflow-hidden z-20"
    >
      {/* Texture & Glow Layer */}
      <div className="absolute inset-0 opacity-[0.15] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none z-0" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(184,147,63,0.1),transparent_70%)] pointer-events-none z-0" />

      {/* Floating Ornaments */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-[#b8933f]/20"
            style={{ left: heart.left, top: heart.top }}
            animate={{
              y: [0, -90, 0],
              x: [0, Math.random() * 30 - 15, 0],
              rotate: [0, Math.random() * 360, 0],
              opacity: [0, 0.45, 0],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Heart size={heart.size} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-6xl px-6 flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, type: "spring", stiffness: 100 }}
          className="mx-auto mb-16 max-w-4xl text-center md:mb-20"
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#b8933f]/45 bg-black/30 px-5 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 text-[#b8933f]" />
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#f7e7ce] sm:text-sm">
              The Big Day Approaches
            </span>
            <Sparkles className="h-4 w-4 text-[#b8933f]" />
          </motion.div>

          <h2 className="font-alex text-6xl md:text-[8rem] leading-tight text-white drop-shadow-xl">
            Counting Down to <span className="relative inline-block text-shimmer">
              Forever
              <motion.svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full"
                viewBox="0 0 100 20" preserveAspectRatio="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              >
                <motion.path
                  d="M0 10 Q 25 20, 50 10 T 100 10"
                  fill="none"
                  stroke="#b8933f"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
          </h2>

          <p className="mx-auto mt-10 max-w-2xl text-[#f7e7ce]/80 font-montserrat tracking-[0.3em] text-[10px] md:text-xs uppercase font-bold">
            Every second brings us closer to our blessed wedding day. We cannot wait to celebrate this grace-filled moment with you.
          </p>
        </motion.div>

        <div className="w-full rounded-[2.5rem] border border-[#b8933f]/30 bg-black/20 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-6 md:p-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            {countdownItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + index * 0.1,
                  type: "spring",
                  bounce: 0.35
                }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_15px_35px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:border-[#b8933f]/40 group-hover:bg-white/10 md:p-8">
                  <div className="absolute inset-0 opacity-[0.1]"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(184,147,63,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(184,147,63,0.3) 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />

                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full border border-[#b8933f]/20" />
                  <div className="absolute -left-6 -bottom-6 h-16 w-16 rounded-full border border-[#b8933f]/10" />

                  <div className="relative z-10 flex flex-col items-center justify-center text-center">
                    <div className="relative flex h-[64px] w-full items-center justify-center overflow-hidden sm:h-[78px] md:h-[96px]">
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={item.value}
                          initial={{ y: 40, opacity: 0, scale: 0.65 }}
                          animate={{ y: 0, opacity: 1, scale: 1 }}
                          exit={{ y: -40, opacity: 0, scale: 0.65 }}
                          transition={{
                            type: "spring",
                            stiffness: 370,
                            damping: 24,
                            mass: 1
                          }}
                          className="absolute font-serif text-5xl font-semibold text-[#f7e7ce] drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] sm:text-6xl md:text-7xl"
                        >
                          {String(item.value).padStart(2, '0')}
                        </motion.span>
                      </AnimatePresence>
                    </div>

                    <div className="mt-3 rounded-full border border-[#b8933f]/40 bg-black/40 px-3 py-1.5 shadow-sm md:mt-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#b8933f] md:text-xs">
                        {item.label}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="flex items-center gap-3 text-[#b8933f]">
            <Stars size={14} className="animate-pulse" />
            <Heart size={15} className="animate-bounce" fill="currentColor" />
            <span className="font-serif italic text-lg text-[#f7e7ce]/80 sm:text-2xl">
              Can't wait to see you there!
            </span>
            <Heart size={15} className="animate-bounce" fill="currentColor" style={{ animationDelay: '200ms' }} />
            <Stars size={14} className="animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** Preload critical assets */
const criticalAssets = [heroBackground];
function preloadAssets() {
  criticalAssets.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

function AccommodationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  const honeymoonRates = [
    {
      plan: "Full Board",
      rooms: [
        { name: "Superior Room", rate: "LKR 38,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 36,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 33,000.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Half Board",
      rooms: [
        { name: "Superior Room", rate: "LKR 35,500.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 33,500.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 30,500.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Bed & Breakfast",
      rooms: [
        { name: "Superior Room", rate: "LKR 32,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 30,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 27,000.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Room Only",
      rooms: [
        { name: "Superior Room", rate: "LKR 29,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 27,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 24,000.00", view: "Jungle View" },
      ],
    },
  ];

  const doubleRates = [
    {
      plan: "Full Board",
      rooms: [
        { name: "Superior Room", rate: "LKR 35,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 33,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 30,000.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Half Board",
      rooms: [
        { name: "Superior Room", rate: "LKR 32,500.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 30,500.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 27,500.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Bed & Breakfast",
      rooms: [
        { name: "Superior Room", rate: "LKR 29,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 27,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 24,000.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Room Only",
      rooms: [
        { name: "Superior Room", rate: "LKR 26,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 24,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 21,000.00", view: "Jungle View" },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-[#fbf4ee]">
          <div>
            <h2 className="font-cinzel text-xl md:text-2xl text-[#8e5f5c] font-bold">Accommodation Rates</h2>
            <p className="text-[10px] uppercase tracking-widest text-[#8e5f5c] mt-1">The Barn House, Panadura</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-[#fbf4ee]/30">
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-[#8e5f5c]/30" />
                <h3 className="font-playball text-3xl text-[#8e5f5c]">Honeymoon Room Rates</h3>
                <div className="h-px flex-1 bg-[#8e5f5c]/30" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {honeymoonRates.map((plan) => (
                  <div key={plan.plan} className="bg-white p-6 rounded-xl border border-[#c9a19a]/30 shadow-sm">
                    <h4 className="font-cinzel text-sm font-bold text-[#8e5f5c] mb-4 border-b border-[#c9a19a]/20 pb-2">{plan.plan}</h4>
                    <div className="space-y-3">
                      {plan.rooms.map((room) => (
                        <div key={room.name} className="flex justify-between items-center gap-4">
                          <div>
                            <p className="text-xs font-bold text-slate-700">{room.name}</p>
                            <p className="text-[10px] text-slate-400">{room.view}</p>
                          </div>
                          <p className="text-xs font-bold text-[#8e5f5c] whitespace-nowrap">{room.rate}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>


            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-[#8e5f5c]/30" />
                <h3 className="font-playball text-3xl text-[#8e5f5c]">Double Room Rates</h3>
                <div className="h-px flex-1 bg-[#8e5f5c]/30" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {doubleRates.map((plan) => (
                  <div key={plan.plan} className="bg-white p-6 rounded-xl border border-[#c9a19a]/30 shadow-sm">
                    <h4 className="font-cinzel text-sm font-bold text-[#8e5f5c] mb-4 border-b border-[#c9a19a]/20 pb-2">{plan.plan}</h4>
                    <div className="space-y-3">
                      {plan.rooms.map((room) => (
                        <div key={room.name} className="flex justify-between items-center gap-4">
                          <div>
                            <p className="text-xs font-bold text-slate-700">{room.name}</p>
                            <p className="text-[10px] text-slate-400">{room.view}</p>
                          </div>
                          <p className="text-xs font-bold text-[#8e5f5c] whitespace-nowrap">{room.rate}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Check In</p>
                <p className="font-cinzel text-xl text-[#8e5f5c]">2:00 PM</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Check Out</p>
                <p className="font-cinzel text-xl text-[#8e5f5c]">12:00 PM</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Availability</p>
                <p className="font-cinzel text-sm text-[#8e5f5c] leading-tight">Max 16 Rooms Available</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border-t border-slate-50 flex justify-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] italic font-medium">Please contact the resort or couple for bookings</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function WeddingInvitation() {
  const [isOpened, setIsOpened] = useState(false);
  const [introStage, setIntroStage] = useState<"gate" | "video">("gate");
  const [isAccommodationOpen, setIsAccommodationOpen] = useState(false);

  const [rsvpForm, setRsvpForm] = useState({
    name: "",
    place: "",
    attending: "yes",
    guests: "1",
  });

  // --- Personalization Logic ---
  const [guestName, setGuestName] = useState<string | null>(null);

  useEffect(() => {
    setGuestName(readGuestFromLocation());
  }, []);
  // -----------------------------

  const [wishForm, setWishForm] = useState({
    name: "",
    message: "",
  });

  const [rsvpStatus, setRsvpStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [wishStatus, setWishStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const [musicAudible, setMusicAudible] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioUnlockedRef = useRef(false);
  const hasStartedMusicRef = useRef(false);

  const playMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      audio.muted = false;
      audio.volume = 1;
      await audio.play();
      hasStartedMusicRef.current = true;
      audioUnlockedRef.current = true;
      setMusicAudible(true);
      return true;
    } catch (err) {
      console.error("Audio play failed:", err);
      return false;
    }
  }, []);

  const playMutedMusicFallback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      audio.muted = true;
      audio.volume = 1;
      await audio.play();
      setMusicAudible(false);
      return true;
    } catch {
      return false;
    }
  }, []);

  const unlockAudioFromGesture = useCallback(async () => {
    if (audioUnlockedRef.current) return;

    const ok = await playMusic();

    if (!ok) {
      await playMutedMusicFallback();
    }
  }, [playMusic, playMutedMusicFallback]);

  const handleSoundToggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    void unlockAudioFromGesture();

    const wantOn = audio.muted || audio.paused;
    if (wantOn) {
      audio.muted = false;
      void audio.play().then(
        () => setMusicAudible(true),
        () => { },
      );
    } else {
      audio.muted = true;
      setMusicAudible(false);
    }
  }, [unlockAudioFromGesture]);

  useEffect(() => {
    const handler = () => {
      void unlockAudioFromGesture();
    };

    document.addEventListener("pointerdown", handler, { capture: true, passive: true });
    document.addEventListener("touchstart", handler, { capture: true, passive: true });

    return () => {
      document.removeEventListener("pointerdown", handler, true);
      document.removeEventListener("touchstart", handler, true);
    };
  }, [unlockAudioFromGesture]);

  useEffect(() => {
    if (isOpened) {
      preloadAssets();
    }
  }, [isOpened]);

  const submitToGoogleSheet = async (payload: Record<string, string>) => {
    if (!googleScriptUrl) {
      throw new Error("Missing VITE_GOOGLE_SCRIPT_URL");
    }

    try {
      await fetch(googleScriptUrl, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(payload),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      // With no-cors, we can't check response.ok, so we assume success if no promise rejection
    } catch (err) {
      console.error("Submission error:", err);
      throw err;
    }
  };

  const handleRsvpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!rsvpForm.name.trim()) {
      setRsvpStatus("error");
      return;
    }

    setRsvpStatus("sending");

    try {
      await submitToGoogleSheet({
        action: "rsvp",
        name: rsvpForm.name.trim(),
        place: rsvpForm.place.trim(),
        attending: rsvpForm.attending,
        guests: rsvpForm.attending === "yes" ? rsvpForm.guests : "0",
        dietaryNotes: "",
      });
      setRsvpStatus("success");
      setRsvpForm({ name: "", place: "", attending: "yes", guests: "1" });
    } catch {
      setRsvpStatus("error");
    }
  };

  const handleWishSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!wishForm.name.trim() || !wishForm.message.trim()) {
      setWishStatus("error");
      return;
    }

    setWishStatus("sending");

    try {
      await submitToGoogleSheet({
        action: "wish",
        name: wishForm.name.trim(),
        message: wishForm.message.trim(),
      });
      setWishStatus("success");
      setWishForm({ name: "", message: "" });
    } catch {
      setWishStatus("error");
    }
  };

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpened]);

  return (
    <main
      className={`min-h-screen w-full bg-[#fbf4ee] transition-all duration-1000 ${isOpened
        ? "relative"
        : "h-[100dvh] overflow-hidden flex items-center justify-center"
        } relative font-montserrat scroll-smooth`}
    >
      <FloatingPetals />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          introStage === "gate" ? (
            <motion.div
              key="invitation-gate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.9 } }}
              className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#efe6d2]"
            >
              {/* Blurred fill for wide screens */}
              <div
                className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl opacity-70"
                style={{ backgroundImage: `url("${gateBackground}")` }}
              />
              <div className="absolute inset-0 bg-[#f5ecd9]/30" />

              {/* Arch artwork, kept at its true proportions */}
              <motion.div
                initial={{ scale: 1.04, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[941/1672] shadow-[0_0_80px_rgba(120,100,60,0.25)]"
                style={{ width: "min(100vw, calc(100dvh * 941 / 1672))" }}
              >
                <img
                  src={gateBackground}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Logo + button inside the arch opening */}
                <div className="absolute inset-x-[20%] top-[30%] bottom-[22%] z-10 flex flex-col items-center justify-center gap-[6%] text-center">
                  <motion.img
                    src={logoImage}
                    alt="Udani & Thenuka monogram"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 1.4, ease: "easeOut" }}
                    className="h-auto max-h-[70%] w-auto max-w-full object-contain drop-shadow-[0_4px_10px_rgba(120,90,30,0.18)]"
                  />

                  <motion.button
                    type="button"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setIntroStage("video");
                      void unlockAudioFromGesture();
                    }}
                    className="relative shrink-0 overflow-hidden whitespace-nowrap rounded-full border border-[#d9bc72] bg-[linear-gradient(135deg,#5f7553_0%,#43573a_100%)] px-6 py-3 shadow-[0_10px_28px_rgba(60,75,50,0.35)] sm:px-8 sm:py-3.5"
                  >
                    <span className="pointer-events-none absolute inset-[3px] rounded-full border border-[#d9bc72]/50" />
                    <motion.span
                      className="pointer-events-none absolute inset-y-0 left-[-40%] w-[35%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ left: ["-40%", "140%"] }}
                      transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
                    />
                    <span className="relative font-cinzel text-xs font-bold uppercase tracking-[0.25em] text-[#fbf1d6] sm:text-sm">
                      View Invitation
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ) : (
          <motion.div
            key="video-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden"
          >
            <video
              autoPlay
              muted
              playsInline
              onEnded={() => {
                setIsOpened(true);
                void unlockAudioFromGesture();
              }}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/invitation_intro.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 z-10 bg-black/5" />

            <motion.button
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setIsOpened(true);
                void unlockAudioFromGesture();
              }}
              className="absolute z-20 inline-flex items-center gap-2 rounded-full border border-[#d9bc72]/80 bg-[#fbf4ee]/85 px-5 py-2.5 font-cinzel text-[11px] font-bold uppercase tracking-[0.25em] text-[#6e4a47] shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-md transition-colors hover:bg-[#fbf4ee]"
              style={{
                right: "max(1.25rem, env(safe-area-inset-right))",
                bottom: "max(1.5rem, env(safe-area-inset-bottom))",
              }}
            >
              Skip Intro
              <span aria-hidden className="text-sm leading-none">›</span>
            </motion.button>
          </motion.div>
          )
        ) : (
          <motion.div
            key="website-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="website-shell relative z-20 w-full"
            onPointerDownCapture={() => {
              void unlockAudioFromGesture();
            }}
            onTouchStartCapture={() => {
              void unlockAudioFromGesture();
            }}
          >
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => {
                setIntroStage("gate");
                setIsOpened(false);
              }}
              className="fixed top-6 right-6 z-50 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-theme-100 text-theme-800 hover:bg-theme-50 transition-colors"
            >
              <div className="flex flex-col items-center">
                <div className="text-[8px] uppercase tracking-widest font-bold">Close</div>
              </div>
            </motion.button>

            <section className="relative z-10 flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#efe6d2]">
              {/* Blurred fill on screens wider/taller than the artwork */}
              <div
                className="pointer-events-none absolute inset-0 scale-110 bg-cover bg-center opacity-60 blur-2xl"
                style={{ backgroundImage: `url("${heroBackground}")` }}
              />

              {/* Artwork shown whole, untouched; text sits in its plain upper area */}
              <div
                className="@container relative aspect-[675/1200] overflow-hidden shadow-[0_0_70px_rgba(120,100,60,0.22)]"
                style={{ width: "min(100vw, calc(100dvh * 675 / 1200))" }}
              >
                <img src={heroBackground} alt="" className="absolute inset-0 h-full w-full object-cover" />

                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } } }}
                  className="absolute inset-x-[7%] top-[8%] flex flex-col items-center text-center"
                >
                  {[
                    <p key="reader" className="font-script text-[8.2cqw] leading-[1.1] text-[#8f6f2c]">
                      Dearest Gentle Reader,
                    </p>,

                    <div key="rule1" className="mt-[1.5cqw] flex items-center gap-[2cqw] text-[#b8933f]">
                      <span className="h-px w-[14cqw] bg-gradient-to-r from-transparent to-[#b8933f]" />
                      <span className="text-[2.4cqw]">❦</span>
                      <span className="h-px w-[14cqw] bg-gradient-to-l from-transparent to-[#b8933f]" />
                    </div>,

                    <p key="intro" className="mt-[2cqw] font-serif text-[4.3cqw] italic leading-snug tracking-[0.02em] text-[#4f5d46]">
                      With great joy, we announce the wedding of
                    </p>,

                    <h1 key="names" className="mt-[1.5cqw] whitespace-nowrap font-script text-[12.5cqw] leading-[1.15] text-[#a07c34] [text-shadow:0_1px_0_rgba(255,250,235,0.9),0_3px_8px_rgba(160,124,52,0.18)]">
                      Udani <span className="font-serif text-[7cqw] italic text-[#6b7d5c]">&amp;</span> Thenuka
                    </h1>,

                    <p key="day" className="mt-[2.5cqw] font-cinzel text-[3.2cqw] font-bold tracking-[0.5em] text-[#3f4a38]">
                      THURSDAY
                    </p>,

                    <div key="date" className="mt-[1.5cqw] grid w-[78cqw] grid-cols-[1fr_auto_1fr] items-center gap-[3cqw]">
                      <span className="border-y border-[#b8933f]/70 py-[1cqw] font-cinzel text-[3.1cqw] font-bold tracking-[0.18em] text-[#3f4a38]">FEBRUARY</span>
                      <span className="font-serif text-[11cqw] font-light leading-none text-[#a07c34]">04</span>
                      <span className="border-y border-[#b8933f]/70 py-[1cqw] font-cinzel text-[3.1cqw] font-bold tracking-[0.18em] text-[#3f4a38]">2027</span>
                    </div>,

                    <p key="time" className="mt-[2.5cqw] font-serif text-[4.4cqw] font-semibold tracking-[0.03em] text-[#a07c34]">
                      From 8.30 a.m to 4.00 p.m
                    </p>,

                    <p key="poruwa" className="font-serif text-[3.4cqw] italic text-[#5b6651]">
                      (Poruwa Ceremony @ 10.30 a.m)
                    </p>,

                    <p key="venue" className="mt-[2cqw] font-cinzel text-[3.2cqw] tracking-[0.28em] text-[#3f4a38]">
                      THE BARN HOUSE <span className="text-[#b8933f]">·</span> PANADURA
                    </p>,
                  ].map((child) => (
                    <motion.div
                      key={child.key}
                      variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } } }}
                      className="flex justify-center"
                    >
                      {child}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            <section className="relative z-10 flex w-full justify-center overflow-hidden bg-[#f6e9e3] sm:px-4 sm:py-16 md:py-24">
              {/* Floral frame card: edge-to-edge, full screen height on phones; the middle band repeats to fit any height */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="@container relative w-full overflow-hidden max-sm:min-h-[max(100dvh,176vw)] sm:aspect-[682/1200] sm:max-w-[520px] sm:shadow-[0_30px_70px_-20px_rgba(142,95,92,0.35)]"
              >
                <div className="absolute inset-0 flex flex-col" aria-hidden>
                  <img src={frameTop} alt="" loading="lazy" className="block h-auto w-full shrink-0" />
                  <div
                    className="min-h-0 flex-1 bg-repeat-y"
                    style={{ backgroundImage: `url("${frameMid}")`, backgroundSize: "100% auto" }}
                  />
                  <img src={frameBottom} alt="" loading="lazy" className="block h-auto w-full shrink-0" />
                </div>

                <div className="absolute inset-x-[15%] top-[22cqw] bottom-[20cqw] flex flex-col items-center justify-center text-center">
                  <p className="font-cinzel text-[2.5cqw] font-bold tracking-[0.28em] text-[#a07c34]">
                    TOGETHER WE REQUEST THE HONOUR OF YOUR PRESENCE
                  </p>
                  <p className="mt-[1.5cqw] font-serif text-[4cqw] italic text-[#7a5a57]">
                    to celebrate the wedding of their children
                  </p>

                  {guestName && (
                    <div className="mt-[4cqw]">
                      <p className="font-serif text-[3.6cqw] italic text-[#7a5a57]">We cordially invite</p>
                      <p className="my-[0.5cqw] break-words font-script text-[8.5cqw] leading-tight text-[#8e5f5c]">{guestName}</p>
                      <p className="font-serif text-[3.6cqw] italic text-[#7a5a57]">to celebrate our special day with us.</p>
                    </div>
                  )}

                  <div className="my-[4cqw] flex items-center gap-[2cqw] text-[#b8933f]">
                    <span className="h-px w-[12cqw] bg-gradient-to-r from-transparent to-[#b8933f]" />
                    <span className="text-[2.6cqw]">❦</span>
                    <span className="h-px w-[12cqw] bg-gradient-to-l from-transparent to-[#b8933f]" />
                  </div>

                  <h3 className="font-script text-[14cqw] leading-none text-[#8e5f5c] [text-shadow:0_2px_6px_rgba(142,95,92,0.15)]">Udani</h3>
                  <p className="mt-[1.5cqw] font-serif text-[3.4cqw] leading-snug text-[#5e4a47]">
                    Beloved daughter of<br />Mr. Sarath Pinnaduwa &amp; Mrs. Anoma Hettiarachchi
                  </p>

                  <span className="my-[2.5cqw] font-serif text-[8cqw] italic leading-none text-[#b8933f]">&amp;</span>

                  <h3 className="font-script text-[14cqw] leading-none text-[#8e5f5c] [text-shadow:0_2px_6px_rgba(142,95,92,0.15)]">Thenuka</h3>
                  <p className="mt-[1.5cqw] font-serif text-[3.4cqw] leading-snug text-[#5e4a47]">
                    Beloved son of<br />Mr. Sarath Wickramasinghe &amp; Mrs. Ramyalatha Ranasinghe
                  </p>
                </div>
              </motion.div>
            </section>



            <CountdownTimer />

            <section className="relative py-24 md:py-36 bg-[#fbf4ee] overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

              <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="@container relative mx-auto aspect-[735/980] w-full max-w-[480px]"
                  >
                    {/* Parchment scroll; multiply blends its white surround into the page colour */}
                    <img src={scrollCard} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-contain mix-blend-multiply" />

                    <div className="absolute inset-x-[17%] top-[21%] bottom-[24%] flex flex-col items-center justify-center text-center">
                      <p className="font-cinzel text-[2.6cqw] font-bold tracking-[0.45em] text-[#a07c34]">THE VENUE</p>
                      <h2 className="mt-[2cqw] font-cinzel text-[6.6cqw] font-bold leading-tight tracking-[0.08em] text-[#6e4a47]">
                        The Barn House
                      </h2>
                      <p className="font-script text-[8cqw] leading-tight text-[#8e5f5c]">Panadura</p>

                      <div className="my-[3cqw] flex items-center gap-[2cqw] text-[#b8933f]">
                        <span className="h-px w-[10cqw] bg-[#b8933f]/60" />
                        <span className="text-[2.4cqw]">✦</span>
                        <span className="h-px w-[10cqw] bg-[#b8933f]/60" />
                      </div>

                      <p className="font-cinzel text-[3cqw] font-bold tracking-[0.2em] text-[#5e4a47]">THURSDAY, 04 FEBRUARY 2027</p>
                      <p className="mt-[1.5cqw] font-serif text-[4.2cqw] font-semibold text-[#a07c34]">From 8.30 a.m to 4.00 p.m</p>
                      <p className="font-serif text-[3.4cqw] italic text-[#6b5a50]">(Poruwa Ceremony @ 10.30 a.m)</p>

                      <button
                        onClick={() =>
                          window.open("https://www.google.com/maps/search/?api=1&query=The+Barn+House+Panadura", "_blank")
                        }
                        className="group mt-[4cqw] inline-flex items-center gap-[1.5cqw] rounded-full border border-[#b8933f] bg-[#8e5f5c] px-[5cqw] py-[2cqw] text-[2.6cqw] font-bold uppercase tracking-[0.25em] text-[#fbf1e6] shadow-md transition-colors hover:bg-[#774c4a]"
                      >
                        <MapPin className="h-[3cqw] w-[3cqw] transition-transform group-hover:-translate-y-0.5" />
                        Get Directions
                      </button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative w-full aspect-[3/4] max-w-[450px] mx-auto bg-white p-3 shadow-[0_40px_80px_-20px_rgba(135,147,122,0.2)] border border-[#c9a19a]/50"
                  >
                    <div className="absolute inset-2 border-[0.5px] border-[#8e5f5c]/30 pointer-events-none z-20" />
                    <div className="w-full h-full overflow-hidden bg-white relative">
                      <iframe
                        src="https://maps.google.com/maps?q=The%20Barn%20House,%20Panadura&t=&z=16&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full grayscale-[0.8] contrast-110 sepia-[0.3] opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-1000"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            <section className="relative py-32 md:py-48 bg-[#f7ece6] flex flex-col items-center overflow-hidden">
              <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

              <div className="container mx-auto px-4 max-w-4xl flex flex-col items-center relative z-10 w-full">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-cinzel text-2xl md:text-4xl text-[#5e4a47] tracking-[0.3em] mb-12 uppercase text-center"
                >
                  FOR OUR BIG DAY
                </motion.h2>

                <div className="relative w-full max-w-[550px] aspect-[4/5] flex items-center justify-center pt-12 md:pt-24 mt-12 md:mt-0">
                  <div className="absolute inset-0 z-0">
                    <img
                      src="/images/11.png"
                      alt="Envelope"
                      className="w-full h-full object-contain object-bottom drop-shadow-[0_40px_80px_rgba(0,0,0,0.3)]"
                    />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 70, scale: 0.7 }}
                    whileInView={{ opacity: 1, y: 0, scale: 0.85 }}
                    transition={{ delay: 0.6, duration: 2.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="absolute -top-32 md:-top-56 left-1/2 -translate-x-1/2 w-[100%] md:w-[120%] h-64 md:h-[320px] pointer-events-none z-0"
                  >
                    <img
                      src="/images/12.png"
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain object-bottom drop-shadow-sm opacity-90"
                    />
                    <img
                      src="/images/12.png"
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain object-bottom scale-x-[-1] -rotate-12 translate-x-12 opacity-80"
                    />
                    <img
                      src="/images/12.png"
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain object-bottom rotate-[15deg] -translate-x-12 opacity-70"
                    />
                    <img
                      src="/images/12.png"
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain object-bottom scale-75 translate-y-12 opacity-60"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="relative z-10 w-[94%] md:w-[88%] bg-[#fbf4ee]/95 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-[0.5px] border-[#b8933f]/40 flex flex-col items-center pt-4 pb-12 px-6 md:px-10"
                  >
                    {/* Premium inner frame */}
                    <div className="absolute inset-3 md:inset-4 border-[0.5px] border-[#b8933f]/20 pointer-events-none" />

                    <div className="w-full flex flex-col items-center mt-6 relative z-10 px-2 md:px-6">
                      <div className="flex items-center justify-center gap-4 w-full mb-8">
                        <div className="h-[0.5px] w-full bg-[#b8933f]/40" />
                        <h3 className="font-alex text-5xl md:text-7xl text-[#8e5f5c] whitespace-nowrap leading-normal py-2 px-3 [text-shadow:0_2px_6px_rgba(142,95,92,0.15)]">
                          R.S.V.P
                        </h3>
                        <div className="h-[0.5px] w-full bg-[#b8933f]/40" />
                      </div>

                      <form className="w-full space-y-8 text-left max-w-sm mt-4" onSubmit={handleRsvpSubmit}>
                        <div className="relative group">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] absolute -top-4 left-0 transition-colors group-focus-within:text-[#b8933f]">Name(s)</label>
                          <input
                            type="text"
                            placeholder="M.................................................."
                            value={rsvpForm.name}
                            onChange={(e) => {
                              setRsvpStatus("idle");
                              setRsvpForm((prev) => ({ ...prev, name: e.target.value }));
                            }}
                            className="w-full bg-transparent border-b-[0.5px] border-slate-300 px-0 py-2 text-[#5e4a47] placeholder:text-slate-300 focus:outline-none focus:border-[#b8933f] transition-all font-serif text-lg md:text-xl italic"
                            required
                          />
                        </div>

                        <div className="relative group pt-4">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] absolute top-0 left-0 transition-colors group-focus-within:text-[#b8933f]">Area / City</label>
                          <input
                            type="text"
                            placeholder="Where are you coming from?"
                            value={rsvpForm.place}
                            onChange={(e) => {
                              setRsvpStatus("idle");
                              setRsvpForm((prev) => ({ ...prev, place: e.target.value }));
                            }}
                            className="w-full bg-transparent border-b-[0.5px] border-slate-300 px-0 py-2 text-[#5e4a47] placeholder:text-slate-300 focus:outline-none focus:border-[#b8933f] transition-all font-serif text-lg md:text-xl italic mt-4"
                            required
                          />
                        </div>

                        <div className="space-y-5 pt-6">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                            Will you attend?
                          </label>

                          <div className="flex flex-col gap-3 font-serif italic text-lg md:text-xl text-slate-700">
                            <label className="flex items-center gap-4 cursor-pointer group">
                              <div className={`w-5 h-5 rounded-none border-[0.5px] flex items-center justify-center transition-colors ${rsvpForm.attending === "yes" ? "border-[#b8933f] bg-[#b8933f]/10" : "border-slate-300 bg-transparent group-hover:border-[#b8933f]/50"}`}>
                                {rsvpForm.attending === "yes" && <div className="w-3 h-3 bg-[#b8933f]" />}
                              </div>
                              <input type="radio" className="hidden" checked={rsvpForm.attending === "yes"} onChange={() => { setRsvpStatus("idle"); setRsvpForm((prev) => ({ ...prev, attending: "yes" })); }} />
                              <span>Delightfully accepts</span>
                            </label>

                            <label className="flex items-center gap-4 cursor-pointer group">
                              <div className={`w-5 h-5 rounded-none border-[0.5px] flex items-center justify-center transition-colors ${rsvpForm.attending === "no" ? "border-[#b8933f] bg-[#b8933f]/10" : "border-slate-300 bg-transparent group-hover:border-[#b8933f]/50"}`}>
                                {rsvpForm.attending === "no" && <div className="w-3 h-3 bg-[#b8933f]" />}
                              </div>
                              <input type="radio" className="hidden" checked={rsvpForm.attending === "no"} onChange={() => { setRsvpStatus("idle"); setRsvpForm((prev) => ({ ...prev, attending: "no" })); }} />
                              <span>Regretfully declines</span>
                            </label>
                          </div>
                        </div>

                        {rsvpForm.attending === "yes" && (
                          <div className="pt-4 animate-in fade-in slide-in-from-top-2 duration-500 relative group">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] absolute -top-4 left-0 transition-colors group-focus-within:text-[#b8933f]">
                              Number of Guests
                            </label>
                            <div className="relative">
                              <select
                                value={rsvpForm.guests}
                                onChange={(e) => {
                                  setRsvpStatus("idle");
                                  setRsvpForm((prev) => ({ ...prev, guests: e.target.value }));
                                }}
                                className="w-full bg-transparent border-b-[0.5px] border-slate-300 px-0 py-2 text-[#5e4a47] focus:outline-none focus:border-[#b8933f] transition-all font-serif text-lg md:text-xl italic appearance-none cursor-pointer"
                              >
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                  <option key={num} value={num.toString()}>
                                    {num} {num === 1 ? "Guest" : "Guests"}
                                  </option>
                                ))}
                              </select>
                              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#b8933f]">
                                <ChevronDown size={16} />
                              </div>
                            </div>
                          </div>
                        )}

                        {(rsvpStatus === "success" || rsvpStatus === "error") && (
                          <p
                            className={`text-[10px] text-center font-semibold tracking-widest uppercase mt-4 ${rsvpStatus === "success" ? "text-[#8e5f5c]" : "text-red-500"
                              }`}
                          >
                            {rsvpStatus === "success"
                              ? "Thank you! RSVP sent successfully."
                              : "Something went wrong. Please try again."}
                          </p>
                        )}

                        <div className="pt-8">
                          <button
                            type="submit"
                            disabled={rsvpStatus === "sending"}
                            className="w-full border-[0.5px] border-[#b8933f] bg-transparent text-[#b8933f] hover:bg-[#b8933f] hover:text-white py-4 rounded-sm font-montserrat text-[10px] md:text-[11px] tracking-[0.3em] font-medium transition-all shadow-[0_4px_10px_rgba(0,0,0,0.03)] uppercase disabled:opacity-50"
                          >
                            {rsvpStatus === "sending" ? "SENDING..." : "CONFIRM ATTENDANCE"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                </div>

              </div>
            </section>

            <div className="relative bg-[#c9a19a]/10">
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

              <section className="relative py-24 md:py-36 flex flex-col items-center overflow-hidden">
                <div className="container mx-auto px-4 max-w-4xl text-center relative z-10 w-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#8e5f5c]/10 mb-8 mt-4 shadow-sm border border-[#8e5f5c]/20">
                      <Sparkles className="w-8 h-8 text-[#8e5f5c]" />
                    </div>

                    <h2 className="font-script text-[4.5rem] sm:text-[5rem] md:text-[7rem] text-[#8e5f5c] mb-6 drop-shadow-sm leading-none">
                      Best Wishes
                    </h2>
                    <div className="h-px w-24 bg-[#c9a19a] mb-8" />

                    <p className="text-[#8e5f5c] text-sm md:text-lg leading-relaxed max-w-xl mx-auto mb-16 font-serif tracking-[0.1em] px-4 uppercase font-bold">
                      Your presence at our wedding is the greatest gift of all. However, if you
                      wish to honor us with a message, we would be delighted to read it!
                    </p>

                    <div className="w-full max-w-2xl mx-auto bg-white p-8 md:p-14 shadow-[0_30px_70px_-15px_rgba(142,95,92,0.1)] border border-[#c9a19a]/50 relative group card-marble">
                      <div className="absolute inset-0 gold-foil-edge opacity-20 pointer-events-none" />
                      <div className="absolute inset-2 border-[0.5px] border-[#8e5f5c]/20 pointer-events-none transition-colors duration-700" />

                      <form className="space-y-12 text-left relative z-10" onSubmit={handleWishSubmit}>
                        <div className="space-y-4">
                          <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#8e5f5c]/40">
                            From
                          </label>
                          <input
                            type="text"
                            placeholder="YOUR NAME"
                            value={wishForm.name}
                            onChange={(e) => {
                              setWishStatus("idle");
                              setWishForm((prev) => ({ ...prev, name: e.target.value }));
                            }}
                            className="w-full bg-transparent border-b border-[#c9a19a]/40 px-0 py-4 text-[#8e5f5c] placeholder:text-[#c9a19a]/30 focus:outline-none focus:border-[#8e5f5c] transition-all font-cinzel text-lg tracking-widest"
                            required
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#8e5f5c]/40">
                            Message
                          </label>
                          <textarea
                            rows={4}
                            placeholder="WISHES..."
                            value={wishForm.message}
                            onChange={(e) => {
                              setWishStatus("idle");
                              setWishForm((prev) => ({ ...prev, message: e.target.value }));
                            }}
                            className="w-full bg-transparent border-b border-[#c9a19a]/40 px-0 py-4 text-[#8e5f5c] placeholder:text-[#c9a19a]/30 focus:outline-none focus:border-[#8e5f5c] transition-all font-cinzel text-lg tracking-widest resize-none"
                            required
                          />
                        </div>
                        {(wishStatus === "success" || wishStatus === "error") && (
                          <p
                            className={`text-[10px] text-center font-semibold ${wishStatus === "success" ? "text-[#8e5f5c]" : "text-red-500"
                              }`}
                          >
                            {wishStatus === "success"
                              ? "Wish sent successfully."
                              : "Something went wrong. Please try again."}
                          </p>
                        )}
                        <div className="pt-6 flex justify-center">
                          <button
                            type="submit"
                            disabled={wishStatus === "sending"}
                            className="bg-[#8e5f5c] text-white px-12 py-5 font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-[#774c4a] transition-all duration-300 shadow-md disabled:opacity-70"
                          >
                            {wishStatus === "sending" ? "Sending..." : "Send Wishes"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                </div>
              </section>

              <footer className="relative py-24 md:py-32 bg-marble-emerald w-full flex flex-col items-center overflow-hidden z-20">
                {/* Subtle vignette over the deep green */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.15)_100%)] pointer-events-none z-0"></div>

                {/* Elegant border details */}
                <div className="absolute top-0 left-0 w-full h-[0.5px] bg-gradient-to-r from-transparent via-[#b8933f]/50 to-transparent"></div>
                <div className="absolute inset-4 md:inset-6 border-[0.5px] border-[#b8933f]/20 pointer-events-none z-10 hidden md:block rounded-sm shadow-[inset_0_0_15px_rgba(184,147,63,0.05)]"></div>

                <div className="w-full max-w-4xl px-6 flex flex-col items-center text-center relative z-20">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    className="flex flex-col items-center"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="h-[0.5px] w-12 md:w-16 bg-[#e9cf8f]/70" />
                      <div className="w-1.5 h-1.5 rotate-45 border-[0.5px] border-[#e9cf8f]" />
                      <div className="h-[0.5px] w-12 md:w-16 bg-[#e9cf8f]/70" />
                    </div>

                    <p className="font-montserrat text-[9px] md:text-[11px] tracking-[0.5em] text-[#fbf1e6] uppercase font-semibold mb-4">
                      With heartfelt gratitude
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 mt-4">
                      <h2 className="font-alex text-5xl md:text-7xl text-[#f6e3b4] py-2 [text-shadow:0_2px_10px_rgba(0,0,0,0.35)] leading-none">
                        Udani
                      </h2>
                      <span className="font-serif text-3xl md:text-5xl text-[#f3d1cc] italic drop-shadow-md pb-2">&</span>
                      <h2 className="font-alex text-5xl md:text-7xl text-[#f6e3b4] py-2 [text-shadow:0_2px_10px_rgba(0,0,0,0.35)] leading-none">
                        Thenuka
                      </h2>
                    </div>
                  </motion.div>

                  <div className="mt-20 pt-8 border-t-[0.5px] border-[#e9cf8f]/50 w-full max-w-xs md:max-w-md flex flex-col items-center gap-4">
                    <p className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] text-[#fbf1e6]/90 font-bold leading-relaxed flex flex-col md:flex-row items-center gap-2 md:gap-4">
                      <span>© 2027 Udani & Thenuka</span>
                      <span className="hidden md:inline text-[#e9cf8f]">|</span>
                      <span>All Rights Reserved</span>
                    </p>
                    <a
                      href="https://wa.me/94707819074"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] tracking-[0.3em] text-[#e9cf8f] hover:text-[#fbf1e6] transition-all uppercase font-medium flex items-center gap-2"
                    >
                      <span>Designed by invitemint</span>
                      <span className="w-1 h-1 rounded-full bg-[#e9cf8f]" />
                      <span>Contact us</span>
                    </a>
                  </div>
                </div>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <audio
        ref={audioRef}
        src={backgroundMusic}
        loop
        preload="metadata"
        playsInline
        className="sr-only"
        aria-hidden
      />

      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        onClick={() => handleSoundToggle()}
        aria-pressed={musicAudible}
        aria-label={musicAudible ? "Mute background music" : "Unmute background music"}
        className="fixed bottom-6 left-6 z-[120] flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#8e5f5c] bg-white/95 text-[#8e5f5c] shadow-[0_0_0_4px_rgba(197,160,89,0.2),0_10px_36px_-6px_rgba(135,147,122,0.45)] backdrop-blur-md touch-manipulation transition-[transform,box-shadow] hover:scale-[1.05] hover:shadow-[0_0_0_5px_rgba(197,160,89,0.28),0_14px_44px_-6px_rgba(135,147,122,0.5)] active:scale-[0.96] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8e5f5c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fbf4ee]"
      >
        {musicAudible ? <Volume2 className="h-6 w-6" strokeWidth={2} /> : <VolumeX className="h-6 w-6" strokeWidth={2} />}
      </motion.button>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #c9a19a33;
        }
        ::-webkit-scrollbar-thumb {
          background: #8e5f5c66;
          border-radius: 10px;
        }
      `,
        }}
      />
      <AnimatePresence>
        {isAccommodationOpen && (
          <AccommodationModal
            isOpen={isAccommodationOpen}
            onClose={() => setIsAccommodationOpen(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
