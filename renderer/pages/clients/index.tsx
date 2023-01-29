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
      <PageHeader
        title="Clients"
        CTAText="Ajouter un client"
        CTAIcon="add"
        CTAonClick={() => console.log("sd")}
      />
      <div className="background-black" />
      <ClientForm />
    </div>
  );
};

export default ClientsPage;
