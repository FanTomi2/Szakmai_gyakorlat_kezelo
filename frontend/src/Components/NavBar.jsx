function NavBar({ onLogout, aktivNezet, onNavigate }) {
    return (
        <div className="navbar bg-white shadow-md px-4 mb-4 sticky top-0 z-40">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-2">
                        <li><a onClick={() => onNavigate('lista')} className={aktivNezet === 'lista' ? 'bg-blue-100 font-bold text-blue-700' : ''}>Hallgatók listája</a></li>
                        <li><a onClick={() => onNavigate('statisztika')} className={aktivNezet === 'statisztika' ? 'bg-blue-100 font-bold text-blue-700' : ''}>Statisztikák</a></li>
                        <li><a onClick={() => onNavigate('uj_hallgato')} className={aktivNezet === 'uj_hallgato' ? 'bg-blue-100 font-bold text-blue-700' : ''}>Új hallgató</a></li>
                    </ul>
                </div>
                <a className="normal-case text-xl text-blue-500 font-black">Szakdolgozat kezelő</a>
            </div>
            
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    <li>
                        <a onClick={() => onNavigate('lista')} className={`rounded ${aktivNezet === 'lista' ? 'bg-blue-100 font-bold text-blue-700' : 'hover:bg-gray-100'}`}>
                            Hallgatók listája
                        </a>
                    </li>
                    <li>
                        <a onClick={() => onNavigate('statisztika')} className={`rounded ${aktivNezet === 'statisztika' ? 'bg-blue-100 font-bold text-blue-700' : 'hover:bg-gray-100'}`}>
                            Statisztikák
                        </a>
                    </li>
                    <li>
                        <a onClick={() => onNavigate('uj_hallgato')} className={`rounded ${aktivNezet === 'uj_hallgato' ? 'bg-blue-100 font-bold text-blue-700' : 'hover:bg-blue-50'}`}>
                            Új hallgató
                        </a>
                    </li>
                </ul>
            </div>
            
            <div className="navbar-end">
                <button onClick={onLogout} className="btn btn-soft btn-error hover:text-white hover:bg-red-700 border-none">
                    Kijelentkezés
                </button>
            </div>
        </div>
    );
}

export default NavBar;