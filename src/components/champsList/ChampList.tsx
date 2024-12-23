import { useDispatch, useSelector } from "react-redux";
import { Champion, fetchChamps } from "./ChampSlice";
import { useEffect } from "react";
import store from "../../store";
import useHttp from "../../hooks/https";

const ChampList = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { request } = useHttp();

  interface RootState {
    champs: {
      loading: boolean;
      error: string;
      entites: Champion[];
    };
  }
  // Test12
  // const { champs } = useSelector((state: RootState) => state.champs);

  let data;

  // useEffect(() => {
  //   dispatch(fetchChamps());
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("http://localhost:3001/champions");
        const response = await data.json();
        console.log(response); // Выводим данные, полученные с сервера
      } catch (error) {
        console.error("Error fetching data:", error); // Обработка ошибки
      }
    };

    fetchData(); // Вызов асинхронной функции
  }, [request]);

  // if (loading === true) {
  //   return <div>"LOADING"</div>;
  // }

  return <div>"123"</div>;
};

export default ChampList;
