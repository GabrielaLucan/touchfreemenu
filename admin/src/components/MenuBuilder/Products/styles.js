import styled from 'styled-components/macro';

export const Product = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(520px - 16px * 2);
  overflow: hidden;
  box-shadow: 0 4px 12px ${(props) => props.theme.shadow};
  background: ${(props) => props.theme.foreground};
  border-radius: 8px;
  padding: 10px 12px;
  margin-right: 8px;
  margin-top: 8px;
  margin-bottom: 8px;
  border: 1px solid ${(props) => props.theme.border};
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  font-weight: 500;
  color: ${(props) => props.theme.normalText};

  :hover span {
    width: 105px;
    margin-left: 8px;
  }
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
