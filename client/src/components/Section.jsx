import React from 'react';
import Element from './Element.jsx';
import moment from 'moment';

const Section = (props) => {

  let title;
  if (props.section.title.length > 20) {
    let charArr = props.section.title.split('').slice(0, 20);
    charArr.push('...');
    title = charArr.join('');
  } else {
    title = props.section.title;
  }

  return (
    <div>
      <span style={{ float: 'left' }}>{title}</span>
      <span style={{ float: 'right' }}>{`${props.section.lectures + props.section.articles} lectures`} • <span>{moment.utc(props.section.sectionLength).format('H[hr ]m[min]')}</span></span>
      {/* {props.section.elements.map(element =>
        <Element element={element} key={element.elementId} />
      )} */}
      <br/>
    </div>

  );

};

export default Section;