import React from 'react';
import ExampleWorkModal from './example-work-modal';

class ExampleWork extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'modalOpen': false,
      'selectedExample': this.props.work[0],
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(e, example) {
    this.setState({'modalOpen': true, 'selectedExample': example});
  }

  closeModal(e) {
    this.setState({'modalOpen': false});
  }

  render() {
    return (
      <React.Fragment>
        <section className="section section--alignCentered section--description">
          {this.props.work.map((example, i) => {
            return <ExampleWorkBubble key={i} example={example} openModal={this.openModal} />
          })}
        </section>
        <ExampleWorkModal example={this.state.selectedExample} open={this.state.modalOpen} closeModal={this.closeModal}/>
      </React.Fragment>
    )
  }
}

class ExampleWorkBubble extends React.Component {
  render() {
    const {title, image} = this.props.example;

    return (
      <div className="section__exampleWrapper" onClick={e => this.props.openModal(e, this.props.example)}>
        <div className="section__example">
          <img alt={image.desc}
               className="section__exampleImage"
               src={image.src}/>
          <dl className="color--cloud">
            <dt className="section__exampleTitle section__text--centered">
              {title}
            </dt>
            <dd></dd>
          </dl>
        </div>
      </div>
    )
  }
}

export default ExampleWork;
export { ExampleWorkBubble };
