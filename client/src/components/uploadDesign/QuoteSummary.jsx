import "../../styling/quoteSummary.css";
const QuoteSummary = ({ material, color, resolution, resistance }) => {
	return (
		<div className="quote-container">
			<h2>Your Quote has been sent successfully!</h2>
			<div className="quote-item">
				<div>File</div>
				<div>Dummy File</div>
			</div>
			<div className="quote-item">
				<div>Quantity</div>
				<div>5</div>
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
