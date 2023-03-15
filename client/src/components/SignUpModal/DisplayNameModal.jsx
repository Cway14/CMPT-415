import React, { useEffect } from "react";
import { useFormik } from "formik";
import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";

const DisplayNameModal = (props) => {
  const { submitButtonAction } = props;

  const createProfilePic = (seed) => {
    const avatar = createAvatar(thumbs, { seed });

    const svg = avatar.toString();
    formik.setValues({ ...formik.values, profilePic: svg });
  };

  useEffect(() => {
    createProfilePic(Date.now());
  }, []);

  const formik = useFormik({
    initialValues: {
      displayName: "",
      profilePic: "",
    },

    onSubmit: (values) => submitButtonAction(values),
  });

  return (
    <form onSubmit={formik.handleSubmit} className="center-children">
      <label htmlFor="profilePic">Avatar</label>
      <div className="center-children">
        <svg
          style={{ display: "block" }}
          width="100"
          height="100"
          dangerouslySetInnerHTML={{ __html: formik.values.profilePic }}
        />
        <button
          type="button"
          className="modal-button-small"
          onClick={() =>
            createProfilePic(formik.values.displayName + Date.now())
          }
        >
          Generate New Avatar
        </button>
      </div>
      <label htmlFor="displayName">Display Name</label>
      <input
        id="displayName"
        name="displayName"
        onChange={formik.handleChange}
        value={formik.values.displayName}
      />
      <button type="submit" className="modal-button">
        Finish Sign up
      </button>
    </form>
  );
};

export default DisplayNameModal;
