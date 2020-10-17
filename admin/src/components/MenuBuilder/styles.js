import styled from 'styled-components/macro';
import Input from '../shared/form/Input';


export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`;

export const SmallDescription = styled.div`
  font-size: 12px;
  font-weight: 100;
  margin-top: 4px;
  color: ${(props) => props.theme.mutedText};
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
  margin-bottom: -10px;

  div {
    display: inline-block;
    margin-right: 12px;
  }
`;

export const FormInput = styled(Input)`
  width: 200px;
  border-radius: 8px;
  margin-top: 4px;
`;

export const Label = styled.div`
  font-size: 11px;
  color: #818e99;
  text-transform: uppercase;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 16px;
`;
