import { useState } from "react";
import {
  ChevronDown,
  UserPlus,
  LogIn,
  Star,
  Home,
  Compass,
  Sparkles,
  Users,
  Clock,
  Palette,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Trang chủ", icon: Home, href: "/" },
  {
    label: "Khám phá",
    icon: Compass,
    children: [
      { label: "Bản đồ di tích", href: "#" },
      { label: "Kiến trúc cổ", href: "#" },
      { label: "Di sản phi vật thể", href: "#" },
      { label: "Tour 360°", href: "#", badge: "Mới" },
    ],
  },
  {
    label: "Trải nghiệm",
    icon: Sparkles,
    children: [
      { label: "Triển lãm ảo", href: "#" },
      { label: "Âm thanh lịch sử", href: "#" },
      { label: "Phục dựng 3D", href: "#" },
    ],
  },
  { label: "Cộng đồng", icon: Users, href: "#" },
  { label: "Dòng thời gian", icon: Clock, href: "#" },
  {
    label: "Văn hóa",
    icon: Palette,
    children: [
      { label: "Ẩm thực", href: "#" },
      { label: "Phong tục tập quán", href: "#" },
      { label: "Nghệ thuật dân gian", href: "#" },
    ],
  },
];

function NavItem({ item, active, onClick, collapsed }) {
  const [open, setOpen] = useState(false);
  const isActive = active === item.label;
  const Icon = item.icon;

  if (collapsed) {
    return (
      <div title={item.label} className="flex justify-center">
        <a
          href={item.href || "#"}
          onClick={() => !item.children && onClick(item.label)}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-150
            ${
              isActive
                ? "bg-[rgba(201,168,76,0.12)] text-[#C9A84C]"
                : "text-[#C4B89A] hover:bg-white/5 hover:text-[#F5EDD6]"
            }`}
        >
          <Icon size={17} />
        </a>
      </div>
    );
  }

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-[13px] transition-all duration-150 cursor-pointer font-[inherit] text-left border-0
            ${
              open
                ? "bg-[rgba(201,168,76,0.08)] text-[#F5EDD6]"
                : "bg-transparent text-[#C4B89A] hover:bg-white/5 hover:text-[#F5EDD6]"
            }`}
        >
          <Icon size={15} className="shrink-0 opacity-80" />
          <span className="flex-1">{item.label}</span>
          <ChevronDown
            size={12}
            className={`opacity-60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div className="ml-3.5 border-l border-[rgba(201,168,76,0.18)] pl-2.5 mt-0.5">
            {item.children.map((child) => (
              <a
                key={child.label}
                href={child.href}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] text-[#C4B89A] no-underline transition-all duration-150 mb-px hover:text-[#F5EDD6] hover:bg-[rgba(201,168,76,0.07)]"
              >
                <span className="w-1 h-1 rounded-full bg-[rgba(201,168,76,0.45)] shrink-0" />
                {child.label}
                {child.badge && (
                  <span className="text-[9px] font-semibold px-1 py-px rounded bg-[#C9A84C] text-[#2C1810] ml-0.5">
                    {child.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <a
      href={item.href}
      onClick={() => onClick(item.label)}
      className={`flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-[13px] no-underline transition-all duration-150
        ${
          isActive
            ? "bg-[rgba(201,168,76,0.12)] text-[#C9A84C] font-medium border-l-2 border-[#C9A84C]"
            : "text-[#C4B89A] border-l-2 border-transparent hover:bg-white/5 hover:text-[#F5EDD6]"
        }`}
    >
      <Icon
        size={15}
        className={`shrink-0 ${isActive ? "opacity-100" : "opacity-75"}`}
      />
      {item.label}
    </a>
  );
}

export default function Sidebar() {
  const [active, setActive] = useState("Trang chủ");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={` z-[2000] h-screen bg-[#241209] border-r border-[rgba(201,168,76,0.18)] flex flex-col overflow-hidden transition-all duration-300 ease-in-out shadow-2xl
        ${collapsed ? "w-16" : "w-60"}`}
    >
      {/* Brand + Toggle */}
      <div
        className={`border-b border-[rgba(201,168,76,0.18)] flex items-center min-h-[64px] px-3 py-3.5
        ${collapsed ? "justify-center" : "justify-between gap-2"}`}
      >
        {!collapsed && (
          <a
            href="/"
            className="flex items-center gap-2.5 no-underline overflow-hidden"
          >
            <div className="w-[34px] h-[34px] rounded-full border border-[#C9A84C] flex items-center justify-center shrink-0 bg-[rgba(201,168,76,0.08)]">
              <Star size={14} fill="#C9A84C" stroke="none" />
            </div>
            <div className="leading-tight overflow-hidden">
              <div className="text-[9px] tracking-widest font-medium uppercase text-[#C9A84C] whitespace-nowrap">
                Nền tảng số
              </div>
              <div
                className="text-[14px] font-semibold text-[#F5EDD6] whitespace-nowrap"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Di Sản <em className="text-[#C9A84C]">Việt.</em>
              </div>
            </div>
          </a>
        )}

        {collapsed && (
          <div className="w-[34px] h-[34px] rounded-full border border-[#C9A84C] flex items-center justify-center bg-[rgba(201,168,76,0.08)]">
            <Star size={14} fill="#C9A84C" stroke="none" />
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Mở sidebar" : "Đóng sidebar"}
          className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 cursor-pointer transition-all duration-150
            bg-white/5 border border-[rgba(201,168,76,0.18)] text-[#C4B89A]
            hover:bg-[rgba(201,168,76,0.12)] hover:text-[#C9A84C] hover:border-[rgba(201,168,76,0.5)]"
        >
          {collapsed ? (
            <PanelLeftOpen size={14} />
          ) : (
            <PanelLeftClose size={14} />
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-1.5 py-2.5 flex flex-col gap-0.5">
        {!collapsed && (
          <div className="text-[9px] tracking-widest uppercase text-[rgba(201,168,76,0.5)] font-semibold px-2.5 pb-2 pt-1 whitespace-nowrap">
            Điều hướng
          </div>
        )}
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.label}
            item={item}
            active={active}
            onClick={setActive}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="px-1.5 py-2.5 border-t border-[rgba(201,168,76,0.18)] flex flex-col gap-1.5">
        {collapsed ? (
          <>
            <div className="flex justify-center">
              <button
                title="Đăng ký"
                className="w-10 h-10 rounded-lg flex items-center justify-center text-[#C9A84C] bg-transparent border border-[rgba(201,168,76,0.35)] cursor-pointer hover:bg-[rgba(201,168,76,0.1)] transition-all"
              >
                <UserPlus size={15} />
              </button>
            </div>
            <div className="flex justify-center">
              <button
                title="Đăng nhập"
                className="w-10 h-10 rounded-lg flex items-center justify-center text-[#2C1810] bg-[#C9A84C] border-none cursor-pointer hover:bg-[#D4B55A] transition-all"
              >
                <LogIn size={15} />
              </button>
            </div>
          </>
        ) : (
          <>
            <button className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium text-[#C9A84C] bg-transparent border border-[rgba(201,168,76,0.35)] cursor-pointer transition-all hover:bg-[rgba(201,168,76,0.1)]">
              <UserPlus size={13} /> Đăng ký
            </button>
            <button className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-[#2C1810] bg-[#C9A84C] border-none cursor-pointer transition-all hover:bg-[#D4B55A]">
              <LogIn size={13} /> Đăng nhập
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
