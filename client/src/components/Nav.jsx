import React,{useState} from "react";
import { BiSearchAlt } from "react-icons/bi";
import { FaSun, FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSearch } from "../Redux/actions";
import n from "../styles/Nav.module.css";

export default function Nav() {
  function darkMode() {
    const rootStyle = document.documentElement.style;
    const sun = document.querySelector("#sun");
    const moon = document.querySelector("#moon");

    rootStyle.setProperty("--bgPrimary", "#32353c");
    rootStyle.setProperty("--bgCard", "#141414");
    rootStyle.setProperty("--fontPrimary", "white");
    rootStyle.setProperty("--navSecundary", "#32353c");
    rootStyle.setProperty("--detail", "white");
    moon.classList.toggle("none");
    sun.classList.toggle("none");
  }
  function ligthMode() {
    const rootStyle = document.documentElement.style;
    const sun = document.querySelector("#sun");
    const moon = document.querySelector("#moon");

    rootStyle.setProperty("--bgPrimary", "rgb(243, 243, 243)");
    rootStyle.setProperty("--bgCard", "rgb(249, 249, 249)");
    rootStyle.setProperty("--fontPrimary", "black");
    rootStyle.setProperty("--navSecundary", "#181818");
    rootStyle.setProperty("--detail", "black");
    sun.classList.toggle("none");
    moon.classList.toggle("none");
  }

  const [input , setInput] = useState('')
  const search = (e) => {
     setInput(e.target.value)
  }
  const dispatch = useDispatch();
  const handleName = async () => {
    dispatch(getSearch(input));
  };

  return (
    <div className={n.conteiner}>
      <div className={n.contSearch}>
        <div className={n.create}>
          <Link to="/create">
            <button>Create VideoGame</button>
          </Link>
        </div>
        <div className={n.searchBar}>
          <button onClick={ () => handleName()}>
            <BiSearchAlt />
          </button>
          <input
            onChange={(e) => search(e)}
            className={n.input}
            type="search"
            placeholder="Videogame..."
          />
        </div>
        <div>
          <button onClick={() => ligthMode()} id="sun" className="none">
            <FaSun />
          </button>
          <button onClick={() => darkMode()} id="moon">
            <FaMoon />
          </button>
        </div>
      </div>
    </div>
  );
}
