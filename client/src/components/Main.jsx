import rings from "../assets/final1.jpg";
import headphones from "../assets/final2.jpg";
import lamp from "../assets/final6.jpg";
import clock from "../assets/final4.jpg";
import plants from "../assets/final7.jpg";
import necklace from "../assets/final8.jpg";
import lights from "../assets/final9.jpg";
import cluchbag from "../assets/final10.jpg";
import handbag from "../assets/final11.jpg";
import Features from "./Features";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import '../styling/main.css';


const Main = () => {
	return (
		<>
		<div className="main-border"></div>
			<div class="m-0 border-0 bd-example m-0 border-0 overlay">
				<div
					id="carouselExampleAutoplaying"
					class="carousel slide"
					data-bs-ride="carousel"
				>
					<div class="carousel-inner">
						<div class="carousel-item active img-container">
						<p className="para">
								Crafted in layers, <br /> perfected in detail <br />
								<span className="color hashtag">
									#Rings #3DPrintedWonder #MustHave #FashionFinds
								</span>
							</p>
							<img class="d-block w-100" src={rings} alt="First slide" />
						</div>
						<div class="carousel-item img-container">
							<p className="para">
							From digital dreams to, <br />  tangible treasures <br />
								<span className="color hashtag">
									 #Handbags #Fashionista #PrintedPerfection
								</span>
							</p>
							<img class="d-block w-100" src={handbag} alt="First slide" />
						</div>
						<div class="carousel-item">
							<p className="para">
							Sculpted by technology,  <br /> admired by all. <br />
								<span className="color hashtag">
									#Headphones #BuyNow #TrendAlert #FutureCraft 
								</span>
							</p>
							<img class="d-block w-100" src={headphones} alt="First slide" />
						</div>

						<div class="carousel-item">
							<p className="para">
								Crafted in layers, <br /> perfected in detail <br />
								<span className="color hashtag">
									#Clock #StyleInsp #EveryDayMoments #BuyToday
								</span>
							</p>
							<img class="d-block w-100" src={clock} alt="First slide" />
						</div>
						<div class="carousel-item">
							<p className="para">
							Precision meets creativity  <br /> in every layer.  <br />
								<span className="color hashtag">
									#Vases #BioMaterial #PrintedArtistry #LiveAuthentic
								</span>
							</p>
							<img class="d-block w-100" src={plants} alt="First slide" />
						</div>
						<div class="carousel-item">
						<p className="para">
						Bringing imagination to life, <br /> one layer at a time.  <br />
								<span className="color hashtag">
									#Necklace #ShopTillYouDrop #Jewlery #PrintedMagic 
								</span>
							</p>
							<img class="d-block w-100" src={necklace} alt="First slide" />
							
						</div>
						<div class="carousel-item">
						<p className="para">
						Where imagination meets <br />craftsmanship, <br /> 3D printing shines. <br />
								<span className="color hashtag">
									#Lamps #LiveAuthentic #RetailLove #LifeWellLived
								</span>
							</p>
							<img class="d-block w-100" src={lights} alt="First slide" />
						</div>
						<div class="carousel-item">
						<p className="para">
						Innovation etched into reality, <br /> one layer at a time. <br />
								<span className="color hashtag">
								#CluchBags #TreatYourself #BuyNow #FashionObsessed
								</span>
							</p>
							<img class="d-block w-100" src={cluchbag} alt="First slide" />
						</div>
						<div class="carousel-item">
						<p className="para">
						Transforming concepts into, <br /> tangible marvels, effortlessly. <br />
								<span className="color hashtag">
								#Lighting #HomeSweetHome #PrintedElegance #SimplePleasures
								</span>
							</p>
							<img class="d-block w-100" src={lamp} alt="First slide" />
						</div>
					</div>
					<button
						class="carousel-control-prev"
						type="button"
						data-bs-target="#carouselExampleAutoplaying"
						data-bs-slide="prev"
					>
						<span class="carousel-control-prev-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Previous</span>
					</button>
					<button
						class="carousel-control-next"
						type="button"
						data-bs-target="#carouselExampleAutoplaying"
						data-bs-slide="next"
					>
						<span class="carousel-control-next-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Next</span>
					</button>
				</div>
			</div>

			<button className="mainexplore-button">EXPLORE NOW</button>

			<Features/>
		</>
	);
};

export default Main;
