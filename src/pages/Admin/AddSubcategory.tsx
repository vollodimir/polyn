import { AdminMenu } from '../../components/AdminMenu';

export const AddSubcategory = () => {
  return (
    <>
      <AdminMenu />
      <div className="add-form">
        <form>
          <input
            type="text"
            className="form-control is-valid"
            id="name"
            placeholder="Name subcategory"
          />
          <select className="form-control" id="category">
            <option selected>Select category</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <input type="file" className="form-control-file" id="images" accept=".jpg, .jpeg, .png" />
          <textarea
            className="form-control"
            id="description"
            rows={5}
            placeholder="Description"></textarea>

          <button type="submit" className="btn btn-lg btn-primary btn-block">
            Add subcategory
          </button>
        </form>
      </div>
    </>
  );
};
