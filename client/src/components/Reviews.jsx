import React from "react";
import "../styling/review.css";

const reviews = [
	{
		id: 1,
		name: "Walter Fox",
		review:
			"This shop is fantastic! They items are perfect and provide great aesthetics.",
		rating: 5,
	},
	{
		id: 2,
		name: "Jane Smith",
		review:
			"I love every feature of their products. They made my overall experience so much better.",
		rating: 4,
	},
	{
		id: 3,
		name: "Emily Johnson",
		review:
			"Beautiful and unique shop.",
		rating: 4,
	},
	{
		id: 4,
		name: "Michael Brown",
		review:
			"Good value for the price. The only downside is delivery time.",
		rating: 3,
	},
];

const Review = () => {
	return (
		<>
			<h2 className="review-heading">Customer Reviews</h2>
			<div className="review-list">
				{reviews.map((review) => (
					<div key={review.id} className="review-item">
						<h3 className="review-name">{review.name}</h3>
						<p className="review-para">{review.review}</p>
						<div className="review-rating">Rating: {review.rating} / 5</div>
					</div>
				))}
			</div>
		</>
	);
};

export default Review;
