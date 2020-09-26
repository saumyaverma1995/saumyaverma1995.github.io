import React, { Component } from "react";
import style from "./Table.module.scss";
import Rows from "../Rows/Rows.component.js";
class Table extends Component {
  render() {
    let { selectedTabData } = this.props;
    return (
      <div className={style.tableWrapper}>
        <div className={style.header}>
          <span className={style.date}>Date</span>
          <span className={style.campaign}>Campaign</span>
          <span className={style.view}>View</span>
          <span className={style.action}>Action</span>
        </div>
        {selectedTabData.map((ele, index) => {
          return <Rows key={index} data={ele} />;
        })}
      </div>
    );
  }
}
export default Table;
