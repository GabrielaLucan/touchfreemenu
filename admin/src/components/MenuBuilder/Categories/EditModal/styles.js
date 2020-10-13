import styled from 'styled-components/macro';
import Input from '../../../shared/form/Input';

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
  width: 400px;
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
`;

export const Label = styled.div`
  font-size: 12px;
  color: #818e99;
  text-transform: uppercase;
  font-weight: 600;
  font-weight: 700;
  letter-spacing: 0.05em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 16px;
`;

export const NewNameInput = styled(Input)`
  margin-top: 6px;
  width: 200px;
`;

export const ModalFooter = styled.div`
  border-top: 1px solid ${(props) => props.theme.border};
  padding: 12px;
  background: ${(props) => props.theme.activeBackground};
  margin-top: 48px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  button {
    margin-top: 0;
  }
`;
