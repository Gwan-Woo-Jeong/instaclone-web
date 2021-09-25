import styled from "styled-components";

interface Props {
  url: string | undefined | null;
  lg?: boolean;
}

interface SAvatar {
  lg: boolean;
}

// lg를 props로 내려주어서 사이즈를 변경
const SAvatar = styled.div<SAvatar>`
  width: ${(props) => (props.lg ? "30px" : "25px")};
  height: ${(props) => (props.lg ? "30px" : "25px")};
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

function Avatar({ url = "", lg = false }: Props) {
  return <SAvatar lg={lg}>{url !== "" ? <Img src={url!} /> : null}</SAvatar>;
}

export default Avatar;
