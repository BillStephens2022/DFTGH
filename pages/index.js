import Head from "next/head";
import Image from "next/image";
import classes from "./home.module.css";

const Home = () => {




  return (
    <>
      <Head>
        <title>Drinking from the Garden Hose</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={classes.main}>
        <h1 className={classes.title}>
          <span className={classes.title_span_left}>Drinking from the</span>
          <span className={classes.title_span_right}>Garden Hose</span>
        </h1>
        <h2 className={classes.subtitle}>The Podcast</h2>
        <div className={classes.container}>

          <h2 className={classes.subheader}>Listen Now!</h2>
          <div className={classes.player}>
            <iframe
              id="embedPlayer"
              src="https://embed.podcasts.apple.com/us/podcast/drinking-from-the-garden-hose/id1572514520?itsct=podcast_box_player&amp;itscg=30200&amp;ls=1&amp;theme=auto"
              height="450px"
              frameBorder="0"
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
              allow="autoplay *; encrypted-media *; clipboard-write"
              style={{
                width: "100%",
                maxWidth: "660px",
                overflow: "hidden",
                borderRadius: "10px",
                transform: "translateZ(0px)",
                animation: "2s ease 0s 6 normal none running loading-indicator",
                backgroundColor: "rgb(228, 228, 228)",
              }}
            ></iframe>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;