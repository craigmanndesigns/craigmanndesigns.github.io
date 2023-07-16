import React from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Button from "../button";

const ContactForm = ({ blok, sectionTheme }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Function that displays a success toast on bottom right of the page when form submission is successful
  const toastifySuccess = () => {
    toast("Form sent!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: "submit-feedback success",
      toastId: "notifyToast",
    });
  };

  // Function called on submit that uses emailjs to send email of valid contact form
  const onSubmit = async (data) => {
    // Destrcture data object
    const { name, email, subject, message } = data;
    try {
      const templateParams = {
        name,
        email,
        subject,
        message,
      };

      await emailjs.send(
        "service_jbqtgf7",
        "template_6o4xip9",
        templateParams,
        "ZhF-RaLTLZpiBbPmg"
      );

      reset();
      toastifySuccess();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={clsx("min-w-50")}>
      <h2 className={clsx("mb-20")}>{blok.title}</h2>
      <div>
        <form
          id="contact-form"
          className={clsx("flex flex-col gap-8")}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Row 1 of form */}
          <div className="w-full">
            <input
              type="text"
              name="name"
              {...register("name", {
                required: {
                  value: true,
                  message: "Please enter your name",
                },
                maxLength: {
                  value: 30,
                  message: "Please use 30 characters or less",
                },
              })}
              className={clsx("p-4 w-full")}
              placeholder="Name"
            ></input>
            {errors.name && (
              <span className="errorMessage">{errors.name.message}</span>
            )}
          </div>
          <div className={clsx("w-full")}>
            <input
              type="email"
              name="email"
              {...register("email", {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
              className="p-4  w-full"
              placeholder="Email address"
            ></input>
            {errors.email && (
              <span className="errorMessage">
                Please enter a valid email address
              </span>
            )}
          </div>
          <div className={clsx("row formRow")}>
            <div className={clsx("w-full")}>
              <input
                type="text"
                name="subject"
                {...register("subject", {
                  required: {
                    value: true,
                    message: "Please enter a subject",
                  },
                  maxLength: {
                    value: 75,
                    message: "Subject cannot exceed 75 characters",
                  },
                })}
                className={clsx("p-4 w-full")}
                placeholder="Subject"
              ></input>
              {errors.subject && (
                <span className="errorMessage">{errors.subject.message}</span>
              )}
            </div>
          </div>
          {/* Row 3 of form */}
          <div className={clsx("row formRow")}>
            <div className="w-full">
              <textarea
                rows={3}
                name="message"
                {...register("message", {
                  required: true,
                })}
                className={clsx("p-4 w-full")}
                placeholder="Message"
              ></textarea>
              {errors.message && (
                <span className="errorMessage">Please enter a message</span>
              )}
            </div>
          </div>

          <button
            className={clsx(
              "px-5 py-6",
              sectionTheme === "light"
                ? "bg-black text-white hover:bg-black80"
                : "bg-white text-black border hover:bg-black hover:text-white hover:border-white"
            )}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ContactForm;
