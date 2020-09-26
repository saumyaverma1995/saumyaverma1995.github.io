import React from "react";
import style from "./Header.module.scss";
import headerImg from "../../assets/header-img.png"
export const Header = () => (
  <div className={style.header}>
    <div className={style.wrapper}>
      <img alt="" src={headerImg}></img>
    </div>
  </div>
);
