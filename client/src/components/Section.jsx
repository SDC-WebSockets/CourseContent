import React from 'react';
import Element from './Element.jsx';
import moment from 'moment';
import {ContentDiv, ContentSpan, ContentSectionHeader, ContentSectionTitle, ContentSectionTotalLectures, ContentSectionElementsBlock, ContentElementsContainer, ContentUl} from './StyledComponents';

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
      <ContentDiv style={{display: this.props.section.sectionDisplay}}>
        <ContentDiv>
          <ContentSectionHeader onClick={this.handleClick.bind(this)}>
            <h3>
              <ContentSpan>
                <ContentSectionTitle>{this.state.title}</ContentSectionTitle>
                <ContentSectionTotalLectures>
                  {`${this.props.section.lectures + this.props.section.articles} lectures • `}
                  <ContentSpan>
                    {this.state.displayTime}
                  </ContentSpan>
                </ContentSectionTotalLectures>
              </ContentSpan>
            </h3>
          </ContentSectionHeader>
          <ContentSectionElementsBlock style={{ display: this.props.section.elementDisplay }}>
            <ContentElementsContainer>
              <ContentUl>
                {this.props.section.elements.map(element =>
                  <Element element={element} key={`element${element.elementId}`} kind={element.kind} />
                )}
              </ContentUl>
            </ContentElementsContainer>
          </ContentSectionElementsBlock>
        </ContentDiv>
      </ContentDiv>
    );
  }

}

export default Section;