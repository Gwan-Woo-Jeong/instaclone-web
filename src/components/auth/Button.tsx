import styled from "styled-components";

type Props = {
  type: string;
  value: string;
};

const SButton = styled.input`
  border: none;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 500;
  width: 100%;
`;

function Button(props: Props) {
  return <SButton {...props} />;
}

export default Button;
