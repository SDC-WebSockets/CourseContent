import React from 'react';
import Element from './Element.jsx';
import moment from 'moment';

const Section = (props) => {

  const getDisplayTime = (time) => {
    if (moment(time).format('HH') === '00') {
      return moment(time).format('m[min]');
    } else {
      return moment(time).format('H[hr ]m[min]');
    }
  };

  const shortenTitle = (title) => {
    if (title.length > 40) {
      let charArr = title.split('').slice(0, 40);
      charArr.push('...');
      return charArr.join('');
    } else {
      return title;
    }
  };

  const longerTime = new Date(new Date(props.section.sectionLength).getTime() * 150);

  const displayTime = getDisplayTime(longerTime);

  const title = shortenTitle(props.section.title);

  return (
    <div>
      <span style={{ float: 'left' }}>{title}</span>
      <span style={{ float: 'right' }}>{`${props.section.lectures + props.section.articles} lectures`} • <span>{displayTime}</span></span>
      {/* {props.section.elements.map(element =>
        <Element element={element} key={element.elementId} />
      )} */}
      <br/>
    </div>

  );

};

export default Section;