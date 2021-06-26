import { Link } from "react-router-dom";
import "./Favorite.css";
import DeleteIcon from "@material-ui/icons/Delete";
import PageviewIcon from "@material-ui/icons/Pageview";
import Button from "@material-ui/core/Button";

function FavoriteCard({ id, name, image, getMealId }) {
  const removeMealHandler = (id) => {
    getMealId(id);
  };
  return (
    <div className="favCard">
      <h3 className="favName">{name}</h3>
      <div className="favContent">
        <img className="favImg" src={image} alt="" />
        <div className="favBtns">
          <Link
            to={{
              pathname: `/singlemeal/${id}`,
              state: { id: id },
            }}
            style={{
              textDecoration: "none",
              height: "100%",
            }}
          >
            <Button
              variant="contained"
              style={{
                paddingLeft: "23px",
                paddingRight: "23px",
                marginTop: "10px",
                backgroundColor: "#d62929",
                color: "white",
                borderRadius: "20px",
              }}
              startIcon={<PageviewIcon style={{ fontSize: "20px" }} />}
            >
              <p>Show</p>
            </Button>
          </Link>
          <Button
            onClick={() => removeMealHandler(id)}
            variant="contained"
            style={{
              marginTop: "10px",
              backgroundColor: "#d62929",
              color: "white",
              borderRadius: "20px",
            }}
            startIcon={<DeleteIcon style={{ fontSize: "20px" }} />}
          >
            <p>Delete</p>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FavoriteCard;
