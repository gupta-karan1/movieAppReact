import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import useAPI, { DetailsResult } from "../hooks/useAPI";
import {
  bodyOutline,
  clipboardOutline,
  starHalfOutline,
  trophyOutline,
} from "ionicons/icons";

interface DetailsPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const Details: React.FC<DetailsPageProps> = ({ match }) => {
  const { getDetails } = useAPI();
  const [information, setInformation] = useState<DetailsResult | null>(null);

  useIonViewWillEnter(async () => {
    const id = match.params.id;
    const data = await getDetails(id);
    setInformation(data);
    // console.log(data);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/movies"></IonBackButton>
          </IonButtons>
          <IonTitle>{information?.Genre}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {information && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{information.Title}</IonCardTitle>
              <IonCardSubtitle>{information.Year}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent text-center>
              <IonImg src={information.Poster} />
              <IonItem lines="none">
                <IonIcon icon={starHalfOutline} slot="start" color="warning" />
                <IonLabel>{information.imdbRating}</IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>
        )}

        {/* Modal */}

        <IonModal
          trigger="open-modal"
          initialBreakpoint={0.25}
          breakpoints={[0, 0.25, 0.5, 0.75]}
        >
          <IonContent>
            <IonList className="ion-padding">
              <IonItem lines="none">
                <IonIcon icon={clipboardOutline} slot="start"></IonIcon>
                <IonLabel>{information?.Director}</IonLabel>
              </IonItem>

              <IonItem lines="none">
                <IonIcon icon={bodyOutline} slot="start"></IonIcon>
                <IonLabel className="ion-text-wrap">
                  {information?.Actors}
                </IonLabel>
              </IonItem>

              <IonItem lines="none">
                <IonIcon icon={trophyOutline} slot="start"></IonIcon>
                <IonLabel>{information?.Awards}</IonLabel>
              </IonItem>
              <IonItem>
                {" "}
                <p className="ion-padding">{information?.Plot}</p>
              </IonItem>
            </IonList>
          </IonContent>
        </IonModal>
      </IonContent>
      <IonFooter>
        <IonButton expand="full" id="open-modal">
          Show More
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default Details;
