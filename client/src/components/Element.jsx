import React from 'react';
import moment from 'moment';

const Element = (props) => {

  const length = new Date(props.element.elementLength).getTime();
  console.log(length);

  return (

    <div style={{border: '1px black solid', margin: '3px'}} >
      <span>{props.element.title}</span><div>{props.element.elementLength && ' ' + moment.duration(length).humanize()}</div><span>{props.element.numQuestions && `${props.element.numQuestions} questions`}</span>
    </div>

  );

};

export default Element;