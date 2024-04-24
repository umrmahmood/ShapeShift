
import "../../styling/material.css";

import ABS from "../../assets/materials/abs.jpg";
import PLA from "../../assets/materials/pla.jpg";
import Flexible from "../../assets/materials/flexible.jpg";
import HIPS from "../../assets/materials/HIPS.jpg";
import Nylon from "../../assets/materials/Nylon.jpg";
import CarbonFiberFilled from "../../assets/materials/carbonfiber.jpg";
import ASA from "../../assets/materials/ASA.jpg";
import MetalFilled from "../../assets/materials/Metal.jpg";
import Polycarbonate from "../../assets/materials/polycarbonate.jpg";
import Polypropylene from "../../assets/materials/polyprop.jpg";
import WoodFilled from "../../assets/materials/woodfilled.jpg";
import PVA from "../../assets/materials/PVA.jpg";

const Material = ({selectedMaterial, handleMaterialChange}) => {
	
	const renderMaterialDescription = () => {
		switch (selectedMaterial) {
			case "ABS":
				return (
					<p>
						<h3>Overview</h3>
						ABS (Acrylonitrile Butadiene Styrene) is a popular material for 3D
						printing because it's tough, durable, and cheap. It's been used in
						3D printing for a long time, even for LEGO blocks! ABS can handle
						high temperatures without deforming, making it good for outdoor use.
						But it has a smell when printing, so use it in a well-ventilated
						area. Also, it shrinks as it cools, so controlling the printing
						temperature is important.
					</p>
				);
			case "PLA":
				return (
					<p>
						<h3>Overview</h3>
						PLA (Polylactic Acid) is a biodegradable thermoplastic made from
						renewable resources like corn starch or sugarcane. It's one of the
						most popular materials for 3D printing due to its ease of use, low
						cost, and minimal warping. PLA is odorless and doesn't require a
						heated bed, but it's not suitable for high-temperature applications.
					</p>
				);
			case "Flexible":
				return (
					<p>
						<h3>Overview</h3>
						Flexible filament, also known as TPU (Thermoplastic Polyurethane),
						is a rubber-like material that is highly flexible and elastic. It's
						used for printing objects that need to bend, stretch, or compress.
						Flexible filament is less rigid than ABS or PLA, making it ideal for
						printing things like phone cases, shoe insoles, or gaskets.
					</p>
				);
			case "HIPS":
				return (
					<p>
						<h3>Overview</h3>
						HIPS (High Impact Polystyrene) is a versatile material commonly used
						as a support material for ABS. It dissolves in d-Limonene, making it
						easy to remove from ABS prints. HIPS has good impact strength and is
						resistant to moisture, making it suitable for outdoor applications.
					</p>
				);
			case "Nylon":
				return (
					<p>
						<h3>Overview</h3>
						Nylon is a strong, durable, and flexible material used in a wide
						range of applications, including 3D printing. It has excellent
						mechanical properties, such as high tensile strength and heat
						resistance. Nylon filament is ideal for printing functional
						prototypes, tools, and parts requiring high strength and toughness.
					</p>
				);
			case "Carbon Fiber Filled":
				return (
					<p>
						<h3>Overview</h3>
						Carbon fiber filaments use tiny fibers mixed into a base material to
						make it stronger and stiffer. You can find them in popular filaments
						like PLA, PETG, Nylon, ABS, and Polycarbonate. These fibers make
						printed parts lighter and more stable in size. You'll need similar
						print settings to the base material, but these filaments can clog
						more easily and might need special equipment to avoid harming your
						printer.
					</p>
				);
			case "ASA":
				return (
					<p>
						<h3>Overview</h3>
						ASA, or Acrylic Styrene Acrylonitrile, is a 3D printing plastic
						similar to ABS but with better UV resistance. It's tougher, handles
						higher temperatures, but it's trickier to print. People use it
						outdoors because it resists UV and tough weather. But like ABS, it
						still warps and emits fumes when printing, which can be harmful
						because of the Styrene in it.
					</p>
				);
			case "Metal Filled":
				return (
					<p>
						<h3>Overview</h3>
						Metal-filled filaments have fine metal powder like Copper, Bronze,
						Brass, or Stainless Steel mixed in. The amount of metal can vary.
						They're heavier than regular plastics, so printed parts weigh more
						even with the same settings and material. They're abrasive, wearing
						down standard nozzles quickly, so use a wear-resistant one. Some
						filaments just look metallic but don't have metal powder, so they
						don't have the same weight or feel. This article covers filaments
						with actual metal powder for a realistic metallic effect.
					</p>
				);
			case "Polycarbonate":
				return (
					<p>
						<h3>Overview</h3>
						Polycarbonate (PC) is super strong, ideal for tough environments and
						engineering. It can handle high heat and impacts well, with a high
						glass transition temp of 150°C. It stays strong up to that temp,
						useful for high-heat jobs. PC can bend without breaking, useful for
						flexible applications. Most PC filaments have additives for lower
						printing temps, so check your brand's guidelines.
					</p>
				);
			case "Polypropylene":
				return (
					<p>
						<h3>Overview</h3>
						Polypropylene is a lightweight material often used in storage and
						packaging. Its semi-crystalline structure makes 3D printed parts
						warp heavily upon cooling, which can be challenging. Despite this,
						it's tough and resistant to fatigue, great for low-strength
						applications like living hinges or straps. Some blends offer
						improved toughness for practical use. This guide covers various
						polypropylene filaments for 3D printing.
					</p>
				);
			case "Wood Filled":
				return (
					<p>
						<h3>Overview</h3>
						Wood-based filaments blend PLA with wood dust and derivatives like
						cork, usually around 30% wood particles. They give prints a real
						wood look. They're less abrasive than other composites like carbon
						or metal-filled filaments because wood particles are softer. Some
						wood-like filaments just have coloring, no actual wood, so they look
						different. This guide focuses on wood-infused PLA, but tips can
						apply to other wood-based filaments too.
					</p>
				);
			case "PVA":
				return (
					<p>
						<h3>Overview</h3>
						PVA, or Polyvinyl Alcohol, is a soft and biodegradable polymer that
						dissolves in water. It's great for 3D printing support structures,
						especially for complex shapes or partially enclosed cavities. PVA
						supports can be dissolved in warm water, making removal easy. It can
						also be used for quick prototypes.
					</p>
				);
			default:
				return null;
		}
	};

	return (
		<>
		<h1>Configuration</h1> 
			<div className="wrapper-outter">
				<h2>Please select material</h2>
				<div className="material-intro">
					<select
						className="dropdown"
						value={selectedMaterial}
						onChange={handleMaterialChange}
					>
						<option value="ABS">ABS</option>
						<option value="PLA">PLA</option>
						<option value="Flexible">Flexible</option>
						<option value="HIPS">HIPS</option>
						<option value="Nylon">Nylon</option>
						<option value="Carbon Fiber Filled">Carbon Fiber Filled</option>
						<option value="ASA">ASA</option>
						<option value="Metal Filled">Metal Filled</option>
						<option value="Polypropylene">Polypropylene</option>
						<option value="Polycarbonate">Polycarbonate</option>
						<option value="Wood Filled">Wood Filled</option>
						<option value="PVA">PVA</option>
					</select>
					<h3>{selectedMaterial}</h3>
				</div>

				<div>
					<div className="material-container">
						<div className="material-picture">
							<img
								src={
									selectedMaterial === "ABS"
										? ABS
										: selectedMaterial === "PLA"
										? PLA
										: selectedMaterial === "Flexible"
										? Flexible
										: selectedMaterial === "HIPS"
										? HIPS
										: selectedMaterial === "Nylon"
										? Nylon
										: selectedMaterial === "Carbon Fiber Filled"
										? CarbonFiberFilled
										: selectedMaterial === "ASA"
										? ASA
										: selectedMaterial === "Metal Filled"
										? MetalFilled
										: selectedMaterial === "Polycarbonate"
										? Polycarbonate
										: selectedMaterial === "Polypropylene"
										? Polypropylene
										: selectedMaterial === "Wood Filled"
										? WoodFilled
										: selectedMaterial === "PVA"
										? PVA
										: null
								}
								alt=""
								width="200"
								height="160"
							/>
						</div>

						<div className="description-wrapper">
							<div className="material-description">
								{renderMaterialDescription()}
							</div>
							<div className="prosandcons">
								<div className="pros">
									<h3>Pros</h3>
									<ul>
										{selectedMaterial === "ABS" && (
											<>
												<li>Low cost</li>
												<li>Good impact and wear resistance</li>
												<li>
													Less oozing and stringing gives models smoother finish
												</li>
												<li>Good heat resistance</li>
											</>
										)}
										{selectedMaterial === "PLA" && (
											<>
												<li>Biodegradable and environmentally friendly</li>
												<li>Low warping and shrinkage</li>
												<li>Odorless</li>
												<li>Easy to print with</li>
											</>
										)}
										{selectedMaterial === "Flexible" && (
											<>
												<li>Highly flexible and elastic</li>
												<li>Durable</li>
												<li>
													Great for printing objects requiring flexibility
												</li>
												<li>Soft touch finish</li>
											</>
										)}
										{selectedMaterial === "HIPS" && (
											<>
												<li>Low cost</li>
												<li>Impact and water resistant</li>
												<li>Lightweight</li>
												<li>Dissolvable by d-Limonene</li>
											</>
										)}
										{selectedMaterial === "Nylon" && (
											<>
												<li>Tough and partially flexible</li>
												<li>High impact resistance</li>
												<li>No unpleasant odor while printing</li>
												<li>Good abrasion resistance</li>
											</>
										)}
										{selectedMaterial === "Carbon Fiber Filled" && (
											<>
												<li>Increased strength and stiffness</li>
												<li>Very good dimensional stability</li>
												<li>Lightweight</li>
											</>
										)}
										{selectedMaterial === "ASA" && (
											<>
												<li>Strong UV resistance</li>
												<li>High impact and wear resistance</li>
												<li>High glass transition temperature</li>
											</>
										)}
										{selectedMaterial === "Metal Filled" && (
											<>
												<li>Metallic finish is aesthetically appealing</li>
												<li>Does not need high-temperature extruder</li>
												<li>Heavier than standard filaments</li>
											</>
										)}
										{selectedMaterial === "Polypropylene" && (
											<>
												<li>Good impact and fatigue resistance</li>
												<li>Good heat resistance</li>
												<li>Smooth surface finish</li>
											</>
										)}
										{selectedMaterial === "Polycarbonate" && (
											<>
												<li>Impact resistant</li>
												<li>High heat resistance</li>
												<li>Naturally transparent</li>
												<li>Bendable without breaking</li>
											</>
										)}
										{selectedMaterial === "Wood Filled" && (
											<>
												<li>Wood-textured finish is aesthetically appealing</li>
												<li>
													Does not need any expensive wear-resistant nozzles
												</li>
												<li>Aromatic and pleasant smelling</li>
											</>
										)}
										{selectedMaterial === "PVA" && (
											<>
												<li>Great water dissolvable support material</li>
												<li>No special solvents required</li>
												<li>No additional hardware required</li>
											</>
										)}
									</ul>
								</div>
								<div className="cons">
									<h3>Cons</h3>
									<ul>
										{selectedMaterial === "ABS" && (
											<>
												<li>Heavy warping</li>
												<li>Needs heated bed or heated chamber</li>
												<li>Produces a pungent odor while printing</li>
												<li>
													Parts tend to shrink leading to dimensional inaccuracy
												</li>
											</>
										)}
										{selectedMaterial === "PLA" && (
											<>
												<li>Not suitable for high-temperature applications</li>
												<li>Brittle</li>
												<li>May degrade over time if exposed to moisture</li>
												<li>Less impact resistant compared to ABS</li>
											</>
										)}
										{selectedMaterial === "Flexible" && (
											<>
												<li>May require specialized extruder or settings</li>
												<li>
													Less precise details compared to rigid filaments
												</li>
												<li>Can be challenging to print with</li>
												<li>May have issues with retraction and stringing</li>
											</>
										)}

										{selectedMaterial === "HIPS" && (
											<>
												<li>Heated bed required</li>
												<li>Heated chamber recommended</li>
												<li>High printing temperature</li>
												<li>Ventilation required</li>
											</>
										)}
										{selectedMaterial === "Nylon" && (
											<>
												<li>Prone to Warping</li>
												<li>
													Air-tight storage required to prevent water absorption
												</li>
												<li>
													Improperly dried filaments can cause printing defects
												</li>
												<li>Not suitable for moist and humid environments</li>
											</>
										)}
										{selectedMaterial === "Carbon Fiber Filled" && (
											<>
												<li>Abrasive and requires hardened steel nozzle</li>
												<li>Increased oozing while printing</li>
												<li>Increased brittleness of filament</li>
												<li>Higher tendency to clog</li>
											</>
										)}
										{selectedMaterial === "ASA" && (
											<>
												<li>Expensive</li>
												<li>Requires higher extruder temperatures</li>
												<li>
													Requires ventilation due to potentially dangerous
													fumes
												</li>
											</>
										)}
										{selectedMaterial === "Metal Filled" && (
											<>
												<li>Requires a wear-resistant nozzle</li>
												<li>Printed parts are very brittle</li>
												<li>Very poor bridging and overhangs</li>
												<li>Can cause partial clogs over time</li>
											</>
										)}
										{selectedMaterial === "Polypropylene" && (
											<>
												<li>Heavy warping</li>
												<li>Low strength</li>
												<li>Difficult to adhere to bed and other adhesives</li>
												<li>Expensive</li>
											</>
										)}
										{selectedMaterial === "Polycarbonate" && (
											<>
												<li>Requires very high print temperatures</li>
												<li>Prone to warping</li>
												<li>High tendency to ooze while printing</li>
												<li>
													Absorbs moisture from the air which can cause print
													defects
												</li>
											</>
										)}
										{selectedMaterial === "Wood Filled" && (
											<>
												<li>Prone to stringing</li>
												<li>
													Smaller nozzles can end up with partial clogs over
													time
												</li>
												<li>May require a larger size nozzle</li>
											</>
										)}
										{selectedMaterial === "PVA" && (
											<>
												<li>Moisture sensitive</li>
												<li>Airtight storage containers required</li>
												<li>
													Greater chances of clogging if the nozzle is left hot
													when not extruding
												</li>
												<li>Expensive</li>
											</>
										)}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Material;
