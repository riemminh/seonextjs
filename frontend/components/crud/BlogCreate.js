import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";
import { QuillModules, QuillFormats } from "../../helper/quill";
const BlogCreate = () => {
  const [values, setValues] = useState({
    body: ""
  });

  const { body } = values;
  const handleBody = () => {};
  const publishBlog = () => {};
  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input type="text" className="form-control" />
        </div>

        <div className="form-group">
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={body}
            placeholder="Write something amazing..."
            onChange={handleBody}
          />
        </div>

        <div>
          <button type="submit" className="btn btn-primary">
            Publish
          </button>
        </div>
      </form>
    );
  };
  return (
    <div className="container-fluid pb-5">
      <div className="row">
        <div className="col-md-8">
          {createBlogForm()}
          {/* <div className="pt-3">
              {showError()}
              {showSuccess()}
          </div> */}
        </div>

        <div className="col-md-4">
          <div>
            <div className="form-group pb-2">
              <h5>Featured image</h5>
              <hr />

              <small className="text-muted">Max size: 1mb</small>
              <br />
              <label className="btn btn-outline-info">
                Upload featured image
                <input type="file" accept="image/*" hidden />
              </label>
            </div>
          </div>
          <div>
            <h5>Categories</h5>
            <hr />

            {/* <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showCategories()}</ul> */}
          </div>
          <div>
            <h5>Tags</h5>
            <hr />
            {/* <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showTags()}</ul> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogCreate;
