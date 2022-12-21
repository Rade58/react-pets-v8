import { Component, MouseEventHandler } from "react";

interface PropsI {
  images: string[];
}

interface StateI {
  active: number;
}

class Corousel extends Component<PropsI, StateI> {
  /* constructor(args: PropsI) {
    super(args);

    this.handleIndexClick = this.handleIndexClick.bind(this);
  } */

  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http:://pets-images.dev-apis.com/pets/none.jpg"],
  };

  // ARROW FUNCTION BECAUSE I WANT this BINDED
  handleIndexClick: MouseEventHandler<HTMLImageElement> = (e) => {
    // console.log(this);
    this.setState((prev) => {
      return {
        ...prev,
        active: parseInt(e.currentTarget.dataset["index"] || ""),
      };
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal-hero" />
        <div className="carousel-smaller">
          {images.map((photo, i) => {
            return (
              // eslint-disable-next-line
              <img
                onClick={this.handleIndexClick}
                src={photo}
                key={photo}
                className={i === active ? "active" : ""}
                alt="animal thumbnail"
                data-index={i}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Corousel;
