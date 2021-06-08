import React from 'react';
// const elementPromise = import('./Element.jsx');
// const Element = React.lazy(() => elementPromise)
import Element from './Element.jsx';
import moment from 'moment';
import {Div, Span, SectionHeader, SectionTitle, SectionTotalLectures, SectionElementsBlock, ElementsContainer, Ul, H3} from './StyledComponents';

class Section extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
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
        if (i === title.length - 1) {
          this.setState({ title });
        }
      }
    } else {
      this.setState({title});
    }
  }

  handleClick() {
    this.props.toggleView(this.props.idx);
  }

  componentDidMount() {
    this.getDisplayTime(this.props.section.sectionLength);
    this.shortenTitle(this.props.section.title);
  }

  render() {
    return (
      <Div style={{display: this.props.section.sectionDisplay}}>
        <Div>
          <SectionHeader onClick={this.handleClick.bind(this)}>
            <H3>
              <Span>
                <SectionTitle>{this.state.title}</SectionTitle>
                <SectionTotalLectures>
                  {`${this.props.section.lectures + this.props.section.articles} lectures • `}
                  <Span>
                    {this.state.displayTime}
                  </Span>
                </SectionTotalLectures>
              </Span>
            </H3>
          </SectionHeader>
          {/* <React.suspense fallback={<div>Loading...</div>}> */}
          {this.props.section.elementDisplay === 'block' &&
            <SectionElementsBlock style={{ display: this.props.section.elementDisplay }}>
              <ElementsContainer>
                <Ul>
                  {this.props.section.elements.map(element =>
                    <Element element={element} key={`element${element.elementId}`} kind={element.kind} />
                  )}
                </Ul>
              </ElementsContainer>
            </SectionElementsBlock>
          }   
          {/* </React.suspense> */}
        </Div>
      </Div>
    );
  }

}

export default Section;