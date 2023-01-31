import ClientForm from "components/ClientForm/ClientForm";
import PageHeader from "components/PageHeader/PageHeader";

const ClientsPage = () => {
  return (
    <div>
      {/* <EmptyState
        title="Vous n'avez pas de clients"
        description="Ajoutez des clients pour les voir ici"
        image="clients"
        CTAText="Ajouter un client"
        CTAIcon="add"
      /> */}
      <div style={{ position: "relative", zIndex: "8000" }}>
        <PageHeader
          title="Clients"
          CTAText="Ajouter un client"
          CTAIcon="add"
          CTAonClick={() => console.log("Hello")}
        />
      </div>
    </div>
  );
};

export default ClientsPage;
