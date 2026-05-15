import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Simplified SVGs and icon HTML generation moved here.
export function createCustomIcon(markerColor, innerSvg) {
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
        ${innerSvg}
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
