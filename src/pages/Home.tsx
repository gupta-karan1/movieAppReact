import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonLoading,
} from "@ionic/react";
import "./Home.css";
import useAPI, { SearchResult, SearchType } from "../hooks/useAPI";
import { useEffect, useState } from "react";
import {
  gameControllerOutline,
  tvOutline,
  videocamOutline,
} from "ionicons/icons";

const Home: React.FC = () => {
  //import the search data from custom hook
  const { searchData } = useAPI();

  //define the necessary states
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState<SearchType>(SearchType.all);
  const [results, setResults] = useState<SearchResult[]>([]);

  //ionic hooks
  const [presentAlert] = useIonAlert();
  const [loading, dismiss] = useIonLoading();

  // look for changes in the searchTerm state
  useEffect(() => {
    if (searchTerm === "") {
      setResults([]);
      return;
    }

    const loadData = async () => {
      await loading();

      const result: any = await searchData(searchTerm, type);
      // console.log(`~ file: Home.tsx:31 ~ loadData ~ result`, result);

      await dismiss();

      if (result?.Error) {
        presentAlert(result.Error);
      } else {
        setResults(result.Search);
      }
    };
    loadData();
  }, [searchTerm, type]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"tertiary"}>
          <IonTitle>My Movie App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* Search Bar */}
        <IonSearchbar
          value={searchTerm}
          onIonChange={(e) => setSearchTerm(e.detail.value!)}
          debounce={300}
        ></IonSearchbar>

        {/* Select Type */}
        <IonItem lines="full">
          <IonSelect
            label="Select Search Type"
            value={type}
            onIonChange={(e) => setType(e.detail.value!)}
          >
            <IonSelectOption value="">All</IonSelectOption>
            <IonSelectOption value="movie">Movie</IonSelectOption>
            <IonSelectOption value="series">Series</IonSelectOption>
            <IonSelectOption value="episode">Episode</IonSelectOption>
          </IonSelect>
        </IonItem>

        {/* Movie List */}

        <IonList lines="full">
          {results.map((item: SearchResult) => (
            <IonItem
              button
              key={item.imdbID}
              routerLink={`/movies/${item.imdbID}`}
            >
              <IonAvatar slot="start">
                <IonImg src={item.Poster} />
              </IonAvatar>
              <IonLabel className="ion-text-wrap">{item.Title}</IonLabel>
              {item.Type === "movie" && (
                <IonIcon slot="end" icon={videocamOutline} />
              )}
              {item.Type === "series" && (
                <IonIcon slot="end" icon={tvOutline} />
              )}
              {item.Type === "game" && (
                <IonIcon slot="end" icon={gameControllerOutline} />
              )}
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
