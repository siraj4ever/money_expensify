import { Outlet } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
// import "../../css/Layout.css";

function Layout() {
  return (
    <>
      {/* <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4" > */}
      <nav className="navbar navbar-expand-md navbar-dark bg-dark" >
        <div className="navbar-brand">𝐌𝐨𝐧𝐞𝐲 𝐄𝐱𝐩𝐞𝐧𝐬𝐢𝐟𝐲</div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">

            <li className="nav-item active">
              <div className="nav-link">
                <Link to="/">Home</Link>
              </div>
            </li>

            <li className="nav-item">
              <div className="nav-link">
                <Link to="/transactions">Transactions</Link>
              </div>
            </li>

            <li className="nav-item">
              <div className="nav-link">
                <Link to="/setting">Setting</Link>
              </div>
            </li>

            <li className="nav-item">
              <div className="nav-link">
                <Link to="/login">Log In</Link>
              </div>
            </li>

          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;
