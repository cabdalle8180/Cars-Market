import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { useAppContext } from '../Context/AppContex' 
import { useNavigate  } from 'react-router-dom'
import { useLocation } from 'react-router-dom';


function Header() {
  const navigate = useNavigate ();
  const location = useLocation();

  const { currentUser } = useAppContext();
  const [SearchTrem, setSearchTerm]=useState("")

  const handleSearchSubmit= (e)=>{
    // e.prevelentDefault();
    e.preventDefault();

    const urlParams=new URLSearchParams(window.location.search)
    urlParams.set("searchTerm",SearchTrem);
    const SearchQuery= urlParams.toString();
    navigate(`/search/?${SearchQuery}`);

  }
  useEffect(()=>{
    const urlParams= new URLSearchParams(location.search);
    const SeachForm= urlParams.get("searchTerm")
    if(SeachForm){
      setSearchTerm(SeachForm);
    }
  },[location.search])

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center p-3 mx-auto max-w-6xl">
        
        <Link to="/">
          <h1 className="text-sm sm:text-xl flex flex-wrap font-semibold text-slate-700">
            Iftiishe
            <span className="text-slate-500 ml-1">Cars</span>
          </h1>
        </Link>

        <form onSubmit={handleSearchSubmit} className="flex rounded-lg items-center p-2 bg-slate-100">
          <input
          onChange={(e)=> setSearchTerm(e.target.value)}
          value={SearchTrem}
            type="search"
            id='searchTerm'
            placeholder="Search..."
            className="bg-transparent outline-none w-64"
          />
          <button><FaSearch className="text-slate-600 ml-2" /></button>
        </form>

        <ul className="flex gap-4 text-slate-500 font-medium items-center">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>

          {currentUser ? (
            <Link to="/profile">
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            </Link>
          ) : (
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
          )}
        </ul>

      </div>
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
