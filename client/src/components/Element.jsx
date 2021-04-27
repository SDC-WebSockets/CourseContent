import React from 'react';
import moment from 'moment';

const Element = (props) => {

  return (

    <div>
      <span>{props.element.title}</span><span>{props.element.elementLength && moment(props.element.elementLength).format('mm:ss')}</span><span>{props.element.numQuestions && `${props.element.numQuestions} questions`}</span>
    </div>

  );

};

export default Element;