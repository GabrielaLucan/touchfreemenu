import styled from 'styled-components/macro';
import Toggle from 'react-toggle';

export const Backdrop = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 57px;
  left: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.5);
  transition: opacity 0.25s ease-in-out;

  &.closed {
    pointer-events: none;
    opacity: 0;
  }
`;

export const Modal = styled.div`
  position: fixed;
  z-index: 100;
  width: 800px;
  top: 250px;
  left: 0;
  right: 0;
  margin: auto;
  background: ${(props) => props.theme.foreground};
  border: 1px solid ${(props) => props.theme.border};
  transition: opacity 0.25s ease-in-out;
  color: ${(props) => props.theme.normalText};

  border-radius: 8px;
  box-shadow: 0 4px 42px ${(props) => props.theme.shadow};
  overflow: hidden;

  &.closed {
    pointer-events: none;
    opacity: 0;
  }

  @media (max-width: 768px) {
    width: min(395px, calc(100vw - 32px)) !important;
  }
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 16px;

  width: 100%;
  background: ${(props) => props.theme.activeBackground};
`;

export const CloseButtonWrapper = styled.div`
  cursor: pointer;
  padding: 15px;
  margin: -15px;

  margin-right: -11px;

  :hover {
    opacity: 0.6;
  }
`;

export const ModalContent = styled.div`
  padding: 0 16px;
  position: relative;
`;

export const ModalFooter = styled.div`
  border-top: 1px solid ${(props) => props.theme.border};
  padding: 12px;
  background: ${(props) => props.theme.activeBackground};
  margin-top: 24px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  button {
    margin-top: 0;
  }
`;

export const AddButton = styled.div`
  display: inline-block;
  color: ${(props) => props.theme.accent};
  cursor: pointer;
  margin: 0 8px;

  &:hover {
    opacity: 0.6;
  }
`;

export const RemoveButton = styled.div`
  display: inline-block;
  color: ${(props) => props.theme.red};
  cursor: pointer;
  margin: 0 8px;

  &:hover {
    opacity: 0.6;
  }
`;

export const FieldButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 45px;
  padding-top: 4px;
`;

export const DiscountToggle = styled(Toggle)`
  &.react-toggle--focus .react-toggle-thumb {
    box-shadow: none !important;
  }

  &.react-toggle:hover:not(.react-toggle--disabled) .react-toggle-track {
    background-color: ${(props) => props.theme.mutedText}44;
  }

  &.react-toggle .react-toggle-track {
    background-color: ${(props) => props.theme.mutedText}88;
  }

  &.react-toggle:not(.react-toggle--checked) .react-toggle-thumb {
    border-color: ${(props) => props.theme.mutedText}88;
  }

  &.react-toggle--checked .react-toggle-track {
    background-color: ${(props) => props.theme.accent};
  }

  &.react-toggle--checked:hover:not(.react-toggle--disabled) .react-toggle-track {
    background-color: ${(props) => props.theme.accent}bb;
  }
`;

export const DropArea = styled.div`
  background-color: ${(props) => props.theme.activeBackground};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  padding: 70px 16px;
  cursor: pointer;
`;

export const ProductImageWrapper = styled.div`
  border-radius: 8px;
  height: 170px;
  overflow: hidden;
  position: relative;

  div {
    display: none;
  }

  :hover {
    div {
      display: block;
    }
  }
`;

export const RemoveImageButton = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 15px;
  cursor: pointer;
  color: white;
  border-radius: 8px;
  background: ${(props) => props.theme.red};
  box-shadow: 0 4px 12px ${(props) => props.theme.shadow};
`;

export const ErrorText = styled.div`
  margin-top: 4px;
  color: ${(props) => props.theme.red};
  font-size: 12px;
`;
