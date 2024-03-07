import UserLayout from "../UserLayout";

export default function UpdatePassword() {
  return (
    <UserLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form className="shadow rounded bg-body" action="#" method="post">
            <h2 className="mb-4">Update Password</h2>
            <div className="mb-3">
              <label htmlFor="old_password_field" className="form-label">
                Old Password
              </label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                value=""
              />
            </div>

            <div className="mb-3">
              <label htmlFor="new_password_field" className="form-label">
                New Password
              </label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value=""
              />
            </div>

            <button type="submit" className="btn update-btn w-100">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}
