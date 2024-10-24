export default function Navbar() {
    return (
      <nav className="navbar bg-white shadow-md py-4 px-6">
        <div className="container mx-auto justify-center flex">
          <Link className="text-lg font-bold" to="/">Navbar</Link>
          <div className="ml-auto space-x-6">
            <Link className="hover:text-blue-600" to="/">Home</Link>
            <Link className="hover:text-blue-600" to="/profiles">Profiles</Link>
          </div>
        </div>
      </nav>
    );
  };