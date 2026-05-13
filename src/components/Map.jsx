import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { UtensilsCrossed, Coffee, Landmark, MapPin } from "lucide-react";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const ALL_LOCATIONS = [
  {
    category: "Quán ăn",
    name: "Bún mắm Cô Ba",
    lat: 10.7718559,
    lng: 106.627455,
  },
  {
    category: "Quán ăn",
    name: "Gà Ta Quê Nhà",
    lat: 10.796356,
    lng: 106.630226,
  },
  { category: "Quán ăn", name: "Cháo Ếch Ú", lat: 10.795924, lng: 106.622225 },
  {
    category: "Quán cafe",
    name: "Tiệm trà Bốn Mùa",
    lat: 10.798938,
    lng: 106.639962,
  },
  {
    category: "Quán cafe",
    name: "Machiya Coffee",
    lat: 10.806638,
    lng: 106.730349,
  },
  {
    category: "Quán cafe",
    name: "XLIII Specialty Coffee",
    lat: 10.810025,
    lng: 106.732232,
  },
  {
    category: "Quán ăn",
    name: "OM Nướng - Ba Son",
    lat: 10.778701,
    lng: 106.710893,
  },
  { category: "Quán cafe", name: "CATFE", lat: 10.771811, lng: 106.68793 },
  { category: "Quán ăn", name: "Bún bò chú Há", lat: 10.77173, lng: 106.68571 },
  {
    category: "Di tích",
    name: "Bảo tàng Lịch sử TP.HCM",
    lat: 10.7793,
    lng: 106.7026,
  },
  { category: "Di tích", name: "Nhà thờ Đức Bà", lat: 10.7797, lng: 106.699 },
  { category: "Di tích", name: "Dinh Độc Lập", lat: 10.7763, lng: 106.6954 },
];

const CATEGORY_STYLES = {
  "Quán ăn": {
    color: "#C0392B",
    bg: "#FCEBEB",
    Icon: UtensilsCrossed,
    markerColor: "#E57373", // đỏ nhạt
  },
  "Quán cafe": {
    color: "#0F6E56",
    bg: "#E1F5EE",
    Icon: Coffee,
    markerColor: "#4DB6AC", // xanh lá nhạt
  },
  "Di tích": {
    color: "#1D4ED8",
    bg: "#EFF6FF",
    Icon: Landmark,
    markerColor: "#64B5F6", // xanh dương nhạt
  },
};

