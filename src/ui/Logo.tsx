import styled from "styled-components";
import logo from "../assets/corusposts-logo.png";

const StyledLogo = styled.div`
  margin: 20px 0 20px 0;
  text-align: center;
`;

function Logo() {
  return (
    <StyledLogo>
      <img src={logo} alt="corussoft-logo" />
    </StyledLogo>
  );
}

export default Logo;
