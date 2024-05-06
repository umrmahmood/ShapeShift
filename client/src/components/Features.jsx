import "../styling/features.css";

import { Link } from "react-router-dom";
import design from "../assets/stl.jpg";
import discover from "../assets/discover2.jpg";
import printer from "../assets/shop.jpg";

const Features = () => {
	return (
		<>
			<div className="features">
				<div className="feat-card-wrapper">
					<Link className="features-link" to="/config">
						<div className="feat-card">
							<h3>Upload & Print Your Design</h3>
							<div className="feat-card-inner">
								<img src={design} alt="" />

								<p>
									Turn your ideas into reality by uploading your own 3D designs
									and finding a suitable printer to bring them to life. Also,
									get a free quote from our sellers.
								</p>
							</div>
						</div>
					</Link>
					<Link className="features-link" to="/home">
						<div className="feat-card">
							<h3>Visit our Exquisite market place</h3>
							<div className="feat-card-inner">
								<img src={discover} alt="" />
								<p>
									Explore our market place for 3d printed products. Sell and buy
									from a vast range of products. Sell and buy from a vast range
									of products.
								</p>
							</div>
						</div>
					</Link>
					<Link className="features-link" to="/openshop">
						<div className="feat-card">
							<h3>Register Your shop today</h3>
							<div className="feat-card-inner">
								<img src={printer} alt="" />
								<p>
									Join our community of makers and enthusiasts by registering
									your 3D printer and contributing to the world of additive
									manufacturing.
								</p>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</>
	);
};

export default Features;
