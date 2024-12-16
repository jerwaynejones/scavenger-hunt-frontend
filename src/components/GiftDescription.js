// src/components/GiftDescription.js
import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Box,
    Paper,
    Stack,
} from '@mui/material';

const wizardPlaceholders = {
    giftDescriptions: [
        'A wand carved from ancient oak, rumored to contain a dragon heartstring core',
        'A Phoenix feather quill that glows softly in moonlight',
        'A tiny bottle of shimmering potion that grants a moment of levitation',
        'A spellbound music box that whispers old wizarding tales',
        'A charmed compass that always points to your fondest memory',
        'A miniature crystal ball that giggles softly when visions appear',
        'A set of runic dice that whisper secrets of future fortunes',
        'An enchanted locket that hums lullabies at twilight',
        'A pair of spectacles that reveal hidden runes and glyphs',
        'A stained scroll that can only be read under starlight',
        'A goblet that refills itself with chocolate-infused elixir',
        'A haunted inkpot that giggles when you dip your quill',
        'A brooch shaped like a griffin’s wing, granting brief bursts of courage',
        'A pocket mirror that compliments you in different languages',
        'A ledger that records dreams instead of debts',
        'A spellbook that rearranges its pages at dawn',
        'A teacup that brews tea based on your current mood',
        'A harp string that hums soft melodies to calm beasts',
        'A leather-bound journal that writes back encouraging notes',
        'A glove stitched with dragon scales that warms your hand at will',
        'A paintbrush that colors the air with illusions',
        'A lantern that glows brighter when danger approaches',
        'A puzzle box that hides one secret per moon cycle',
        'A quiver that never runs out of feather-tipped arrows',
        'A cloak pin that whispers safe paths in the forest',
        'A deck of cards that shuffles itself into prophetic patterns',
        'A cameo brooch that stores a single whispered secret',
        'A silvered pipe that puffs out shapes of legendary creatures',
        'A ring that glows whenever truth is spoken nearby',
        'A wooden flute that summons gentle breezes from the north',
        'A gemstone necklace that blinks like a firefly in darkness',
        'A chalkboard slate that scribbles old folk remedies',
        'A ribbon that knots itself into protective charms',
        'A quill that can only write compliments',
        'A tiny hourglass that slows time when turned thrice',
        'A lock of unicorn hair kept in a crystal vial',
        'A tapestry needle that mends torn enchantments in fabric',
        'A charmed bell that wards off mischievous spirits',
        'A thimble that glows when a storm approaches',
        'A wooden token carved with a sigil of luck',
        'A whistle that translates bird songs into poetry',
        'A snail shell locket that hums when rain nears',
        'A rosewood wand that smells faintly of cinnamon',
        'A teapot that tells riddles before pouring tea',
        'A bracelet woven from moonbeams, cool to the touch',
        'A paint palette that reveals hidden messages when water is added',
        'A pair of gloves that let you feel whispers in old corridors',
        'A brooch that changes shape each full moon',
        'A spindle that can spin illusions from moonlight',
        'A stone feather that floats a few inches off the ground'
    ],

    finalLocations: [
        'Inside the old spellbook resting on the highest shelf',
        'Concealed behind an enchanted tapestry in the corridor',
        'Within a secret drawer hidden in the wizard’s oak desk',
        'Under the cushion of the old wingback chair by the hearth',
        'In the dusty alcove behind a trick bookshelf in the library',
        'Beneath the loose floorboard beneath a singing chandelier',
        'Under a patch of glowing moss behind the greenhouse',
        'Within a hollowed-out pumpkin in the old kitchen pantry',
        'Inside the cracked gargoyle statue guarding the stairwell',
        'Tucked behind a curtain woven with stardust threads',
        'In a small compartment hidden under a potions cabinet',
        'Behind an old tapestry depicting a duel of fire and ice',
        'Inside a hollow staff propped against the eastern wall',
        'Beneath an enchanted stepping stone in the courtyard',
        'Within a secret pocket sewn into a giant’s cloak',
        'Hidden in a jar of glittering beetle shells on a windowsill',
        'Behind a panel in the enchanted mirror frame',
        'Inside a hollow log under the whispering willow tree',
        'Concealed in a wooden chest that squeaks when opened',
        'Under a pile of spell-touched autumn leaves near the gate',
        'Secreted in a crevice of the castle’s old battlements',
        'In a dried-up well that hums faint lullabies at dusk',
        'Within a trapdoor under the alchemy lab’s marble floor',
        'Nestled among old broomsticks in the dusty broom shed',
        'Hidden in a pocket dimension accessed through a broom closet',
        'Behind a portrait that winks when you’re near',
        'Inside a lantern that never runs out of fireflies',
        'Beneath a bridge where fish whisper forgotten spells',
        'In a cobwebbed cupboard that smells faintly of cocoa',
        'Tucked under a pile of enchanted quilting fabric',
        'Behind a false panel in the ancient clock tower',
        'Underneath a giant mushroom in the enchanted garden',
        'In the hollow of a tree that sprouts silver leaves',
        'Inside a teacup cabinet that rearranges itself at noon',
        'Behind a door painted to look like solid stone',
        'Concealed in a crate that chirps like a cricket at midnight',
        'Within a rain barrel that reflects distant constellations',
        'Hidden in a honey jar that never empties',
        'Beneath a tapestry depicting singing mermaids',
        'Inside a fox-shaped lantern that glows when curious',
        'Tucked away in a violin case that hums lullabies',
        'In a wicker basket that sometimes scuttles about by itself',
        'Behind a small door disguised as part of the wainscoting',
        'Inside a hollow candle that smells of peppermint and pine',
        'Under a rug woven from unicorn mane fibers',
        'In a cubbyhole carved into a gargoyle’s grin',
        'Inside a wine bottle that refills with moonlight dew',
        'Behind a waterfall of shimmering stardust strands',
        'Within a crystal chest that rattles softly at sunrise',
        'Under a stepping stone that whispers riddles at midnight'
    ]

};

