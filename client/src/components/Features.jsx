import "../styling/features.css";

import { Link } from "react-router-dom";
import design from "../assets/stl.jpg";
import discover from "../assets/discover2.jpg";
import printer from "../assets/shop.jpg";
//import vase from "../assets/feature_pics4.jpg";
import vase from "../assets/feature_pics5.jpg";
import { jwtDecode } from "jwt-decode";

const Features = () => {
	const tokenFromLocalStorage = localStorage.getItem("shapeshiftkey");

	let haveShop = false;

	if (tokenFromLocalStorage) {
		const decodedToken = jwtDecode(tokenFromLocalStorage);

		// Access the payload to see if the member has a shop
		haveShop = decodedToken.membership.haveShop;
	}

	return (
		<>
			<div className="features">
				<div className="feat-card-wrapper">
					<Link className="features-link" to="/config">
						<div className="feat-card">
							<h3>Upload & get an estimate</h3>
							<div className="feat-card-inner">
								<img src={design} alt="" />

								<p>
									Turn your ideas into reality by uploading your own 3D designs
									and get a cost estimation. Find a suitable supplier to provide you with the physical product.
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

					{!haveShop ? (
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
					) : (
						<Link className="features-link" to="/">
							<div className="feat-card">
								<h3>Check out innovative 3D Designs</h3>
								<div className="feat-card-inner">
									<img src={vase} alt="" />
									<p>
										Check out these innovative 3D print designs that push the
										boundaries of creativity. Discover a world
										where imagination meets precision engineering.
									</p>
								</div>
							</div>
						</Link>
					)}
				</div>
			</div>
		</>
	);
};

export default Features;
