import React from 'react';
import styled from 'styled-components';
import { useActivePopups } from '../../state/application/hooks';
import PopupItem from './PopupItem';

const MobilePopupWrapper = styled.div<{ height: string | number }>`
  position: fixed;
  top: 87px;
  z-index: 1300;
  width: 100%;
  max-width: 355px !important;
  height: ${({ height }) => height};
  margin: ${({ height }) => (height ? '0 auto;' : 0)};
  margin-bottom: ${({ height }) => (height ? '20px' : 0)}};

  display: none;
  @media (max-width: 768px) {
    display: block;
  };
`;

const MobilePopupInner = styled.div`
  height: 99%;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const FixedPopupColumn = styled.div`
  position: fixed;
  top: 87px;
  margin-right: 27px;
  right: 3rem;
  max-width: 355px !important;
  width: 100%;
  z-index: 1300;

  @media (max-width: 768px) {
    display: none;
  } ;
`;

export default function Popups() {
  // get all popups
  const activePopups = useActivePopups();

  return (
    <>
      <FixedPopupColumn>
        {activePopups.map((item) => (
          <PopupItem key={item.key} content={item.content} popKey={item.key} removeAfterMs={item.removeAfterMs} />
        ))}
      </FixedPopupColumn>
      <MobilePopupWrapper height={activePopups?.length > 0 ? 'fit-content' : 0}>
        {activePopups // reverse so new items up front
          .slice(0)
          .reverse()
          .map((item) => (
            <PopupItem key={item.key} content={item.content} popKey={item.key} removeAfterMs={item.removeAfterMs} />
          ))}
      </MobilePopupWrapper>
    </>
  );
}
