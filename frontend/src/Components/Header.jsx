import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa'
import { useAppContext } from '../Context/AppContex'

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAppContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search/?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="bg-slate-200 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center p-3 mx-auto max-w-6xl relative">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-1">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-700 flex flex-wrap">
            IftiinShe
            <span className="text-slate-500">Cars</span>
          </h1>
        </Link>

        {/* SEARCH BAR (Hidden on very small mobile, visible on sm+) */}
        <form onSubmit={handleSearchSubmit} className="hidden sm:flex bg-slate-100 rounded-lg items-center p-2 shadow-sm border border-slate-300 w-full max-w-[200px] sm:max-w-xs lg:max-w-md mx-4">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-full text-slate-700 px-2"
          />
          <button className='hover:bg-slate-200 p-1 rounded-full'>
            <FaSearch className="text-slate-600" />
          </button>
        </form>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex gap-6 text-slate-700 font-semibold items-center">
          <Link to="/" className='hover:text-slate-900 transition-colors'><li>Home</li></Link>
          <Link to="/about" className='hover:text-slate-900 transition-colors'><li>About</li></Link>

          {currentUser ? (
            <Link to="/profile">
              <img
                className="rounded-full h-9 w-9 object-cover border-2 border-slate-300 hover:border-slate-500 transition-all"
                src={currentUser.avatar}
                alt="profile"
              />
            </Link>
          ) : (
            <Link to="/signin" className='hover:text-slate-900 transition-colors'><li>Sign In</li></Link>
          )}
        </ul>

        {/* MOBILE MENU ICON */}
        <div className="flex gap-4 items-center md:hidden">
          {/* Mobile Search Icon (toggles search or goes to search page) */}
          <button onClick={() => navigate('/search')} className="sm:hidden text-slate-700">
            <FaSearch className="text-xl" />
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-slate-700 hover:text-slate-900 focus:outline-none"
          >
            {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV DROPDOWN */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-100 border-t border-slate-300 absolute w-full left-0 shadow-lg">
          <ul className="flex flex-col p-4 gap-4 text-slate-700 font-semibold text-center">

            {/* Search bar for mobile menu */}
            <form onSubmit={handleSearchSubmit} className="flex sm:hidden bg-white rounded-lg items-center p-2 shadow-sm border border-slate-300 mb-2">
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                type="search"
                placeholder="Search cars..."
                className="bg-transparent outline-none w-full text-slate-700"
              />
              <button>
                <FaSearch className="text-slate-600 ml-2" />
              </button>
            </form>

            <Link to="/" onClick={() => setIsMenuOpen(false)} className='hover:bg-slate-200 p-2 rounded-lg'><li>Home</li></Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className='hover:bg-slate-200 p-2 rounded-lg'><li>About</li></Link>
            {currentUser ? (
              <Link to="/profile" onClick={() => setIsMenuOpen(false)} className='flex items-center justify-center gap-2 hover:bg-slate-200 p-2 rounded-lg'>
                <img
                  className="rounded-full h-8 w-8 object-cover"
                  src={currentUser.avatar}
                  alt="profile"
                />
                <span>Profile</span>
              </Link>
            ) : (
              <Link to="/signin" onClick={() => setIsMenuOpen(false)} className='hover:bg-slate-200 p-2 rounded-lg'><li>Sign In</li></Link>
            )}
          </ul>
        </div>
      )}
    </header>
  )
}

export default Header









// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate, useLocation } from 'react-router-dom'
// import { FaSearch } from 'react-icons/fa'

// function Header() {
//   const navigate = useNavigate()
//   const location = useLocation()

//   const [searchTerm, setSearchTerm] = useState('')

//   const handleSearchSubmit = (e) => {
//     e.preventDefault()

//     if (!searchTerm.trim()) return

//     // samee URL cusub oo nadiif ah
//     navigate(`/search?searchTerm=${encodeURIComponent(searchTerm)}`)
//   }

//   // URL → input (marka page refresh la sameeyo)
//   useEffect(() => {
//     const params = new URLSearchParams(location.search)
//     const term = params.get('searchTerm')
//     if (term) setSearchTerm(term)
//   }, [location.search])

//   return (
//     <header className="bg-slate-200 shadow-md">
//       <div className="flex justify-between items-center p-3 mx-auto max-w-6xl">

//         {/* Logo */}
//         <Link to="/">
//           <h1 className="text-sm sm:text-xl font-semibold text-slate-700">
//             Iftiishe <span className="text-slate-500">Academy</span>
//           </h1>
//         </Link>

//         {/* Search */}
//         <form
//           onSubmit={handleSearchSubmit}
//           className="flex items-center bg-slate-100 p-2 rounded-lg"
//         >
//           <input
//             type="search"
//             placeholder="Search..."
//             className="bg-transparent outline-none w-64"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//          <Link to={"search"}>
//           <button type="submit">
//             <FaSearch className="text-slate-600 ml-2" />
//           </button>
//          </Link>
//         </form>

//         {/* Links */}
//         <ul className="flex gap-4 text-slate-600 font-medium">
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/about">About</Link></li>
//         </ul>

//       </div>
//     </header>
//   )
// }

// export default Header
