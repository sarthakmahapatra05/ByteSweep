import React, { useState } from "react";
import Logo from "./Logo";
import ByteSweepLogo from "../assets/ByteSweepLogo.png";
import AuthModal from "./AuthModal";
import { useAuth } from "./AuthContext";
import DiskSpaceAnalysis from "../assets/DiskSpaceAnalysis.png.png";
import FileOrganization from "../assets/FileOrganization.png.png";
import FileCompressorImg from "../assets/FileCompressor.png.png";
import { Link, useNavigate } from "react-router-dom";
import AnimatedList from './AnimatedList';

const sidebarSections = [
  {
    title: "Get Started",
    items: ["Quick Start", "Installation", "Setup", "Features"], // Add Features here
  }
];

const cards = [
  {
    title: "Analyze Disk Space",
    description: "Visualize and manage your disk usage efficiently.",
    image: DiskSpaceAnalysis,
  },
  {
    title: "Organize Files",
    description: "Automatically sort and organize your files.",
    image: FileOrganization,
  },
  {
    title: "Compress Large Files",
    description: "Reduce file sizes to save space.",
    image: FileCompressorImg,
  },
];

const carouselSlides = [
  {
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    title: "Powerful Disk Analysis",
    desc: "Visualize and manage your disk space with beautiful charts and insights.",
  },
  {
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    title: "Smart File Organization",
    desc: "Automatically sort, group, and clean your files for a clutter-free system.",
  },
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    title: "Effortless Compression",
    desc: "Compress large files and save space with a single click.",
  },
];

const palette = {
  background: "#F9FAFB",
  sidebar: "#fff",
  border: "#E5E7EB",
  text: "#111827",
  accent: "#2E2EFF",
  secondary: "#6B7280",
  alert: "#EF4444", // Added alert color
};

