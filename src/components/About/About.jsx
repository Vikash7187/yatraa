import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Divider,
  Paper,
  Avatar,
  IconButton,
  styled,
} from '@mui/material';
import {
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Star as StarIcon,
  Verified as VerifiedIcon,
  Groups as GroupsIcon,
  EmojiEvents as AwardIcon,
  Handshake as PartnerIcon,
} from '@mui/icons-material';

const SectionWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.background.paper,
  },
}));

const TeamMemberCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[4],
  },
}));

const AwardCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[4],
  },
}));

const PartnerLogo = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  height: 'auto',
  filter: 'grayscale(100%)',
  opacity: 0.7,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    filter: 'grayscale(0%)',
    opacity: 1,
  },
}));

// Sample data
const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: '/images/team/sarah.jpg',
    bio: 'A globetrotter with over 15 years of experience, Sarah has explored 50+ countries and brings her passion for authentic travel experiences to Yatraa.',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Michael Chen',
    role: 'Head of Tour Operations',
    image: '/images/team/michael.jpg',
    bio: 'Michael specializes in creating unique itineraries and ensuring every Yatraa journey exceeds expectations.',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Emma Rodriguez',
    role: 'Travel Experience Director',
    image: '/images/team/emma.jpg',
    bio: "Emma's expertise in local cultures and hidden gems helps create authentic, immersive travel experiences.",
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
];

const awards = [
  {
    title: 'Best Tour Operator 2023',
    organization: 'Travel Excellence Awards',
    icon: <AwardIcon sx={{ fontSize: 40 }} color="primary" />,
  },
  {
    title: 'Outstanding Travel Experiences',
    organization: 'Tourism Board',
    icon: <StarIcon sx={{ fontSize: 40 }} color="primary" />,
  },
  {
    title: 'Cultural Tourism Excellence',
    organization: 'Global Travel Association',
    icon: <VerifiedIcon sx={{ fontSize: 40 }} color="primary" />,
  },
];

const partners = [
  {
    name: 'Luxury Resorts Group',
    logo: '/images/partners/luxury-resorts.png',
  },
  {
    name: 'World Airways',
    logo: '/images/partners/world-airways.png',
  },
  {
    name: 'Heritage Hotels',
    logo: '/images/partners/heritage-hotels.png',
  },
  {
    name: 'Local Experiences Co.',
    logo: '/images/partners/local-experiences.png',
  },
];

const About = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: '60vh',
          position: 'relative',
          backgroundImage: 'url(/images/about/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h1"
            component="h1"
            color="white"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '4rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              mb: 2,
            }}
          >
            About Us
          </Typography>
          <Typography
            variant="h5"
            color="white"
            sx={{
              maxWidth: 600,
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            Creating unforgettable travel experiences since 2010
          </Typography>
        </Container>
      </Box>

      {/* Who We Are Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
                Who We Are
              </Typography>
              <Typography variant="body1" paragraph>
                Yatraa is a premier travel and tour company dedicated to creating extraordinary travel experiences. 
                Founded in 2010, we've been helping adventurers explore the world's most captivating destinations 
                with personalized itineraries and unmatched local expertise.
              </Typography>
              <Typography variant="body1" paragraph>
                Our team of passionate travel experts specializes in crafting unique journeys 
                that blend adventure, culture, and comfort. We believe in creating not just trips, 
                but life-changing experiences that connect travelers with local cultures and create 
                lasting memories.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/about/who-we-are.jpg"
                alt="Our office"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </SectionWrapper>

      {/* Mission & Vision Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={3}
                sx={{ 
                  p: 4, 
                  height: '100%',
                  borderRadius: 4,
                  backgroundColor: 'primary.main',
                  color: 'white',
                }}
              >
                <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                  Our Mission
                </Typography>
                <Typography variant="body1" paragraph>
                  To create extraordinary travel experiences that inspire wanderlust, foster cultural 
                  connections, and make every journey an unforgettable adventure.
                </Typography>
                <Box
                  component="img"
                  src="/images/about/mission.jpg"
                  alt="Our mission"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 2,
                    mt: 2,
                  }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={3}
                sx={{ 
                  p: 4, 
                  height: '100%',
                  borderRadius: 4,
                }}
              >
                <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                  Our Vision
                </Typography>
                <Typography variant="body1" paragraph>
                  To become the most trusted name in travel experiences, known for crafting unique, 
                  authentic journeys that transform the way people explore the world.
                </Typography>
                <Box
                  component="img"
                  src="/images/about/vision.jpg"
                  alt="Our vision"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 2,
                    mt: 2,
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </SectionWrapper>

      {/* Meet the Team Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700, mb: 6 }}
          >
            Meet the Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member) => (
              <Grid item xs={12} md={4} key={member.name}>
                <TeamMemberCard>
                  <CardMedia
                    component="img"
                    height="300"
                    image={member.image}
                    alt={member.name}
                  />
                  <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                      {member.role}
                    </Typography>
                    <Typography variant="body2" paragraph color="text.secondary">
                      {member.bio}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <IconButton href={member.social.linkedin} size="small">
                        <LinkedInIcon />
                      </IconButton>
                      <IconButton href={member.social.twitter} size="small">
                        <TwitterIcon />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </TeamMemberCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </SectionWrapper>

      {/* Awards Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700, mb: 6 }}
          >
            Our Achievements
          </Typography>
          <Grid container spacing={4}>
            {awards.map((award) => (
              <Grid item xs={12} md={4} key={award.title}>
                <AwardCard>
                  {award.icon}
                  <Typography variant="h5" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
                    {award.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {award.organization}
                  </Typography>
                </AwardCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </SectionWrapper>

      {/* Partners Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700, mb: 6 }}
          >
            Our Partners
          </Typography>
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            {partners.map((partner) => (
              <Grid item xs={6} sm={3} key={partner.name}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 100,
                  }}
                >
                  <PartnerLogo
                    src={partner.logo}
                    alt={partner.name}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </SectionWrapper>
    </Box>
  );
};

export default About; 