import { useDispatch, useSelector } from "react-redux";
import { Champion, fetchChamps } from "./ChampSlice";
import { useEffect, useState } from "react";
import store, { RootState } from "../../store";
import { v4 as uuidv4 } from "uuid";
import "./champList.scss";

const ChampList = () => {
  const dispatch = useDispatch<typeof store.dispatch>();

  const { loading, error, entities } = useSelector(
    (state: RootState) => state.champsReducer
  );

  enum Sort {
    NoSort = "",
    AtoZ = " sortable__AtoZ",
    ZtoA = " sortable__ZtoA",
  }
  const [champions, setChampions] = useState<Champion[]>([]);
  const [champSortStatus, setChampSortStatus] = useState<Sort>(Sort.NoSort);
  const [classesSortStatus, setClassesSortStatus] = useState<Sort>(Sort.NoSort);

  useEffect(() => {
    dispatch(fetchChamps());
  }, []);

  useEffect(() => {
    if (entities && Object.keys(entities).length > 0) {
      setChampions(Object.values(entities));
    }
  }, [entities]);

  const sortChamps = (itemToSort: string): void => {
    let currentStatus: Sort;
    if (itemToSort === "champSortStatus") {
      currentStatus = champSortStatus;
      setClassesSortStatus(Sort.NoSort);
    } else {
      currentStatus = classesSortStatus;
      setChampSortStatus(Sort.NoSort);
    }

    const newStatus =
      currentStatus === Sort.NoSort
        ? Sort.AtoZ
        : currentStatus === Sort.AtoZ
          ? Sort.ZtoA
          : Sort.NoSort;

    setSortStatus(itemToSort, newStatus);
    sortMethod(itemToSort, newStatus);
  };

  const setSortStatus = (itemToSort: string, status: Sort): void => {
    itemToSort === "champSortStatus"
      ? setChampSortStatus(status)
      : setClassesSortStatus(status);
  };

  const sortMethod = (itemToSort: string, status: Sort): void => {
    const fieldToSort = itemToSort === "champSortStatus" ? "name" : "tags";

    if (status === Sort.NoSort) {
      setChampions(Object.values(entities));
    } else {
      const sortedChampions = [...champions].sort((a, b) => {
        const compareValue = a[fieldToSort].localeCompare(b[fieldToSort]);
        return status === Sort.AtoZ ? compareValue : -compareValue;
      });

      setChampions(sortedChampions);
    }
  };

  function classRender(champClass: string): JSX.Element {
    const classes = champClass.split(",").map((classWord) => {
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
          return <p key={uuidv4()}>{classWord}</p>;
      }
      return (
        <span className="champ__class" key={uuidv4()}>
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
        <p
          className={`sortable${champSortStatus}`}
          onClick={() => sortChamps("champSortStatus")}
        >
          Champion
        </p>
        <p
          className={`sortable${classesSortStatus}`}
          onClick={() => sortChamps("classesSortStatus")}
        >
          Classes
        </p>
      </div>
      <span className="devider"></span>
      {champRender(champions)};
    </div>
  );
};

export default ChampList;