export default function Homepage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const themePalette = darkMode
    ? {
        background: "#18181b",
        sidebar: "#23232a",
        border: "#27272a",
        text: "#f4f4f5",
        accent: "#6366f1",
        secondary: "#a1a1aa",
        alert: "#ef4444",
      }
    : palette;

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: themePalette.background }}>
      {/* Sidebar */}
      <aside style={{ width: 260, background: themePalette.sidebar, borderRight: `1px solid ${themePalette.border}`, padding: "32px 0 0 0" }}>
        <div style={{ fontWeight: 800, fontSize: 28, color: themePalette.accent, textAlign: "center", marginBottom: 40 }}>
          <Link to="/">
            <img src={ByteSweepLogo} alt="Logo" style={{ width: 96, marginBottom: 12 }} />
          </Link>
          ByteSweep
        </div>
        {/* AnimatedList in sidebar */}
        <AnimatedList
          items={["Dashboard", "Analyze", "Organize", "Compress", "Features", "About"]}
          className="sidebar-animated-list"
          itemClassName="sidebar-animated-item"
          onItemSelect={(item, idx) => {
            // Example navigation logic
            if (item === "Dashboard") navigate("/dashboard");
            else if (item === "Analyze") navigate("/analyze");
            else if (item === "Organize") navigate("/organize");
            else if (item === "Compress") navigate("/compress");
            else if (item === "Features") navigate("/features");
            else if (item === "About") navigate("/about");
          }}
        />
        {sidebarSections.map((section) => (
          <div key={section.title} style={{ marginBottom: 32 }}>
            <div style={{ color: themePalette.secondary, fontWeight: 700, fontSize: 14, padding: "0 24px", marginBottom: 8 }}>
              {section.title}
            </div>
            {section.items.map((item) => (
              <Link key={item} to={
                item === "Quick Start" ? "/quick-start" :
                item === "Installation" ? "/installation" :
                item === "Setup" ? "/setup" :
                item === "Features" ? "/features" :
                "/"
              } style={{ textDecoration: 'none' }}>
                <div style={{ color: themePalette.text, fontSize: 16, padding: "8px 24px", cursor: "pointer", borderRadius: 6, marginBottom: 2, transition: "background 0.2s" }}>
                  {item}
                </div>
              </Link>
            ))}
          </div>
        ))}
      </aside>
      {/* Main content area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <header style={{ height: 64, background: themePalette.sidebar, borderBottom: `1px solid ${themePalette.border}`, display: "flex", alignItems: "center", padding: "0 32px", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img src={ByteSweepLogo} alt="Logo" style={{ width: 32 }} />
            <span style={{ fontWeight: 700, fontSize: 20, color: themePalette.accent }}>ByteSweep</span>
          </div>
          {/* Dark/Light mode toggle button */}
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            style={{
              background: darkMode ? themePalette.accent : themePalette.border,
              color: darkMode ? '#fff' : themePalette.text,
              border: 'none',
              borderRadius: 8,
              padding: '8px 16px',
              fontWeight: 600,
              marginRight: 24,
              cursor: 'pointer',
              fontSize: 16,
              transition: 'background 0.2s, color 0.2s',
            }}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '🌙 Dark' : '☀️ Light'}
          </button>
          <input type="text" placeholder="Search..." style={{ background: themePalette.background, border: `1px solid ${themePalette.border}`, borderRadius: 8, padding: "8px 16px", fontSize: 16, width: 280, color: themePalette.text }} />
          <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <Link to="/" style={{ color: themePalette.text, fontWeight: 600, cursor: "pointer", textDecoration: 'none' }}>Home</Link>
            {user && <Link to="/dashboard" style={{ color: themePalette.text, fontWeight: 600, cursor: "pointer", textDecoration: 'none' }}>Dashboard</Link>}
            <Link to="/analyze" style={{ color: themePalette.text, fontWeight: 600, cursor: "pointer", textDecoration: 'none' }}>Analyze</Link>
            <Link to="/organize" style={{ color: themePalette.text, fontWeight: 600, cursor: "pointer", textDecoration: 'none' }}>Organize</Link>
            <Link to="/compress" style={{ color: themePalette.text, fontWeight: 600, cursor: "pointer", textDecoration: 'none' }}>Compress</Link>
            {!user && <>
              <button
                onClick={() => { setAuthOpen(true); setAuthMode("login"); }}
                style={{
                  background: palette.accent,
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 20px",
                  fontWeight: 600,
                  marginLeft: 16,
                  cursor: "pointer",
                  fontSize: 16,
                  transition: "background 0.2s"
                }}
              >Login</button>
              <button
                onClick={() => { setAuthOpen(true); setAuthMode("signup"); }}
                style={{
                  background: palette.secondary,
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 20px",
                  fontWeight: 600,
                  marginLeft: 8,
                  cursor: "pointer",
                  fontSize: 16,
                  transition: "background 0.2s"
                }}
              >Sign Up</button>
            </>}
            {user && <button
              onClick={handleLogout}
              style={{
                background: palette.alert,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "8px 20px",
                fontWeight: 600,
                marginLeft: 16,
                cursor: "pointer",
                fontSize: 16,
                transition: "background 0.2s"
              }}
            >Logout</button>}
          </nav>
        </header>
        {/* Cards section */}
        <main style={{ flex: 1, padding: "48px 40px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: themePalette.text, marginBottom: 32 }}>Welcome to ByteSweep</h1>
          {/* Carousel - properly aligned below navbar */}
          <div
            style={{
              width: '100%',
              maxWidth: 1200,
              margin: '0 auto 40px auto',
              background: '#fff',
              zIndex: 1,
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              borderRadius: 0,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minHeight: 420,
              position: 'relative',
            }}
          >
            <img src={carouselSlides[carouselIdx].image} alt={carouselSlides[carouselIdx].title} style={{ width: '100%', height: 340, objectFit: 'cover', maxHeight: 420 }} />
            <div style={{ padding: 36, textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
              <h3 style={{ fontSize: 36, fontWeight: 700, color: palette.accent, marginBottom: 16 }}>{carouselSlides[carouselIdx].title}</h3>
              <p style={{ color: palette.secondary, fontSize: 22 }}>{carouselSlides[carouselIdx].desc}</p>
            </div>
            {/* Arrows */}
            <button
              onClick={() => setCarouselIdx((carouselIdx - 1 + carouselSlides.length) % carouselSlides.length)}
              style={{ position: 'absolute', left: 32, top: '50%', transform: 'translateY(-50%)', background: '#fff', border: 'none', borderRadius: '50%', width: 48, height: 48, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', fontSize: 28, cursor: 'pointer', zIndex: 2 }}
              aria-label="Previous slide"
            >
              &#8592;
            </button>
            <button
              onClick={() => setCarouselIdx((carouselIdx + 1) % carouselSlides.length)}
              style={{ position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)', background: '#fff', border: 'none', borderRadius: '50%', width: 48, height: 48, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', fontSize: 28, cursor: 'pointer', zIndex: 2 }}
              aria-label="Next slide"
            >
              &#8594;
            </button>
            {/* Dots */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 18 }}>
              {carouselSlides.map((_, idx) => (
                <span
                  key={idx}
                  onClick={() => setCarouselIdx(idx)}
                  style={{
                    display: 'inline-block',
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: idx === carouselIdx ? palette.accent : palette.border,
                    cursor: 'pointer',
                    border: idx === carouselIdx ? `2px solid ${palette.accent}` : '2px solid transparent',
                    transition: 'background 0.2s, border 0.2s',
                  }}
                />
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap", justifyContent: "center" }}>
            {cards.map((card, idx) => (
              <Link key={card.title} to={
                idx === 0 ? "/analyze" :
                idx === 1 ? "/organize" :
                idx === 2 ? "/compress" :
                "/"
              } style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    background: palette.sidebar,
                    border: `1px solid ${palette.border}`,
                    borderRadius: 24,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                    width: 420,
                    padding: 48,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: 32,
                    transition: "box-shadow 0.3s, transform 0.3s, border-color 0.3s, background 0.3s",
                    cursor: "pointer",
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = "0 8px 32px rgba(46,46,255,0.12)";
                    e.currentTarget.style.transform = "translateY(-8px) scale(1.03)";
                    e.currentTarget.style.borderColor = palette.accent;
                    e.currentTarget.style.background = "#F0F4FF";
                    const title = e.currentTarget.querySelector('.card-title');
                    if (title) title.style.color = palette.accent;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.borderColor = palette.border;
                    e.currentTarget.style.background = palette.sidebar;
                    const title = e.currentTarget.querySelector('.card-title');
                    if (title) title.style.color = palette.accent;
                  }}
                  onClick={e => {
                    // Ripple effect
                    const ripple = document.createElement('span');
                    ripple.style.position = 'absolute';
                    ripple.style.borderRadius = '50%';
                    ripple.style.transform = 'scale(0)';
                    ripple.style.background = 'rgba(46,46,255,0.15)';
                    ripple.style.pointerEvents = 'none';
                    ripple.style.width = ripple.style.height = '200px';
                    ripple.style.left = `${e.nativeEvent.offsetX - 100}px`;
                    ripple.style.top = `${e.nativeEvent.offsetY - 100}px`;
                    ripple.style.transition = 'transform 0.5s, opacity 0.5s';
                    e.currentTarget.appendChild(ripple);
                    setTimeout(() => {
                      ripple.style.transform = 'scale(1)';
                      ripple.style.opacity = '0';
                    }, 0);
                    setTimeout(() => {
                      ripple.remove();
                    }, 500);
                  }}
                >
                  {card.image ? (
                    <img
                      src={card.image}
                      alt={card.title}
                      style={{
                        width: 180,
                        height: 180,
                        marginBottom: 32,
                        objectFit: 'contain',
                        borderRadius: 16,
                        transition: 'transform 0.3s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'scale(1.08)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'none';
                      }}
                    />
                  ) : (
                    <div style={{ width: 180, height: 180, marginBottom: 32, background: palette.border, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: palette.secondary, fontSize: 48 }}>
                      ?
                    </div>
                  )}
                  <h2 className="card-title" style={{ fontSize: 28, fontWeight: 700, color: palette.accent, marginBottom: 18, transition: 'color 0.3s' }}>{card.title}</h2>
                  <p style={{ color: palette.secondary, fontSize: 20, textAlign: "center" }}>{card.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </main>
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} mode={authMode} />
      </div>
    </div>
  );
} 