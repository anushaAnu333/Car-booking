export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">MORENT</h2>
            <p className="text-sm text-gray-500">
              Our vision is to provide convenience and help increase your sales
              business.
            </p>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-700">
                  How it works
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-700">
                  Featured
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-700">
                  Partnership
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-700">
                  Business Relation
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-700">
                  Events
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-700">
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-700">
                  Podcast
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-700">
                  Invite a friend
                </a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Socials</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-700">
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-700">
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-700">
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-700">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-100 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              ©2022 MORENT. All rights reserved
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Privacy & Policy
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Terms & Condition
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
