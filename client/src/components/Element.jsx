import React from 'react';
import moment from 'moment';

const Element = (props) => {

  return (

    <div style={{border: '1px black solid', margin: '3px'}} >
      <div className="title">{props.element.title}</div><div className="duration">{props.element.elementLength && moment(props.element.elementLength).utcOffset(0).format('HH:mm')}</div><span>{props.element.numQuestions && `${props.element.numQuestions} questions`}</span>
    </div>

  );

};

export default Element;