import "../../styling/quoteSummary.css";
const QuoteSummary = ({ fileName, material, color, resolution, resistance, quantity }) => {
	return (
		<div className="quote-container">
			<h2>Estimated Cost Based on your selection</h2>
			<div className="quote-item">
				<div>File Name</div>
				<div>{fileName}</div>
			</div>
			<div className="quote-item">
				<div>Quantity</div>
				<div>{quantity}</div>
			</div>
			<div className="quote-item">
				<div>Material</div>
				<div>{material}</div>
			</div>

			<div className="quote-item">
				<div>Color</div>
				<div>{color}</div>
			</div>

			<div className="quote-item">
				<div>Resolution</div>
				<div>{resolution}</div>
			</div>

			<div className="quote-item">
				<div>Resistance</div>
				<div>{resistance}</div>
			</div>
		</div>
	);
};

export default QuoteSummary;
