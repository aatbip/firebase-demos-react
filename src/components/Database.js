import React from "react";
import { database } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { User } from "../collections/index";

const Database = () => {
  const [data, setData] = React.useState();

  const [dataFromDB, setDataFromDB] = React.useState([]);

  const handleChange = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const addData = async () => {
    try {
      const res = await addDoc(User, data);

      getData();
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    setDataFromDB([]);

    try {
      const res = await getDocs(User);
      res.docs.map((el) => {
        setDataFromDB((prev) => {
          return [
            ...prev,
            {
              ...el.data(),
              id: el.id,
            },
          ];
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const updateData = () => {
    const docToUpdate = doc(User, dataFromDB[0].id);
    try {
      updateDoc(docToUpdate, {
        name: data.name,
        address: data.address,
      });
      getData();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteData = () => {
    deleteDoc(doc(User, dataFromDB[0].id));

    getData();
  };

  return (
    <>
      <h3>Database</h3>
      <input
        onChange={handleChange}
        type="text"
        name="name"
        placeholder="name"
      />
      <input
        onChange={handleChange}
        type="text"
        name="address"
        placeholder="address"
      />
      <button onClick={addData} type="button">
        Add Data
      </button>

      <button onClick={updateData} type="button">
        Update Data
      </button>

      <button onClick={deleteData} type="button">
        Delete Data
      </button>

      {dataFromDB.length > 0 ? (
        dataFromDB.map((data) => {
          return (
            <div key={data.id}>
              <p>
                <b>Id: {data.id}</b>
              </p>
              <p>Name: {data.name}</p>
              <p>Address: {data.address}</p>
            </div>
          );
        })
      ) : (
        <> </>
      )}
    </>
  );
};

export default Database;
