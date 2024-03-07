/* eslint-disable react/prop-types */
import MetaData from "../components/MetaData";
import SidebarMenu from "../components/SidebarMenu.jsx";

export default function UserLayout({ children }) {
  return (
    <>
      <MetaData title={"Profile"} />
      <div>
        <div className="mt-2 mb-4 py-4">
          <h2 className="text-center fw-bolder">User Settings</h2>
        </div>

        <div className="container">
          <div className="row justify-content-around">
            <div className="col-12 col-lg-3">
              <SidebarMenu />
            </div>
            <div className="col-12 col-lg-8">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
