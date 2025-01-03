import { useParams } from "react-router-dom";
import "./champPage.scss";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../store";
import { useEffect, useState } from "react";
import { fetchChamps } from "../champsList/ChampSlice";
import { Champion } from "../champsList/champTypes";

const ChampPage = (): JSX.Element => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { champId } = useParams<{ champId: string }>();
  const champData = useSelector((state: RootState) =>
    champId ? state.champsReducer.entities[champId] : undefined
  );
  const [champion, setChampion] = useState<Champion>();

  const { loading } = useSelector((state: RootState) => state.champsReducer);

  useEffect(() => {
    dispatch(fetchChamps("http://localhost:3001/data"));
  }, [dispatch]);

  useEffect(() => {
    if (champData) {
      setChampion(champData);
    }
  }, [loading, champData]);

  const statNames: Record<string, string> = {
    hp: "Health",
    hpperlevel: "Health per lvl",
    mp: "Mana",
    mpperlevel: "Mana per lvl",
    movespeed: "Movement Speed",
    armor: "Armor",
    armorperlevel: "Armor per lvl",
    spellblock: "Magic Resist",
    spellblockperlevel: "Magic Resist per lvl",
    attackrange: "Attack Range",
    hpregen: "Health Regen",
    hpregenperlevel: "Health Regen per lvl",
    mpregen: "Mana Regen",
    mpregenperlevel: "Mana Regen per lvl",
    crit: "Critical Strike Chance",
    critperlevel: "Crit Chance per lvl",
    attackdamage: "Attack Damage",
    attackdamageperlevel: "Attack Damage per lvl",
    attackspeedperlevel: "Attack Speed per lvl",
    attackspeed: "Attack Speed",
  };

  const renderStats = () => {
    if (champion) {
      const stats = Object.entries(champion.stats).map(([key, value]) => (
        <div className="stats__section" key={key}>
          <div className="stats__descr-name">
            <img src={`/assets/statsIcons/${key}.webp`} alt="" />
            <p>{statNames[key]}</p>
          </div>
          <p className="stats__descr-value">{value}</p>
        </div>
      ));
      return stats;
    }
  };

  return (
    <div className="stats">
      <div className="stats__img">
        <img src={`../../assets/champSplash/${champId}_0.jpg`} alt="" />
      </div>
      <div className="stats__header">Base statistics</div>
      <div className="stats__descr">{renderStats()}</div>
    </div>
  );
};

export default ChampPage;
