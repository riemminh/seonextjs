import Layout from "../components/Layout";
import SigninComponent from "../components/auth/SigninComponent";

const Signin = () => {
  return (
    <Layout>
      <h2 className="text-center pb-4 pt-4">Signin Page</h2>
      <div className="container">
        <SigninComponent />
      </div>
    </Layout>
  );
};

export default Signin;
