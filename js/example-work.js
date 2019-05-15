import React from 'react';

class ExampleWork extends React.Component {
  render() {
    return (
      <section className="section section--alignCentered section--description">
        {this.props.work.map((example, i) => {
          return <ExampleWorkBubble key={i} example={example} />
        })}
      </section>
    )
  }
}

class ExampleWorkBubble extends React.Component {
  render() {
    const {title, image: {description, src, comment} = {}} = this.props.example;

    return (
      <div className="section__exampleWrapper">
        <div className="section__example">
          <img alt={description}
               className="section__exampleImage"
               src={src}/>
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
