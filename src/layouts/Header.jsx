function Header() {
    return (
        <nav className="navbar pt-3 px-3 pt-lg-5 px-lg-0">
            <div className="container header py-1 px-4 py-lg-2 px-lg-9">
                <a href="index.html">
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
                </a>
                <ul className="d-none d-lg-flex align-items-center flex-grow-1">
                    <li className="nav-item mx-auto">
                        <a className="nav-link" href="theme.html"
                        ><span className="underline">主題一覽</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-icon service-icon" aria-label="客服圖示"></a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="cart.html"
                            className="nav-icon cart-icon"
                            aria-label="購物車圖示"
                        ></a>
                    </li>
                    <li className="nav-item">
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
                                        src="./images/Home_Page/avatar.jpg"
                                        alt="使用者頭像"
                                    />
                                </div>
                                <span className="user-name">歐拉</span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-avatar">
                                <li><a className="dropdown-item d-block" href="#">會員中心</a></li>
                                <li><a className="dropdown-item d-block" href="#">登出</a></li>
                            </ul>
                        </div>
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
                            <a className="dropdown-item active" href="index.html">首頁</a>
                        </li>
                        <li className="dropdown-item-wrapper">
                            <a className="dropdown-item" href="theme.html">主題一覽</a>
                        </li>
                        <li className="dropdown-item-wrapper">
                            <a className="dropdown-item" href="#">客服諮詢</a>
                        </li>
                        <li className="dropdown-item-wrapper">
                            <a className="dropdown-item" href="cart.html">購物車</a>
                        </li>
                        <li className="dropdown-item-wrapper">
                            <a className="dropdown-item" href="#">會員中心</a>
                        </li>
                        <li className="dropdown-item-wrapper">
                            <a className="dropdown-item" href="#">登出</a>
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
                </div>
            </div>
        </nav>
    )
}

export default Header;