import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('token');

const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;
const reviewsUrl = `${API_URL}/reviews`;
const barriersReviewsUrl = `${API_URL}/barriersReviews`;

export async function createReview(ratingData) {
    if (!token) {
        throw new Error("No token found");
    }
    let reviewId = 0;
    await axios
        .post(reviewsUrl, ratingData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        })
        .then((res) => {
            reviewId = res.data.id;
        })
        .catch((err) => {
            if (err.response) {
                const { status, data } = err.response;
                console.error(`Error ${status}: ${data.message || 'An unknown error occurred.'}`);
                if (data.errors) {
                    const validationErrors = data.errors.map(error => ({
                        field: error.field,
                        message: error.message,
                    }));

                    console.error('Validation errors:', validationErrors);
                } else {
                    console.error(`Error message: ${data.message || 'An unknown error occurred.'}`);
                }
            } else {
                console.error('Login error:', err.message);
            }
        });
    return reviewId;
};

export async function createBarrierReviews(barriersReviews, reviewId) {
    if (!token) {
        throw new Error("No token found");
    }
    for (const barriersReview of barriersReviews) {
        console.log('barriersReview', barriersReview);

        const barrierRatingData = {
            barrierId: barriersReview.barrierId,
            reviewId: reviewId,
            reviews: barriersReview.rating,
        };

        try {
            const barrierReviewId = await createBarrierReview(barrierRatingData);
            console.log('barrierReviewId', barrierReviewId);
        } catch (error) {
            console.error('Error creating barrier review:', error);
        }
    }
}

export async function createBarrierReview(barrierRatingData) {

    let barrierReviewId = 0;
    await axios
        .post(barriersReviewsUrl, barrierRatingData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        })
        .then((res) => {
            barrierReviewId = res.data.id;
        })
        .catch((err) => {
            if (err.response) {
                const { status, data } = err.response;
                console.error(`Error ${status}: ${data.message || 'An unknown error occurred.'}`);
                if (data.errors) {
                    const validationErrors = data.errors.map(error => ({
                        field: error.field,
                        message: error.message,
                    }));

                    console.error('Validation errors:', validationErrors);
                } else {
                    console.error(`Error message: ${data.message || 'An unknown error occurred.'}`);
                }
            } else {
                console.error('Login error:', err.message);
            }
        });
    return barrierReviewId;
};