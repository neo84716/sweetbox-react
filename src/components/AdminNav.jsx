import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

function AdminNav() {
  const navItems = [
    '主題管理',
    '訂閱管理',
    '訂單管理',
    '評論管理',
    '客服管理',
    '優惠管理',
  ]
  return (
    <nav className="mb-6">
      <ul className="d-flex adminNav">
        {
          navItems.map((navItem) => {
            return (
              <li className="nav-item" key={navItem}>
                <Link className="nav-link">
                  <span className="underline">{navItem}</span>
                </Link>
              </li>
            )
          })
        }
      </ul>
    </nav>
  )
}

export default AdminNav;