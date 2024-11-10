import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Edit = () => {
  const history = useHistory();
  const { rowIndex } = useParams();
  const [data, setData] = useState({
    id: "",
    name: "",
    phone: "",
    bus:  "",
    message: "",

    date: new Date().toString(),
  });

  const getData = async () => {
    try {
      const res = await fetch(
        `https://api.sheetbest.com/sheets/31341df2-3890-415e-902c-27fec52af5bc/${rowIndex}`
      );
      const data = await res.json();
      setData(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://api.sheetbest.com/sheets/31341df2-3890-415e-902c-27fec52af5bc/${rowIndex}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (res.ok) {
        history.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form style={{ maxWidth: 500, margin: "auto" }} onSubmit={handleSubmit}>
      <h1 className="text-muted text-center">Edit</h1>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Casper ID
        </label>
        <input
          type="number"
          className="form-control"
          name="id"
          value={data.id}
          onChange={handleChange}
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone no
        </label>
        <input
          type="number"
          className="form-control"
          name="phone"
          value={data.phone}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="bus" className="form-label">
          Bus Stop
        </label>
        <input
          type="text"
          className="form-control"
          name="bus"
          value={data.bus}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="message" className="form-label">
          Address
        </label>
        <textarea
          name="message"
          cols="30"
          rows="3"
          className="form-control"
          value={data.message}
          onChange={handleChange}
        />
      </div>
      <div className="text-center">
        <button className="btn btn-primary">Update</button>
      </div>
    </form>
  );
};

export default Edit;
