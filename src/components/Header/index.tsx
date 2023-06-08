import { NavLink } from "react-router-dom";

import { Timer, Scroll } from "@phosphor-icons/react";

import { HeaderContainer } from "./style";

import LogoIgnite from "/ignite-logo.svg";

export default function Header() {
  return (
    <HeaderContainer>
      <img src={LogoIgnite} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
