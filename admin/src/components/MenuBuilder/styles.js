import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Panel = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.foreground};
  border-radius: 8px;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px ${(props) => props.theme.shadow};
  width: 420px;
  overflow: hidden;
  color: ${(props) => props.theme.normalText};
  position: relative;

  @media (max-width: 768px) {
    width: min(395px, calc(100vw - 32px)) !important;
    margin-right: 0;
  }
`;

export const Title = styled.span`
  color: #818e99;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
  font-weight: 700;
  letter-spacing: 0.05em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 8px;
`;

export const Category = styled.div`
  align-items: center;
  overflow: hidden;
  box-shadow: 0 4px 12px #22181811;
  background: #fff;
  border-radius: 8px;
  padding: 10px 12px;
  margin-right: 8px;
  margin-top: 16px;
  border: 1px solid #2218181a;
  color: #221818;
  transition: all 0.2s ease-in-out;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  font-weight: 500;
`;

export const ActionButton = styled.div`
  border: 1px solid ${(props) => props.theme.blue};
  color: ${(props) => props.theme.blue};
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;

  :hover {
    background: ${(props) => props.theme.blue}22;
  }

  &.destructive {
    color: #ff5723;
    border-color: #ff5723;

    :hover {
      background: #ff572322;
    }
  }

  &.green {
    color: ${(props) => props.theme.accent};
    border-color: ${(props) => props.theme.accent};

    :hover {
      background: ${(props) => props.theme.accent}22;
    }
  }

  &.left {
    margin-right: 0;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }

  &.right {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
`;

export const ProductCountLabel = styled.div`
  font-size: 12px;
  font-weight: 100;
`;

export const EditButton = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;

  background: ${(props) => props.theme.foreground};
  color: ${(props) => props.theme.accent};
  border: 1px solid ${(props) => props.theme.accent};

  border-radius: 8px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  &.active {
    background: ${(props) => props.theme.accent};
    color: ${(props) => props.theme.foreground};
  }
`;

export const ButtonsWrapper = styled.div`
  border-top: 1px solid ${(props) => props.theme.border};
  margin: 0 -12px;
  margin-top: 12px;
  padding: 12px;
  padding-right: 0;
  background: ${(props) => props.theme.activeBackground};
  margin-bottom: -9px;

  div {
    display: inline-block;
    margin-right: 12px;
  }
`;
