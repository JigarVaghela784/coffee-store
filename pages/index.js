import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner";
import Card from "../components/card";
import fetchCoffeeStore from "../lib/coffee-store";
import useTrackLocation from "../hooks/useTrackLocation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCoffeeStoreData } from "../store/action";
import heroImage from '/public/static/hero-image.png'

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStore();
  return {
    props: { coffeeStores },
  };
}

export default function Home(props) {
  const [coffeeStoreError, setCoffeeStoreError] = useState(null);
  const { locationErrorMsg, handelTrackLocation, isFindingLocation } =
    useTrackLocation();
  const dispatch = useDispatch();
  const {coffeeStore,latLong}=useSelector(state=>state)

  const fetchLocationHandler = async () => {
    if (latLong) {
      try {
        const response = await fetch(`/api/getCoffeeStoreByLocation?latLong=${latLong}&limit=30`)
        const fetchCoffeeStores=await response.json()
        dispatch(setCoffeeStoreData(fetchCoffeeStores));
        setCoffeeStoreError("");
      } catch (error) {
        setCoffeeStoreError(error.message);
      }
    }
  };
  useEffect(() => {
    fetchLocationHandler();
  }, [latLong]);

  const buttonClickHandler = () => {
    handelTrackLocation();
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? "Locating..." : "View Store Nearby"}
          buttonClick={buttonClickHandler}
        />
        {locationErrorMsg && <p>Something Went Wrong:{locationErrorMsg}</p>}
        {coffeeStoreError && <p>Something Went Wrong:{coffeeStoreError}</p>}
        <div className={styles.heroImage}>
          <Image
            src={heroImage.src}
            width={700}
            height={400}
            alt="hero Image"
          />
        </div>
        {coffeeStore.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Store Near Me</h2>
            <div className={styles.cardLayout}>
              {coffeeStore.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.fsq_id}
                    name={coffeeStore.name}
                    className={styles.card}
                    imageUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
                    href={`/coffee-store/${coffeeStore.fsq_id}`}
                    alternate={coffeeStore.name}
                  />
                );
              })}
            </div>
          </div>
        )}
        {props.coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Surat Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.fsq_id}
                    name={coffeeStore.name}
                    className={styles.card}
                    imageUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
                    href={`/coffee-store/${coffeeStore.fsq_id}`}
                    alternate={coffeeStore.name}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
