import React, { useState, useEffect } from "react";
import { APP_NAME } from "../config";
import Link from "next/link";
import Router from "next/router";
import { isAuth, singout } from "../components/actions/auth";
import NProgress from "nprogress";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import "../node_modules/nprogress/nprogress.css";

const Header = props => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", url => {
      NProgress.start();
    });
    Router.events.on("routeChangeComplete", url => {
      NProgress.done();
    });
    Router.events.on("routeChangeError", url => {
      console.log("error");
      NProgress.done();
    });
  }, []);
  const toggle = () => setIsOpen(!isOpen);
  const handleSingout = () => {
    Router.push("/signin");
  };
  return (
    <div>
      <Navbar color="light" light expand="md">
        <Nav href="/">
          <NavItem>
            <Link href="/">
              <NavLink style={{ fontWeight: "bold" }}>{APP_NAME}</NavLink>
            </Link>
          </NavItem>
        </Nav>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {isAuth() ? (
              <React.Fragment>
                {isAuth().role === 1 ? (
                  <NavItem>
                    <Link href="/admin">
                      <NavLink>{isAuth().name} Dashboard</NavLink>
                    </Link>
                  </NavItem>
                ) : (
                  <NavItem>
                    <Link href="/user">
                      <NavLink>{isAuth().name} Dashboard</NavLink>
                    </Link>
                  </NavItem>
                )}
                <NavItem>
                  <Link href="/signin">
                    <NavLink onClick={() => singout(handleSingout)}>
                      Signout
                    </NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NavItem>
                  <Link href="/signin">
                    <NavLink>Signin</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/signup">
                    <NavLink>Signup</NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
