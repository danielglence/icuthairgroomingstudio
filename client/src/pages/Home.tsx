/* Noir Atelier design: dark editorial luxury, tactile contrast, asymmetrical story flow, restrained antique-gold accents. */
import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MoveUpRight,
  Phone,
  Scissors,
  Sparkles,
  Star,
  X,
} from "lucide-react";

const BUSINESS = {
  name: "I Cut Hair Grooming Studio",
  shortName: "I CUT",
  phone: "07902833507",
  address: "Mudavoor, near Scrub A Dubb Car Wash, Muvattupuzha, Kerala 686669",
  instagram: "https://www.instagram.com/its.me._.arun/",
  maps: "https://www.google.com/maps/search/?api=1&query=I+Cut+Hair+Grooming+Studio,+Mudavoor,+Muvattupuzha,+Kerala+686669",
};

const heroImage = "/manus-storage/i-cut-apex-inspired-hero_8dc16d38.jpg";
const gallery = [
  { src: heroImage, alt: "Client with a clean modern taper haircut in the grooming studio", label: "Precision" },
  { src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=85", alt: "Bright modern salon interior with styling stations and mirrors", label: "The studio" },
  { src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=85", alt: "Close-up of a precise haircut being shaped with scissors", label: "Precision" },
  { src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1400&q=85", alt: "Grooming tools arranged on a charcoal stone counter", label: "The details" },
  { src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=85", alt: "Barber carefully shaping a short beard with a comb and trimmer", label: "Beard craft" },
  { src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=85", alt: "Barber working on a client's haircut in a dark studio", label: "In the chair" },
];

const services = [
  { title: "Signature Haircut", description: "A considered cut shaped around your features, texture, and everyday rhythm.", icon: Scissors },
  { title: "Hair Styling", description: "Polished styling for a sharper finish, from understated texture to occasion-ready form.", icon: Sparkles },
  { title: "Beard Trim & Styling", description: "Clean lines, balanced shape, and a finish that lets your beard work with your face.", icon: Scissors },
  { title: "Hair & Beard Combo", description: "The complete grooming reset: hair, beard, and finishing details in one appointment.", icon: Check },
  { title: "Hair Wash & Finish", description: "A refreshing wash followed by a clean, wearable finish that keeps its shape.", icon: Sparkles },
  { title: "Kids’ Haircut", description: "Patient, precise grooming for younger guests in a calm studio setting.", icon: Scissors },
];

const navItems = ["Home", "About", "Services", "Gallery", "Reviews", "Contact"];
const ease = [0.23, 1, 0.32, 1] as const;
const whatsappUrl = "https://wa.me/917902833507?text=Hello%20I%20Cut%2C%20I%E2%80%99d%20like%20to%20book%20an%20appointment.";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function SectionKicker({ children, number }: { children: React.ReactNode; number: string }) {
  return <div className="section-kicker"><span>{number}</span><span className="h-px w-10 bg-gold/70" /><span>{children}</span></div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState(whatsappUrl);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const reduce = useReducedMotion();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const goTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  const validate = (form: HTMLFormElement) => {
    const data = new FormData(form);
    const required: Record<string, string> = {
      name: "Please share your name.", phone: "Please share a phone number.", service: "Please choose a service.", date: "Please choose a preferred date.", time: "Please choose a preferred time.",
    };
    const next: Record<string, string> = {};
    Object.entries(required).forEach(([key, message]) => { if (!String(data.get(key) || "").trim()) next[key] = message; });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate(event.currentTarget)) return;
    const data = new FormData(event.currentTarget);
    const message = [
      "Hello I Cut, I’d like to confirm an appointment.",
      `Name: ${String(data.get("name") || "")}`,
      `Phone: ${String(data.get("phone") || "")}`,
      `Service: ${String(data.get("service") || "")}`,
      `Preferred date: ${String(data.get("date") || "")}`,
      `Preferred time: ${String(data.get("time") || "")}`,
      data.get("message") ? `Message: ${String(data.get("message"))}` : "",
    ].filter(Boolean).join("\n");
    setWhatsappLink(`https://wa.me/917902833507?text=${encodeURIComponent(message)}`);
    setSubmitted(true);
  };

  const lightboxImage = useMemo(() => lightbox === null ? null : gallery[lightbox], [lightbox]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink text-ivory selection:bg-gold selection:text-ink">
      <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${scrolled ? "border-b border-white/10 bg-ink/95 backdrop-blur-xl" : "bg-transparent"}`}>
        <div className="container flex h-[76px] items-center justify-between">
          <button onClick={() => goTo("home")} className="wordmark group text-left" aria-label="I Cut Hair Grooming Studio home"><span className="wordmark-title">I CUT</span><span className="wordmark-subtitle">HAIR GROOMING STUDIO</span></button>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => <button key={item} onClick={() => goTo(item === "Home" ? "home" : item.toLowerCase())} className="nav-link">{item}</button>)}
          </nav>
          <div className="flex items-center gap-3">
            <a href={`tel:${BUSINESS.phone}`} className="hidden items-center gap-2 text-xs font-semibold tracking-[.12em] text-ivory/70 hover:text-gold xl:flex"><Phone size={15} /> {BUSINESS.phone}</a>
            <button onClick={() => goTo("appointment")} className="gold-button hidden sm:inline-flex">Book appointment <ArrowRight size={15} /></button>
            <button className="mobile-menu-button lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="border-t border-white/10 bg-ink px-5 py-5 lg:hidden" aria-label="Mobile navigation">
            {navItems.map((item) => <button key={item} onClick={() => goTo(item === "Home" ? "home" : item.toLowerCase())} className="block w-full border-b border-white/10 py-3 text-left font-sans text-xs uppercase tracking-[0.18em] text-ivory/75 last:border-0">{item}</button>)}
            <button onClick={() => goTo("appointment")} className="gold-button mt-5 w-full justify-center">Book appointment <ArrowRight size={15} /></button>
          </motion.nav>}
        </AnimatePresence>
      </header>

      <main>
        <section id="home" className="hero-section relative flex min-h-[720px] items-end overflow-hidden pb-20 pt-32 sm:min-h-screen lg:pb-28">
          <motion.img initial={reduce ? false : { scale: 1.08 }} animate={reduce ? undefined : { scale: 1 }} transition={{ duration: 1.6, ease }} src={heroImage} alt="Stylish client with a modern taper haircut inside I Cut Hair Grooming Studio" className="absolute inset-0 h-full w-full object-cover object-[62%_center]" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/10" /><div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/20" />
          <div className="container relative z-10 grid items-end gap-12 lg:grid-cols-[1fr_280px]">
            <div className="max-w-3xl">
              <motion.div initial={reduce ? false : { opacity: 0, y: 18 }} animate={reduce ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .6, delay: .15, ease }} className="section-kicker mb-7"><span>01</span><span className="h-px w-10 bg-gold" /><span>Premium grooming studio · Muvattupuzha</span></motion.div>
              <motion.h1 initial={reduce ? false : { opacity: 0, y: 22 }} animate={reduce ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .8, delay: .24, ease }} className="display-title max-w-4xl">Precision cuts.<br /><em>Confident style.</em></motion.h1>
              <motion.p initial={reduce ? false : { opacity: 0, y: 18 }} animate={reduce ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .7, delay: .36, ease }} className="mt-7 max-w-lg text-base leading-7 text-ivory/70 sm:text-lg">Expert haircuts, beard styling, and modern grooming in a studio built around your individual style.</motion.p>
            </div>
            <div className="hidden border-l border-white/20 pl-7 lg:block"><div className="mb-3 flex gap-1 text-gold" aria-label="5 out of 5 stars">{[1,2,3,4,5].map((star) => <Star key={star} size={15} fill="currentColor" />)}</div><p className="font-sans text-xs leading-5 text-ivory/60">5.0 rating<br />from 35 five-star reviews</p></div>
          </div>
          <button onClick={() => goTo("about")} className="scroll-cue absolute bottom-6 right-6 hidden items-center gap-3 lg:flex"><span>Scroll to explore</span><ArrowDown size={16} /></button>
        </section>

        <section id="about" className="section-shell bg-ink">
          <div className="container grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
            <Reveal><SectionKicker number="02">The I Cut approach</SectionKicker><h2 className="section-title mt-7">More than<br /><em>just a haircut.</em></h2></Reveal>
            <Reveal delay={.1} className="lg:pt-16"><p className="max-w-xl text-xl leading-9 text-ivory/80">I Cut Hair Grooming Studio is a modern local destination for people who care about the details. Expect precise work, thoughtful styling, and a comfortable space designed to make time in the chair feel considered.</p><p className="mt-7 max-w-xl leading-7 text-muted">From the first consultation to the final mirror check, I Cut brings precision, comfort, and an unhurried studio experience to Mudavoor.</p><div className="mt-10 h-px w-28 bg-gold" /></Reveal>
          </div>
          <div className="container mt-20 grid gap-px bg-white/10 sm:grid-cols-2">{[{ icon: Scissors, title: "Expert grooming", text: "Clean technique and an eye for proportion." }, { icon: Sparkles, title: "Personalised style", text: "A finish shaped around the way you want to show up every day." }].map((feature, i) => { const Icon = feature.icon; return <Reveal key={feature.title} delay={i * .08} className="bg-ink p-8 lg:p-10"><Icon className="text-gold" size={22} strokeWidth={1.5} /><h3 className="mt-8 font-serif text-2xl text-ivory">{feature.title}</h3><p className="mt-3 text-sm leading-6 text-muted">{feature.text}</p></Reveal>; })}</div>
        </section>

        <section id="services" className="section-shell border-t border-white/10 bg-charcoal">
          <div className="container"><Reveal><SectionKicker number="03">The service menu</SectionKicker><div className="mt-7 flex flex-col justify-between gap-6 md:flex-row md:items-end"><h2 className="section-title">Made for your<br /><em>signature look.</em></h2><p className="max-w-xs text-sm leading-6 text-muted">Thoughtful grooming services, clear in purpose and tailored in finish.</p></div></Reveal>
            <div className="mt-16 grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3">{services.map((service, i) => { const Icon = service.icon; return <Reveal key={service.title} delay={i * .05} className="group bg-charcoal p-8 transition-colors duration-300 hover:bg-ink lg:p-9"><div className="flex items-start justify-between"><Icon size={22} className="text-gold" strokeWidth={1.4} /><span className="font-sans text-[10px] tracking-[.2em] text-muted">0{i + 1}</span></div><h3 className="mt-12 font-serif text-[27px] text-ivory">{service.title}</h3><p className="mt-3 min-h-[52px] text-sm leading-6 text-muted">{service.description}</p><div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5"><span className="font-sans text-[10px] uppercase tracking-[.16em] text-gold/90">Contact for price</span><button onClick={() => goTo("appointment")} className="flex items-center gap-2 text-xs uppercase tracking-[.12em] text-ivory/70 transition-colors hover:text-gold">Book now <ArrowRight size={14} /></button></div></Reveal>; })}</div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-ink py-20 lg:py-28"><div className="container grid items-center gap-12 lg:grid-cols-[1fr_auto]"><Reveal><SectionKicker number="04">Why I Cut</SectionKicker><h2 className="section-title mt-7 max-w-2xl">Good grooming<br /><em>is personal.</em></h2></Reveal><Reveal delay={.1} className="flex items-center gap-7 border-l border-gold/60 pl-7"><span className="font-serif text-7xl leading-none text-gold">35</span><span className="max-w-[120px] font-sans text-xs uppercase leading-5 tracking-[.14em] text-muted">five-star reviews<br />and counting</span></Reveal></div><div className="container mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{["Skilled, precise service", "Clean and comfortable studio", "Modern grooming techniques", "Personal attention", "Excellent customer satisfaction", "Convenient Mudavoor location"].map((item, i) => <Reveal key={item} delay={i * .04} className="flex gap-4 border-t border-white/10 pt-5"><span className="font-serif italic text-gold">0{i + 1}</span><span className="text-sm text-ivory/75">{item}</span></Reveal>)}</div></section>

        <section id="gallery" className="section-shell border-t border-white/10 bg-charcoal"><div className="container"><Reveal><SectionKicker number="05">A glimpse inside</SectionKicker><div className="mt-7 flex flex-col justify-between gap-6 md:flex-row md:items-end"><h2 className="section-title">Craft in<br /><em>the frame.</em></h2><a href={BUSINESS.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs uppercase tracking-[.15em] text-gold transition-colors hover:text-ivory">See more on Instagram <MoveUpRight size={15} /></a></div></Reveal>
          <div className="gallery-grid mt-16">{gallery.map((image, i) => <Reveal key={`${image.src}-${i}`} delay={i * .05} className={`gallery-item gallery-${i + 1}`}><button onClick={() => setLightbox(i)} className="group relative block h-full w-full overflow-hidden text-left" aria-label={`Open gallery image: ${image.label}`}><img src={image.src} alt={image.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" /><span className="absolute bottom-5 left-5 text-xs uppercase tracking-[.16em] text-ivory">{image.label}</span><span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center border border-white/30 bg-ink/30 text-ivory opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"><MoveUpRight size={15} /></span></button></Reveal>)}</div></div></section>

        <section id="reviews" className="border-t border-white/10 bg-ink py-24 lg:py-32"><div className="container grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-24"><Reveal><SectionKicker number="06">The word around town</SectionKicker><div className="mt-9 flex items-end gap-4"><span className="font-serif text-[100px] leading-[.8] text-ivory">5.0</span><span className="pb-2 font-sans text-xs uppercase tracking-[.13em] text-muted">out of 5</span></div><div className="mt-7 flex gap-1 text-gold" aria-label="5 out of 5 stars">{[1,2,3,4,5].map((star) => <Star key={star} size={19} fill="currentColor" />)}</div><p className="mt-5 text-sm text-muted">Based on 35 five-star reviews.</p></Reveal><Reveal delay={.12} className="flex items-center border-l border-white/15 pl-8 lg:pl-14"><p className="max-w-lg font-serif text-3xl leading-[1.25] text-ivory sm:text-4xl">From the first consultation to the final finish, the studio is built around clear details, modern technique, and making the experience feel easy.</p></Reveal></div></section>

        <section id="appointment" className="section-shell border-t border-white/10 bg-warm text-ink"><div className="container grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24"><Reveal><SectionKicker number="07">Make it yours</SectionKicker><h2 className="section-title mt-7">Reserve<br /><em>your chair.</em></h2><p className="mt-7 max-w-sm leading-7 text-ink/65">Share a few details and we’ll help you find the right service. Your request is prepared here, then confirmed directly with the studio.</p></Reveal><Reveal delay={.1}>{submitted ? <div className="flex min-h-[400px] flex-col justify-center border-t border-ink/15 pt-10"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-ink"><Check size={22} /></div><h3 className="mt-7 font-serif text-4xl">Details received.</h3><p className="mt-4 max-w-md leading-7 text-ink/65">Your appointment details are ready. Please contact the salon to confirm your booking.</p><div className="mt-8 flex flex-wrap gap-3"><a href={whatsappLink} target="_blank" rel="noreferrer" className="dark-button"><MessageCircle size={15} /> Confirm via WhatsApp</a><a href={`tel:${BUSINESS.phone}`} className="outline-button border-ink/30 text-ink hover:border-ink hover:text-ink"><Phone size={15} /> Call the studio</a><button onClick={() => setSubmitted(false)} className="text-button">Send another request</button></div></div> : <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2"><label className="field-label">Full name<input name="name" className="field-input" placeholder="Your name" aria-invalid={!!errors.name} />{errors.name && <span className="field-error">{errors.name}</span>}</label><label className="field-label">Phone number<input name="phone" type="tel" className="field-input" placeholder="Your phone number" aria-invalid={!!errors.phone} />{errors.phone && <span className="field-error">{errors.phone}</span>}</label><label className="field-label">Preferred service<select name="service" className="field-input" defaultValue="" aria-invalid={!!errors.service}><option value="" disabled>Select a service</option>{services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}</select>{errors.service && <span className="field-error">{errors.service}</span>}</label><label className="field-label">Preferred date<input name="date" type="date" className="field-input" aria-invalid={!!errors.date} />{errors.date && <span className="field-error">{errors.date}</span>}</label><label className="field-label">Preferred time<select name="time" className="field-input" defaultValue="" aria-invalid={!!errors.time}><option value="" disabled>Select a time</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select>{errors.time && <span className="field-error">{errors.time}</span>}</label><label className="field-label sm:col-span-2">Optional message<textarea name="message" className="field-input min-h-[100px] resize-y" placeholder="Anything you’d like us to know?" /></label><div className="sm:col-span-2"><button type="submit" className="dark-button">Prepare appointment request <ArrowRight size={15} /></button><p className="mt-4 text-xs text-ink/50">No payment required. We’ll confirm availability directly.</p></div></form>}</Reveal></div></section>

        <section id="contact" className="border-t border-white/10 bg-charcoal py-20 lg:py-28"><div className="container grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-24"><Reveal><SectionKicker number="08">Find your way here</SectionKicker><h2 className="section-title mt-7">Come by<br /><em>the studio.</em></h2><div className="mt-10 space-y-6"><div className="flex gap-4"><MapPin className="mt-1 shrink-0 text-gold" size={19} /><p className="max-w-xs leading-7 text-ivory/70">{BUSINESS.address}</p></div><div className="flex gap-4"><Phone className="mt-1 shrink-0 text-gold" size={19} /><a href={`tel:${BUSINESS.phone}`} className="text-ivory/70 hover:text-gold">{BUSINESS.phone}</a></div><div className="flex gap-4"><Clock3 className="mt-1 shrink-0 text-gold" size={19} /><p className="text-ivory/70">Contact the salon for today’s availability.</p></div></div><div className="mt-10 flex flex-wrap gap-3"><a href={BUSINESS.maps} target="_blank" rel="noreferrer" className="gold-button">Open in Google Maps <MoveUpRight size={15} /></a><a href={BUSINESS.instagram} target="_blank" rel="noreferrer" className="outline-button"><Instagram size={15} /> Instagram</a></div></Reveal><Reveal delay={.12} className="relative min-h-[350px] overflow-hidden border border-white/10 bg-ink lg:min-h-[450px]"><img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=85" alt="Warm interior details of I Cut Hair Grooming Studio" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-45" /><div className="absolute inset-0 bg-gradient-to-br from-ink/60 via-transparent to-ink/80" /><div className="absolute bottom-7 left-7 right-7 flex items-end justify-between"><div><p className="font-serif text-3xl text-ivory">Mudavoor</p><p className="mt-1 text-xs uppercase tracking-[.16em] text-muted">Muvattupuzha · Kerala</p></div><MapPin className="text-gold" size={25} /></div></Reveal></div></section>
      </main>

      <footer className="border-t border-white/10 bg-ink py-12 pb-28 lg:pb-12"><div className="container grid gap-10 md:grid-cols-[1.2fr_1fr_1fr] md:gap-16"><div><button onClick={() => goTo("home")} className="wordmark text-left" aria-label="I Cut Hair Grooming Studio home"><span className="wordmark-title">I CUT</span><span className="wordmark-subtitle">HAIR GROOMING STUDIO</span></button><p className="mt-6 max-w-xs text-sm leading-6 text-muted">Precision cuts and confident style, made personal in Mudavoor.</p></div><div><p className="footer-label">Explore</p><div className="mt-5 grid grid-cols-2 gap-3 text-sm text-muted">{navItems.map(item => <button key={item} onClick={() => goTo(item === "Home" ? "home" : item.toLowerCase())} className="text-left hover:text-gold">{item}</button>)}</div></div><div><p className="footer-label">Studio</p><p className="mt-5 max-w-xs text-sm leading-6 text-muted">{BUSINESS.address}</p><a href={BUSINESS.instagram} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm text-muted hover:text-gold"><Instagram size={16} /> Follow on Instagram</a></div></div><div className="container mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-[11px] uppercase tracking-[.12em] text-muted sm:flex-row"><span>© {new Date().getFullYear()} I Cut Hair Grooming Studio</span><button onClick={() => goTo("home")} className="flex items-center gap-2 hover:text-gold">Back to top <ArrowDown className="rotate-180" size={14} /></button></div></footer>

      <AnimatePresence>{scrolled && <motion.div initial={reduce ? false : { opacity: 0, y: 16, scale: .96 }} animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }} exit={reduce ? undefined : { opacity: 0, y: 12, scale: .97 }} transition={{ duration: .24, ease }} className="fixed bottom-4 left-4 right-4 z-30 flex gap-2 sm:bottom-7 sm:left-1/2 sm:right-auto sm:-translate-x-1/2"><button onClick={() => goTo("appointment")} className="gold-button flex-1 justify-center sm:flex-none"><CalendarDays size={15} /> Book</button><a href={BUSINESS.maps} target="_blank" rel="noreferrer" className="outline-button flex-1 justify-center bg-ink/90 sm:flex-none"><MapPin size={15} /> Directions</a></motion.div>}</AnimatePresence>
      <div className="fixed bottom-7 right-7 z-30 hidden flex-col gap-2 sm:flex"><a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex h-11 w-11 items-center justify-center border border-white/20 bg-ink/90 text-gold backdrop-blur-sm transition-colors hover:border-gold" aria-label="Chat with I Cut on WhatsApp"><MessageCircle size={18} /></a><a href={BUSINESS.instagram} target="_blank" rel="noreferrer" className="flex h-11 w-11 items-center justify-center border border-white/20 bg-ink/90 text-gold backdrop-blur-sm transition-colors hover:border-gold" aria-label="Follow I Cut on Instagram"><Instagram size={18} /></a></div>

      <AnimatePresence>{lightboxImage && lightbox !== null && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-5 backdrop-blur-xl" role="dialog" aria-modal="true" aria-label="Gallery image viewer"><button onClick={() => setLightbox(null)} className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-white/20 text-ivory hover:border-gold hover:text-gold" aria-label="Close image viewer"><X size={21} /></button><button onClick={() => setLightbox((lightbox - 1 + gallery.length) % gallery.length)} className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 text-ivory hover:border-gold hover:text-gold sm:left-7" aria-label="Previous image"><ChevronLeft size={20} /></button><img src={lightboxImage.src} alt={lightboxImage.alt} className="max-h-[82vh] max-w-[86vw] object-contain" /><button onClick={() => setLightbox((lightbox + 1) % gallery.length)} className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 text-ivory hover:border-gold hover:text-gold sm:right-7" aria-label="Next image"><ChevronRight size={20} /></button><p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[.18em] text-muted">{lightbox + 1} / {gallery.length} · {lightboxImage.label}</p></motion.div>}</AnimatePresence>
    </div>
  );
}
