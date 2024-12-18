import { getProductDetails } from '@/redux/cmsSlice';
import { Box, Card, CardContent, Chip, Rating, Stack, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ProductDetails = () => {
    const router = useRouter();
    const { slug } = router.query;

    const { productDetails = {} } = useSelector((x) => x?.Cms);
    const dispatch = useDispatch();

    useEffect(() => {
        if (slug) {
            dispatch(getProductDetails(slug));
        }
    }, [slug, dispatch]);

    if (!productDetails || Object.keys(productDetails).length === 0) {
        return <Typography>Loading product details...</Typography>;
    }

    return (
        <Box sx={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <Card>
                <Box sx={{ marginBottom: '16px' }}>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        spaceBetween={10}
                        slidesPerView={1}
                        style={{ width: '100%', height: '300px' }}
                    >
                        {(productDetails.images || []).map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={image}
                                    alt={`Product image ${index + 1}`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        borderRadius: '4px',
                                    }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>

                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {productDetails.title}
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{ marginBottom: '16px' }}
                    >
                        <Rating value={productDetails.rating || 0} precision={0.1} readOnly />
                        <Typography variant="body2">
                            ({(productDetails.rating || 0).toFixed(1)} rating)
                        </Typography>
                    </Stack>

                    <Typography variant="body1" gutterBottom>
                        {productDetails.description}
                    </Typography>

                    <Typography variant="h6" sx={{ marginBottom: '8px' }}>
                        Price: ${productDetails.price?.toFixed(2) || '0.00'}
                    </Typography>

                    <Box sx={{ marginBottom: '16px' }}>
                        {(productDetails.tags || []).map((tag, index) => (
                            <Chip key={index} label={tag} sx={{ marginRight: '8px', marginBottom: '8px' }} />
                        ))}
                    </Box>

                    <Typography variant="h6" sx={{ marginTop: '16px', marginBottom: '8px' }}>
                        Reviews:
                    </Typography>
                    {(productDetails.reviews || []).length > 0 ? (
                        (productDetails.reviews || []).map((review, index) => (
                            <Box key={index} sx={{ marginBottom: '8px' }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                    {review.reviewerName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {review.comment}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {new Date(review.date).toLocaleDateString()}
                                </Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body2">No reviews available</Typography>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default ProductDetails;
