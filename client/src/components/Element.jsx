import React from 'react';
import moment from 'moment';

const Element = (props) => {

  return (
    <div></div>

    // <div style={{fmaxHeight: '53px', maxWidth: '600px', border: '1px black solid', margin: '0px'}} >
    //   <div style={{ foat: 'left' }} className="title">{props.element.title}</div><div style={{ foat: '' }}className="duration">{props.element.elementLength && moment(props.element.elementLength).utcOffset(0).format('HH:mm')}</div><span>{props.element.numQuestions && `${props.element.numQuestions} questions`}</span>
    // </div>

  );

};

export default Element;