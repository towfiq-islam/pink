const ChevronDownIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CartIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13L5.4 5M7 13l-1.6 4H17M9 21a1 1 0 100-2 1 1 0 000 2zM17 21a1 1 0 100-2 1 1 0 000 2z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const NAV_LINKS = ["Home", "Global Sims", "VoIP", "Shop", "Prepaid Plan"];

const Navbar = () => {
  return (
    <nav className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span className="text-lg font-extrabold tracking-wide text-pink-600">
          LOGO
        </span>

        <nav className="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
          {NAV_LINKS.map(link => {
            const isActive = link === "Home";
            const hasChevron = link === "Prepaid Plan";
            return (
              <a
                key={link}
                href="#"
                className={`flex items-center gap-1 transition-colors hover:text-pink-600 ${
                  isActive ? "font-semibold text-pink-600" : ""
                }`}
              >
                {link}
                {hasChevron && <ChevronDownIcon className="h-3.5 w-3.5" />}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <button
            aria-label="Cart"
            className="text-gray-700 hover:text-pink-600"
          >
            <CartIcon />
          </button>
          <button className="rounded-full bg-pink-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-pink-700">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
