import styled from 'styled-components';

export const ContentContainer = styled.div`
  font-family: sf pro text,-apple-system,BlinkMacSystemFont,Roboto,segoe ui,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol;
  font-weight: 400;
  line-height: 1.4;
  /* font-size: 1.6rem; */
  color: #3c3b37;
  margin: 0;
  max-width: 600px;
`;

export const ContentDiv = styled.div`
  border-radius: 4px 4px 0 0;
  border-left: 1px solid #dcdacb;
  border-right: 1px solid #dcdacb;
  border-top: 1px solid #dcdacb;
  box-sizing: border-box;
  margin: 0;
  display: block;
`;

export const ContentUl = styled.ul`
  padding: 0;
  list-style-type: none;
`;

export const ContentButton = styled.button`
  color: #0f7c90;
  background-color: transparent;
  min-width: auto;
  align-items: center;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  min-width: 10rem;
  padding: 0 1.2rem;
  user-select: none;
  vertical-align: bottom;
  white-space: nowrap;
  font-weight: 700;
`;

export const ContentSectionHeader = styled.div`
  background-color: #fbfbf8;
  height: 52px;
  border: 1px solid #dcdacc;
  margin-top: -1px;
  padding-left: 10px;
  padding-right: 10px;
`;

export const ContentSectionTitle = styled.span`
  float: left;
  font-size: 1rem;
  line-height: 1.2;
  font-weight: 700;
`;

export const ContentSectionTotalLectures = styled.span`
  float: right;
  font-weight: 400;
  line-height: 1.4;
  font-size: 0.875rem;
`;

export const ContentSectionElementsBlock = styled.div`
  border: 1px solid #dcdacc;
  margin-top: -1px;
`;

export const ContentElementsContainer = styled.div`
  margin: 15px;
`;

export const ContentCourseSectionsBlock = styled.div`
  max-width: 600px;
  padding: 0px;
`;

export const ContentHeaderWrapper = styled.div`
  max-width: 600px;
  max-height: 40px;
`;

export const ContentExpandCollapse = styled.button`
  color: #0f7c90;
  background-color: transparent;
  min-width: auto;
  align-items: center;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  min-width: 10rem;
  padding: 0 1.2rem;
  user-select: none;
  vertical-align: bottom;
  white-space: nowrap;
  font-weight: 700;
  float: right;
  justify-content: center;

  &:hover {
    color: #1b4a58
  }

`;

export const ContentHeaderInfo = styled.div`
  max-width: 450px;
  float: left;
`;

export const ContentPreview = styled.a`
  float: right;
  margin: 0px;
`;

export const ContentRightSideInfo = styled.span`
  float: right;
  margin: 0px;
`;

export const ContentHasChild = styled.div`
  margin: 5px;
`;

export const ContentShowMoreSections = styled.button`
  color: #0f7c90;
  background-color: transparent;
  border: 1px solid #2896a9;
  width: 100%;
  height: 4rem;
  font-weight: 700;
  border-radius: 4px;
  margin-top: 1rem;

  &:hover {
    border-color: #1b4a58;
    color: #1b4a58;
  }
`;

export const ContentSvg = styled.svg`
  display: inline;
  float: left;
  width: 1em;
  height: 1em;
  fill: #73726c;
`;

export const ContentPathPolygonRectContainer = styled.path`
fill: #4691f6;
`;

export const ContentSpan = styled.span``;

export const ContentA = styled.a``;