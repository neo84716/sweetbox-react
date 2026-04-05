import { NavLink } from "react-router-dom";
import { getUser, logout } from "../../utils/auth"
import { useNavigate } from "react-router-dom";


function Header() {
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        navigate("/")
    }
    const user = getUser()
    return (
        <nav className="navbar pt-3 px-3 pt-lg-5 px-lg-0">
            <div className="container header py-1 px-4 py-lg-2 px-lg-9">
                <NavLink to='/'>
                    <picture>
                        <source
                            srcSet="./images/Home_Page/sweetBox_logo.svg"
                            media="(min-width: 992px)"
                        />
                        <img
                            className="logo-icon"
                            src="./images/Home_Page/sweetBox_logo_3.svg"
                            alt="一盒甜logo"
                        />
                    </picture>
                </NavLink>
                <ul className="d-none d-lg-flex align-items-center flex-grow-1">
                    <li className="nav-item mx-auto">
                        <NavLink
                            to='/theme'
                            className='nav-link'
                        ><span className="underline">主題一覽</span>
                        </NavLink>
                    </li>
                    {!user?.isAdmin && (
                        <>
                            <li className="nav-item">
                                <a href="#" className="nav-icon service-icon" aria-label="客服圖示"></a>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to='/cart'
                                    className="nav-icon cart-icon"
                                    aria-label="購物車圖示">
                                </NavLink>
                            </li>
                        </>
                    )}
                    <li className="nav-item">
                        {
                            user ? (
                                <div className="dropdown">
                                    <button
                                        type="button"
                                        className="btn dropdown-toggle dropdown-toggle-login d-flex align-items-center py-3 px-6 border-0"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <div className="avatar me-2">
                                            <img
                                                className="d-block"
                                                src={`${user?.avatar ? user.avatar : "./images/Home_Page/avatar.jpg"}`}
                                                alt="使用者頭像"
                                            />
                                        </div>
                                        <span className="user-name">{user?.name || "訪客"}</span>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-avatar">
                                        {user?.isAdmin ? (
                                            <li><NavLink className="dropdown-item d-block" to="/admin/subscribe">後台管理</NavLink></li>
                                        ) : (
                                            <li><NavLink className="dropdown-item d-block" to="/subscription">訂閱管理</NavLink></li>
                                        )}
                                        <li><NavLink className="dropdown-item d-block" to="/login" onClick={handleLogout}>登出</NavLink></li>
                                    </ul>
                                </div>
                            ) : (
                                <NavLink to="/login">登入</NavLink>
                            )
                        }
                    </li>
                </ul>

                <div className="dropdown position-static">
                    <button
                        type="button"
                        className="btn dropdown-toggle p-3 border-0 d-inline-block d-lg-none"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <svg
                            className="dropdown-toggle-burger"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M3.97461 5.97461H19.9746M3.97461 11.9746H19.9746M3.97461 17.9746H19.9746"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <ul className="dropdown-menu fs-6 dropdown-menu-burger d-lg-none">
                        <li className="dropdown-item-wrapper">
                            <NavLink className="dropdown-item" to="/">首頁</NavLink>
                        </li>
                        <li className="dropdown-item-wrapper">
                            <NavLink className="dropdown-item" to="/theme">主題一覽</NavLink>
                        </li>
                        {user?.isAdmin ? (
                            // 管理者顯示
                            <li className="dropdown-item-wrapper">
                                <NavLink className="dropdown-item" to="/admin/subscribe">後台管理</NavLink>
                            </li>
                        ) : (
                            // 訪客、一般使用者顯示
                            <>
                                <li className="dropdown-item-wrapper">
                                    <NavLink className="dropdown-item" to="/service">客服諮詢</NavLink>
                                </li>
                                <li className="dropdown-item-wrapper">
                                    <NavLink className="dropdown-item" to="/cart">購物車</NavLink>
                                </li>
                                <li className="dropdown-item-wrapper">
                                    <NavLink className="dropdown-item" to="/member">會員中心</NavLink>
                                </li>
                            </>
                        )}
                        <li className="dropdown-item-wrapper">
                            <NavLink className="dropdown-item" to="/login" onClick={handleLogout}>登出</NavLink>
                        </li>
                        <li className="dropdown-item-wrapper">
                            <button
                                type="button"
                                className="btn border-0 dropdown-item"
                                aria-expanded="true"
                            // 會報錯，暫時隱藏，切元件再處理
                            // onClick="this.closest('.dropdown-menu').classNameList.remove('show')"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
                                    />
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div >
            </div >
        </nav >
    )
}

export default Header;