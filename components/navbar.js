import { useSession } from "next-auth/react";
import { Fragment } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Button from "./button";
import classes from "./navbar.module.css";

function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  function logoutHandler() {
    signOut();
  }

  const imageStyle = {
    borderRadius: "50%",
  };

  return (
    <Fragment>
      <nav className={classes.navbar}>
        <div className={classes.container}>
          <div className={classes.image}>
            <Link href="/">
              <Image
                src="/DFTGH.webp"
                alt="logo"
                height={60}
                width={60}
                style={imageStyle}f
              />
            </Link>
          </div>
          
          <ul className={classes.nav_items}>
            <li className={classes.nav_item}>
              <Link href="/bios" className={`${classes.nav_item} ${classes.link} ${router.pathname === "/bios" ? classes.active : ""}`}>Bios</Link>
            </li>
            <li className={classes.nav_item}>
              <Link href="/episodes" className={`${classes.nav_item} ${classes.link} ${router.pathname === "/episodes" ? classes.active : ""}`}>Episodes</Link>
            </li>
            <li className={classes.nav_item}>
              <Link href="/testimonials" className={`${classes.nav_item} ${classes.link} ${router.pathname === "/testimonials" ? classes.active : ""}`}>Testimonials</Link>
            </li>
            <li className={classes.nav_item}>
              <Link href="/feedback" className={`${classes.nav_item} ${classes.link} ${router.pathname === "/feedback" ? classes.active : ""}`}>Feedback</Link>
            </li>
            {session && (
            <div className={classes.nav_items}>
              <Button text="Log Out" backgroundColor="red" onClick={logoutHandler}></Button>
            </div>
          )}
          </ul>
        </div>
      </nav>
    </Fragment>
  );
}

export default Navbar;
