import Link from "next/link";
import cls from "classnames";
import { useRouter } from "next/router";
// import coffeeStoreData from "../../data/coffeeStore.json";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/coffee-store.module.css";
import fetchCoffeeStore from "../../lib/coffee-store";
export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  const coffeeStore = await fetchCoffeeStore();
  return {
    props: {
      coffeeStore: coffeeStore.find((coffeeStore) => {
        return coffeeStore.fsq_id.toString() === params.id;
      }),
    },
  };
}
export async function getStaticPaths() {
  const coffeeStore = await fetchCoffeeStore();
  console.log("coffeeStore", coffeeStore);
  const paths = coffeeStore.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.fsq_id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}
const coffeeStore = (props) => {
  const router = useRouter();
  console.log("router", router);
  if (router.isFallback) {
    <div>Loading...</div>;
  }
  const { name, neighborhood,address, imgUrl } = props.coffeeStore;
  console.log("name", props);
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
