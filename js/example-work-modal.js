import React from 'react';

class ExampleWorkModal extends React.Component {
  render() {
    const {title, href, desc, image} = this.props.example;
    const modalStatusString = this.props.open ? "open" : "closed";
    const modalClass = `background--skyBlue modal--${modalStatusString}`;

    return (
      <div className={modalClass}>
        <span className="color--cloud modal__closeButton" onClick={this.props.closeModal}>
          <i className="fa fa-window-close-o"></i>
        </span>
        <img alt={image.desc}
             className="modal__image"
             src={image.src}/>
        <div className="color--cloud modal__text">
          <h2 className="modal__title">
            {title}
          </h2>
          <a className="color--skyBlue modal__link"
             href={href}>
            Check it out
          </a>
          <p className="modal__description">
            {desc}
          </p>
        </div>
      </div>
    )
  }
}

export default ExampleWorkModal;
