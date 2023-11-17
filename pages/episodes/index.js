import { Fragment, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useEpisodeContext } from "@/context/EpisodeContext";
import Link from "next/link";
import { GoComment, GoPencil, GoTrash } from "react-icons/go";
import { RiBarChart2Fill } from 'react-icons/ri';
import Button from "@/components/buttons/button";
import ModalForm from "@/components/forms/modalForm";
import classes from "./episodes.module.css";
import AddEpisodeForm from "@/components/forms/addEpisodeForm";
import AddPollForm from "@/components/forms/addPollForm";
import EditEpisodeForm from "@/components/forms/editEpisodeForm";
import {
  getEpisodes,
  addEpisode,
  deleteEpisode,
  editEpisode,
} from "@/components/lib/api";
import { formatDate } from "@/components/lib/format";
import IconButton from "@/components/buttons/iconButton";

const Episodes = () => {
  const { data: session } = useSession();
  const {
    state: { episodes },
    dispatch,
  } = useEpisodeContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    mode: "",  // "addEpisode", "editEpisode", or "addPoll"
    episodeData: null, // For storing episode data in case of editing
  })

  useEffect(() => {
    if (session) {
      console.log(session);
    }
    fetchEpisodes(); // fetch episodes on component mount
  }, [session]);

  const openModal = (mode, episodeData = null) => {
    setModalOpen(true);
    setFormData({ mode, episodeData }); // set mode and episodeData when button selected to open the modal
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({ mode: "", episodeData: null }); // reset formData state when closing the modal
  };

  const fetchEpisodes = async () => {
    try {
      const episodesJSON = await getEpisodes();

      // Sort episodes by dateAired in descending order (most recent first)
      const sortedEpisodes = episodesJSON.sort(
        (a, b) => new Date(b.dateAired) - new Date(a.dateAired)
      );

      dispatch({ type: "SET_EPISODES", payload: sortedEpisodes });
    } catch (error) {
      console.error(error.message);
    }
  }

  const handleAddEpisode = async (newEpisode) => {
    try {
      const success = await addEpisode(newEpisode);
      if (success) {
        console.log("Episode added successfully");
        fetchEpisodes(); // Fetch episodes after adding a new episode
        closeModal(); // Close the modal after adding episode
      } else {
        console.error("Error adding episode");
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  const handleDeleteEpisode = async (event, episodeId) => {
    event.preventDefault();
    try {
      const success = await deleteEpisode(episodeId);
      if (success) {
        console.log("Episode deleted successfully");
        fetchEpisodes(); // Fetch episodes after deleting an episode
      } else {
        console.error("Error deleting episode");
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  const handleEditModal = async (event, episodeId) => {
    event.preventDefault();
    const episodeToEdit = episodes.find((episode) => episode._id === episodeId);
    if (episodeToEdit) {
      openModal("editEpisode", episodeToEdit);
    }
  }

  const handleEditEpisode = async (episodeIdToUpdate, episodeData) => {
    try {
      const success = await editEpisode(episodeIdToUpdate, episodeData);
      if (success) {
        console.log("Episode edited successfully!");
        fetchEpisodes();
        closeModal();
      } else {
        console.error("Error editing episode");
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Fragment>
      <main className={classes.main}>
        <h1 className={classes.title}>Episodes</h1>
        {session && (
          <div>
            <Button
              text="Add Episode"
              
              
              color="white"
              margin="0 0.5rem 0 0"
              onClick={() => openModal("addEpisode")}
            />
            <Button
              text="Add Poll"
             
              
              color="white"
              margin="0 0 0 0.5rem"
              onClick={() => openModal("addPoll")}
            />
          </div>
        )}

        {modalOpen && (
          <ModalForm
            onClose={closeModal}
            modalTitle={formData.mode === "addPoll" ? "Add Poll" : "Add Episode"}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            form={
              formData.mode === "addPoll" ? (
                <AddPollForm />
              ) : formData.mode === "editEpisode" ? (
                <EditEpisodeForm
                  episode={formData.episodeData}
                  onSubmit={handleEditEpisode}
                />
              ) : (

                <AddEpisodeForm
                  onSubmit={handleAddEpisode}
                  onSubmitSuccess={closeModal}
                />
              )

            }
          />
        )}

        <div className={classes.episodes_div}>
          {episodes.map((episode) => (

            <div className={classes.card} key={episode._id}>
              <div className={classes.card_inner_wrapper}>
                <div className={classes.banner_image} style={{ backgroundImage: `url(${episode.imageLink})` }}> </div>
                <div className={classes.card_header}>
                  <h3 className={classes.episode_title}>{episode.title}</h3>
                  <h4 className={classes.episode_aired}>
                    Aired: {formatDate(episode.dateAired)}
                  </h4>
                </div>
                <div className={classes.card_main}>

                  <div className={classes.episode_details}>
                    <p className={classes.episode_detail}>
                      {episode.description}
                    </p>

                    {session && (
                      <div>
                        <IconButton
                          icon={<GoPencil />}
                          style={{bottom: 7, left: 7}}                   
                          onClick={(event) =>
                            handleEditModal(event, episode._id)
                          }
                        />
                         <IconButton
                          icon={<GoTrash />}
                          style={{bottom: 7, right: 7}}
                          onClick={(event) =>
                            handleDeleteEpisode(event, episode._id)
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
                <Link

                  href={`/episodes/${episode._id}`}
                  className={classes.link}
                >

                  <footer className={classes.cardFooter}>
                    <button className={`${classes.card_button} ${classes.button_outline}`}>
                      <span className={classes.footer_icon}>
                        <GoComment size={24} />

                      </span>
                      {episode.comments.length}{" "}
                      {episode.comments.length === 1 ? "Comment" : "Comments"}
                    </button>
                    <button className={`${classes.card_button} ${classes.button_fill}`}>
                      <span className={classes.footer_icon}>
                        <RiBarChart2Fill size={24} />

                      </span>
                      <span>
                        {episode.polls.length}{" "}
                        {episode.polls.length === 1 ? "Poll" : "Polls"}
                      </span>
                    </button>

                  </footer>
                </Link>
              </div>
            </div>

          ))}
        </div>
      </main>
    </Fragment>
  );
}

export default Episodes;
