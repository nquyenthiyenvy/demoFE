import { useState } from "react";
import { ChevronDown, Search, UserPlus, LogIn, Star, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Trang chủ", href: "/" },
  {
    label: "Khám phá",
    children: [
      { label: "Bản đồ di tích", href: "#" },
      { label: "Kiến trúc cổ", href: "#" },
      { label: "Di sản phi vật thể", href: "#" },
      { label: "Tour 360°", href: "#", badge: "Mới" },
    ],
  },
  {
    label: "Trải nghiệm",
    children: [
      { label: "Triển lãm ảo", href: "#" },
      { label: "Âm thanh lịch sử", href: "#" },
      { label: "Phục dựng 3D", href: "#" },
    ],
  },
  { label: "Cộng đồng", href: "#" },
  { label: "Dòng thời gian", href: "#" },
  {
    label: "Văn hóa",
    children: [
      { label: "Ẩm thực", href: "#" },
      { label: "Phong tục tập quán", href: "#" },
      { label: "Nghệ thuật dân gian", href: "#" },
    ],
  },
];

const gold = "#C9A84C";
const goldFaint = "rgba(201,168,76,0.2)";
const textMuted = "#C4B89A";
const textLight = "#F5EDD6";
const bgDark = "#2C1810";
const bgDeeper = "#1E0F08";

function DropdownMenu({ items }) {
  return (
    <div
      className="absolute top-[calc(100%+8px)] left-0 z-50 min-w-[200px] p-1.5 rounded-md border opacity-0 -translate-y-1.5 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200"
      style={{ background: bgDeeper, borderColor: goldFaint, boxShadow: "0 12px 32px rgba(0,0,0,0.5)" }}
    >
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="flex items-center gap-2.5 px-3 py-2 rounded text-[13px] transition-colors duration-150"
          style={{ color: textMuted, textDecoration: "none" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = textLight; e.currentTarget.style.background = "rgba(201,168,76,0.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = textMuted; e.currentTarget.style.background = "transparent"; }}
        >
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "rgba(201,168,76,0.5)" }} />
          {item.label}
          {item.badge && (
            <span className="ml-1 text-[9px] font-semibold px-1 py-px rounded tracking-wide" style={{ background: gold, color: bgDark }}>
              {item.badge}
            </span>
          )}
        </a>
      ))}
    </div>
  );
}

function NavItem({ item, active, onClick }) {
  const isActive = active === item.label;

  if (item.children) {
    return (
      <div className="relative group">
        <button
          className="flex items-center gap-1 px-3.5 py-2 rounded text-[13.5px] transition-colors duration-200"
          style={{ color: textMuted, background: "transparent", fontFamily: "inherit" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = textLight; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = textMuted; e.currentTarget.style.background = "transparent"; }}
        >
          {item.label}
          <ChevronDown size={12} className="transition-transform duration-200 group-hover:rotate-180" />
        </button>
        <DropdownMenu items={item.children} />
      </div>
    );
  }

  return (
    <div className="relative">
      <a
        href={item.href}
        onClick={() => onClick(item.label)}
        className="flex items-center px-3.5 py-2 rounded text-[13.5px] transition-colors duration-200"
        style={{ color: isActive ? gold : textMuted, fontWeight: isActive ? 500 : 400, textDecoration: "none" }}
        onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.color = textLight; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; } }}
        onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.color = textMuted; e.currentTarget.style.background = "transparent"; } }}
      >
        {item.label}
      </a>
      {isActive && <span className="absolute bottom-[-1px] left-3.5 right-3.5 h-[2px] rounded-t" style={{ background: gold }} />}
    </div>
  );
}

export default function Navbar() {
  const [active, setActive] = useState("Trang chủ");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full border-b" style={{ background: bgDark, borderColor: goldFaint, fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      <div className="flex items-center px-6 h-16">

        {/* Brand */}
        <a href="/" className="flex items-center gap-2.5 no-underline flex-shrink-0 mr-8">
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ border: `1.5px solid ${gold}` }}>
            <Star size={16} fill={gold} stroke="none" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[9px] tracking-widest font-medium uppercase" style={{ color: gold }}>Nền tảng số</span>
            <span className="text-base font-semibold tracking-wide" style={{ fontFamily: "'Playfair Display', serif", color: textLight }}>
              Di Sản <em style={{ color: gold }}>Việt.</em>
            </span>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5 flex-1">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.label} item={item} active={active} onClick={setActive} />
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-2 ml-auto flex-shrink-0">
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(201,168,76,0.3)", cursor: "pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.6)"; e.currentTarget.style.background = "rgba(255,255,255,0.09)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
          >
            <Search size={13} color={textMuted} />
            <span className="text-xs" style={{ color: "#8B7D6B" }}>Tìm địa điểm...</span>
          </button>

          <div className="w-px h-6 mx-1" style={{ background: goldFaint }} />

          <button
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
            style={{ color: gold, background: "transparent", border: "1px solid rgba(201,168,76,0.4)", fontFamily: "inherit", cursor: "pointer", whiteSpace: "nowrap" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,168,76,0.1)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.7)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"; }}
          >
            <UserPlus size={13} />
            Đăng ký
          </button>

          <button
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
            style={{ color: bgDark, background: gold, border: `1px solid ${gold}`, fontFamily: "inherit", cursor: "pointer", whiteSpace: "nowrap" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#D4B55A")}
            onMouseLeave={(e) => (e.currentTarget.style.background = gold)}
          >
            <LogIn size={13} />
            Đăng nhập
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden ml-auto p-2 rounded"
          style={{ color: gold, background: "transparent", border: "none", cursor: "pointer" }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Mở menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t px-4 py-3 flex flex-col gap-1" style={{ borderColor: goldFaint }}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href || "#"}
              className="block px-3 py-2.5 rounded text-sm"
              style={{ color: textMuted, textDecoration: "none" }}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="flex gap-2 pt-2 border-t mt-1" style={{ borderColor: goldFaint }}>
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-medium" style={{ color: gold, border: "1px solid rgba(201,168,76,0.4)", background: "transparent", fontFamily: "inherit" }}>
              <UserPlus size={12} /> Đăng ký
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-medium" style={{ color: bgDark, background: gold, border: "none", fontFamily: "inherit" }}>
              <LogIn size={12} /> Đăng nhập
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}