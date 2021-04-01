
import React from "react";

const Card_Component = (props) => {
    return (
        <div className={props.cardColClass}>
        <div className={props.cardBorder} style={props.cardStyle}>
            {props.cardImage}
          <div className="card-body">
            <h5 className="card-title">{props.cardTitle}</h5>
            <p className="card-text">
             {props.cardText}
            </p>
            {props.children}
          </div>
        </div>
      </div>
    );
    }

export default Card_Component;