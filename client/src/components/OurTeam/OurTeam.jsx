import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebook,
	faInstagram,
	faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

import "../../styling/OurTeam.css";
import umer from "../../assets/team/umer.png";
import eugen from "../../assets/team/eugen.png";
import nadia from "../../assets/team/nadia.png";
import paul from "../../assets/team/paul.png";

const OurTeam = () => {
	return (
		<>
			<div className="team-outter-container">
				<h1 className="meet-team-head">Our Team</h1>
				<p className="meet-team-para">Meet our talented team at ShapeShift </p>

				<div className="team-card-outermost-wrapper">
					<div className="team-card-outer">
						<div className="team-card-bg">
							<div className="team-card-img-container">
								<img src={eugen} alt="profilepic" />
							</div>
						</div>
						<div className="team-card-description">
							<h2>Eugen Taranowki</h2>
							<p>Full-stack Developer</p>
							<p>
								Eugen is an experienced web developer with proficiency in both
								front-end and back-end development. He excels at designing
								dynamic, responsive web applications using HTML, CSS,
								JavaScript, and React. On the server side, Eugen is adept with
								Node.js and database management systems like MongoDB. His
								diverse skill set allows him to create seamless, full-stack
								solutions that improve user experience and functionality. He has
								a vast knowlege of various technologies.
							</p>
							<div className="team-card-icons">
								<li>
									<a href="https://www.facebook.com" target="blank">
										<FontAwesomeIcon icon={faFacebook} />
									</a>
								</li>
								<li>
									<a href="https://www.instagram.com" target="blank">
										<FontAwesomeIcon icon={faInstagram} />
									</a>
								</li>
								<li>
									<a href="https://twitter.com" target="blank">
										<FontAwesomeIcon icon={faXTwitter} />
									</a>
								</li>
							</div>
						</div>
					</div>

					<div className="team-card-outer">
						<div className="team-card-bg">
							<div className="team-card-img-container">
								<img src={umer} alt="profilepic" />
							</div>
						</div>
						<div className="team-card-description">
							<h2>Umer Mahmood</h2>
							<p>Full-stack Developer</p>
							<p>
								Umer is a seasoned web developer with expertise in both
								front-end and back-end development. He excels in creating
								dynamic, responsive web applications using HTML, CSS,
								JavaScript, and frameworks like React. On the server side, Umer
								is proficient with Node.js, and database management systems such
								as MongoDB. His comprehensive skill set enables him to build
								seamless, full-stack solutions that enhance user experience and
								functionality.
							</p>
							<div className="team-card-icons">
								<li>
									<a href="https://www.facebook.com" target="blank">
										<FontAwesomeIcon icon={faFacebook} />
									</a>
								</li>
								<li>
									<a href="https://www.instagram.com" target="blank">
										<FontAwesomeIcon icon={faInstagram} />
									</a>
								</li>
								<li>
									<a href="https://twitter.com" target="blank">
										<FontAwesomeIcon icon={faXTwitter} />
									</a>
								</li>
							</div>
						</div>
					</div>

					<div className="team-card-outer">
						<div className="team-card-bg">
							<div className="team-card-img-container nadia-adj">
								<img src={nadia} alt="profilepic" />
							</div>
						</div>
						<div className="team-card-description">
							<h2>Nadia Vasylenko</h2>
							<p>Full-stack Developer</p>
							<p>
								Nadia is an experienced web developer skilled in both front-end
								and back-end development. She excels in crafting dynamic,
								responsive web applications with HTML, CSS, JavaScript, and
								frameworks like React. On the server side, Nadia is proficient
								in Node.js and database management systems like MongoDB. Her
								versatile skill set allows her to create seamless, full-stack
								solutions that significantly enhance user experience and
								functionality.
							</p>
							<div className="team-card-icons">
								<li>
									<a href="https://www.facebook.com" target="blank">
										<FontAwesomeIcon icon={faFacebook} />
									</a>
								</li>
								<li>
									<a href="https://www.instagram.com" target="blank">
										<FontAwesomeIcon icon={faInstagram} />
									</a>
								</li>
								<li>
									<a href="https://twitter.com" target="blank">
										<FontAwesomeIcon icon={faXTwitter} />
									</a>
								</li>
							</div>
						</div>
					</div>

					<div className="team-card-outer">
						<div className="team-card-bg">
							<div className="team-card-img-container paul-adj">
								<img src={paul} alt="profilepic" />
							</div>
						</div>
						<div className="team-card-description">
							<h2>Paul JP. Jacobs</h2>
							<p>Full-stack Developer</p>
							<p>
								Paul is a skilled web developer with expertise in both front-end
								and back-end development. He excels at building dynamic,
								responsive web applications using HTML, CSS, JavaScript, and
								frameworks like React. On the server side, Paul is proficient
								with Node.js and database management systems such as MongoDB.
								His versatile skill set enables him to develop seamless,
								full-stack solutions that enhance user experience and
								functionality.
							</p>
							<div className="team-card-icons">
								<li>
									<a href="https://www.facebook.com" target="blank">
										<FontAwesomeIcon icon={faFacebook} />
									</a>
								</li>
								<li>
									<a href="https://www.instagram.com" target="blank">
										<FontAwesomeIcon icon={faInstagram} />
									</a>
								</li>
								<li>
									<a href="https://twitter.com" target="blank">
										<FontAwesomeIcon icon={faXTwitter} />
									</a>
								</li>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default OurTeam;
