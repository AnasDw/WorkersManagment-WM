import { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EditNoteIcon from '@mui/icons-material/EditNote';

// Imgs Imports
import b1 from '../../../../../assets/backgrounds/b1.jpg';
import b2 from '../../../../../assets/backgrounds/b2.jpg';
import b3 from '../../../../../assets/backgrounds/b3.jpg';
import b4 from '../../../../../assets/backgrounds/b4.jpg';
import b5 from '../../../../../assets/backgrounds/b5.jpg';
import ResponsiveDialog from './ResponsiveDialog';

const ImgByIndex = (i) => {
  if (i === 1) return b1;
  if (i === 2) return b2;
  if (i === 3) return b3;
  if (i === 4) return b4;
  if (i === 5) return b5;

  return null;
};

FeaturedDepCard.propTypes = { props: PropTypes.object.isRequired };
export default function FeaturedDepCard({ props }) {
  const [open, setOpen] = useState(false);
  const [Data, setData] = useState();

  const handleClickEdit = (item) => {
    setData(item);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid container spacing={3} mt={8} alignItems={'center'} justifyContent={'center'}>
        {props.data.Positions.map(
          (
            item,
            index // eslint-disable-line
          ) => (
            <Grid key={index} item xs={12} sm={6} md={3} lg={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia component="img" height="140" src={ImgByIndex(index + 1)} alt="green iguana" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ color: '#324E87' }}>
                      {`${item.Dep} Department`}
                    </Typography>
                    <Grid mt={2} display={'flex'} container variant="body2" sx={{ gap: 1 }}>
                      <EventNoteIcon />
                      <Typography variant="body2" color="text.secondary">
                        {`Contains ${item.Pos.length} Positions`}
                      </Typography>
                    </Grid>
                  </CardContent>
                </CardActionArea>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button
                    onClick={() => {
                      handleClickEdit(item);
                    }}
                    size="small"
                  >
                    <EditNoteIcon />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        )}
      </Grid>
      <ResponsiveDialog data={Data} boolean={open} func={handleClose} data2push={props.data} />
    </>
  );
}
