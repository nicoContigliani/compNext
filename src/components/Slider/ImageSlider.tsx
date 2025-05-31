'use client'

import { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

interface SliderItem {
  image: string;
  title: string;
  description?: string;
}

interface ImageSliderProps {
  items: SliderItem[];
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
}

export default function ImageSlider({
  items,
  autoPlay = true,
  interval = 5000,
  showControls = true,
  showIndicators = true
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navegación
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;

    const slideInterval = setInterval(() => {
      goToNext();
    }, interval);

    return () => clearInterval(slideInterval);
  }, [autoPlay, interval]);

  return (
    <Box sx={{ 
      position: 'relative', 
      width: '100%',
      height: { xs: '300px', md: '500px' },
      overflow: 'hidden',
      borderRadius: 1
    }}>
      {/* Slides */}
      {items.map((item, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${item.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            display: 'flex',
            alignItems: 'flex-end'
          }}
        >
          {/* Overlay de texto */}
          <Box sx={{
            width: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            p: 3,
            textAlign: 'center'
          }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
              {item.title}
            </Typography>
            {item.description && (
              <Typography variant="body1" sx={{ mt: 1 }}>
                {item.description}
              </Typography>
            )}
          </Box>
        </Box>
      ))}

      {/* Controles de navegación */}
      {showControls && (
        <>
          <IconButton
            onClick={goToPrevious}
            sx={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.7)'
              }
            }}
          >
            <KeyboardArrowLeft fontSize="large" />
          </IconButton>
          <IconButton
            onClick={goToNext}
            sx={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.7)'
              }
            }}
          >
            <KeyboardArrowRight fontSize="large" />
          </IconButton>
        </>
      )}

      {/* Indicadores */}
      {showIndicators && (
        <Box sx={{
          position: 'absolute',
          bottom: 16,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: 1
        }}>
          {items.map((_, index) => (
            <IconButton
              key={index}
              size="small"
              onClick={() => goToSlide(index)}
              sx={{ color: 'white' }}
            >
              {index === currentIndex ? (
                <CircleIcon fontSize="small" />
              ) : (
                <CircleOutlinedIcon fontSize="small" />
              )}
            </IconButton>
          ))}
        </Box>
      )}
    </Box>
  );
}