import { useParams } from "react-router-dom";
import "./champPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";
import { fetchChamps } from "../champsList/ChampSlice";

const ChampPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const { champId } = useParams<{ champId: string }>();
  const champData = useSelector((state: RootState) =>
    champId ? state.champsReducer.entities[champId] : undefined
  );
  console.log(champData);

  useEffect(() => {
    if (champId!) {
      // dispatch(fetchChamps(champId));
    }
  }, [champId]);

  const renderStats = () => {
    if (champData) {
      const stats = Object.entries(champData?.stats).map(([key, value]) => (
        <div className="stats__section">
          <div className="stats__descr-name">
            <img src={`/assets/statsIcons/${key}.webp`} alt="" />
            <p>{key}</p>
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
