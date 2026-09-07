import React from "react";
import { Image } from "cloudinary-react";
import { cloudName } from "../../utils/Config";
import StarRatingDisplay from "../common/StarRatingDisplay";
import MiniMap from "./MiniMap";
/**
 * presentations component to display business items
 * @param {*} business - single business details
 * @param {*} onView - function to to fetch single business the redirect to profile
 * @param {*} index - every item requires a unique index
 */
const BusinessItem = ({ business, onView, index }) => {
  return (
    <div key={index} className="col-sm-6 col-xs-12">
      <div className="card card-margin border-info">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6 col-xs-12">
              <Image
                cloudName={cloudName}
                publicId={business.logo}
                width="195"
                crop="scale"
              />
            </div>
            <div className="col-sm-6 col-xs-12">
              <h5 className="card-title text-capitalize">{business.name}</h5>
              <StarRatingDisplay
                rating={business.avg_rating}
                reviewCount={business.review_count}
              />
              <p className="card-text">{business.description}</p>
              <p>
                Location: <span className="text-info">{business.location}</span>
                <br />
              </p>
              <p>
                Category: <span className="text-info">{business.category}</span>
                <br />
              </p>
              <MiniMap
                latitude={business.latitude}
                longitude={business.longitude}
              />
              <a
                className="btn btn-info"
                data-id={business.id}
                onClick={onView}
                href=""
              >
                View Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessItem;
