import Layout from "../components/Layout";
import SignupComponent from "../components/auth/SignupComponent";

const Signup = () => {
  return (
    <Layout>
      <h2 className="text-center pt-4 pb-4">Signup Page</h2>
      <div className="container">
        <SignupComponent />
      </div>
    </Layout>
  );
};

export default Signup;
