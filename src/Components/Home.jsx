import { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    Container,
    Card,
    CardContent,
    Box,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useScrollTrigger,
    Fade,
    Fab,
    useMediaQuery
} from '@mui/material';
import React from 'react';

import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SendIcon from '@mui/icons-material/Send';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ArrowRight, Phone, Mail, ShieldCheck, Wifi } from 'lucide-react';
import { keyframes } from '@emotion/react';
// Import assets
import logo from '../assets/images/logo1.png';
import camera1 from '../assets/images/camera1.png';
import camera2 from '../assets/images/camera2.png';
import camera3 from '../assets/images/camera3.png';
import camera4 from '../assets/images/camera4.jpg';
import camera5 from '../assets/images/camera5.jpg';
import poster from '../assets/images/poster.jpg';
import installation1 from '../assets/images/installation1.jpg';
import video1 from '../assets/Videos/video1.mp4';
import { Grid } from '@mui/material';
// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Scroll to top component
function ScrollTop(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const target = event.target;

        // Ensuring that the target has a valid ownerDocument and fallback
        const anchor = target.ownerDocument?.querySelector('#back-to-top-anchor') || document.querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
                behavior: 'smooth',
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 2 }}
            >
                {children}
            </Box>
        </Fade>
    );
}


const Home = (props) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const images = [camera1, camera2, camera3];

    // Image carousel effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [images.length]);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            ((event.key === 'Tab') || (event.key === 'Shift'))
        ) {
            return;
        }
        setDrawerOpen(open);
    };

    const menuItems = [
        { name: 'Home', path: '/' },
        { name: 'Features', path: '/features' },
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <Box sx={{ bgcolor: '#fff', overflow: 'hidden', position: 'relative' }}>
            <div id="back-to-top-anchor" />

            {/* Header/AppBar */}
            <AppBar
                position="sticky"
                elevation={1}
                sx={{
                    bgcolor: '#fff',
                    borderBottom: '1px solid #eaeaea'
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 2 } }}>
                        <Box display="flex" alignItems="center">
                            <Box component="img" src={logo} alt="logo" sx={{ width: { xs: 40, sm: 50 }, mr: 1 }} />
                            <Typography
                                variant={isMobile ? "subtitle1" : "h6"}
                                sx={{
                                    color: '#ff6f00',
                                    fontWeight: 'bold',
                                    display: { xs: 'none', sm: 'block' }
                                }}
                            >
                                Progressive Blink
                            </Typography>
                        </Box>

                        {/* Desktop Navigation */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                            {menuItems.map((item) => (
                                <Button
                                    key={item.name}
                                    href={item.path}
                                    sx={{
                                        color: '#333',
                                        '&:hover': { color: '#ff6f00' }
                                    }}
                                >
                                    {item.name}
                                </Button>
                            ))}
                            <Button
                                variant="contained"
                                href="/contact"
                                sx={{
                                    bgcolor: '#ff6f00',
                                    '&:hover': { bgcolor: '#e65100' },
                                    ml: 2
                                }}
                                startIcon={<Phone size={16} />}
                            >
                                Contact
                            </Button>
                        </Box>

                        {/* Mobile Menu Button */}
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                            sx={{ color: '#333', display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile Navigation Drawer */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                        <Box component="img" src={logo} alt="logo" sx={{ width: 40, mr: 1 }} />
                        <Typography sx={{ color: '#ff6f00', fontWeight: 'bold' }}>
                            Progressive Blink
                        </Typography>
                    </Box>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem
                                key={item.name}
                                component="a"
                                href={item.path}
                            >
                                <ListItemText primary={item.name} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            {/* Hero Section */}
            <Container maxWidth="xl" disableGutters sx={{ overflow: 'hidden' }}>
                <Grid
                    container
                    sx={{
                        minHeight: { xs: 'auto', md: '90vh' },
                        position: 'relative',
                    }}
                >
                    {/* Left Section - Unchanged */}
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            p: { xs: 3, sm: 5, md: 8 },
                            zIndex: 2,
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: '#ff6f00',
                                mb: 2,
                                fontWeight: 500,
                                animation: `${slideIn} 0.6s ease-out`,
                            }}
                        >
                            Engineered for Security
                        </Typography>
                        <Typography
                            variant="h2"
                            component="h2"
                            sx={{
                                fontWeight: 'bold',
                                color: '#1a2b42',
                                mb: 3,
                                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                                lineHeight: 1.2,
                                animation: `${slideIn} 0.8s ease-out`,
                            }}
                        >
                            Comprehensive Home & <br />
                            Business Protection
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#637381',
                                mb: 4,
                                maxWidth: '90%',
                                animation: `${slideIn} 1s ease-out`,
                                fontSize: { xs: '0.9rem', sm: '1rem' }
                            }}
                        >
                            Our smart warning technology keeps you safe around the clock. <br />
                            Experience 24/7 HD surveillance—built to withstand extreme <br />temperatures and
                            conditions. Compact, powerful, and reliable.
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: '#ff6f00',
                                px: { xs: 3, md: 4 },
                                py: 1.2,
                                borderRadius: 1,
                                '&:hover': { bgcolor: '#e65100' },
                                animation: `${slideIn} 1.2s ease-out`,
                                fontSize: { xs: '0.9rem', sm: '1rem' }
                            }}
                            endIcon={<ArrowRight size={16} />}
                        >
                            Contact Now
                        </Button>
                    </Grid>

                    {/* Right Section (Image + Orange BG) - Modified for better mobile responsiveness */}
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            position: 'relative',
                            height: { xs: '50vh', sm: '60vh', md: '92vh' }, // Reduced height on mobile
                            display: 'flex',
                            justifyContent: { xs: 'center', md: 'flex-end' }, // Center on mobile, flex-end on desktop
                            alignItems: 'center',
                            overflow: 'hidden',
                            width: '100%',
                            maxWidth: { md: '50%' },
                            zIndex: 10,
                            right: { xs: 0, md: -87 }, // No right offset on mobile
                            mt: { xs: 4, md: 0 }, // Add margin top on mobile for spacing
                        }}
                    >
                        {/* Orange Background */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: { xs: '100%', md: '40vw' },
                                height: '100%',
                                bgcolor: '#ff6f00',
                                zIndex: 1,
                            }}
                        />

                        {/* Image inside orange area */}
                        <Box
                            sx={{
                                position: 'relative',
                                zIndex: 2,
                                width: { xs: '100%', md: '30vw' },
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mr: { xs: 0, md: 10 },
                                mt: { xs: 0, md: 5 },
                            }}
                        >
                            <Box
                                component="img"
                                src={images[currentImage]}
                                alt={`Camera ${currentImage + 1}`}
                                sx={{
                                    width: { xs: '200px', sm: '280px', md: '320px' },
                                    height: 'auto',
                                    objectFit: 'contain',
                                    filter: 'drop-shadow(5px 5px 10px rgba(0,0,0,0.2))',
                                    animation: `${fadeIn} 0.5s ease-in-out`,
                                }}
                            />
                        </Box>

                        {/* Dot Indicators - Modified to appear at bottom on mobile */}
                        <Box
                            sx={{
                                position: 'absolute',
                                right: { xs: '50%', md: 20 },
                                bottom: { xs: 20, md: 'auto' },
                                top: { xs: 'auto', md: '50%' },
                                display: 'flex',
                                flexDirection: { xs: 'row', md: 'column' },
                                gap: 2,
                                transform: {
                                    xs: 'translateX(50%)',
                                    md: 'translateY(-50%)'
                                },
                                zIndex: 3,
                            }}
                        >
                            {images.map((_, index) => (
                                <Box
                                    key={index}
                                    onClick={() => setCurrentImage(index)}
                                    sx={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: '50%',
                                        bgcolor: '#fff',
                                        opacity: currentImage === index ? 1 : 0.6,
                                        cursor: 'pointer',
                                        transition: 'opacity 0.3s',
                                    }}
                                />
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Container>


            {/* Features Section */}
            <Container maxWidth="lg" sx={{ my: { xs: 5, md: 8 } }}>
                <Typography
                    variant="h4"
                    component="h2"
                    align="center"
                    sx={{
                        fontWeight: 'bold',
                        color: '#1a2b42',
                        mb: { xs: 3, md: 5 },
                    }}
                >
                    Key Features
                </Typography>

                <Grid container spacing={3} justifyContent="center">
                    {[
                        { icon: <HomeIcon sx={{ fontSize: 28 }} />, title: 'Always monitoring your home' },
                        { icon: <NotificationsActiveIcon sx={{ fontSize: 28 }} />, title: 'Get alerts for every threat' },
                        { icon: <VisibilityIcon sx={{ fontSize: 28 }} />, title: 'Smart motion detection' },
                        { icon: <SendIcon sx={{ fontSize: 28 }} />, title: 'Send alerts to authorities' }
                    ].map((feature, index) => (
                        <Grid item xs={6} sm={6} md={3} key={index}>
                            <Card
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    bgcolor: 'transparent',
                                    border: '1px solid #eaeaea',
                                    borderRight: '2px solid #f0f0f0',
                                    borderBottom: '2px solid #f0f0f0',
                                    p: { xs: 1, sm: 2 },
                                    borderRadius: '12px',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                                        borderColor: '#ff6f00',
                                        borderRight: '2px solid #ff6f00',
                                        borderBottom: '2px solid #ff6f00',
                                    }
                                }}
                            >
                                <CardContent sx={{ textAlign: 'center', p: { xs: 1, sm: 2 } }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            mb: 2,
                                            color: '#ff6f00',
                                            bgcolor: 'rgba(255, 111, 0, 0.1)',
                                            p: 1.5,
                                            borderRadius: '50%',
                                            width: 50,
                                            height: 50,
                                            mx: 'auto',
                                        }}
                                    >
                                        {feature.icon}
                                    </Box>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: { xs: '0.85rem', sm: '1rem' }
                                        }}
                                    >
                                        {feature.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Banner Section */}
            <Container maxWidth="xl" sx={{ my: { xs: 5, md: 10 } }}>
                <Box
                    sx={{
                        p: { xs: 3, md: 4 },
                        bgcolor: '#fff8f5',
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        component="img"
                        src={installation1}
                        alt="Progressive Security Camera Side View"
                        sx={{
                            width: { xs: '80%', sm: '40%', md: '25%' },
                            objectFit: 'contain',
                            mb: { xs: 3, md: 0 },
                            borderRadius: 2,
                            mx: { xs: 'auto', md: 5 }
                        }}
                    />
                    <Box sx={{ flex: 1, ml: { xs: 0, md: 4 }, textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{
                                fontWeight: 'bold',
                                color: '#1a2b42',
                                mb: 2,
                                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.2rem' }
                            }}
                        >
                            A camera that can change your life
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#637381', mb: 3 }}>
                            With 24/7 monitoring capabilities and smart alerts, Progressive transforms how you protect what matters most. Our security devices are designed to be reliable, intuitive, and always watching.
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: '#ff6f00',
                                '&:hover': { bgcolor: '#e65100' },
                                px: 3
                            }}
                            endIcon={<ShieldCheck size={16} />}
                        >
                            Explore Features
                        </Button>
                    </Box>
                </Box>
            </Container>

            {/* Video Section */}
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    py: { xs: 6, md: 10 },
                    px: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflow: 'hidden',
                }}
            >
                {/* Top Half Background Layer */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '50%',
                        bgcolor: '#ff6f00',
                        zIndex: 0,
                    }}
                />

                {/* Content Over Background */}
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    textAlign="center"
                    color="white"
                    zIndex={1}
                    sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' } }}
                >
                    Watch How It Works
                </Typography>
                <Typography
                    variant="h6"
                    textAlign="center"
                    mb={4}
                    color="white"
                    zIndex={1}
                    sx={{ fontSize: { xs: '1.1rem', md: '1.3rem' } }}
                >
                    Advanced security system in action
                </Typography>

                {/* Video Box */}
                <Container maxWidth="md" sx={{ zIndex: 1 }}>
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            borderRadius: 3,
                            overflow: 'hidden',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                        }}
                    >
                        <video
                            width="100%"
                            height="auto"
                            controls
                            poster={poster}
                            style={{ display: 'block' }}
                        >
                            <source src={video1} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </Box>
                </Container>
            </Box>

            {/* Gallery Section */}
            <Box sx={{
                width: '100%',
                background: 'linear-gradient(to right, #f5f3ff, #eff6ff)',
                py: { xs: 5, md: 8 }
            }}>
                <Container maxWidth="lg">
                    {/* Section Title */}
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        textAlign="center"
                        sx={{
                            mb: { xs: 4, md: 6 },
                            color: '#1a2b42'
                        }}
                    >
                        Advanced Features
                    </Typography>

                    {/* Section 1 - Text Left, Image Right */}
                    <Grid
                        container
                        spacing={{ xs: 4, md: 6 }}
                        alignItems="center"
                        sx={{
                            mb: { xs: 6, md: 10 },
                            flexDirection: { xs: 'column', md: 'row' }
                        }}
                    >
                        {/* Text */}
                        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
                            <div>
                                <Typography
                                    variant="h4"
                                    fontWeight="bold"
                                    sx={{
                                        mb: 2,
                                        color: '#1a2b42',
                                        fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.2rem' },
                                        textAlign: { xs: 'center', md: 'left' }
                                    }}
                                >
                                    Smarter Alerts with <br /> Face Detection
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                    sx={{
                                        mb: 2,
                                        textAlign: { xs: 'center', md: 'left' }
                                    }}
                                >
                                    Never miss an important visitor with our AI-powered face recognition <br /> technology.
                                </Typography>

                                <Grid container spacing={2} sx={{ mb: 3 }}>
                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: { xs: 'center', md: 'flex-start' }
                                        }}>
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                color: '#ff6f00',
                                                mr: 1
                                            }}>
                                                <ShieldCheck size={18} />
                                            </Box>
                                            <Typography variant="body2">Flexible & affordable plans</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: { xs: 'center', md: 'flex-start' }
                                        }}>
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                color: '#ff6f00',
                                                mr: 1
                                            }}>
                                                <Wifi size={18} />
                                            </Box>
                                            <Typography variant="body2">24/7 cloud storage</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Typography
                                    color="text.secondary"
                                    sx={{
                                        mb: 2,
                                        textAlign: { xs: 'center', md: 'left' }
                                    }}
                                >
                                    Store alert recordings up to 30 days of video history. <br />
                                    Unlock your peace of mind!
                                </Typography>

                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: { xs: 'center', md: 'flex-start' }
                                }}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            mt: 2,
                                            backgroundColor: '#4f46e5',
                                            '&:hover': { backgroundColor: '#4338ca' }
                                        }}
                                        endIcon={<ArrowRight size={18} />}
                                    >
                                        Learn More
                                    </Button>
                                </Box>
                            </div>
                        </Grid>

                        {/* Image */}
                        <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                            <Box
                                component="img"
                                src={camera5}
                                alt="Face detection camera"
                                sx={{
                                    width: { xs: '80%', sm: '60%', md: '70%' },
                                    maxWidth: { xs: '280px', sm: 'none', md: 'none' },
                                    borderRadius: 2,
                                    boxShadow: 3
                                }}
                            />
                        </Grid>
                    </Grid>
                    <hr style={{ marginBottom: 50 }} />
                    {/* Section 2 - Image Left, Text Right */}
                    <Grid
                        container
                        spacing={{ xs: 4, md: 6 }}
                        alignItems="center"
                        sx={{
                            mb: { xs: 6, md: 10 },
                            flexDirection: { xs: 'column', md: 'row' }
                        }}
                    >
                        {/* Image - First in markup for both mobile and desktop */}
                        <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                            <Box
                                component="img"
                                src={camera4}
                                alt="Motion detection view"
                                sx={{
                                    width: { xs: '80%', sm: '60%', md: '70%' },
                                    maxWidth: { xs: '280px', sm: 'none', md: 'none' },
                                    borderRadius: 2,
                                    boxShadow: 3
                                }}
                            />
                        </Grid>

                        {/* Text - Second in markup for both mobile and desktop */}
                        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                                <Typography
                                    variant="h4"
                                    fontWeight="bold"
                                    sx={{
                                        mb: 2,
                                        color: '#1a2b42',
                                        fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.2rem' },
                                        textAlign: { xs: 'center', md: 'left' }
                                    }}
                                >
                                    Advanced Motion <br /> Detection
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                    sx={{
                                        mb: 2,
                                        textAlign: { xs: 'center', md: 'left' }
                                    }}
                                >
                                    With built-in human detection tech, the camera alerts you when a person <br /> is detected.
                                </Typography>

                                <Grid container spacing={2} sx={{ mb: 3 }}>
                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: { xs: 'center', md: 'flex-start' }
                                        }}>
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                color: '#ff6f00',
                                                mr: 1
                                            }}>
                                                <ShieldCheck size={18} />
                                            </Box>
                                            <Typography variant="body2">95% fewer false alarms</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: { xs: 'center', md: 'flex-start' }
                                        }}>
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                color: '#ff6f00',
                                                mr: 1
                                            }}>
                                                <Wifi size={18} />
                                            </Box>
                                            <Typography variant="body2">Real-time notifications</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Typography
                                    color="text.secondary"
                                    sx={{
                                        mb: 2,
                                        textAlign: { xs: 'center', md: 'left' }
                                    }}
                                >
                                    AI-powered human detection is more accurate than traditional motion <br /> sensors,
                                    reducing false alarms by up to 95%.
                                </Typography>

                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: { xs: 'center', md: 'flex-start' }
                                }}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            mt: 2,
                                            backgroundColor: '#4f46e5',
                                            '&:hover': { backgroundColor: '#4338ca' }
                                        }}
                                        endIcon={<ArrowRight size={18} />}
                                    >
                                        Learn More
                                    </Button>
                                </Box>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Call to Action Section */}
            <Box sx={{
                bgcolor: '#1a2b42',
                color: 'white',
                py: { xs: 5, md: 8 },
                textAlign: 'center'
            }}>
                <Container maxWidth="md">
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            fontWeight: 'bold',
                            mb: 2,
                            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
                        }}
                    >
                        Ready to secure what matters?
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 4,
                            mx: 'auto',
                            maxWidth: '600px'
                        }}
                    >
                        Get started with our smart security solutions today and enjoy peace of mind knowing your home or business is protected 24/7.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="tel:9898145046" style={{ textDecoration: 'none' }}>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    bgcolor: '#ff6f00',
                                    px: 4,
                                    py: 1.5,
                                    '&:hover': { bgcolor: '#e65100' },
                                }}
                                startIcon={<Phone size={18} />}
                            >
                                Contact Sales
                            </Button>
                        </a>
                        <a href="mailto:harshitkapadia563@gmail.com" style={{ textDecoration: 'none' }}>
                            <Button
                                variant="outlined"
                                size="large"
                                sx={{
                                    color: 'white',
                                    borderColor: 'white',
                                    px: 4,
                                    py: 1.5,
                                    '&:hover': {
                                        borderColor: '#ff6f00',
                                        bgcolor: 'rgba(255,255,255,0.1)',
                                    },
                                }}
                                startIcon={<Mail size={18} />}
                            >
                                Request Demo
                            </Button>
                        </a>
                    </Box>
                </Container>
            </Box>

            {/* Footer */}
            <Box sx={{ bgcolor: '#f5f5f7', py: 4 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Box component="img" src={logo} alt="logo" sx={{ width: 40, mr: 1 }} />
                                <Typography sx={{ color: '#ff6f00', fontWeight: 'bold' }}>
                                    Progressive Blink
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Smart security solutions for modern homes and businesses. Experience unparalleled protection with our innovative camera technology.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <IconButton size="small" sx={{ color: '#ff6f00' }}>
                                    <Box component="span" className="icon-facebook" />
                                </IconButton>
                                <IconButton size="small" sx={{ color: '#ff6f00' }}>
                                    <Box component="span" className="icon-twitter" />
                                </IconButton>
                                <IconButton size="small" sx={{ color: '#ff6f00' }}>
                                    <Box component="span" className="icon-instagram" />
                                </IconButton>
                            </Box>
                        </Grid>

                        <Grid item xs={6} sm={6} md={3}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                                Support
                            </Typography>
                            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                                {['Help Center', 'Contact Us', 'FAQ', 'Downloads'].map(item => (
                                    <Box component="li" key={item} sx={{ mb: 1 }}>
                                        <Button sx={{ color: '#637381', p: 0, textTransform: 'none', '&:hover': { color: '#ff6f00' } }}>
                                            {item}
                                        </Button>
                                    </Box>
                                ))}
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                                Subscribe
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Get the latest updates and offers directly to your inbox.
                            </Typography>
                            <Box
                                component="form"
                                sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    gap: 1
                                }}
                            >
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    style={{
                                        padding: '8px 12px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        flex: 1
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: '#ff6f00',
                                        '&:hover': { bgcolor: '#e65100' },
                                    }}
                                >
                                    <SendIcon fontSize="small" />
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>

                    <Box
                        sx={{
                            borderTop: '1px solid #ddd',
                            mt: 4,
                            pt: 2,
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 2
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            © {new Date().getFullYear()} Progressive Blink. All rights reserved.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button sx={{ color: '#637381', textTransform: 'none', fontSize: '0.8rem' }}>
                                Privacy Policy
                            </Button>
                            <Button sx={{ color: '#637381', textTransform: 'none', fontSize: '0.8rem' }}>
                                Terms of Service
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Scroll to top button */}
            <ScrollTop {...props}>
                <Fab color="primary" size="small" aria-label="scroll back to top" sx={{ bgcolor: '#ff6f00', '&:hover': { bgcolor: '#e65100' } }}>
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </Box>
    );
}

export default Home;