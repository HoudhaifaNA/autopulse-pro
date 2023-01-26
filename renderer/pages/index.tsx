import Navbar from "components/Navbar/Navbar";
import SearchBar from "components/Header/Header";

const LoginPage = () => {
  return (
    <div style={{ padding: "0", display: "flex" }}>
      <Navbar />
      <div style={{ flex: "1", height: "100vh", background: "#F9F9F9" }}>
        <SearchBar />
      </div>
    </div>
  );
};

export default LoginPage;
