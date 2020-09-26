import React, { Component } from "react";
import style from "./Table.module.scss";
import Rows from "../Rows/Rows.component.js";
class Table extends Component {
  render() {
    let { selectedTabData, lang } = this.props;
    return (
      <div className={style.tableWrapper}>
        <div className={style.header}>
          <span className={style.date}>{lang === "en" ? "Date" : "Datum"}</span>
          <span className={style.campaign}>
            {lang === "en" ? "Campaign" : "Kampagne"}
          </span>
          <span className={style.view}>
            {lang === "en" ? "View" : "Aussicht"}
          </span>
          <span className={style.action}>
            {lang === "en" ? "Action" : "Aktion"}
          </span>
        </div>
        {selectedTabData.map((ele, index) => {
          return <Rows key={index} data={ele} />;
        })}
      </div>
    );
  }
}
export default Table;
