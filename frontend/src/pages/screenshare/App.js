import { useEffect, useState } from 'react';
import { connect } from 'twilio-video';
import { getUsername, refresh } from '../../auth';
import { createScreenTrack } from './scripts/CreateScreenTrack';
import { getRoomCredentials } from './scripts/GetRoomCredential';
import Cookies from 'universal-cookie';
import './style.css'
import { RoomOutlined } from '@mui/icons-material';

const ScreenSharing = () => {

    //get token
    //get room
    var localscreentrack = null;
    const cookies = new Cookies();
    const token = cookies.get('twilioToken');
    const [room, setroom] = useState(null);

    const getroom = async () => {
        const room = await connect(token, {
            tracks: []
        });
        const localParticipant = room.localParticipant;
        console.log(`successfully joined a room: ${room.name}`);
        console.log(`connect to the room as localparticipant ${localParticipant.identity}`);

        room.on('participantConnected', participant => {
            console.log(`a remote participant connected: ${participant.identity}`);

            participant.tracks.forEach(publication => {
                if (publication.isSubscribed) {
                    const track = publication.track;
                    const screen = document.getElementById('screenpreview');
                    track.attach(screen);
                }
            });

            participant.on('trackSubscribed', track => {
                console.log('someone shared');
                // document.getElementById('remoteshare').appendChild(track.attach());
                /*Todo: 重寫成attach到screenpreview*/
                /*Disattach 本地的東西 */
                const screen = document.getElementById('screenpreview');
                track.attach(screen);
                if (localscreentrack) {
                    handleStop();
                }
            });

            participant.on('trackUnsubscribed', (track, publication) => {
                console.log(`someone unpublished.`);
            })

        });

        room.on('participantDisconnected', participant => {
            console.log(`a remote participant disconnect: ${participant.identity}`);
        });
        
        setroom(room);
    }

    if(room == null) {
        getroom();
    }

    useEffect(() => {
        if (room) {
            room.participants.forEach(participant => {
                participant.tracks.forEach(publication => {
                    if (publication.track) {
                        // document.getElementById('remoteshare').appendChild(publication.track.attach());
                        /*Todo: 重寫成attach到screenpreview*/
                        const screen = document.getElementById('screenpreview');
                        publication.track.attach(screen);
                    }
                });

                participant.on('trackSubscribed', track => {
                    console.log('someone shared');
                    // document.getElementById('remoteshare').appendChild(track.attach());
                    /*Todo: 重寫成attach到screenpreview*/
                    /*Disattach 本地的東西 */
                    const screen = document.getElementById('screenpreview');
                    track.attach(screen);
                    if (localscreentrack) {
                        handleStop();
                    }
                });

                participant.on('trackUnsubscribed', (track, publication) => {
                    console.log(`${publication.identity} unpublished.`);
                })
            });
        }
    }, [room])

    
    

    //set room

    //subscribe already in room video


    //handle button
    const handleCapture = async () => {
        try {
            localscreentrack = await createScreenTrack(360, 640);
            const screenPreview = document.getElementById('screenpreview');
            localscreentrack.attach(screenPreview);
            room.localParticipant.publishTrack(localscreentrack);
            console.log('publish the track successfully');
        } catch (e) {
            alert(e.message);
        }
    };

    const handleStop = () => {
        localscreentrack.stop();
        room.localParticipant.unpublishTrack(localscreentrack);
        localscreentrack = null;
    }


    refresh();
    return (
        <div>
            <div>
                <video className="screen" id="screenpreview" autoPlay />
                <button id="capture" onClick={handleCapture}>start capture</button>
                <button id="stopcapture" onClick={handleStop}>stop capture</button>
            </div>
        </div>
    );
};

export { ScreenSharing };