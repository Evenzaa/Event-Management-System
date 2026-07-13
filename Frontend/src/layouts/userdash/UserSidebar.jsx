import { NavLink } from "react-router-dom";
import { Ticket, Heart, User, Star, Settings } from "lucide-react";

// Nav items for the user account sidebar.
// Items without a `to` point to pages that don't exist yet in this project,
// so they're rendered as non-navigating placeholders instead of dead links.
const NAV_ITEMS = [
  { id: "bookings", label: "My Bookings", to: "/my-bookings", icon: Ticket },
  { id: "favorites", label: "Favorites", to: "/favorites", icon: Heart },
  { id: "profile", label: "Profile", to: "/profile", icon: User },
  { id: "reviews", label: "Reviews", to: null, icon: Star },
  { id: "settings", label: "Settings", to: null, icon: Settings },
];

export default function UserSidebar() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const name = user.name || "Guest User";
  const email = user.email || "";
  const avatar =
    user.profileImage ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;

  return (
    <aside className="w-full shrink-0 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm lg:w-64">
      <div className="mb-4 flex flex-col items-center gap-2 border-b border-slate-100 pb-4 text-center">
        <img
          src={avatar}
          alt={name}
          className="h-16 w-16 rounded-full object-cover border-4 border-violet-100"
        />
        <div>
          <p className="font-semibold text-slate-900">{name}</p>
          {email && <p className="text-xs text-slate-500">{email}</p>}
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ id, label, to, icon: Icon }) =>
          to ? (
            <NavLink
              key={id}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gradient-to-r from-violet-600 to-blue-500 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50"
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ) : (
            <span
              key={id}
              className="flex cursor-not-allowed items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300"
              title="Coming soon"
            >
              <Icon size={17} />
              {label}
            </span>
          )
        )}
      </nav>
    </aside>
  );
}
