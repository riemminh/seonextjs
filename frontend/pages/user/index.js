import Layout from "../../components/Layout";
import Private from "../../components/auth/Private";

const User = () => (
  <Layout>
    <Private>
      <h1>User Page</h1>
    </Private>
  </Layout>
);

export default User;
