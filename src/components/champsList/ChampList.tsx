import { useDispatch, useSelector } from "react-redux";
import { fetchChamps } from "./ChampSlice";
import { useEffect, useMemo, useState } from "react";
import store, { RootState } from "../../store";
import { v4 as uuidv4 } from "uuid";
import "./champList.scss";
import ContentHeader from "./contentHeader/ContentHeader";
import { Champion, Sort, Tags } from "./champTypes";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../styles/animations.scss";

// IMAGES FROM SRC
// @ts-ignore
const Images = require.context("../../assets", true, /\.(png|jpe?g|webp|svg)$/);

// CLASSES LIST

const classMapping: Record<Tags, { img: string; name: string }> = {
  [Tags.MAGE]: {
    img: Images(`./classesIcons/Mage_icon.webp`),
    name: "Mage",
  },
  [Tags.MARKSMAN]: {
    img: Images(`./classesIcons/Marksman_icon.webp`),
    name: "Marksman",
  },
  [Tags.FIGHTER]: {
    img: Images(`./classesIcons/Fighter_icon.webp`),
    name: "Fighter",
  },
  [Tags.ASSASIN]: {
    img: Images(`./classesIcons/Slayer_icon.webp`),
    name: "Assassin",
  },
  [Tags.SUPPORT]: {
    img: Images(`./classesIcons/Controller_icon.webp`),
    name: "Support",
  },
  [Tags.TANK]: {
    img: Images(`./classesIcons/Tank_icon.webp`),
    name: "Tank",
  },
};

/// MAIN FUNCTION

const ChampList = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { error, entities } = useSelector(
    (state: RootState) => state.champsReducer
  );
  const championList: Champion[] = Object.values(entities);
  const [sortField, setSortField] = useState<keyof Champion>("id");
  const [sortDirection, setSortDirection] = useState(Sort.NoSort);
  const [firstArrowDirection, setFirstArrowDirection] = useState(Sort.NoSort);
  const [secondArrowDirection, setSecondArrowDirection] = useState(Sort.NoSort);

  const sortedChampionList = useMemo(
    () => sortChampions(championList, sortField, sortDirection),
    [championList, sortField, sortDirection]
  );

  //// LIST DISPATCH

  useEffect(() => {
    dispatch(fetchChamps("http://localhost:3001/data"));
  }, [dispatch]);

  /// DEFINING SORT DIRECTION

  function handleSetSortDirection() {
    return sortDirection === Sort.NoSort
      ? Sort.AtoZ
      : sortDirection === Sort.AtoZ
      ? Sort.ZtoA
      : Sort.NoSort;
  }
  //// CHAMPIONS RENDER

  function champRender(arr: Champion[]): JSX.Element {
    return (
      <TransitionGroup component={null}>
        {arr.map((champ) => (
          <CSSTransition
            key={champ.key}
            classNames="fade"
            timeout={500}
            unmountOnExit
          >
            <div key={champ.key}>
              <div className="champ-wrapper">
                <Link to={`/${champ.id}`} key={champ.name} className="champ">
                  <img
                    src={Images(`./champIcons/${champ.id}.png`)}
                    alt={champ.name}
                  />
                  <p className="champ__name">
                    {`${champ.name} `} <br /> <br /> {`${champ.title}`}
                  </p>
                </Link>
                <div className="champ__class">
                  {ClassRender(champ.tags, classMapping)}
                </div>
                <div className="skins">{SkinsRender(champ.skins)}</div>
              </div>
              <span className="devider"></span>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
  }

  //// ERROR OR RENDER

  if (error.length > 0) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="championList">
      <ContentHeader />
      <div className="inner">
        <div className="innerHeader">
          <p
            className={`sortable${firstArrowDirection}`}
            onClick={() => {
              setSortField("id");
              setSortDirection(handleSetSortDirection());
              setFirstArrowDirection(handleSetSortDirection());
            }}
          >
            Champion
          </p>
          <p
            className={`sortable${secondArrowDirection}`}
            onClick={() => {
              setSortField("tags");
              setSecondArrowDirection(handleSetSortDirection());
              setSortDirection(handleSetSortDirection());
            }}
          >
            Classes
          </p>
          <p className={`skins-header`}>Skins</p>
        </div>
        <span className="devider"></span>
        {champRender(sortedChampionList)}
      </div>
      <div className="upBtn" onClick={() => pageUp()}>
        <span></span>
      </div>
    </div>
  );
};

/// PAGE UP METHOD

const pageUp = () => {
  const element = document.getElementById("toTop");
  if (element) {
    element.scrollIntoView({ block: "start", behavior: "smooth" });
  }
};

/// SORT METHOD

function sortChampions(
  list: Champion[],
  field: keyof Champion,
  direction: string
): Champion[] {
  const clonedList: Champion[] = list.slice();

  switch (field) {
    case "id":
      clonedList.sort((a: Champion, b: Champion) =>
        direction === Sort.AtoZ
          ? a[field].localeCompare(b[field])
          : direction === Sort.ZtoA
          ? b[field].localeCompare(a[field])
          : 0
      );
      break;
    case "tags":
      clonedList.sort((a: Champion, b: Champion) =>
        direction === Sort.AtoZ
          ? a.tags.join(",").localeCompare(b.tags.join(","))
          : direction === Sort.ZtoA
          ? b.tags.join(",").localeCompare(a.tags.join(","))
          : 0
      );
      break;
  }

  return clonedList;
}

//// CLASSES RENDER

function ClassRender(
  champClass: Tags[],
  mappingList: typeof classMapping
): JSX.Element {
  return useMemo(
    () => (
      <>
        {champClass.map((classWord) => {
          const classData = mappingList[classWord.trim() as Tags];
          if (classData) {
            return (
              <span className="champ__class" key={uuidv4()}>
                <img src={classData.img} alt={classData.name} />
                <p className="champ__class_descr">{classData.name}</p>
              </span>
            );
          }
          return <p key={uuidv4()}>{classWord}</p>;
        })}
      </>
    ),
    [champClass, mappingList]
  );
}

//// SKINS RENDER

const SkinsRender = (skins: Champion["skins"]) => {
  return useMemo(
    () =>
      skins.slice(1).map((skin) => (
        <div className="skins__skin" key={skin.id}>
          <img src={require("../../assets/skinsIcon.webp")} alt="" />
          <p>{`${skin.name} `}</p>
        </div>
      )),
    [skins]
  );
};

export default ChampList;
