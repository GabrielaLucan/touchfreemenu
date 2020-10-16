import styled from 'styled-components/macro';

export const Category = styled.div`
  display: inline-block;
  align-items: center;
  overflow: hidden;
  background: ${(props) => props.theme.foreground};
  border-radius: 8px;
  padding: 10px 12px;
  margin-right: 8px;
  margin-top: 8px;
  border: 1px solid ${(props) => props.theme.border};
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  font-weight: 500;
  color: ${(props) => props.theme.normalText};

  &.editable {
    display: flex;
    justify-content: space-between;
    width: calc(520px - 16px*2);
    cursor: pointer;
  }

  :hover span {
    width: 105px;
    margin-left: 8px;
  }
`;

export const ButtonsWrapper = styled.div`
  border-left: 1px solid ${(props) => props.theme.border};
  margin: -12px 0;
  margin-left: 12px;
  margin-right: -12px;
  padding: 12px;
  padding-right: 0;
  background: ${(props) => props.theme.activeBackground};

  div {
    display: inline-block;
    margin-right: 12px;
  }
`;

export const DragIconWrapper = styled.div`
  margin-right: 16px;
  color: ${(props) => props.theme.border};
  border-radius: 8px;
  overflow: hidden;
`;
