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
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
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
  Flight as FlightIcon,
  Hotel as HotelIcon,
  Place as PlaceIcon,
  Security as SecurityIcon,
  SupportAgent as SupportIcon,
  CheckCircle as CheckIcon,
  TravelExplore as ExploreIcon,
  Spa as SpaIcon,
  RestaurantMenu as RestaurantIcon,
} from '@mui/icons-material';

const SectionWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.background.default,
  },
  '&:nth-of-type(odd)': {
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
    name: 'Vikash Kumar',
    role: 'Founder & CEO',
    image: null, // Use default icon
    bio: 'A passionate traveler with 15+ years in Indian hospitality. Vikash founded Yatraa to showcase India\'s rich heritage through luxury travel experiences.',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Rajesh Kumar',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bio: 'Former palace hotel manager with expertise in luxury accommodations and authentic Indian experiences across heritage properties.',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Ananya Patel',
    role: 'Cultural Experience Director',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bio: 'Cultural historian and local expert specializing in creating immersive experiences that connect travelers with India\'s traditions.',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
];

const stats = [
  {
    number: '500+',
    label: 'Happy Travelers',
    icon: <GroupsIcon sx={{ fontSize: 40 }} color="primary" />,
  },
  {
    number: '50+',
    label: 'Heritage Hotels',
    icon: <HotelIcon sx={{ fontSize: 40 }} color="primary" />,
  },
  {
    number: '25+',
    label: 'Indian Destinations',
    icon: <PlaceIcon sx={{ fontSize: 40 }} color="primary" />,
  },
  {
    number: '15+',
    label: 'Years Experience',
    icon: <StarIcon sx={{ fontSize: 40 }} color="primary" />,
  },
];

const services = [
  {
    title: 'Heritage Palace Hotels',
    description: 'Stay in converted royal palaces and experience authentic Indian royalty',
    icon: <HotelIcon sx={{ fontSize: 40 }} color="primary" />,
  },
  {
    title: 'Cultural Immersion',
    description: 'Deep dive into local traditions, festivals, and authentic Indian experiences',
    icon: <ExploreIcon sx={{ fontSize: 40 }} color="primary" />,
  },
  {
    title: 'Luxury Spa & Wellness',
    description: 'Rejuvenate with traditional Ayurvedic treatments and world-class spa facilities',
    icon: <SpaIcon sx={{ fontSize: 40 }} color="primary" />,
  },
  {
    title: 'Gourmet Indian Cuisine',
    description: 'Savor authentic regional cuisines prepared by award-winning chefs',
    icon: <RestaurantIcon sx={{ fontSize: 40 }} color="primary" />,
  },
  {
    title: '24/7 Concierge Support',
    description: 'Dedicated support throughout your journey with local expertise',
    icon: <SupportIcon sx={{ fontSize: 40 }} color="primary" />,
  },
  {
    title: 'Safe & Secure Travel',
    description: 'Comprehensive safety measures and insurance for worry-free travel',
    icon: <SecurityIcon sx={{ fontSize: 40 }} color="primary" />,
  },
];

const awards = [
  {
    title: 'Best Luxury Tour Operator India 2023',
    organization: 'Travel + Leisure India',
    icon: <AwardIcon sx={{ fontSize: 40 }} color="primary" />,
  },
  {
    title: 'Excellence in Heritage Tourism',
    organization: 'Ministry of Tourism, India',
    icon: <StarIcon sx={{ fontSize: 40 }} color="primary" />,
  },
  {
    title: 'Sustainable Tourism Award',
    organization: 'Indian Tourism Board',
    icon: <VerifiedIcon sx={{ fontSize: 40 }} color="primary" />,
  },
];

