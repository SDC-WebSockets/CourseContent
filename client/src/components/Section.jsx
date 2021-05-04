import React from 'react';
import Element from './Element.jsx';
import moment from 'moment';

class Section extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showElements: true
    };
    this.getDisplayTime = this.getDisplayTime.bind(this);
    this.shortenTitle = this.shortenTitle.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getDisplayTime(time) {
    if (moment.utc(time).format('HH') === '00') {
      const displayTime = moment.utc(time).format('m[min]');
      this.setState({displayTime});
    } else {
      const displayTime = moment.utc(time).format('H[hr ]m[min]');
      this.setState({displayTime});
    }
  }

  shortenTitle(title) {
    if (title.length > 30) {
      for (let i = 30; i < title.length; i++) {
        if (title[i] === ' ') {
          let charArr = title.split('').slice(0, i);
          charArr.push('...');
          const shortenedTitle = charArr.join('');
          this.setState({title: shortenedTitle});
          break;
        }
      }
    } else {
      this.setState({title});
    }
  }

  handleClick(e) {
    e.preventDefault();
    console.log(e);
    console.log('click');
  }

  componentDidMount() {
    this.getDisplayTime(this.props.section.sectionLength);
    this.shortenTitle(this.props.section.title);
  }

  render() {
    return (
      <div>
        <div>
          <div onClick={this.handleClick.bind(this)} className="sectionHeader">
            <h3>
              <span>
                <span className="sectionTitle">{this.state.title}</span>
                <span className="sectionTotalLectures">
                  {`${this.props.section.lectures + this.props.section.articles} lectures • `}
                  <span>
                    {this.state.displayTime}
                  </span>
                </span>
              </span>
            </h3>
          </div>
          <div className="sectionElementsBlock">
            <div className="elementsContainer">
              <ul>
                {this.props.section.elements.map(element =>
                  <Element element={element} key={`element${element.elementId}`} kind={element.kind} />
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Section;