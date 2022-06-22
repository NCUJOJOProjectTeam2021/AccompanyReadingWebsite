import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, Button } from '@mui/material';
// utils
import PersonIcon from '@mui/icons-material/Person';
//
import getTwilioToken from '../../../global/api/getTwilioToken';
import SvgIconStyle from '../../../global/component/SvgIconStyle';
import Cookies from 'universal-cookie';
import { useGlobalState } from '../../../global/api/ContextProvider';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const TitleStyle = styled(Button)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));


const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

RoomCard.propTypes = {
  selectedRoom: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function RoomCard({ selectedRoom, index }) {
  const cookies = new Cookies()
  const [state, setState] = useGlobalState();
  const { room_name, participants, sid } = selectedRoom;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;
  const cover = `/static/blog_pic/random_${Math.ceil(Math.random() * 30)}.jpg`
  const username = cookies.get('username');
  const navigate = useNavigate();

  function handleRoomEnter() {

    console.log(state.selectedRoom);
    getTwilioToken(username, selectedRoom.room_name);
    const res = new Promise((resolve, reject) => {
      resolve(setState({ ...state, selectedRoom }))
    }).then(
      navigate(`/roomsList/${index + 1}`)
    )

  }


  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card sx={{ position: 'relative' }}>
        <CardMediaStyle
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)',
              },
            }),
          }}
        >
          <SvgIconStyle
            color="paper"
            src="/static/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              color: 'background.paper',
              ...((latestPostLarge || latestPost) && { display: 'none' }),
            }}
          />
          <AvatarStyle

            sx={{
              ...((latestPostLarge || latestPost) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40,
              }),
            }}
          />
          <CoverImgStyle alt={room_name} src={cover} />
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute',
            }),
          }}
        >
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
            {participants.length}
          </Typography>

          <TitleStyle
            onClick={handleRoomEnter}
            color="inherit"
            variant="subtitle2"
            underline="hover"
            sx={{
              ...(latestPostLarge && { typography: 'h5', height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white',
              }),
            }}
          >
            {room_name}
          </TitleStyle>

          {/* <InfoStyle>
            {POST_INFO.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: index === 0 ? 0 : 1.5,
                  ...((latestPostLarge || latestPost) && {
                    color: 'grey.500',
                  }),
                }}
              >
                <Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
              </Box>
            ))}
          </InfoStyle> */}
        </CardContent>
      </Card>
    </Grid >
  );
}
