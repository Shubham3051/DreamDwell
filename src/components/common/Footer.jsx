const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 w-full relative bottom-0">
      <div className="text-center">
        <h3 className="text-lg font-semibold">🏠 VR Estate</h3>
        <p className="mt-2">
          Experience properties in immersive 3D virtual tours.
        </p>

        <p className="text-sm text-gray-400 mt-4">
          © {new Date().getFullYear()} VR Estate. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;