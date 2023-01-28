import Navbar from "components/Navbar/Navbar";
import SearchBar from "components/Header/Header";
import EmptyState from "components/EmptyState/EmptyState";

const LoginPage = () => {
  return (
    <div style={{ padding: "0", display: "flex" }}>
      <Navbar />
      <div
        style={{
          flex: "1",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "#F9F9F9",
        }}
      >
        <SearchBar />
        <EmptyState
          title="Vous n'avez pas de clients"
          description="Ajoutez des clients pour les voir ici"
          image="clients"
          CTAIcon="add"
          CTAText="Ajouter un client"
        />
      </div>
    </div>
  );
};

export default LoginPage;
