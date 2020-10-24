import styled from 'styled-components/macro';
import Toggle from 'react-toggle';

export const Wrapper = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.foreground};
  border-radius: 8px;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px ${(props) => props.theme.shadow};
  width: 520px;
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
  font-weight: 700;
  letter-spacing: 0.05em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  margin-bottom: 12px;
`;

export const EditToggle = styled(Toggle)`
  position: absolute !important;
  top: 12px;
  right: 12px;

  &.react-toggle--focus .react-toggle-thumb {
    box-shadow: none !important;
  }

  &.react-toggle:hover:not(.react-toggle--disabled) .react-toggle-track {
    background-color: ${(props) => props.theme.mutedText}bb;
  }

  &.react-toggle .react-toggle-track {
    background-color: ${(props) => props.theme.mutedText};
  }

  &.react-toggle:not(.react-toggle--checked) .react-toggle-thumb {
    border-color: ${(props) => props.theme.mutedText};
  }

  &.react-toggle--checked .react-toggle-track {
    background-color: ${(props) => props.theme.accent};
  }

  &.react-toggle--checked:hover:not(.react-toggle--disabled) .react-toggle-track {
    background-color: ${(props) => props.theme.accent}bb;
  }
`;

export const Button = styled.div`
  color: ${(props) => props.theme.blue};
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  white-space: nowrap;

  span {
    display: inline-block;
    width: 0;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    margin-bottom: -4px;
  }
  background: ${(props) => props.theme.blue}10;

  :hover {
    background: ${(props) => props.theme.blue}33;
  }

  &.destructive {
    color: ${(props) => props.theme.red};
    background: ${(props) => props.theme.red}10;

    :hover {
      background: ${(props) => props.theme.red}33;
    }
  }

  &.green {
    color: ${(props) => props.theme.accent};
    display: flex;
    align-items: center;
    height: 41px;
    margin-top: 4px;
    margin-left: 16px;
    border-color: #fff0;
    padding-bottom: 9px;
    background: ${(props) => props.theme.accent}00;

    svg {
      margin-right: 8px;
      margin-bottom: -1px;
    }

    :hover {
      background: ${(props) => props.theme.accent}33;
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
    margin-left: -1px;
  }
`;

export const ButtonsWrapper = styled.div`
  margin: -12px 0;
  margin-left: 12px;
  margin-right: -12px;
  padding: 14px;
  padding-bottom: 0;
  padding-right: 0;
  background: ${(props) => props.theme.activeBackground};
  cursor: default;

  div {
    display: inline-block;
    margin-right: 12px;
    margin-bottom: 12px;
  }
`;

export const DragIconWrapper = styled.div`
  margin-right: 16px;
  color: ${(props) => props.theme.border};
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
`;
