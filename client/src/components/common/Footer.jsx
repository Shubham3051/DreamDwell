const Footer = () => {
  return (
    <footer className="bg-[#111827] text-white py-8 w-full">
      <div className="text-center">
        <h3 className="text-lg font-semibold">🏠 DreamDwell</h3>

        <p className="mt-2 text-gray-300 max-w-sm mx-auto">
          Find your dream home and schedule visits seamlessly.
        </p>

        <p className="text-sm text-gray-500 mt-4">
          © {new Date().getFullYear()} DreamDwell. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;