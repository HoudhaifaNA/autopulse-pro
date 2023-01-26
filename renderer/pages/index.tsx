import Navbar from "components/Navbar/Navbar";
import { Body1, Heading1 } from "styles/Typography";

const LoginPage = () => {
  return (
    <div style={{ padding: "0", display: "flex" }}>
      <Navbar />
      <div style={{ flex: "1", height: "100vh", background: "#fff" }}></div>
    </div>
  );
};

export default LoginPage;
