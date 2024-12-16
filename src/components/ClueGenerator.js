// src/components/ClueGenerator.js
import React, { useState, useEffect } from 'react';
import api from '../api';
import {
    Container,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    Box,
    Paper,
    Stack,
    Divider
} from '@mui/material';

const wizardPlaceholders = {
    roomNames: [
        'The Potion Chamber',
        'The Enchanted Study',
        'The Grand Hall of Whispers',
        'The Owlery Tower',
        'The Secret Greenhouse',
        'The Hall of Everblooming Lilies',
        'The Moonlit Observatory',
        'The Chamber of Echoing Footsteps',
        'The Scriptorium of Lost Ink',
        'The Crystal Grotto of Murmurs',
        'The Gallery of Living Portraits',
        'The Candlelit Atrium of Tongued Ferns',
        'The Cauldron Room of Bubbling Brews',
        'The Velvet Library of Whispering Tomes',
        'The Astral Courtyard of Drifting Will-O’-Wisps',
        'The Hall of Starlit Carpets',
        'The Gilded Pantry of Singing Spoons',
        'The Sepia Gallery of Timeless Murals',
        'The Cellar of Dreaming Wines',
        'The Workshop of Charmed Gears',
        'The Serpent’s Conservatory of Hissing Vines',
        'The Ember Hall of Eternal Coals',
        'The Chamber of Riddling Herbs',
        'The Hallway of Laughing Statues',
        'The Harp Room of Echoing Chords',
        'The Skylit Balcony of Petal Showers',
        'The Inkblack Corridor of Silent Footprints',
        'The Marmalade Parlour of Tasting Shadows',
        'The Rosewood Hall of Secret Keys',
        'The Map Room of Ever-Shifting Doors',
        'The Lantern-Strewn Bridge of Echoed Giggles',
        'The Mossy Alcove of Whispered Truces',
        'The Sapphire Antechamber of Flickering Moons',
        'The Root Cellar of Sleeping Seeds',
        'The Ivory Tower of Shifting Pages',
        'The Honeyed Alcove of Sweet Murmurs',
        'The Moonberry Laboratory of Scented Spells',
        'The Painted Loft of Tiptoeing Breezes',
        'The Velvet Dormitory of Muted Dreams',
        'The Amphitheater of Singing Nightingales',
        'The Sandstone Gallery of Sun-Kissed Runes',
        'The Leafy Nook of Secret Nestings',
        'The Echoing Cloister of Hollow Winds',
        'The Whisperwood Deck of Floating Leaves',
        'The Silvered Vestibule of Snowy Gleams',
        'The Nightshade Crypt of Soft Whispers',
        'The Morningstar Pavilion of Dewy Petals',
        'The Emberlit Balcony of Rising Moths',
        'The Clouded Rotunda of Passing Whispers',
        'The Juniper Attic of Lingering Laughs'
    ],

    hidingSpots: [
        'beneath the levitating candles',
        'inside the enchanted cauldron',
        'tucked behind a row of enchanted broomsticks',
        'hidden under shimmering spell scrolls',
        'behind a curtain of invisibility threads',
        'beneath a pile of whispering leaves',
        'inside a hollow pumpkin enchanted to giggle',
        'tucked in the shadow of a living statue',
        'behind a tapestry that hums lullabies',
        'under a table carved with runic scripts',
        'concealed within a jar of glowing fireflies',
        'inside a trunk that shuffles its contents at dusk',
        'beneath a cluster of chattering mushrooms',
        'inside a bookshelf that rearranges titles nightly',
        'behind a mirror that reflects distant galaxies',
        'hidden under a rug that hovers slightly off the floor',
        'beneath a bench carved from petrified moonlight',
        'inside a tea chest that whispers brewing secrets',
        'tucked into the folds of a cloak that changes colors',
        'behind a panel that imitates voices of old heroes',
        'under a cushion that purrs when sat upon',
        'within a cupboard that giggles if opened at midnight',
        'inside a hollow gargoyle perched above the rafters',
        'beneath a row of crystal bottles that hum in harmony',
        'inside a vase that never gathers dust',
        'hidden under a broken wand that sparks softly',
        'behind a chair that sighs when moved',
        'under a shelf of quills that babble in ancient tongues',
        'inside a lantern that flickers with captured sunlight',
        'tucked behind a shield that glows at dawn',
        'beneath a chair carved with serpentine patterns',
        'hidden in a boot that walks by itself occasionally',
        'behind a pillow that sings lullabies',
        'under a bucket that never empties of rainwater',
        'inside a clock that chimes in reversed hours',
        'under a stand of enchanted reeds that hum softly',
        'behind a pot that grows candy-scented flowers',
        'within a chest that meows faintly',
        'tucked in a nook behind a glowing tapestry',
        'beneath a cage of silent singing birds',
        'inside a goblet that refills with starry nectar',
        'behind a plaque that changes its inscription daily',
        'under a letterbox that whispers arriving messages',
        'concealed in a hollowed-out broom handle',
        'inside a scroll case that rattles with secret maps',
        'behind a frame that shows scenes from old legends',
        'under a footstool that snores quietly',
        'inside a jar that glows brighter when whispered to',
        'beneath a lamp that filters moonbeams',
        'tucked behind a painting that blinks in greeting'
    ]
};