function getRandomPlaceholder(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function GiftDescription({ onSubmit, loading }) {
    const [giftDescription, setGiftDescription] = useState('');
    const [finalLocation, setFinalLocation] = useState('');
    const [difficultyLevel, setDifficultyLevel] = useState('Medium');

    const [giftPlaceholder, setGiftPlaceholder] = useState('');
    const [locationPlaceholder, setLocationPlaceholder] = useState('');

    useEffect(() => {
        setGiftPlaceholder(getRandomPlaceholder(wizardPlaceholders.giftDescriptions));
        setLocationPlaceholder(getRandomPlaceholder(wizardPlaceholders.finalLocations));
    }, []);

    const handleSubmit = () => {
        if (giftDescription && finalLocation) {
            onSubmit({ giftDescription, finalLocation, difficultyLevel });
        } else {
            alert('Please provide the gift description and final hiding place.');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Create Your Scavenger Hunt
                </Typography>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                        <CircularProgress />
                    </Box>
                ) : (
                    <Stack spacing={2}>
                        <TextField
                            label="Gift Description"
                            variant="outlined"
                            fullWidth
                            value={giftDescription}
                            onChange={(e) => setGiftDescription(e.target.value)}
                            disabled={loading}
                            placeholder={giftPlaceholder}
                        />
                        <TextField
                            label="Final Hiding Place"
                            variant="outlined"
                            fullWidth
                            value={finalLocation}
                            onChange={(e) => setFinalLocation(e.target.value)}
                            disabled={loading}
                            placeholder={locationPlaceholder}
                        />
                        <FormControl fullWidth variant="outlined" disabled={loading}>
                            <InputLabel id="difficulty-select-label">Difficulty Level</InputLabel>
                            <Select
                                variant='outlined'
                                labelId="difficulty-select-label"
                                value={difficultyLevel}
                                onChange={(e) => setDifficultyLevel(e.target.value)}
                                label="Difficulty Level"
                            >
                                <MenuItem value="Easy">Easy (Suitable for Children and Beginners) </MenuItem>
                                <MenuItem value="Medium">Medium (Suitable for Most Players) </MenuItem>
                                <MenuItem value="Hard">Hard (Suitable for Seasoned Players and Clue Solvers) </MenuItem>

                            </Select>
                        </FormControl>
                        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth disabled={loading}>
                            Generate First Clue
                        </Button>
                    </Stack>
                )}
            </Paper>
        </Container>
    );
}

export default GiftDescription;
