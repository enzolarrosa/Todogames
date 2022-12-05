import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getDetail, setDetail } from "../Redux/actions";
import { AiFillHome } from "react-icons/ai";
import { BsPlusCircleFill } from "react-icons/bs";
import c from "../styles/Detail.module.css";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getDetail(id));
      dispatch(setDetail())
  }, [dispatch]);
  const game = useSelector((state) => state.gamesDetail);
  const d = game[0];

  return (
    <div className={c.conteiner}>
      <div className={c.contBack}>
        <div>
          <Link className={c.link} to="/home">
            <p>Home</p>
            <AiFillHome className={c.iconHome} />
          </Link>
        </div>
        <div className={c.divBack}>
          <Link className={c.link} to="/create">
            <p>Create</p>
            <BsPlusCircleFill className={c.iconHome} />
          </Link>
        </div>
      </div>
      {d?.image ? (
        <div className={c.contMayor}>
          <div className={c.contImg}>
            <p className={c.title}>{d?.name}</p>
            <img src={d?.image} />
          </div>
          <div className={c.contSection}>
            <p className={c.subtitle}>Description</p>
            <p className={c.information}>{d?.description}</p>
            <p className={c.subtitle}>Aditional information</p>
            <div className={c.info}>
              <div>
                <p className={c.aditional}>Genre</p>
                <p className={c.aditionalP}>{d?.genres.join(", ").split(",").join()}</p>
              </div>
              <div>
                <p className={c.aditional}>Platform</p>
                <p className={c.aditionalP}>{d?.platform[0]}</p>
              </div>
              <div>
                <p className={c.aditional}>Rating</p>
                <p className={c.aditionalP}>{d?.rating}</p>
              </div>
              <div>
                <p className={c.aditional}>Realease Data</p>
                <p className={c.aditionalP}>{d?.date}</p>
              </div>
            </div>
            {d?.screen && <p className={c.subtitle}>Screenshots </p>}
            {d?.screen && (
              <div className={c.contScreen}>
                <div className={c.divScreen}>
                  <img src={d?.screen[0]} alt="screenshot" />
                  <img src={d?.screen[1]} alt="screenshot" />
                  <img src={d?.screen[2]} alt="screenshot" />
                </div>
              </div>
            )}
            <a className={c.play} href={d?.play}>
              Play game
            </a>
          </div>
        </div>
      ) : (
        <div className={c.loading}>
          <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" />
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}
