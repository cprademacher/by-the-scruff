/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useSelector } from "react-redux";
import defaultAvatar from "../../images/default_avatar.jpg";
import StarRatings from "react-star-ratings";

export default function ListReviews({ reviews }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className="reviews w-75">
        <h3>Other's Reviews:</h3>
        <hr />
        {reviews?.map((review) => (
          <div key={review?._id} className="review-card my-3">
            <div className="row">
              <div className="col-1">
                <img
                  src={user?.avatar ? user?.avatar?.url : defaultAvatar}
                  alt="User Name"
                  width="50"
                  height="50"
                  className="rounded-circle"
                />
              </div>
              <div className="col-11">
                <StarRatings
                  rating={review?.rating}
                  starRatedColor="#ffb829"
                  numberOfStars={5}
                  name="rating"
                  starDimension="22px"
                  starSpacing="1px"
                />
                <p className="review_user">by {user?.name}</p>
                <p className="review_comment">{review?.comment}</p>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
}
