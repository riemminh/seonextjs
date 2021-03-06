import { useState, useEffect, Fragment } from "react";
import { create, getCategories, removeCategory } from "../actions/category";

const Category = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    categories: [],
    removed: false,
    message: "",
    reload: false
  });
  const { name, categories, error, success, removed, reload, message } = values;
  useEffect(() => {
    loadCategories();
  }, [reload]);

  const loadCategories = () => {
    getCategories()
      .then(res => {
        setValues({ ...values, categories: res });
      })
      .catch(err => {
        if (err && err.response) {
          console.log(err.response.data);
        }
      });
  };

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      success: false,
      error: false,
      message: ""
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const category = {
      name: name
    };

    create(category)
      .then(res => {
        setValues({ ...values, success: true, name: "", reload: !reload });
      })
      .catch(err => {
        if (err && err.response) {
          setValues({
            ...values,
            success: false,
            message: err.response.data.error,
            error: true
          });
        }
      });
  };

  const deleteConfirm = slug => {
    let answer = window.confirm(
      `Are you sure you want to delete this category?`
    );
    if (answer) {
      deleteCategory(slug);
    }
  };
  const deleteCategory = slug => {
    removeCategory(slug)
      .then(() => {
        setValues({
          ...values,
          error: false,
          success: false,
          name: "",
          removed: !removed,
          reload: !reload
        });
      })
      .catch(err => console.log(err));
  };
  const showCategories = () => {
    return categories.map((c, i) => {
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
      return <p className="text-danger">Category is removed</p>;
    }
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
  const mouseMoveHandler = () => {
    setValues({
      ...values,
      error: false,
      success: false,
      removed: false
    });
  };
  return (
    <Fragment>
      <h2>Category</h2>
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

export default Category;
