import { useState } from "react";
import axios from "axios";
import style from "../CSS/Home.css";

export default function Home() {
  const [street, setStreet] = useState("");
  const [strList, setStrList] = useState([]);

  const handleSearch = () => {
    if (street !== "") {
      axios
        .get(
          `http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=${street}`
        )
        .then(({ data }) => {
          console.log(data.direccionesNormalizadas);
          setStrList(data.direccionesNormalizadas);
        })
        .catch((err) => console.log(err));
    } else {
      alert("Debe ingresar una calle");
    }
  };

  const handleChange = (e) => {
    setStreet(e.target.value);
  };

  return (
    <div className={style.total}>
      <div style={style.btn}>
        <h4>Ingrese el nombre de la calle</h4>
        <input
          type="text"
          placeholder="Ingrese la direccion"
          onChange={handleChange}
        ></input>
        <button onClick={() => handleSearch()}>Buscar</button>
      </div>
      <div className={style.container}>
        <table className={style.table}>
          {strList && (
            <tr className={style.tr}>
              <th className={style.th}>Nombre</th>
              <th className={style.th}>Dirección</th>
            </tr>
          )}
          {strList &&
            strList.map((str) => (
              <tr className={style.tr}>
                <td className={style.td}>{str.nombre_calle}</td>
                <td className={style.td}>{str.direccion}</td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
}
