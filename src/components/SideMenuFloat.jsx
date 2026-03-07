import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function SideMenuFloat() {
  const [show, setShow] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let hideTimeout;
    const scrollTriggerY =
      document.querySelector(".plan-area")?.offsetTop || 800;

    const onScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > scrollTriggerY) {
        if (scrollTop < lastScrollTop) {
          if (!isHovering) setShow(true);
          clearTimeout(hideTimeout);
          hideTimeout = setTimeout(() => {
            if (!isHovering) setShow(false);
          }, 2500);
        } else {
          setShow(false);
        }
      } else {
        setShow(false);
      }

      lastScrollTop = scrollTop;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHovering]);

  return (
    <nav
      className={`side-menu-float position-fixed top-50 translate-middle-y ms-2 ${show ? "show" : ""
        }`}
      onMouseEnter={() => {
        setIsHovering(true);
        setShow(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        setTimeout(() => setShow(false), 2500);
      }}
    >
      <h5 className="text-center fw-bold fs-lg-7 text-nowrap ls-1 py-lg-5 ps-1">
        主題一覽
      </h5>
      <ul className="nav flex-lg-column side-menu gap-2 py-2 py-lg-0">
        <li className="nav-item">
          <NavLink to={`/themeDetail/1`}>
            <span className="nav-link d-flex align-items-center active">精選甜點</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={`/themeDetail/2`}>
            <span className="nav-link d-flex align-items-center">季節限定</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={`/themeDetail/3`}>
            <span className="nav-link d-flex align-items-center">在地甜點</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={`/themeDetail/4`}>
            <span className="nav-link d-flex align-items-center">異國風味</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={`/themeDetail/5`}>
            <span className="nav-link d-flex align-items-center">無負擔甜點</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={`/themeDetail/6`}>
            <span className="nav-link d-flex align-items-center">素食甜點</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default SideMenuFloat;
