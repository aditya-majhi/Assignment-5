import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-800">TradingStudio</div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/"
                className="transition text-gray-600 hover:text-blue-600"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/create"
                className="transition text-gray-600 hover:text-blue-600"
              >
                Create
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
