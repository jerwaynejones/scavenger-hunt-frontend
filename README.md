# Scavenger Hunt Frontend

This React-based frontend application allows users to create customized scavenger hunts with AI-generated clues. It features a clean, modern UI built with Material-UI and offers functionalities like clue generation, theme customization, and clue regeneration, making it ideal for parties, classrooms, and gift reveals.

## Features

- **Theme Generation:** The system will interpret the gift description and generate a theme that it will then use in clue generation.
- **Dynamic Clue Generation:** Users can generate clues for their scavenger hunt based on a theme, gift description, and specific locations.
- **Interactive UI:** Users can interactively add and regenerate clues, and complete the setup of their scavenger hunt.
- **Print and Share:** Provides options to print or save the scavenger hunt as a PDF for offline use. Each clue containing the hiding location, so that setup is easy and straightforward.

## Technologies

- **React.js:** A JavaScript library for building user interfaces.
- **Material-UI:** A popular React UI framework.
- **Axios:** Promise based HTTP client for the browser and node.js.
- **React-to-Print:** A module that allows React components to be printed.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager) /  npx (Node Package Executor)

### Installation

1. Clone the repository:
```bash
  git clone https://github.com/jerwaynejones/scavenger-hunt-frontend.git cd scavenger-hunt-frontend
```
2. Install dependencies:
```bash
  npm install
```
3. Start the development server:
```bash
  npm start
```


## Usage

The application is structured around several key components that manage different aspects of a scavenger hunt:

- **GiftDescription:** Entry point where users input the gift description and the final location.
- **ClueGenerator:** Users can generate clues based on the input from the GiftDescription component.
- **PrintOutput:** Allows users to view a summary of their scavenger hunt and print it.
- **Ad:** Integration with Google AdSense for monetization.

Navigate through the app using a step-by-step process facilitated by a stepper component.

## License

See the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- **CS50x at Harvard University:** For inspiring the project's initiation and providing a foundational understanding of computer science principles.
- **ChatGPT and GitHub Copilot:** Utilized for coding assistance and to streamline the development process, enhancing the project's overall quality and efficiency.
- **OpenAI API:** Used for generating AI-powered clues, enhancing the scavenger hunt experience for users.
- **Node.js Community:** For continuous support and libraries that enhanced the development process.
- **React Community:** For providing a robust ecosystem of tools and libraries that accelerated the development of the frontend application.
- **npm:** For managing project dependencies and enabling seamless integration of third-party packages.'
- **Material-UI Community:** For providing a rich set of components and design guidelines that helped in creating a visually appealing UI.
- **GitHub:** For hosting the project repository and facilitating collaboration among contributors.
- **React-to-Print:** For enabling the printing functionality within the application, allowing users to save and share their scavenger hunts easily.
- **Google AdSense:** Integrated for monetization purposes, supporting the sustainability of the project.



