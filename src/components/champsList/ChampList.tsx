import { useDispatch, useSelector } from "react-redux";
import { Champion, ChampionState, fetchChamps } from "./ChampSlice";
import { useEffect } from "react";
import store, { RootState } from "../../store";
import "./champList.scss";

const ChampList = () => {
  const dispatch = useDispatch<typeof store.dispatch>();

  const { loading, error, entities } = useSelector(
    (state: RootState) => state.champsReducer
  );

  const champions: Champion[] = Object.values(entities);

  useEffect(() => {
    dispatch(fetchChamps());
  }, []);

  function champRender(arr: Champion[]): JSX.Element[] {
    const champs = arr.map((champ) => (
      <div key={champ.id} className="champ">
        <img
          src={require(`../../assets/champIcons/${champ.id}.jpg`)}
          alt={champ.name}
        />
        <p className="champ__name">{`${champ.name}`}</p>
      </div>
    ));
    return champs;
  }

  if (loading === true) {
    return <div className="loading">"LOADING"</div>;
  }

  return <div>{champRender(champions)};</div>;
};

export default ChampList;
