import { Fragment, useState } from "react";


function AdminLogin() {
 
  return (
    <Fragment>
      <div>
        <form>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="username" id="username" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="password" id="password" />
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default AdminLogin;
