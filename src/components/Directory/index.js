import "./styles.scss";
import shopMens from "../../assets/shopMens.jpg";
import shopWomen from "../../assets/shopWomens.jpg";

const Directory = () => {
  return (
    <div className="directory">
      <div className="wrap">
        <div
          className="item"
          style={{
            backgroundImage: `url(${shopWomen})`,
          }}
        >
          <a href="">Shop Womens</a>
        </div>
        <div
          className="item"
          style={{
            backgroundImage: `url(${shopMens})`,
          }}
        >
          <a href="">Shop Mens</a>
        </div>
      </div>
    </div>
  );
};

export default Directory;
