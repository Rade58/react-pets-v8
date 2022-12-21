import { Component } from "react";

interface PropsI {
  images: string[];
}

class Corousel extends Component<PropsI> {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http:://pets-images.dev-apis.com/pets/none.jpg"],
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
              <img
                src={photo}
                key={photo}
                className={i === active ? "active" : ""}
                alt="animal thumbnail"
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Corousel;