// Icon path (Lucide-style SVG) cho từng loại — vẽ trên viewBox 24x24, căn giữa trong circle
const ICON_PATH = {
  "Quán ăn": `<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <line x1="7" y1="2" x2="7" y2="11" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <line x1="15" y1="2" x2="15" y2="22" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <path d="M13 2 Q13 7 15 7 Q17 7 17 2" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,

  "Quán cafe": `<path d="M17 8h1a4 4 0 0 1 0 8h-1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <line x1="6" y1="2" x2="6" y2="4" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <line x1="10" y1="2" x2="10" y2="4" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <line x1="14" y1="2" x2="14" y2="4" stroke="white" stroke-width="2" stroke-linecap="round"/>`,

  "Di tích": `<line x1="3" y1="22" x2="21" y2="22" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <line x1="6" y1="18" x2="6" y2="11" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <line x1="10" y1="18" x2="10" y2="11" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <line x1="14" y1="18" x2="14" y2="11" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <line x1="18" y1="18" x2="18" y2="11" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <polyline points="2 11 12 2 22 11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
};
// 1. Lưu SVG string vào biến (thay fill thành white)
const Food_SVG = `<svg fill="#000000" viewBox="0 -0.5 122.88 122.88" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="enable-background:new 0 0 122.88 121.87" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M97.34,0.74c0.86-0.93,2.3-0.99,3.23-0.13c0.93,0.86,0.99,2.3,0.13,3.23L81.98,24.1l-0.03,0.04 c-2.29,2.77-3.86,5.33-4.56,7.67c-0.62,2.07-0.53,3.95,0.39,5.59c0.49,0.88,0.33,1.96-0.32,2.67l0,0l-8.89,9.62 c-0.87-0.95-1.56-1.72-2.02-2.22c-0.21-0.28-0.45-0.55-0.7-0.81l-0.02,0.02c-0.12-0.13-0.25-0.25-0.38-0.37l7.6-8.23 c-0.89-2.38-0.88-4.91-0.06-7.6c0.88-2.92,2.75-6.03,5.44-9.27c0.06-0.08,0.11-0.16,0.18-0.23L97.32,0.72L97.34,0.74L97.34,0.74z M57.13,55.01c-0.84-0.94-0.76-2.39,0.18-3.23c0.94-0.84,2.39-0.76,3.23,0.18c9.41,10.54,38.5,41.73,46.56,53.39 c10.63,15.05-5.83,19.79-11.29,14.31c-13.64-13.19-42.6-46.82-55.33-61.08c-4.58,1.94-9.03,2.24-13.5,0.96 c-4.81-1.37-9.52-4.58-14.3-9.51l-0.06-0.06c-3.64-3.84-6.49-7.63-8.55-11.38c-2.11-3.86-3.4-7.68-3.86-11.47 c-0.49-4.08-0.11-7.88,0.99-11.25c1.29-3.96,3.58-7.31,6.58-9.8c3.02-2.5,6.73-4.12,10.87-4.62c3.44-0.41,7.19-0.06,11.07,1.21 c5.37,1.75,11.63,6.1,16.82,11.68c3.83,4.11,7.11,8.92,9.06,13.87c2.03,5.16,2.65,10.5,1.02,15.5c-0.96,2.96-2.7,5.74-5.4,8.25 c-0.93,0.86-2.37,0.8-3.23-0.12c-0.86-0.93-0.8-2.37,0.12-3.23c2.09-1.95,3.43-4.08,4.16-6.33c1.26-3.87,0.73-8.16-0.93-12.38 c-1.74-4.42-4.69-8.74-8.15-12.45c-4.68-5.02-10.23-8.91-14.91-10.44c-3.21-1.04-6.28-1.34-9.09-1c-3.26,0.4-6.18,1.65-8.51,3.6 c-2.34,1.95-4.13,4.58-5.16,7.71c-0.89,2.73-1.2,5.87-0.79,9.26c0.39,3.2,1.5,6.47,3.32,9.81c1.91,3.43,4.53,6.9,7.9,10.45 l0.02,0.03c4.22,4.35,8.27,7.15,12.28,8.29c3.79,1.08,7.65,0.66,11.68-1.35c0.92-0.53,2.11-0.35,2.84,0.47 c12.42,13.91,42.63,48.92,56.01,61.89c5.81,2.37,9.03-0.55,6.25-5.7C100.7,102.43,63.5,62.17,57.13,55.01L57.13,55.01L57.13,55.01z M45.07,75.12l-29.16,31.55c-0.06,0.06-0.11,0.12-0.18,0.18c-4.26,4.6,3.28,11.3,7.96,6.82l28.32-30.65l3.04,3.45l-28.1,30.41l0,0 c-0.06,0.07-0.12,0.13-0.2,0.2c-1.68,1.41-3.37,2.33-5.08,2.71c-1.76,0.4-3.49,0.22-5.15-0.56c-0.28-0.11-0.54-0.25-0.77-0.46 l-4.03-3.73l0,0c-0.06-0.06-0.12-0.11-0.18-0.18c-1.56-1.8-2.3-3.72-2.1-5.75c0.19-1.92,1.21-3.79,3.14-5.59l29.44-31.86 L45.07,75.12L45.07,75.12z M75.63,57.46l1.73-1.87c0.86-0.93,2.31-0.99,3.23-0.13s0.99,2.3,0.13,3.23l-2,2.16L75.63,57.46 L75.63,57.46z M104.45,7.43c0.86-0.93,2.3-0.99,3.23-0.13c0.93,0.86,0.99,2.3,0.13,3.23L91.4,28.3c-0.86,0.93-2.3,0.99-3.23,0.13 c-0.93-0.86-0.99-2.3-0.13-3.23L104.45,7.43L104.45,7.43L104.45,7.43z M111.55,14c0.86-0.93,2.3-0.99,3.23-0.13 c0.93,0.86,0.99,2.3,0.13,3.23L98.51,34.86c-0.86,0.93-2.3,0.99-3.23,0.13c-0.93-0.86-0.99-2.3-0.13-3.23L111.55,14L111.55,14 L111.55,14z M118.91,20.83c0.86-0.93,2.3-0.99,3.23-0.13c0.93,0.86,0.99,2.31,0.13,3.23L103.55,44.2c-0.07,0.07-0.14,0.13-0.21,0.2 c-4.26,4.1-8.33,6.47-12.22,7.14c-4.22,0.73-8.09-0.47-11.64-3.57c-0.95-0.83-1.04-2.28-0.22-3.22c0.83-0.95,2.28-1.04,3.22-0.22 c2.45,2.14,5.07,2.98,7.84,2.49c2.98-0.51,6.26-2.48,9.84-5.93l0.02-0.02l18.71-20.25L118.91,20.83L118.91,20.83z"></path> </g> </g></svg>`;
const Coffee_SVG = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Environment / Coffee"> <path id="Vector" d="M4 20H10.9433M10.9433 20H11.0567M10.9433 20C10.9622 20.0002 10.9811 20.0002 11 20.0002C11.0189 20.0002 11.0378 20.0002 11.0567 20M10.9433 20C7.1034 19.9695 4 16.8468 4 12.9998V8.92285C4 8.41305 4.41305 8 4.92285 8H17.0767C17.5865 8 18 8.41305 18 8.92285V9M11.0567 20H18M11.0567 20C14.8966 19.9695 18 16.8468 18 12.9998M18 9H19.5C20.8807 9 22 10.1193 22 11.5C22 12.8807 20.8807 14 19.5 14H18V12.9998M18 9V12.9998M15 3L14 5M12 3L11 5M9 3L8 5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>`;
const DiTich_SVG =
  '<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 192.154 192.154" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M71.547,50.96h-49.06c-1.938,0-3.504,1.565-3.504,3.504v10.513c0,1.938,1.566,3.504,3.504,3.504h49.06 c1.938,0,3.504-1.566,3.504-3.504V54.464C75.052,52.525,73.486,50.96,71.547,50.96z M68.043,61.473H25.992v-3.504h42.051V61.473z"></path> <path d="M71.547,174.633h-49.06c-1.938,0-3.504,1.564-3.504,3.505v10.513c0,1.937,1.566,3.504,3.504,3.504h49.06 c1.938,0,3.504-1.567,3.504-3.504v-10.513C75.052,176.197,73.486,174.633,71.547,174.633z M68.043,185.146H25.992v-3.505h42.051 V185.146z"></path> <path d="M62.787,172.864c1.938,0,3.504-1.567,3.504-3.505V75.49c0-1.938-1.566-3.504-3.504-3.504H52.274 c-1.939,0-3.504,1.566-3.504,3.504v93.87c0,1.938,1.565,3.505,3.504,3.505H62.787z M55.778,78.994h3.504v86.861h-3.504V78.994z"></path> <path d="M41.761,172.864c1.939,0,3.504-1.567,3.504-3.505V75.49c0-1.938-1.565-3.504-3.504-3.504H31.248 c-1.938,0-3.504,1.566-3.504,3.504v93.87c0,1.938,1.566,3.505,3.504,3.505H41.761z M34.752,78.994h3.504v86.861h-3.504V78.994z"></path> <path d="M169.668,50.96h-49.061c-1.937,0-3.504,1.565-3.504,3.504v10.513c0,1.938,1.567,3.504,3.504,3.504h49.061 c1.937,0,3.504-1.566,3.504-3.504V54.464C173.172,52.525,171.604,50.96,169.668,50.96z M166.163,61.473h-42.052v-3.504h42.052 V61.473z"></path> <path d="M169.668,174.633h-49.061c-1.937,0-3.504,1.564-3.504,3.505v10.513c0,1.937,1.567,3.504,3.504,3.504h49.061 c1.937,0,3.504-1.567,3.504-3.504v-10.513C173.172,176.197,171.604,174.633,169.668,174.633z M166.163,185.146h-42.052v-3.505 h42.052V185.146z"></path> <path d="M160.907,172.864c1.937,0,3.504-1.567,3.504-3.505V75.49c0-1.938-1.567-3.504-3.504-3.504h-10.514 c-1.937,0-3.504,1.566-3.504,3.504v93.87c0,1.938,1.567,3.505,3.504,3.505H160.907z M153.898,78.994h3.504v86.861h-3.504V78.994z"></path> <path d="M139.881,172.864c1.938,0,3.505-1.567,3.505-3.505V75.49c0-1.938-1.567-3.504-3.505-3.504h-10.513 c-1.937,0-3.504,1.566-3.504,3.504v93.87c0,1.938,1.567,3.505,3.504,3.505H139.881z M132.872,78.994h3.505v86.861h-3.505V78.994z"></path> <path d="M96.859,117.982c-9.984,0-18.103,8.117-18.103,18.104v33.273c0,1.938,1.565,3.505,3.504,3.505h29.196 c1.937,0,3.504-1.567,3.504-3.505v-33.273C114.961,126.1,106.837,117.982,96.859,117.982z M107.952,165.855H85.765v-29.77 c0-6.119,4.976-11.095,11.095-11.095c6.117,0,11.093,4.976,11.093,11.095V165.855z"></path> <path d="M96.859,74.179c-9.984,0-18.103,8.119-18.103,18.103v14.599c0,1.938,1.565,3.505,3.504,3.505h29.196 c1.937,0,3.504-1.567,3.504-3.505V92.282C114.961,82.298,106.837,74.179,96.859,74.179z M107.952,103.377H85.765V92.282 c0-6.119,4.976-11.095,11.095-11.095c6.117,0,11.093,4.976,11.093,11.095V103.377z"></path> <path d="M22.487,46.727h147.181c1.602,0,2.997-1.087,3.395-2.639c0.396-1.552-0.312-3.176-1.718-3.942L98.534,0.428 c-1.035-0.562-2.292-0.575-3.326-0.014L20.836,40.132c-1.418,0.756-2.137,2.382-1.749,3.942 C19.481,45.63,20.879,46.727,22.487,46.727z M96.841,7.49l59.083,32.228H36.487L96.841,7.49z"></path> </g> </g> </g></svg>';
// 2. Dùng trong createCustomIcon
function createCustomIcon(category) {
  const { markerColor } = CATEGORY_STYLES[category];

  const iconSvg =
    category === "Quán ăn"
      ? Food_SVG
      : ICON_PATH[category]
        ? category === "Quán cafe"
          ? Coffee_SVG
          : DiTich_SVG
        : "";

  const html = `
    <div style="
      width: 40px; height: 40px;
      background: ${markerColor};
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      border: 2px solid rgba(255,255,255,0.3);
    ">
      <div style="width: 22px; height: 22px; display:flex; align-items:center; justify-content:center;">
        ${iconSvg}
      </div>
    </div>`;

  return L.divIcon({
    html,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -24],
    className: "",
  });
}

// Map chỉ nhận filter + search từ App, không tự quản lý state
export default function Map({ activeFilter = "all", search = "" }) {
  const filtered = ALL_LOCATIONS.filter((loc) => {
    const matchFilter = activeFilter === "all" || loc.category === activeFilter;
    const matchSearch = loc.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <MapContainer
      center={[10.79, 106.68]}
      zoom={12}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {filtered.map((location, index) => {
        const style = CATEGORY_STYLES[location.category];
        return (
          <Marker
            key={`${location.name}-${index}`}
            position={[location.lat, location.lng]}
            icon={createCustomIcon(location.category)}
          >
            <Popup maxWidth={320} className="rounded-2xl">
              <div className="w-[300px] overflow-hidden rounded-2xl bg-white">
                {/* COVER */}
                <div className="relative h-[150px] w-full">
                  <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop"
                    alt=""
                    className="h-full w-full object-cover"
                  />

                  {/* CATEGORY */}
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md"
                    style={{
                      background: style.bg,
                      color: style.color,
                    }}
                  >
                    {location.category}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-3">
                  {/* HEADER */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="m-0 text-[16px] font-bold text-gray-900 leading-tight">
                        {location.name}
                      </h3>

                      {/* RATING */}
                      <div className="mt-1 flex items-center gap-1 text-[12px] text-gray-500">
                        <span className="text-yellow-500">★</span>
                        <span className="font-semibold text-gray-800">4.8</span>
                        <span>(128 reviews)</span>
                      </div>
                    </div>

                    {/* ICON */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: style.bg }}
                    >
                      <style.Icon size={18} color={style.color} />
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="mt-3 text-[13px] leading-relaxed text-gray-600">
                    Không gian cực chill với view đẹp, thích hợp check-in cuối
                    tuần, đồ uống ngon và nhân viên thân thiện.
                  </p>

                  {/* GALLERY */}
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                    {[
                      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
                      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
                      "https://images.unsplash.com/photo-1521017432531-fbd92d768814",
                      "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
                      "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
                    ].map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt=""
                        className="w-[68px] h-[68px] rounded-xl object-cover shrink-0"
                      />
                    ))}
                  </div>

                  {/* COMMENTS */}
                  <div className="mt-4 space-y-3">
                    {[
                      {
                        avatar: "https://i.pravatar.cc/40?img=12",
                        name: "Nguyễn Minh",
                        comment: "View siêu đẹp, rất đáng thử!",
                      },
                      {
                        avatar: "https://i.pravatar.cc/40?img=32",
                        name: "Hoàng Anh",
                        comment: "Decor đẹp kiểu Hàn, khá chill.",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className={`flex gap-2 ${
                          idx === 0 ? "border-t border-gray-100 pt-3" : ""
                        }`}
                      >
                        <img
                          src={item.avatar}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover"
                        />

                        <div>
                          <p className="m-0 text-[12px] font-semibold text-gray-800">
                            {item.name}
                          </p>

                          <p className="m-0 mt-0.5 text-[11px] text-gray-500">
                            "{item.comment}"
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* LOCATION */}
                  <div className="mt-4 border-t border-gray-100 pt-3 flex items-center gap-1 text-[11px] text-gray-400">
                    <MapPin size={11} />
                    {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
