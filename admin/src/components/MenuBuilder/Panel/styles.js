import styled from 'styled-components/macro';
import Toggle from 'react-toggle';

export const Wrapper = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.foreground};
  border-radius: 8px;
  padding: 16px;
  padding-top: 12px;
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
  border: 1px solid ${(props) => props.theme.blue}44;
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

  :hover {
    background: ${(props) => props.theme.blue}44;
  }

  &.destructive {
    color: #ff5723;
    border-color: #ff572344;

    :hover {
      background: #ff572344;
    }
  }

  &.green {
    color: ${(props) => props.theme.accent};
    border-color: ${(props) => props.theme.accent}44;

    :hover {
      background: ${(props) => props.theme.accent}44;
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
  border-left: 1px solid ${(props) => props.theme.border};
  margin: -12px 0;
  margin-left: 12px;
  margin-right: -12px;
  padding: 12px;
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
