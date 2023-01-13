import { useEffect, useRef, useState } from "react";
import { Card, CardMedia, Typography } from '@mui/material';

const Video = ({ track }) => {
    const ref = useRef();

    console.log(track);

    useEffect(() => {
        track.attach(ref.current);
        return () => {
            track.detach();
        }
    });

    return <CardMedia component="video" ref={ref} autoPlay={true} />;
};

const Participant = ({ participant }) => {
    const [videoTracks, setVideoTracks] = useState([]);
    const [audioTracks, setAudioTracks] = useState([]);

    const audioRef = useRef();

    const trackpubsToTracks = trackMap => Array.from(trackMap.values())
        .map(publication => publication.track)
        .filter(track => track !== null);

    useEffect(() => {
        const trackSubscribed = track => {
            if (track.kind == 'video') {
                setVideoTracks(videoTracks => [...videoTracks, track]);
            } else {
                setAudioTracks(audioTracks => [...audioTracks, track]);
            }
        };

        const trackUnsubscribed = track => {
            if (track.kind == 'video') {
                setVideoTracks(videoTracks => videoTracks.filter(v => v !== track));
            } else {
                setAudioTracks(audioTracks => audioTracks.filter(a => a !== track));
            }
        };

        setVideoTracks(trackpubsToTracks(participant.videoTracks));
        setAudioTracks(trackpubsToTracks(participant.audioTracks));

        participant.on('trackSubscribed', trackSubscribed);
        participant.on('trackUnsubscribed', trackUnsubscribed);

        return () => {
            setVideoTracks([]);
            setAudioTracks([]);
            participant.removeAllListeners();
        };

    }, [participant]);

    console.log(videoTracks);

    return (
        <Card className="participant" sx={{ width: 1 / 2, bgcolor: "black", margin: 1 }}>
            {videoTracks.map(track => (<Video key={track.id} track={track} />))}
            <audio ref={audioRef} autoPlay={true} muted={true} />
            <Typography variant="h4" color="white" component="div" sx={{ margin: 0.8 }}>
                {participant.identity}
            </Typography>
        </Card>
    );

};

export default Participant;