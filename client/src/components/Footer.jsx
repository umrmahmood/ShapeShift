import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebook,
	faInstagram,
	faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

import blogo from "../assets/butterf.png";

const Footer = () => {
	return (
		<>
			<div className="footer">
				<div>
					<a href="/">
						<img src={blogo} alt="logo" />
					</a>
					<p>Copyright Shapeshift 2024</p>
				</div>
				<div>
					<ul>
						<li>
							<a href="/">About</a>
						</li>
						<li>
							<a href="/">Jobs</a>
						</li>
						<li>
							<a href="/">Docs</a>
						</li>
					</ul>
				</div>
				<div>
					<ul>
						<li>
							<a href="/">Terms & Conditions</a>
						</li>
						<li>
							<a href="/">Privacy Policy</a>
						</li>
						<li>
							<a href="/">Cookie Policy</a>
						</li>
					</ul>
				</div>
				<div className="icons">
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
		</>
	);
};

export default Footer;
