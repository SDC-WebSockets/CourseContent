import React from 'react';

const Section = (props) => {

  let timeString = (() => {
    let string = '';
    let duration = new Date(props.section.sectionLength).getTime();

    if (duration >= 3600000) {
      let hours = Math.floor(duration / 3600000);
      duration = duration - (hours * 3600000);
      string += hours + 'hr ';
    }

    if (duration >= 0) {
      let minutes = Math.floor(duration / 60000);
      string += minutes + 'min';
    }

    return string;

  })();

  return (
    <div>
      <h3>{props.section.title}</h3>
      <span>{`${props.section.lectures + props.section.articles} lectures `}</span>
      <span>{timeString}</span>
    </div>
  );

};

export default Section;