import React, { Component } from "react";
import axios from "axios";
import { MediaQuery } from "react-responsive";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", message: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closePopups = this.closePopups.bind(this);
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };
  componentDidUpdate() {
    document.querySelector(".characters").textContent = `${
      this.state.message.length
    } / 50`;
  }

  async handleSubmit(e) {
    e.preventDefault();
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { name, email, message } = this.state;

    const emailErr = document.querySelector(".email-error");
    const msgErr = document.querySelector(".message-error");

    const button = document.querySelector(".contact-form-button");
    button.style.pointerEvents = "none";

    if (!emailRegex.test(email)) {
      emailErr.style.display = "block";
    } else {
      emailErr.style.display = "none";
    }
    if (message.length < 50) {
      msgErr.style.display = "block";
    } else {
      msgErr.style.display = "none";
    }

    if (emailRegex.test(email) && message.length >= 50) {
      await axios
        .post("/api/form", {
          name,
          email,
          message
        })
        .then(res => {
          if (res.data === "success") {
            this.setState({ name: "", email: "", message: "" });
          }
          this.showPopup(res.data);
          button.style.pointerEvents = "all";
        })
        .catch(error => {
          this.showPopup("fail");
          console.log("Error in axios post request: ", error);
        });
    }
  }

  showPopup = popup => {
    switch (popup) {
      case "success":
        const contactSuccess = document.querySelector(".contact-success");
        contactSuccess.style.transform = "translateY(0px)";
        contactSuccess.style.opacity = "1";
        break;
      case "fail":
        const contactError = document.querySelector(".contact-error");
        contactError.style.transform = "translateY(0px)";
        contactError.style.opacity = "1";
        break;
      default:
        return this.closePopups();
    }
  };

  closePopups = () => {
    const contactSuccess = document.querySelector(".contact-success");
    contactSuccess.style.transform = "translateY(60px)";
    contactSuccess.style.opacity = "0";
    const contactError = document.querySelector(".contact-error");
    contactError.style.transform = "translateY(60px)";
    contactError.style.opacity = "0";
  };

  render() {
    return (
      <div className="container contact">
        <div className="contact-popups contact-error">
          <div className="con-err-text">
            Failed to send the message. Contact me directly at{" "}
            <a href="mailto:moreez@pm.me">moreez@pm.me</a>
          </div>
          <div className="close-btn" onClick={this.closePopups}>
            Close
          </div>
        </div>
        <div className="contact-popups contact-success">
          <div className="con-suc-text">Message has ben sent successfully.</div>
          <div className="close-btn" onClick={this.closePopups}>
            Close
          </div>
        </div>
        <MediaQuery query="(min-device-width: 800px)">
          <svg
            id="contact-background"
            width="1920"
            height="1080"
            viewBox="0 0 1920 1080"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1499.5 680C1480.8 680 1464.34 673.396 1429.19 656.396L937 399V890.75C937 929.388 968.641 961 1007.31 961H1991.69C2030.36 961 2062 929.388 2062 890.75V399L1569.81 656.396C1534.66 673.396 1518.2 680 1499.5 680Z"
              fill="#F3F3F3"
            />
            <path
              d="M496.879 824.045C455.436 815.192 405.836 830.738 387.981 868.523C377.62 890.33 376.077 920.126 353.592 929.842C337.499 936.967 318.982 928.978 303.551 920.557C227.719 879.102 75.6148 582.871 87.0777 498.45C89.2822 481.393 94.1319 461.961 109.342 453.54C130.725 441.665 156.076 458.29 180.104 463.041C221.768 471.677 263.872 441.881 281.507 404.097C299.143 366.312 297.159 322.482 291.207 281.243C284.153 233.095 270.926 183.651 238.301 147.162C145.274 43.5241 7.93918 148.025 -46.9508 235.47C-82.2215 291.823 -101.62 356.38 -110.879 421.37C-130.939 559.985 123.23 1055.29 248.882 1122.43C307.74 1153.96 372.109 1177.06 438.903 1182.89C543.392 1191.96 710.928 1146.4 681.609 1011.46C671.248 963.956 638.623 924.012 603.352 889.898C572.931 860.534 538.322 832.897 496.879 824.045Z"
              fill="#F3F3F3"
            />
            <path
              d="M1991.69 118H1007.31C968.641 118 937 149.612 937 188.25V241.499L1499.5 536.901L2062 241.499V188.25C2062 149.612 2030.36 118 1991.69 118Z"
              fill="#F3F3F3"
            />
          </svg>
        </MediaQuery>
        <MediaQuery query="(max-width: 800px)">
          <svg
            id="contact-background"
            width="511"
            height="900"
            viewBox="0 0 511 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="511" height="900" fill="transparent" />
            <path
              d="M255.5 210C250.363 210 245.844 208.191 236.188 203.532L101 133V267.75C101 278.338 109.691 287 120.313 287H390.688C401.309 287 410 278.338 410 267.75V133L274.813 203.532C265.156 208.191 260.637 210 255.5 210Z"
              fill="#F3F3F3"
            />
            <path
              d="M390.688 55H120.313C109.691 55 101 63.6785 101 74.2856V88.9041L255.5 170L410 88.9041V74.2856C410 63.6785 401.309 55 390.688 55Z"
              fill="#F3F3F3"
            />
            <path
              d="M252.057 753.356C231.362 748.938 206.593 756.696 197.677 775.553C192.503 786.437 191.732 801.307 180.504 806.156C172.468 809.712 163.221 805.725 155.515 801.523C117.647 780.833 41.6897 632.992 47.414 590.86C48.5148 582.347 50.9366 572.649 58.5323 568.447C69.2103 562.52 81.8698 570.817 93.8688 573.188C114.674 577.498 135.7 562.628 144.507 543.77C153.313 524.913 152.323 503.039 149.35 482.457C145.828 458.428 139.223 433.752 122.931 415.541C76.4758 363.818 7.89435 415.972 -19.5162 459.613C-37.1294 487.737 -46.8167 519.956 -51.4401 552.391C-61.4577 621.57 65.4675 868.762 128.215 902.274C157.607 918.007 189.751 929.537 223.106 932.446C275.285 936.972 358.948 914.235 344.307 846.888C339.133 823.182 322.84 803.247 305.227 786.221C290.036 771.566 272.753 757.774 252.057 753.356Z"
              fill="#F3F3F3"
            />
          </svg>
        </MediaQuery>
        <div className="contact-header">
          <h1>Contact</h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="input-container">
            <label className="form-label">name</label>
            <input
              autoComplete="off"
              name="name"
              type="text"
              onChange={this.handleChange}
              placeholder="What should I call you?"
              value={this.state.name}
              required
            />
          </div>
          <div className="input-container">
            <label className="form-label">email</label>
            <input
              autoComplete="off"
              name="email"
              type="text"
              onChange={this.handleChange}
              placeholder="How can I contact you back?"
              value={this.state.email}
              required
            />
            <div className="form-error email-error">
              The email you have entered is invalid!
            </div>
          </div>
          <div className="input-container">
            <label className="form-label">message</label>
            <textarea
              id="message-box"
              name="message"
              onChange={this.handleChange}
              placeholder="Minimum 50 characters"
              value={this.state.message}
            />
            <div
              className="characters"
              style={
                this.state.message.length >= 50
                  ? { color: "#1eca89" }
                  : { color: "#a0a0a0" }
              }
            >{`${this.state.message.length} / 50`}</div>
            <div className="form-error message-error">
              Message too short! It must be at least 50 characters.
            </div>
          </div>
          <button className="contact-form-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Contact;
