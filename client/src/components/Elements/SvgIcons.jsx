import React from 'react';
import {DivContent, SvgContainer, PathPolygonRectContainer} from '../StyledComponents.js';

export const SvgLecture = () => (
  <SvgContainer>
    <svg className="svg-icon" id="icon-play" viewBox="0 0 20 20">
      <PathPolygonRectContainer>
        <path d="M2 12c0 5.525 4.475 10 10 10s10-4.475 10-10S17.525 2 12 2 2 6.475 2 12zm15 .114L9 16V8l8 4.114z">
        </path>
      </PathPolygonRectContainer>
    </svg>
  </SvgContainer>
);

export const SvgQuiz = (
  <SvgContainer>
    <svg className="svg-icon" id="icon-quiz" viewBox="0 0 24 24">
      <PathPolygonRectContainer>
        <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z">
        </path>
      </PathPolygonRectContainer>
    </svg>
  </SvgContainer>
);

export const SvgArticle = (
  <SvgContainer>
    <svg className="svg-icon" id="icon-article" viewBox="0 0 24 24">
      <PathPolygonRectContainer>
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z">
        </path>
      </PathPolygonRectContainer>
    </svg>
  </SvgContainer>
);

export const SvgExcercise = (
  <SvgContainer>
    <svg className="svg-icon" id="icon-code" viewBox="0 0 24 24">
      <PathPolygonRectContainer>
        <path d="M8 3a2 2 0 00-2 2v4a2 2 0 01-2 2H3v2h1a2 2 0 012 2v4a2 2 0 002 2h2v-2H8v-5a2 2 0 00-2-2 2 2 0 002-2V5h2V3H8zm8 0a2 2 0 012 2v4a2 2 0 002 2h1v2h-1a2 2 0 00-2 2v4a2 2 0 01-2 2h-2v-2h2v-5a2 2 0 012-2 2 2 0 01-2-2V5h-2V3h2z">
        </path>
      </PathPolygonRectContainer>
    </svg>
  </SvgContainer>
);