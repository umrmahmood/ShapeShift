// import video from "../assets/3dp.mp4";
// import lg from "../assets/SS-logo.jpg"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Main = () => {
	return (
		<>
			{/* <div className="video-container">
			
			<div className="fullscreen-video">
			<img src={lg} alt="" />
			</div>
			
			<div className="overlay"></div>
		</div> */}

			<div class="border-0 bd-example m-0 border-0 overlay">
				<div id="carouselExampleIndicators" class="carousel slide" >
					<div class="carousel-indicators">
						<button
							type="button"
							data-bs-target="#carouselExampleIndicators"
							data-bs-slide-to="0"
							class=""
							aria-label="Slide 1"
						></button>
						<button
							type="button"
							data-bs-target="#carouselExampleIndicators"
							data-bs-slide-to="1"
							aria-label="Slide 2"
							class=""
						></button>
						<button
							type="button"
							data-bs-target="#carouselExampleIndicators"
							data-bs-slide-to="2"
							aria-label="Slide 3"
							class="active"
							aria-current="true"
						></button>
					</div>
					<div class="carousel-inner">
						<div class="carousel-item">
							<svg
								class="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
								width="800"
								height="950"
								xmlns="http://www.w3.org/2000/svg"
								role="img"
								aria-label="Placeholder: First slide"
								preserveAspectRatio="xMidYMid slice"
								focusable="false"
							>
								<title>Placeholder</title>
								<rect width="100%" height="100%" fill="#777"></rect>
								<text x="50%" y="50%" fill="#555" dy=".3em">
									First slide
								</text>
							</svg>
						</div>
						<div class="carousel-item">
							<svg
								class="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
								width="800"
								height="950"
								xmlns="http://www.w3.org/2000/svg"
								role="img"
								aria-label="Placeholder: Second slide"
								preserveAspectRatio="xMidYMid slice"
								focusable="false"
							>
								<title>Placeholder</title>
								<rect width="100%" height="100%" fill="#666"></rect>
								<text x="50%" y="50%" fill="#444" dy=".3em">
									Second slide
								</text>
							</svg>
						</div>
						<div class="carousel-item active">
							<svg
								class="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
								width="800"
								height="950"
								xmlns="http://www.w3.org/2000/svg"
								role="img"
								aria-label="Placeholder: Third slide"
								preserveAspectRatio="xMidYMid slice"
								focusable="false"
							>
								<title>Placeholder</title>
								<rect width="100%" height="100%" fill="#555"></rect>
								<text x="50%" y="50%" fill="#333" dy=".3em">
									Third slide
								</text>
							</svg>
						</div>
					</div>
					<button
						class="carousel-control-prev"
						type="button"
						data-bs-target="#carouselExampleIndicators"
						data-bs-slide="prev"
					>
						<span class="carousel-control-prev-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Previous</span>
					</button>
					<button
						class="carousel-control-next"
						type="button"
						data-bs-target="#carouselExampleIndicators"
						data-bs-slide="next"
					>
						<span class="carousel-control-next-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Next</span>
					</button>
				</div>
			</div>
			<div className="content">
				<h1>
					Imagine <br /> <span>Create</span> <br />
					<span className="color">Bring it to life</span>
				</h1>
				{/* Add Login and Guest login here*/}
			</div>
		</>
	);
};

export default Main;
