import Link from "next/link";
import cls from "classnames";
import { useRouter } from "next/router";
// import coffeeStoreData from "../../data/coffeeStore.json";
import { isEmpty } from "../../utils";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/coffee-store.module.css";
import fetchCoffeeStore from "../../lib/coffee-store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  const coffeeStore = await fetchCoffeeStore();
  const findCoffeeStoreById = coffeeStore?.find((element) => {
    return element?.fsq_id.toString() === params.id;
  });
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}
export async function getStaticPaths() {
  const coffeeStore = await fetchCoffeeStore();
  const paths = coffeeStore.map((element) => {
    console.log({ element });
    return {
      params: {
        id: element?.fsq_id?.toString(),
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}
const coffeeStore = (props) => {
  console.log("props", props);
  const router = useRouter();
  console.log("router", router.query.id);
  if (router.isFallback) {
    <div>Loading...</div>;
  }
  const id = router.query?.id;
  console.log("id", typeof id);
  const [coffeeStoreData, setCoffeeStoreData] = useState(props.coffeeStore);
  const { coffeeStore } = useSelector((state) => state);
  console.log('coffeeStore@@##@@', coffeeStore.length)

  const handleCreateCoffeeStore = async (coffeeStore) => {
    const{fsq_id, name, neighborhood, address, imgUrl}=coffeeStore
    try {
      const response =await fetch(`/api/createCoffeeStore`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body:JSON.stringify({
          Id:fsq_id,
          Name:name,
          Neighborhood:neighborhood||"",
          Address:address||"",
          ImageUrl:imgUrl,
          Voting:0
        })
      });
      const data=await response.json();
      console.log('data', data)
    } catch (error) {
      console.log({ message: "Error creating the coffee store", error });
    }
  };

  useEffect(() => {
    if (isEmpty(props.coffeeStore)) {
      if (coffeeStore?.length > 0) {
        const findCoffeeStoreById = coffeeStore?.find((element) => {
          console.log('typeof element.fsq_id', typeof element.fsq_id)
          return element?.fsq_id?.toString() === id?.toString();
        });
        setCoffeeStoreData(findCoffeeStoreById);
        handleCreateCoffeeStore(findCoffeeStoreById);
      }
    }
  }, [id,coffeeStore.length]);
  const { name, neighborhood, address, imgUrl } = coffeeStoreData;

  const handleUpvoteButton = () => {
    console.log("Upvote Button Clicked");
  };
  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">← Back To Home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={500}
            height={400}
            className={styles.storeImg}
            alt={name}
          />
        </div>

        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/place.svg"
              width="24"
              height="24"
              alt="Location"
            />
            <p className={styles.text}>{address}</p>
          </div>
          {neighborhood && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                width="24"
                height="24"
                alt="Near Me"
              />
              <p className={styles.text}>{neighborhood}</p>
            </div>
          )}

          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width="24"
              height="24"
              alt="Star"
            />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default coffeeStore;
