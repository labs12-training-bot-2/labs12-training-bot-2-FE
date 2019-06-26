import styled from "styled-components";
import Paper from "@material-ui/core/Paper";

export const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  selection: {
    margin: "0 10px",
    "@media (max-width: 450px)": {
      fontSize: "0.9rem"
    }
  }
};

export const ResponsesWrapper = styled.div`
  margin: 40px auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
export const MainWrapper = styled(Paper)`
  margin: 4px auto;
  padding: 10px;
  width: 92%;
`;
export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 10px;
  @media (max-width: 700px) {
    justify-content: space-between;
  }
  h2 {
    text-decoration: underline;
    margin: 0 40px 0 10px;
    @media (max-width: 700px) {
      margin: 0 20px 0 10px;
    }
  }
  div {
    display: flex;
    align-items: center;
    @media (max-width: 700px) {
      flex-direction: column;
    }
  }
`;
