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

  function classRender(champClass: string): JSX.Element {
    const classes = champClass.split(",").map((classWord, i) => {
      let classImg: string;
      let className: string;
      switch (classWord.trim()) {
        case "mage":
          classImg = "/assets/classesIcons/Mage_icon.webp";
          className = "Mage";
          break;
        case "carry":
          classImg = "/assets/classesIcons/Marksman_icon.webp";
          className = "Marksman";
          break;
        case "fighter":
          classImg = "/assets/classesIcons/Fighter_icon.webp";
          className = "Fighter";
          break;
        case "assassin":
          classImg = "/assets/classesIcons/Slayer_icon.webp";
          className = "Assassin";
          break;
        case "support":
          classImg = "/assets/classesIcons/Controller_icon.webp";
          className = "Support";
          break;
        case "tank":
          classImg = "/assets/classesIcons/Tank_icon.webp";
          className = "Tank";
          break;
        default:
          return <p key={i}>{classWord}</p>;
      }
      return (
        <span className="champ__class" key={i}>
          <img src={classImg} alt={className} />
          <p className="champ__class_descr">{className}</p>
        </span>
      );
    });
    return <>{classes}</>;
  }

  function champRender(arr: Champion[]): JSX.Element[] {
    const champs = arr.map((champ) => (
      <div>
        <div className="champ-wrapper">
          <div key={champ.id} className="champ">
            <img
              src={require(`../../assets/champIcons/${champ.id}.jpg`)}
              alt={champ.name}
            />
            <p className="champ__name">
              {`${champ.name} `} <br /> <br /> {`${champ.title}`}
            </p>
          </div>
          <div className="champ__class">{classRender(champ.tags)}</div>
        </div>
        <span className="devider"></span>
      </div>
    ));
    return champs;
  }

  if (loading === true) {
    return <div className="loading">"LOADING"</div>;
  }

  return (
    <div>
      <div className="innerHeader">
        <p>Champion</p>
        <p>Classes</p>
      </div>
      <span className="devider"></span>
      {champRender(champions)};
    </div>
  );
};

export default ChampList;
