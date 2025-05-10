const Footer = () => {
    return (
      <footer className="bg-gray-900 py-10 px-6 md:px-20 border-t">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          <div>
            <h2 className="text-xl font-bold mb-3 text-cyan-700">E_Medical_Reports</h2>
            <p className="text-sm leading-relaxed">
              Empowering communities through accessible health records, 
              medical transparency, and real-time collaboration between 
              patients and professionals.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li><a href="/" className="hover:text-cyan-600 transition">Home</a></li>
              <li><a href="/about" className="hover:text-cyan-600 transition">About Us</a></li>
              <li><a href="/services" className="hover:text-cyan-600 transition">Services</a></li>
              <li><a href="/contact" className="hover:text-cyan-600 transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Contact</h3>
            <ul className="text-sm space-y-2">
              <li>Email: <a href="mailto:info@emedicalreports.com" className="text-cyan-700">info@emedicalreports.com</a></li>
              <li>Phone: <span className="text-gray-700">+250 123 456 789</span></li>
              <li>Location: Kigali, Rwanda</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Stay Connected</h3>
            <p className="text-sm mb-2">Follow us for updates:</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-cyan-600">Facebook</a>
              <a href="#" className="hover:text-cyan-600">Twitter</a>
              <a href="#" className="hover:text-cyan-600">LinkedIn</a>
            </div>
          </div>
        </div>
  
        <div className="text-center text-xs text-gray-500 mt-10">
          &copy; {new Date().getFullYear()} E_Medical_Reports. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  