const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Hands-On Platform</h3>
            <p className="text-gray-400 mt-1">
              Connecting volunteers with opportunities
            </p>
          </div>

          <div className="flex space-x-6">
            <div>
              <h4 className="font-semibold mb-2">About</h4>
              <ul className="text-gray-400">
                <li className="mb-1">
                  <a href="#" className="hover:text-white">
                    Our Mission
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:text-white">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Resources</h4>
              <ul className="text-gray-400">
                <li className="mb-1">
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Hands-On Platform. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
