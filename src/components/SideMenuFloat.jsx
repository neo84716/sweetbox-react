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
          <NavLink
            to={`/themeDetail/1`}
            className={({ isActive }) =>
              "nav-link d-flex align-items-center" + (isActive ? " active" : "")
            }
          >
            精選甜點
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={`/themeDetail/2`}
            className={({ isActive }) =>
              "nav-link d-flex align-items-center" + (isActive ? " active" : "")
            }
          >
            季節限定
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={`/themeDetail/3`}
            className={({ isActive }) =>
              "nav-link d-flex align-items-center" + (isActive ? " active" : "")
            }
          >
            在地甜點
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={`/themeDetail/4`}
            className={({ isActive }) =>
              "nav-link d-flex align-items-center" + (isActive ? " active" : "")
            }
          >
            異國風味
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={`/themeDetail/5`}
            className={({ isActive }) =>
              "nav-link d-flex align-items-center" + (isActive ? " active" : "")
            }
          >
            無負擔甜點
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={`/themeDetail/6`}
            className={({ isActive }) =>
              "nav-link d-flex align-items-center" + (isActive ? " active" : "")
            }
          >
            素食甜點
          </NavLink>
        </li>
      </ul>

    </nav>
  );
}

export default SideMenuFloat;
