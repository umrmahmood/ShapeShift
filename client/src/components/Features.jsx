import design from '../assets/stl.jpg';
import discover from '../assets/discover2.jpg';
import printer from '../assets/printer.jpg';

const Features = () => {
	return (
		<>
			<div className="features">
				
				<div className="card-wrapper">
					<div className="card">
						<h3>Upload & Print Your Design</h3>
						<img src={design} alt="" height='300px'/>
						<p>
							Turn your ideas into reality by uploading your own 3D designs and
							finding a suitable printer to bring them to life.
						</p>
						<button className="feature-button">More</button>
					</div>
					<div className="card">
						<h3>Discover & SELL Designs</h3>
						<img src={discover} alt="" height='300px'/>
						<p>
							Explore our extensive library of pre-made 3D designs, ready for
							printing, curated for your creative projects.
						</p>
						<button className="feature-button">More</button>
					</div>
					<div className="card">
						<h3>Register Your 3D Printer</h3>
						<img src={printer} alt="" height='300px'/>
						<p>
							Join our community of makers and enthusiasts by registering your
							3D printer and contributing to the world
							of additive manufacturing.
						</p>
						<button className="feature-button">More</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Features;
