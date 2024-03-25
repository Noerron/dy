import React from "react";
import "./Marquee.css";

class Marquee extends React.Component {
  render() {
    return (
      <div className="marquee">
        <div className="marquee-content">{this.props.text}</div>
      </div>
    );
  }
}

export default Marquee;
