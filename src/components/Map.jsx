import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { UtensilsCrossed, Coffee, MapPin } from "lucide-react";

// Fix lỗi marker bị mất icon trong Vite

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const locations = [
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
  {
    category: "Quán ăn",
    name: "Cháo Ếch Ú",
    lat: 10.795924,
    lng: 106.622225,
  },
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
  {
    category: "Quán cafe",
    name: "CATFE",
    lat: 10.771811,
    lng: 106.68793,
  },
  {
    category: "Quán ăn",
    name: "Bún bò chú Há",
    lat: 10.77173,
    lng: 106.68571,
  },
];

function Map() {
  return (
    <div className="w-full h-screen">
      <MapContainer
        center={[10.79, 106.68]}
        zoom={12}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((location, index) => (
          <Marker key={index} position={[location.lat, location.lng]}>
            <Popup>
              <div
                style={{
                  fontFamily: "sans-serif",
                  minWidth: "160px",
                  padding: "4px 2px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background:
                        location.category === "Quán ăn" ? "#FCEBEB" : "#E1F5EE",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {location.category === "Quán ăn" ? (
                      <UtensilsCrossed size={16} color="#A32D2D" />
                    ) : (
                      <Coffee size={16} color="#0F6E56" />
                    )}
                  </div>
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 600,
                        fontSize: "13px",
                        color: "#1a1a1a",
                        lineHeight: 1.3,
                      }}
                    >
                      {location.name}
                    </p>
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: "3px",
                        fontSize: "11px",
                        fontWeight: 500,
                        padding: "1px 7px",
                        borderRadius: "99px",
                        background:
                          location.category === "Quán ăn"
                            ? "#FCEBEB"
                            : "#E1F5EE",
                        color:
                          location.category === "Quán ăn"
                            ? "#A32D2D"
                            : "#0F6E56",
                      }}
                    >
                      {location.category}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    borderTop: "1px solid #f0f0f0",
                    paddingTop: "7px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    color: "#888",
                    fontSize: "11px",
                  }}
                >
                  <MapPin size={11} color="#888" />
                  {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
