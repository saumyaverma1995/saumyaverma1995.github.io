import React, { Component } from "react";
import style from "./Header.module.scss";
import headerImg from "../../assets/header-img.png";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { setLanguage } from "../../reducer/events/events.actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapStateToProps = (store) => {
  let selectedLanguage = store.eventsReducer.selectedLanguage;
  return {
    selectedLanguage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setLanguage,
    },
    dispatch
  );
};
class Header extends Component {
  constructor(props) {
    super(props);
    //Setting default language as "english"
    props.setLanguage("en");
  }

  //Langugae change handler
  handleChange = (e) => {
    this.props.setLanguage(e.target.value);
  };
  render() {
    let { selectedLanguage } = this.props;
    return (
      <div className={style.header}>
        <div className={style.wrapper}>
          <img alt="" src={headerImg}></img>
        </div>
        <FormControl classes={{ root: style.language }}>
          <RadioGroup
            classes={{ root: style.language }}
            onChange={this.handleChange}
          >
            <FormControlLabel
              checked={selectedLanguage === "en" ? true : false}
              value="en"
              control={<Radio classes={{ root: style.radio }} />}
              label={<span style={{ fontSize: "0.8rem" }}>English</span>}
            />
            <FormControlLabel
              checked={selectedLanguage === "ge" ? true : false}
              value="ge"
              control={<Radio classes={{ root: style.radio }} />}
              label={<span style={{ fontSize: "0.8rem" }}>German</span>}
            />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
