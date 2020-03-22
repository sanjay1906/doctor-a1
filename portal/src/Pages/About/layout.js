import React from 'react';
import useStyles from './style';
import Header from 'Components/Header';
import { Typography, Container, Button, Grid } from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const Layout = () => {
  const carddata = [
    {
      img:
        'https://entrackr.com/wp-content/uploads/2019/02/Cab-booking-1200x600.jpg',
      title: 'Cab Service'
    },
    {
      img: 'https://ichef.bbci.co.uk/images/ic/720x405/p086qbqx.jpg',
      title: 'Corona Service'
    },
    {
      img:
        'https://miamioh.edu/_files/images/it-services/news-articles/2017/07/password-reset.jpg',
      title: 'Password Reset Service'
    }
  ];

  const classes = useStyles();
  return (
    <div>
      <Header title="About Us" />
      <Container className={classes.Container} maxWidth="lg">
        <Grid container spacing={3}>
          <Typography
            component="h1"
            variant="h6"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            About Us
          </Typography>
          <Typography variant="h6" align="left" color="textSecondary" paragraph>
            A hospital is a health care institution providing patient treatment
            with specialized medical and nursing staff and medical equipment.[1]
            The best-known type of hospital is the general hospital, which
            typically has an emergency department to treat urgent health
            problems ranging from fire and accident victims to a sudden illness.
            A district hospital typically is the major health care facility in
            its region, with many beds for intensive care and additional beds
            for patients who need long-term care. Specialized hospitals include
            trauma centers, rehabilitation hospitals, children's hospitals,
            seniors' (geriatric) hospitals, and hospitals for dealing with
            specific medical needs such as psychiatric treatment (see
            psychiatric hospital) and certain disease categories. Specialized
            hospitals can help reduce health care costs compared to general
            hospitals.[2] Hospitals are classified as general, specialty, or
            government depending on the sources of income received.
          </Typography>

          <Typography
            component="h1"
            variant="h6"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Services
          </Typography>

          <Grid container spacing={4}>
            {carddata.map(card => (
              <Grid item key={card.img} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.img}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography>
                      A hospital is a health care institution providing patient
                      treatment with specialized medical and nursing staff and
                      medical equipment.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Layout;
