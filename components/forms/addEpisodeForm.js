import { Fragment, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "@/components/buttons/button";
import classes from "@/components/forms/addEpisodeForm.module.css";

const initialFormData = {
  title: "",
  description: "",
  dateAired: "",
  imageLink: "",
};

const AddEpisodeForm = ({ onSubmit, selectedEpisode = null }) => {
  const [formData, setFormData] = useState(initialFormData);
  
  useEffect(() => {
    if (selectedEpisode) {
      // Populate form fields with selectedEpisode data if available (this would be coming from RSS Feed component)
      setFormData({
        title: selectedEpisode.title || "",
        description: selectedEpisode.description || "",
        dateAired: selectedEpisode.pubDate || "",
        imageLink: "", // Leave imageLink empty for user input
      });
    }
  }, [selectedEpisode]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    // Convert the selected date to a string in the desired format (ISO string)
    const formattedDate = date.toISOString();
    setFormData((prevData) => ({
      ...prevData,
      dateAired: formattedDate, // Update dateAired in formData with the formatted date string
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    onSubmit(formData);
  }

  return (
    <Fragment>
      
      <div className={classes.form_container}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.form_group}>
            <label htmlFor="title" className={classes.label}>
              Episode Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Episode Title"
              className={classes.input}
              id="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.form_group}>
            <label htmlFor="description" className={classes.label}>
              Episode Description
            </label>
            <textarea
              rows={10}
              name="description"
              placeholder="Episode Description"
              className={classes.textarea}
              id="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.form_group}>
            <label htmlFor="imageLink" className={classes.label}>
              Episode Image URL
            </label>
            <input
              type="text"
              name="imageLink"
              placeholder="Episode Image URL"
              className={classes.input}
              id="imageLink"
              value={formData.imageLink}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.form_group}>
            <label htmlFor="date" className={classes.label}>
              Episode Air Date
            </label>
            <DatePicker
              className={classes.datePicker}
              id="date"
              placeholderText={"Episode Air Date"}
              selected={
                formData.dateAired ? new Date(formData.dateAired) : null
              } // Parse the stored date string to a Date object for the DatePicker component
              onFocus={(e) => e.target.readOnly = true}
              disabledKeyboardNavigation
              onChange={(date) => handleDateChange(date)}
            />
          </div>

          <Button type="submit" text="Submit"></Button>
        </form>
      </div>
    </Fragment>
  );
}

export default AddEpisodeForm;
