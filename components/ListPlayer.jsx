import React from "react";
import { useState, useEffect, useRef } from "react";
import Stack from "@mui/material/Stack";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Container from "@mui/material/Container"
import { useTheme } from '@mui/material/styles';

export default function Player({trackList}) {
    const theme = useTheme();
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [sliderPosition, setSliderPosition] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [volumePosition, setVolumePosition] = useState(100);
    const [duration, setDuration] = useState(0);
    const audio = useRef(null);


    const handleVolumeOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleVolumeClose = () => {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'volumeController-popover' : undefined;

    const handleVolumePositionChange = (event, newValue) => {
        setVolumePosition(newValue);
        setVolume(newValue);
        
      };

    function setVolume(newValue) {
        
        audio.current.volume = (newValue / 100.0);
    }

    const handlePlaybackPositionChange = (event, value) => {

        audio.current.currentTime = value;
      };

    const onPlayPause = () => {
        isPlaying ? onPause() : onPlay();

    }

    const onPlay = () => {

        setIsPlaying(true);
    }

    const onPause = () => {

        setIsPlaying(false);
    }

    const handleTrackListItemClick = (event, newIndex) => {
      let wasPlaying = isPlaying;
      audio.current.pause();
      setIsPlaying(false);
      setIndex(newIndex);

      audio.current = new Audio(trackList[index].src);
      audio.current.onloadeddata = () => {
          setDuration(audio.current.duration);
      }
      if (wasPlaying) {
        setIsPlaying(true);

      }
      
    };

    useEffect(() => {
        audio.current = new Audio(trackList[index].src);
        audio.current.onloadeddata = () => {
            setDuration(audio.current.duration);
        }
      }, []);

    useEffect(() => {
      if (isPlaying) {
        audio.current.play();
      } else {
        audio.current.pause();
      }
    }, [isPlaying, index]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSliderPosition(audio.current.currentTime);

        }, 300);
         return () => clearInterval(interval);
    }, [sliderPosition]);


    return (


        <div ref={audio}>
            <Container
                align="center"
                sx={{
                    pt: 2
                }}
            >
                <Typography variant="h5">
                    <p>title placeholder</p>
                </Typography>
            </Container>
            <Stack direction="row" alignItems="center" spacing={1}>
                <Box
                sx={{
                    pl:3
                }}>
                    <IconButton
                        aria-describedby={id}
                        veriant="contained"
                        onClick={handleVolumeOpen}    
                    >
                        <VolumeUpIcon />
                    </IconButton>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleVolumeClose}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                        }}
                    >
                        <Slider
                            min={0}
                            max={100}
                            value={volumePosition}
                            onChange={handleVolumePositionChange}
                            color="error"
                        />
                    </Popover>
                </Box>
                <Box sx={{ width: '100vw' }}>
                    <Slider
                        aria-label="Trackrogress"
                        defaultValue={0}
                        min={0}
                        max={duration}
                        value={sliderPosition}
                        step={1}
                        onChange={handlePlaybackPositionChange}
                        color="error"
                        size="large"
                    />
                    </Box>
                    <Box
                    sx={{
                        pr:3
                    }}>
                    {isPlaying ? (
                    <IconButton
                        onClick={onPlayPause}
                    >
                        <PauseCircleOutlineIcon fontSize="large" />
                    </IconButton>
                    ) : (
                    <IconButton
                        onClick={onPlayPause}
                    >
                        <PlayCircleOutlineIcon fontSize="large" />
                    </IconButton>
                    )}
                </Box>
            </Stack>
            <List >
                <ListItemButton
                    selected={index === 0}
                    onClick={(event) => handleTrackListItemClick(event, 0)}
                >
                    <ListItemText primary={trackList[0].title} />
                </ListItemButton>
                <ListItemButton
                    selected={index === 1}
                    onClick={(event) => handleTrackListItemClick(event, 1)}
                >
                    <ListItemText primary={trackList[1].title} />
                </ListItemButton>
                <ListItemButton
                    selected={index === 2}
                    onClick={(event) => handleTrackListItemClick(event, 2)}
                >
                    <ListItemText primary={trackList[2].title} />
                </ListItemButton>
            </List>
            </div>

    )
}