const partners = [
  {
    name: 'Taj Hotels',
    logo: 'https://images.unsplash.com/photo-1566073771259-6a8506862ae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'The Oberoi Group',
    logo: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'ITC Hotels',
    logo: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Leela Palaces',
    logo: 'https://images.unsplash.com/photo-1520637836862-4d197d17c91a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
];

const About = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: '70vh',
          position: 'relative',
          backgroundImage: 'url(https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
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
            About Yatraa
          </Typography>
          <Typography
            variant="h4"
            color="white"
            sx={{
              maxWidth: 800,
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              mb: 4,
              fontWeight: 300,
            }}
          >
            Crafting Extraordinary Heritage Hotel Experiences Across India Since 2010
          </Typography>
          <Stack direction="row" spacing={4} sx={{ mt: 4 }}>
            {stats.slice(0, 2).map((stat, index) => (
              <Box key={index} sx={{ textAlign: 'center', color: 'white' }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {stat.number}
                </Typography>
                <Typography variant="h6">{stat.label}</Typography>
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Who We Are Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
                Discover India's Royal Heritage
              </Typography>
              <Typography variant="h5" gutterBottom sx={{ color: 'text.secondary', mb: 3 }}>
                Your Gateway to Luxury Indian Experiences
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                Yatraa is India's premier luxury travel company specializing in heritage hotel experiences. 
                Since 2010, we've been curating extraordinary journeys through India's most magnificent palace hotels, 
                royal residences, and heritage properties.
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                From the floating palace of Udaipur to the royal heritage of Jaipur, we create bespoke experiences 
                that combine India's rich cultural tapestry with world-class luxury. Every journey is meticulously 
                crafted to immerse you in authentic Indian traditions while ensuring the highest standards of comfort.
              </Typography>
              <Stack direction="row" spacing={3} sx={{ mt: 4 }}>
                <Chip 
                  icon={<CheckIcon />} 
                  label="Luxury Heritage Hotels" 
                  color="primary" 
                  variant="outlined" 
                  size="medium"
                />
                <Chip 
                  icon={<CheckIcon />} 
                  label="Authentic Experiences" 
                  color="primary" 
                  variant="outlined" 
                  size="medium"
                />
                <Chip 
                  icon={<CheckIcon />} 
                  label="Expert Curation" 
                  color="primary" 
                  variant="outlined" 
                  size="medium"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Luxury Indian Palace Hotel"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </SectionWrapper>

      {/* Stats Section */}
      <SectionWrapper sx={{ backgroundColor: 'primary.main', color: 'white' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700, mb: 6, color: 'white' }}
          >
            Yatraa by the Numbers
          </Typography>
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ textAlign: 'center', color: 'white' }}>
                  {stat.icon}
                  <Typography variant="h2" sx={{ fontWeight: 700, my: 2 }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="h6">{stat.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </SectionWrapper>

      {/* Services Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}
          >
            Our Signature Services
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{ color: 'text.secondary', mb: 6, maxWidth: 600, mx: 'auto' }}
          >
            Every detail carefully curated for an unforgettable Indian luxury experience
          </Typography>
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} md={4} key={index}>
                <AwardCard>
                  {service.icon}
                  <Typography variant="h5" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                    {service.description}
                  </Typography>
                </AwardCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </SectionWrapper>

      {/* Mission & Vision Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={8}
                sx={{ 
                  p: 6, 
                  height: '100%',
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'url(https://images.unsplash.com/photo-1596436889106-be35e843f974?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.2,
                  },
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                    Our Mission
                  </Typography>
                  <Typography variant="h6" paragraph sx={{ fontWeight: 300, mb: 3 }}>
                    "To showcase India's royal heritage through extraordinary luxury experiences"
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                    We are dedicated to preserving and sharing India's magnificent cultural heritage 
                    through carefully curated luxury travel experiences. Our mission is to connect 
                    discerning travelers with the authentic essence of royal India.
                  </Typography>
                  <List sx={{ mt: 3 }}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ color: 'white', minWidth: 30 }}>
                        <CheckIcon />
                      </ListItemIcon>
                      <ListItemText primary="Preserve cultural heritage" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ color: 'white', minWidth: 30 }}>
                        <CheckIcon />
                      </ListItemIcon>
                      <ListItemText primary="Create authentic experiences" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ color: 'white', minWidth: 30 }}>
                        <CheckIcon />
                      </ListItemIcon>
                      <ListItemText primary="Support local communities" />
                    </ListItem>
                  </List>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={8}
                sx={{ 
                  p: 6, 
                  height: '100%',
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'url(https://images.unsplash.com/photo-1520637836862-4d197d17c91a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.2,
                  },
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                    Our Vision
                  </Typography>
                  <Typography variant="h6" paragraph sx={{ fontWeight: 300, mb: 3 }}>
                    "To be the world's most trusted curator of Indian luxury heritage experiences"
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                    We envision a future where every traveler can experience the grandeur of India's 
                    royal past through modern luxury, creating lasting memories while respecting 
                    and celebrating our rich cultural heritage.
                  </Typography>
                  <List sx={{ mt: 3 }}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ color: 'white', minWidth: 30 }}>
                        <CheckIcon />
                      </ListItemIcon>
                      <ListItemText primary="Global recognition" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ color: 'white', minWidth: 30 }}>
                        <CheckIcon />
                      </ListItemIcon>
                      <ListItemText primary="Sustainable tourism" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ color: 'white', minWidth: 30 }}>
                        <CheckIcon />
                      </ListItemIcon>
                      <ListItemText primary="Innovation in heritage" />
                    </ListItem>
                  </List>
                </Box>
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
            sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}
          >
            Meet Our Expert Team
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{ color: 'text.secondary', mb: 6, maxWidth: 600, mx: 'auto' }}
          >
            Passionate professionals dedicated to creating your perfect Indian heritage experience
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member) => (
              <Grid item xs={12} md={4} key={member.name}>
                <TeamMemberCard>
                  {member.image ? (
                    <CardMedia
                      component="img"
                      height="300"
                      image={member.image}
                      alt={member.name}
                      sx={{ objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        height: 300,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'primary.light',
                        color: 'primary.main',
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 120,
                          height: 120,
                          fontSize: '3rem',
                          backgroundColor: 'primary.main',
                          color: 'white',
                        }}
                      >
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                    </Box>
                  )}
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                      {member.name}
                    </Typography>
                    <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 500 }}>
                      {member.role}
                    </Typography>
                    <Typography variant="body2" paragraph color="text.secondary" sx={{ mt: 2, lineHeight: 1.7 }}>
                      {member.bio}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', mt: 3 }}>
                      <IconButton 
                        href={member.social.linkedin} 
                        size="small"
                        sx={{ 
                          backgroundColor: 'primary.main',
                          color: 'white',
                          '&:hover': { backgroundColor: 'primary.dark' }
                        }}
                      >
                        <LinkedInIcon />
                      </IconButton>
                      <IconButton 
                        href={member.social.twitter} 
                        size="small"
                        sx={{ 
                          backgroundColor: 'primary.main',
                          color: 'white',
                          '&:hover': { backgroundColor: 'primary.dark' }
                        }}
                      >
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
      <SectionWrapper sx={{ backgroundColor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}
          >
            Awards & Recognition
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{ color: 'text.secondary', mb: 6, maxWidth: 600, mx: 'auto' }}
          >
            Recognized for excellence in luxury heritage tourism and sustainable travel practices
          </Typography>
          <Grid container spacing={4}>
            {awards.map((award) => (
              <Grid item xs={12} md={4} key={award.title}>
                <AwardCard>
                  <Box sx={{ 
                    width: 80, 
                    height: 80, 
                    borderRadius: '50%', 
                    backgroundColor: 'primary.light', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mb: 3
                  }}>
                    {award.icon}
                  </Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, textAlign: 'center' }}>
                    {award.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', fontWeight: 500 }}>
                    {award.organization}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                    2023
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
            sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}
          >
            Our Prestigious Partners
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{ color: 'text.secondary', mb: 6, maxWidth: 700, mx: 'auto' }}
          >
            Collaborating with India's finest heritage hotels and luxury hospitality brands
          </Typography>
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            {partners.map((partner, index) => (
              <Grid item xs={6} sm={3} key={partner.name}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 120,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                    boxShadow: 1,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow: 4,
                      transform: 'translateY(-5px)',
                    },
                  }}
                >
                  <PartnerLogo
                    src={partner.logo}
                    alt={partner.name}
                    onError={(e) => {
                      e.target.src = `https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80`;
                    }}
                  />
                </Box>
                <Typography 
                  variant="body2" 
                  align="center" 
                  sx={{ mt: 2, fontWeight: 500, color: 'text.secondary' }}
                >
                  {partner.name}
                </Typography>
              </Grid>
            ))}
          </Grid>
          
          {/* Call to Action */}
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              Ready to Experience Royal India?
            </Typography>
            <Typography variant="h6" paragraph sx={{ color: 'text.secondary', mb: 4 }}>
              Let us craft your perfect luxury heritage journey
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              sx={{ 
                px: 6, 
                py: 2, 
                borderRadius: 3,
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none'
              }}
            >
              Start Your Journey
            </Button>
          </Box>
        </Container>
      </SectionWrapper>
    </Box>
  );
};

export default About; 