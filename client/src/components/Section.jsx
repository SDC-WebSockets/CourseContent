import React from 'react';
import Element from './Element.jsx';
import moment from 'moment';

const Section = (props) => {

  const getDisplayTime = (time) => {
    if (moment.utc(time).format('HH') === '00') {
      return moment.utc(time).format('m[min]');
    } else {
      return moment.utc(time).format('H[hr ]m[min]');
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

  const longerTime = new Date(new Date(props.section.sectionLength).getTime() * 60);

  const displayTime = getDisplayTime(longerTime);

  const title = shortenTitle(props.section.title);

  return (
    <div style={{ height: '53px', backgroundColor: '#fbfbf8', border: '1px solid #dcdacc', marginTop: '-1px'}}>
      <div>
        <div>
          <h3><span><span style={{ float: 'left' }}>{title}</span><span style={{ float: 'right' }}>{`${props.section.lectures + props.section.articles} lectures`} • <span>{displayTime}</span></span></span></h3>
          <svg><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"></path></svg>
        </div>
        <div>
          {/* {props.section.elements.map(element =>
            <Element element={element} key={element.elementId} />
          )} */}
        </div>
      </div>
    </div>

  );

};

export default Section;