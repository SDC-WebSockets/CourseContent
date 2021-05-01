import React from 'react';
import moment from 'moment';

const Element = (props) => {

  return (

    <div style={{border: '1px black solid', margin: '3px'}} >
      <span className="title">{props.element.title}</span><span className="duration">{props.element.elementLength && moment(props.element.elementLength).utcOffset(0).format('HH:mm')}</span><span>{props.element.numQuestions && `${props.element.numQuestions} questions`}</span>
    </div>

  );

};

export default Element;