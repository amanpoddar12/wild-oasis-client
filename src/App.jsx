import styled from "styled-components";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
`;

const Button = styled.button`
  width: 100px;
  color: white;
  background-color: blue;
  height: 75px;
  border-radius: 20px;
  cursor: pointer;
  margin: 20px;
`;
const Input = styled.input`
  width: 200px;
  border: 1px solid black;
  border-radius: 20px;
  height: 30px;
  text-align: center;
  padding: 10px 20px;
`;

const StyledApp = styled.div`
  background-color: red;
  padding: 20px;
  padding: 30px;
`;
function App() {
  return (
    <StyledApp>
      <H1>StayEase</H1>
      <Button onClick={() => alert("hello")}>Click Here..</Button>
      <Button onClick={() => alert("hello")}>Click Here..</Button>
      <Input type="text" placeholder="Enter your name.." />
    </StyledApp>
  );
}

export default App;
