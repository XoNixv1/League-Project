import { useDispatch, useSelector } from "react-redux";
import { fetchChamps } from "./ChampSlice";
import { useEffect, useState } from "react";
import store, { RootState } from "../../store";
import { v4 as uuidv4 } from "uuid";
import "./champList.scss";
import ContentHeader from "../contentHeader/ContentHeader";
import { Champion, Tags } from "./champTypes";
import { Link } from "react-router-dom";

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

  //// CHAMPIONS DISPATCH

  useEffect(() => {
    dispatch(fetchChamps());
  }, [dispatch]);

  useEffect(() => {
    if (entities) {
      setChampions(Object.values(entities));
    }
  }, [loading]);

  console.log(entities);

  ////  SORTING CHAMPIONS

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

  //// SORT METHOD

  const sortMethod = (itemToSort: string, status: Sort): void => {
    const fieldToSort: keyof Champion =
      itemToSort === "champSortStatus" ? "name" : "tags";

    if (status === Sort.NoSort) {
      setChampions(Object.values(entities));
    } else {
      const sortedChampions = JSON.parse(JSON.stringify(champions)).sort(
        (a: Champion, b: Champion) => {
          let compareValue = 0;
          if (fieldToSort === "name") {
            compareValue = a[fieldToSort].localeCompare(b[fieldToSort]);
          } else if (fieldToSort === "tags") {
            if (
              Array.isArray(a[fieldToSort]) &&
              Array.isArray(b[fieldToSort])
            ) {
              const tagA = a[fieldToSort].sort().join(",");
              const tagB = b[fieldToSort].sort().join(",");
              compareValue = tagA.localeCompare(tagB);
            }
          }
          return status === Sort.AtoZ ? compareValue : -compareValue;
        }
      );

      setChampions(sortedChampions);
    }
  };

  //// CLASSES RENDER

  function classRender(champClass: Tags[]): JSX.Element {
    const classes = champClass.map((classWord) => {
      let classImg: string;
      let className: string;
      switch (classWord.trim()) {
        case Tags.MAGE:
          classImg = "/assets/classesIcons/Mage_icon.webp";
          className = "Mage";
          break;
        case Tags.MARKSMAN:
          classImg = "/assets/classesIcons/Marksman_icon.webp";
          className = "Marksman";
          break;
        case Tags.FIGHTER:
          classImg = "/assets/classesIcons/Fighter_icon.webp";
          className = "Fighter";
          break;
        case Tags.ASSASIN:
          classImg = "/assets/classesIcons/Slayer_icon.webp";
          className = "Assassin";
          break;
        case Tags.SUPPORT:
          classImg = "/assets/classesIcons/Controller_icon.webp";
          className = "Support";
          break;
        case Tags.TANK:
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

  //// SKINS RENDER

  const skinsRender = (skins: Champion["skins"]) => {
    const newSkins = skins.slice(1).map((skin) => (
      <div className="skins__skin" key={skin.id}>
        <img src="../../assets/skinsIcon.webp" alt="" />
        <p>{`${skin.name} `}</p>
      </div>
    ));
    return newSkins;
  };

  //// CHAMPIONS RENDER

  function champRender(arr: Champion[]): JSX.Element[] {
    const champs = arr.map((champ) => (
      <div key={champ.key}>
        <div className="champ-wrapper">
          <Link to={`/${champ.id}`} key={champ.name} className="champ">
            <img
              src={require(`../../assets/champIcons/${champ.id}.png`)}
              alt={champ.name}
            />
            <p className="champ__name">
              {`${champ.name} `} <br /> <br /> {`${champ.title}`}
            </p>
          </Link>
          <div className="champ__class">{classRender(champ.tags)}</div>
          <div className="skins">{skinsRender(champ.skins)}</div>
        </div>
        <span className="devider"></span>
      </div>
    ));
    return champs;
  }

  //// LOADING OR RENDER

  if (loading === true) {
    return <div className="loading">"LOADING"</div>;
  }

  return (
    <>
      <ContentHeader />
      <div className="inner">
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
          <p className={`skins-header`}>Skins</p>
        </div>
        <span className="devider"></span>
        {champRender(champions)}
      </div>
    </>
  );
};

export default ChampList;
