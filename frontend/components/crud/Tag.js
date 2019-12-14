import { Fragment, useState, useEffect } from "react";
import { create, getTags, removeTag } from "../actions/tags";

const Tag = () => {
  const [values, setValues] = useState({
    name: "",
    error: "",
    messgae: "",
    removed: false,
    tags: [],
    reload: false,
    success: false
  });
  const { name, error, message, reload, removed, tags, success } = values;
  useEffect(() => {
    loadTags();
  }, [reload]);
  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      error: false,
      messgae: "",
      success: false
    });
  };
  const loadTags = () => {
    getTags()
      .then(res => {
        setValues({ ...values, tags: res });
      })
      .catch(err => console.log(err));
  };
  const handleSubmit = e => {
    e.preventDefault();
    const tag = {
      name: name
    };
    create(tag)
      .then(res => {
        console.log(res);
        setValues({ ...values, reload: !reload, success: true, name: "" });
      })
      .catch(err => {
        if (err && err.response) {
          setValues({
            ...values,
            error: true,
            message: err.response.data.error
          });
        }
      });
    console.log(tag);
  };
  const deleteConfirm = slug => {
    let answer = window.confirm(`Are you sure you want to delete this tag?`);
    if (answer) {
      deleteCategory(slug);
    }
  };
  const deleteCategory = slug => {
    removeTag(slug)
      .then(() => {
        setValues({
          ...values,
          error: true,
          success: false,
          name: "",
          removed: !removed,
          reload: !reload
        });
      })
      .catch(err => console.log(err));
  };
  const showCategories = () => {
    return tags.map((c, i) => {
      return (
        <button
          onDoubleClick={() => deleteConfirm(c.slug)}
          title="Double click to delete"
          key={i}
          className="btn btn-outline-primary mr-1 ml-1 mt-3"
        >
          {c.name}
        </button>
      );
    });
  };
  const newCategoryFom = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          value={name}
          name="name"
          onChange={handleChange}
          type="text"
          className="form-control"
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </div>
    </form>
  );
  const showError = () => {
    if (error) {
      return (
        <p className="text-danger">
          {message ===
          "11000 duplicate key error collection: seoblog.categories index: slug already exists"
            ? "Category is exits"
            : message}
        </p>
      );
    }
  };
  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Category is created</p>;
    }
  };
  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">Tag is removed</p>;
    }
  };
  const mouseMoveHandler = e => {
    setValues({
      ...values,
      error: false,
      success: false,
      message: "",
      removed: false
    });
  };
  return (
    <Fragment>
      <h2>Tag</h2>
      {showRemoved()}
      {showSuccess()}
      {showError()}
      <div onMouseMove={mouseMoveHandler}>
        {newCategoryFom()}
        {showCategories()}
      </div>
    </Fragment>
  );
};

export default Tag;
