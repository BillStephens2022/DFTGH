import Head from "next/head";
import classes from "@/pages/home.module.css";
import FeatureCard from "@/components/featureCard";

const Home = () => {




  return (
    <>
      <Head>
        <title>Drinking from the Garden Hose</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Drinking From The Garden Hose Podcast Ed Philipp OB Spencer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={classes.main}>
        <h1 className={classes.title}>Drinking from the Garden Hose</h1>
        <div className={classes.title_mobile_div}>
        <h1 className={classes.title_mobile}>Drinking from</h1>
        <h1 className={classes.title_mobile}>the Garden Hose</h1>
        </div>
        <h2 className={classes.subtitle}>The Podcast</h2>
        {/* <div className={classes.description_div}>
          <h3 className={classes.subtitle_2}>2 guys talking about how it used to be...</h3>
          <h3 className={classes.subtitle_2}>Now they are cranky <br /> old men in training...</h3>
        </div> */}
        <div className={classes.container}>



         
            <div className={classes.headers}>
              <h2 className={classes.blankheader}></h2>
              <h2 className={classes.subheader}>Listen Now!</h2>
            </div>
            <div className={classes.content_wrapper}>
            <FeatureCard />
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


        </div>
      </main>
    </>
  );
}

export default Home;