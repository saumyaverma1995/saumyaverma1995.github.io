import React, { Component } from "react";
import style from "./ManageCampaigns.module.scss";
import Table from "../Table/Table.component.js";
import {
  setEventTypes,
  setTabData,
  setTabKey,
  setLanguage,
} from "../../reducer/events/events.actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import isEqual from "lodash/isEqual";
import firebase from "../../firebase.js";

const mapStateToProps = (store) => {
  const events = store.eventsReducer.data;
  const selectedTabData = store.eventsReducer.selectedTabData;
  const selectedTabKey = store.eventsReducer.selectedTabKey;
  let lang = store.eventsReducer.selectedLanguage;
  return {
    events,
    selectedTabData,
    selectedTabKey,
    lang,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setEventTypes,
      setTabData,
      setTabKey,
      setLanguage,
    },
    dispatch
  );
};
class ManageCampaigns extends Component {
  state = {
    tabs: [
      { key: 0, value: "Upcoming Campaigns" },
      { key: 1, value: "Live Campaigns" },
      { key: 2, value: "Past Campaigns" },
    ],
    tabsGerman: [
      { key: 0, value: "Kommende Kampagnen" },
      { key: 1, value: "Live-Kampagne" },
      { key: 2, value: "Vergangene Kampagne" },
    ],
  };
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.events, prevProps.events)) {
      this.updateData(this.props.events);
    }
  }
  updateData(events) {
    let currentEvents = [],
      pastEvents = [],
      futureEvents = [];
    let { setTabData, selectedTabKey } = this.props;
    //Logic for segregating event based on date
    events.map((ele) => {
      if (
        new Date().toLocaleDateString("default") ===
        new Date(ele.createdOn).toLocaleDateString("default")
      ) {
        currentEvents.push(ele);
      } else if (new Date() > new Date(ele.createdOn)) {
        pastEvents.push(ele);
      } else if (new Date() < new Date(ele.createdOn)) {
        futureEvents.push(ele);
      }
    });
    switch (selectedTabKey) {
      case 0:
        setTabData(futureEvents);
        break;
      case 1:
        setTabData(currentEvents);
        break;
      case 2:
        setTabData(pastEvents);
        break;
      default:
        console.log("default");
    }

    this.setState({
      currentEvents: [...currentEvents],
      pastEvents: [...pastEvents],
      futureEvents: [...futureEvents],
    });
  }
  componentDidMount() {
    let dataRef = firebase.database().ref("data");
    //fetching data from firebase
    dataRef.on("value", (snapShot) => {
      let data = snapShot.val();
      this.props.setEventTypes(data);
    });
  }
  tabClickHandler = (tab) => {
    let { currentEvents, pastEvents, futureEvents } = this.state;
    let { setTabData, setTabKey } = this.props;
    switch (tab.key) {
      case 0:
        setTabData(futureEvents);
        setTabKey(0);
        break;
      case 1:
        setTabKey(1);
        setTabData(currentEvents);
        break;
      case 2:
        setTabKey(2);
        setTabData(pastEvents);
        break;
      default:
        console.log("default");
    }
  };
  render() {
    let { tabs, tabsGerman } = this.state;
    let { selectedTabKey, selectedTabData, lang } = this.props;
    return (
      <div className={style.outerDiv}>
        {lang === "en" ? (
          <h2>Manage Campaigns</h2>
        ) : (
          <h2>Kampagnen verwalten</h2>
        )}
        <div className={style.wrapperDiv}>
          <div className={style.tabs}>
            {lang === "en"
              ? tabs.map((tab, index) => (
                  <span
                    key={index}
                    className={selectedTabKey === tab.key ? style.active : ""}
                    onClick={() => this.tabClickHandler(tab)}
                  >
                    {tab.value}
                  </span>
                ))
              : tabsGerman.map((tab, index) => (
                  <span
                    key={index}
                    className={selectedTabKey === tab.key ? style.active : ""}
                    onClick={() => this.tabClickHandler(tab)}
                  >
                    {tab.value}
                  </span>
                ))}
          </div>
        </div>
        {selectedTabData && selectedTabData.length > 0 && (
          <Table lang={lang} selectedTabData={selectedTabData} />
        )}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageCampaigns);
