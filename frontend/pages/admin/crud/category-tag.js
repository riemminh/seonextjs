import { useEffect } from "react";
import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import Category from "../../../components/crud/Category";
import Tag from "../../../components/crud/Tag";

const CategoryTags = () => (
  <Layout>
    <Admin>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 pt-5 pb-5">
            <h2>Manage Categories and Tags</h2>
          </div>
          <div className="col-md-6">
            <Category />
          </div>
          <div className="col-md-6">
            <Tag />
          </div>
        </div>
      </div>
    </Admin>
  </Layout>
);

export default CategoryTags;
