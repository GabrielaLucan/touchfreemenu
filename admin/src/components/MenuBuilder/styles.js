import styled from 'styled-components/macro';
import Input from '../shared/form/Input';
import Select from '../shared/form/Select';
import Toggle from 'react-toggle';

export const Wrapper = styled.div`
  ${(props) => props.loading && 'filter: grayscale(0.5) blur(3px) opacity(0.6); pointer-events: none'};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Panel = styled.div`
  background-color: ${(props) => props.theme.foreground};
  border-radius: 8px;
  box-shadow: 0 4px 12px ${(props) => props.theme.shadow};
  width: 720px;
  overflow: hidden;
  color: ${(props) => props.theme.normalText};
  position: relative;

  @media (max-width: 768px) {
    width: min(395px, calc(100vw - 32px)) !important;
    margin-right: 0;
  }
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 16px;
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 16px 0 34px 0;
  width: 720px;

  @media (max-width: 768px) {
    width: min(395px, calc(100vw - 32px)) !important;
    margin-right: 0;
  }
`;

export const Product = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  box-shadow: 0 4px 12px ${(props) => props.theme.shadow};
  background: ${(props) => props.theme.foreground};
  border-radius: 8px;
  padding: 10px 12px;
  margin: 8px;
  border: 1px solid ${(props) => props.theme.border};
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  font-weight: 500;
  color: ${(props) => props.theme.normalText};
`;

export const ProductImage = styled.img`
  height: 100px;
`;

export const ProductImageWrapper = styled.div`
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 12px;
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
  transition: all 0.15s ease-in-out;
  background: ${(props) => props.theme.blue}12;
  ${(props) => props.disabled && 'opacity: 0.4; pointer-events: none'};
  height: 36px;

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
    color: ${(props) => props.theme.red};
    background: ${(props) => props.theme.red}12;

    :hover {
      background: ${(props) => props.theme.red}44;
    }
  }

  &.green {
    color: ${(props) => props.theme.accent};
    display: flex;
    align-items: center;
    margin-left: 16px;
    border-color: #fff0;
    padding-bottom: 9px;
    background: ${(props) => props.theme.accent}22;

    svg {
      margin-right: 8px;
      margin-bottom: -1px;
    }

    :hover {
      background: ${(props) => props.theme.accent}44!important;
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
  display: flex;
  align-items: center;

  margin: -12px 0;
  margin-left: 12px;
  margin-right: -12px;
  padding: 16px;
  padding-bottom: 2px;
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

export const EmptyPlaceholderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  text-align: center;
`;

export const SmallDescription = styled.div`
  font-size: 12px;
  font-weight: 100;
  margin-top: 8px;
  color: ${(props) => props.theme.mutedText};
`;

export const CategoryTitle = styled.div`
  font-size: 14px;
  font-weight: 100;
  color: ${(props) => props.theme.mutedText};
  margin-right: 8px;
  display: flex;
  align-items: center;
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

// export const ButtonsWrapper = styled.div`
//   border-top: 1px solid ${(props) => props.theme.border};
//   margin: 0 -12px;
//   margin-top: 12px;
//   padding: 12px;
//   padding-right: 0;
//   background: ${(props) => props.theme.activeBackground};
//   margin-bottom: -10px;

//   div {
//     display: inline-block;
//     margin-right: 12px;
//   }
// `;

export const FormInput = styled(Input)`
  width: 318px;
  height: 41px;
  padding: 8px 12px;
  border-radius: 8px;
  margin-top: 8px;
  padding-right: 15px;

  &.small {
    width: 90px;
  }
`;

export const SearchInput = styled(Input)`
  width: 318px;
  height: 43px;
  padding: 8px 12px;
  border-radius: 8px;
  flex: 1;
  background-color: ${(props) => props.theme.foreground};
`;

export const SelectInput = styled(Select)`
  width: 318px;
  height: 41px;
  padding: 8px 12px;
  padding-right: 24px;
  border-radius: 8px;
  margin-top: 8px;
  padding-right: 15px;
  cursor: pointer;

  &[disabled] {
    color: ${(props) => props.theme.mutedText};
  }
`;

export const Label = styled.span`
  font-size: 11px;
  color: ${(props) => props.theme.mutedText};
  text-transform: uppercase;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 16px;
`;

export const FormInputWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

export const Suffix = styled.div`
  position: absolute;
  right: 12px;
  top: 18px;
  z-index: 15;
  color: ${(props) => props.theme.mutedText}bb;
  pointer-events: none;
`;

export const CameraIconWrapper = styled.div`
  position: absolute;
  left: 12px;
  top: 8px;
  z-index: 15;
  color: ${(props) => props.theme.border};
  pointer-events: none;
`;

export const CategoryActions = styled.div`
  display: flex;
  align-items: center;
`;

export const CountTag = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  margin-right: 8px;

  border-color: #fff0;
  border-radius: 8px;
  background: ${(props) => props.theme.accent}22;

  cursor: default;

  color: ${(props) => props.theme.accent};
  font-weight: 500;
  font-size: 12px;
  padding-top: 3px;
`;

export const JiggleModeIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 720px;

  font-size: 14px;
  color: ${(props) => props.theme.mutedText};

  transition: height 0.25s ease-in-out;
  height: 0;
  overflow: hidden;
  margin-top: -8px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    width: min(395px, calc(100vw - 32px)) !important;
    margin-right: 0;
  }
`;