function getRandomPlaceholder(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function ClueGenerator({
                           theme,
                           giftDescription,
                           finalLocation,
                           difficultyLevel,
                           clues,
                           locations,
                           setClues,
                           setLocations,
                           onComplete
                       }) {

    const [roomName, setRoomName] = useState('');
    const [hidingSpotDescription, setHidingSpotDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [regenerations, setRegenerations] = useState(0);

    const [roomPlaceholder, setRoomPlaceholder] = useState('');
    const [hidingSpotPlaceholder, setHidingSpotPlaceholder] = useState('');

    useEffect(() => {
        setRoomPlaceholder(getRandomPlaceholder(wizardPlaceholders.roomNames));
        setHidingSpotPlaceholder(getRandomPlaceholder(wizardPlaceholders.hidingSpots));
    }, []);

    const generateClue = async (isRegeneration = false) => {
        if (!theme.trim()) {
            alert('No theme found. Please go back and provide a gift description to generate a theme first.');
            return;
        }

        if (!giftDescription.trim()) {
            alert('No gift description found. Please go back and provide it before generating clues.');
            return;
        }

        if (!isRegeneration && (!roomName.trim() || !hidingSpotDescription.trim())) {
            alert('Please describe the location for this clue.');
            return;
        }

        setLoading(true);

        const updatedClues = [...clues];
        const updatedLocations = [...locations];

        if (!isRegeneration && clues.length > locations.length) {
            const newLabel = `${roomName.trim()} - ${hidingSpotDescription.trim()}`;
            updatedLocations.push(newLabel);
        }

        let previousLocation = finalLocation;
        if (updatedLocations.length > 0) {
            previousLocation = updatedLocations[updatedLocations.length - 1];
        }

        const nextLocation = isRegeneration
            ? (updatedLocations.length > 0 ? updatedLocations[updatedLocations.length - 1] : finalLocation)
            : `${roomName.trim()} - ${hidingSpotDescription.trim()}`;

        try {
            const response = await api.post('/clues/generate', {
                theme,
                giftDescription,
                previousLocation,
                nextLocation,
                difficultyLevel,
            });

            const newClue = response.data.clue;

            if (isRegeneration) {
                updatedClues[updatedClues.length - 1] = newClue;
                setClues(updatedClues);
                setRegenerations(regenerations + 1);
            } else {
                updatedClues.push(newClue);
                setClues(updatedClues);
                setLocations(updatedLocations);
                setRegenerations(0);

                setRoomName('');
                setHidingSpotDescription('');
            }
        } catch (error) {
            console.error('Error generating clue:', error);
            alert('Error generating clue. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRegenerate = () => {
        if (regenerations < 3) {
            if (!roomName.trim() || !hidingSpotDescription.trim()) {
                alert('Please provide location details before regenerating.');
                return;
            }
            generateClue(true);
        } else {
            alert('You have reached the maximum number of regenerations for this clue.');
        }
    };

    const handleComplete = () => {
        onComplete({ clues, locations });
    };

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Generate Your Clues
                </Typography>

                <List sx={{ mb: 2 }}>
                    {clues.map((clue, index) => {
                        const label = index < locations.length ? locations[index] : '';
                        return (
                            <React.Fragment key={index}>
                                <ListItem>
                                    <ListItemText
                                        primary={label ? <Typography variant="h6">{label}</Typography> : ''}
                                        secondary={
                                            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                                                {clue.replace(/\r?\n|\r/g, '')}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                                {index < clues.length - 1 && <Divider sx={{ my: 1 }} />}
                            </React.Fragment>
                        );
                    })}
                </List>

                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
                        <CircularProgress />
                    </Box>
                ) : (
                    <Stack spacing={2}>
                        <Typography variant="h6">
                            Describe the location where we'll hide this clue
                            <Box component="span" sx={{ ml: 1, verticalAlign: 'middle' }}>
                                <Box
                                    component="span"
                                    sx={{
                                        width: '16px',
                                        height: '16px',
                                        display: 'inline-block',
                                        background: `url('/assets/star-icon.png') no-repeat center center`,
                                        backgroundSize: 'contain'
                                    }}
                                />
                            </Box>
                        </Typography>
                        <TextField
                            label="Room Name"
                            variant="outlined"
                            fullWidth
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            placeholder={roomPlaceholder}
                        />
                        <TextField
                            label="Hiding Spot Description"
                            variant="outlined"
                            fullWidth
                            value={hidingSpotDescription}
                            onChange={(e) => setHidingSpotDescription(e.target.value)}
                            placeholder={hidingSpotPlaceholder}
                        />

                        <Button variant="contained" color="primary" onClick={() => generateClue()} fullWidth>
                            Generate Next Clue
                        </Button>
                        {clues.length > 0 && regenerations < 3 && (
                            <Button variant="outlined" color="secondary" onClick={handleRegenerate} fullWidth>
                                Regenerate This Clue ({regenerations}/3)
                            </Button>
                        )}
                        <Button variant="outlined" color="secondary" onClick={handleComplete} fullWidth>
                            Finish and View Scavenger Hunt
                        </Button>
                    </Stack>
                )}
            </Paper>
        </Container>
    );
}

export default ClueGenerator;
