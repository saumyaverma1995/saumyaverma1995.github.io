import React, { Component } from "react";
import style from "./Rows.module.scss";
import Price from "../../assets/Price.png";
import file from "../../assets/file.png";
import report from "../../assets/report.png";
import calendar from "../../assets/calendar.png";
import { changeDateFormat, getDays } from "../../utils";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setRowData } from "../../reducer/rows/rows.actions";
import { setEventTypes } from "../../reducer/events/events.actions";
import _ from "lodash"

const mapStateToProps = (store) => {
  const events = store.eventsReducer.data;
  let lang = store.eventsReducer.selectedLanguage;
  return {
    events,
    lang
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setRowData,
      setEventTypes,
    },
    dispatch
  );
};
class Rows extends Component {
  constructor(props){
    super(props);
    this.state = {
      showDatePicker: false,
      openPopup: false,
    };
  }
  
  openCalendar = () => {
    this.setState({
      showDatePicker: !this.state.showDatePicker,
      selectedDate: null,
    });
  };
  handleDateChange = (date, id) => {
    let { events } = this.props;
    let tempEvents = _.cloneDeep(events);
    let selectedRow = tempEvents.find((ele) => ele.id === id);
    selectedRow.createdOn = new Date(date).getTime();
    this.setState({
      selectedDate: date,
    });
    this.props.setEventTypes(tempEvents);
  };
  //handler for opening price details 
  openPopup = () => {
    this.setState({
      openPopup: !this.state.openPopup,
    });
  };
  onCloseCalendar = () => {};
  render() {
    let { data, lang } = this.props;
    let { showDatePicker, selectedDate, openPopup } = this.state;
    return (
      <>
        <div className={style.row}>
          <div className={style.date}>
            <span className={style.dateText}>
              {changeDateFormat(data.createdOn)}
            </span>
            <span className={style.days}>{getDays(data.createdOn, lang)}</span>
          </div>
          <div className={style.campaign}>
            <img src={`${data.image_url}`} alt=""></img>
            <div className={style.info}>
              <span className={style.campaignName}>{data.name}</span>
              <span className={style.region}>{data.region}</span>
            </div>
          </div>
          <div className={style.view} onClick={this.openPopup}>
            <img src={Price} alt=""></img>
            <span className={style.pricing}>View Pricing</span>
          </div>
          <div className={style.action}>
            <div className={style.wrapper}>
              <img className={style.csv} src={file} alt=""></img>
              <span className={style.file}>CSV</span>
            </div>
            <div className={style.wrapper}>
              <img className={style.reportImg} src={report} alt=""></img>
              <span className={style.report}>Report</span>
            </div>
            <div className={style.wrapper} onClick={this.openCalendar}>
              <img className={style.calendarImg} src={calendar} alt=""></img>
              <span className={style.calendar}>Schedule Again</span>
            </div>
          </div>
        </div>
        <label style={{ display: "none" }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              open={showDatePicker}
              value={selectedDate}
              onClose={this.openCalendar}
              onChange={(date) => this.handleDateChange(date, data.id)}
            />
          </MuiPickersUtilsProvider>
        </label>
        {openPopup ? (
          <div className={style.modal}>
            <div className={style.modal_content}>
              <div className={style.topWrapperDiv}>
                <img
                  className={style.image}
                  src={`${data.image_url}`}
                  alt=""
                ></img>
                <div className={style.info}>
                  <span className={style.popupName}>{data.name}</span>
                  <span className={style.popupRegion}>{data.region}</span>
                </div>
              </div>
              <div className={style.bottomWrapperDiv}>
                <div className={style.header}>
                  <span>Pricing</span>
                </div>
                <div className={style.priceDetails}>
                  <span className={style.label}>1 Week - 1 Month</span>
                  <span className={style.value}>$ {data.price1}</span>
                </div>
                <div className={style.priceDetails}>
                  <span className={style.label}>6 Months</span>
                  <span className={style.value}>$ {data.price2}</span>
                </div>
                <div className={style.priceDetails}>
                  <span className={style.label}>1 Year</span>
                  <span className={style.value}>$ {data.price3}</span>
                </div>
              </div>
              <div className={style.buttonWrapper}>
                <button className={style.button} onClick={this.openPopup}>
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Rows);
