const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-100 bg-white ">
      <div className="mx-auto flex min-h-20 max-w-7xl flex-col items-center justify-center gap-2 px-6 py-4 sm:flex-row sm:justify-between">
        <span className="text-sm font-bold text-green-700">
          FarmersProfitHub
        </span>

        <p className="text-center text-xs text-gray-500">
          © 2026 FarmersProfitHub. All rights reserved.
        </p>

        <div className="flex gap-4 text-xs text-gray-500">
          <a href="/about" className="transition hover:text-green-700">
            About
          </a>
          <a href="/contact" className="transition hover:text-green-700">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
