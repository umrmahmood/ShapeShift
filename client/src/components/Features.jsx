import '../styling/features.css'

import { Link } from 'react-router-dom';
import design from '../assets/stl.jpg';
import discover from '../assets/discover2.jpg';
import printer from '../assets/shop.jpg';

const Features = () => {
	return (
		<>
			<div className="features">
				
				<div className="card-wrapper">
				<Link className='features-link' to="/config">
					<div className="card">
						<h3>Upload & Print Your Design</h3>
						<img src={design} alt="" height='300px'/>
						
						<p>
							Turn your ideas into reality by uploading your own 3D designs and
							finding a suitable printer to bring them to life.
						</p>
						<button className="feature-button">More</button>
					</div>
					</Link>
					<div className="card">
						<h3>Discover & SELL Designs</h3>
						<img src={discover} alt="" height='300px'/>
						<p>
							Explore our extensive library of pre-made 3D designs, ready for
							printing, curated for your creative projects.
						</p>
						<button className="feature-button">More</button>
					</div>
					<Link className='features-link' to="/openshop">
					<div className="card">
						<h3>Register Your shop today</h3>
						<img src={printer} alt="" height='300px'/>
						<p>
							Join our community of makers and enthusiasts by registering your
							3D printer and contributing to the world
							of additive manufacturing.
						</p>
						<button className="feature-button">More</button>
					</div>
					</Link>
				</div>
			</div>
		</>
	);
};

export default Features;
