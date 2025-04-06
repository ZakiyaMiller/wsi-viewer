# WSI Viewer

A Whole Slide Image (WSI) viewer with detection overlay capabilities built using React and OpenSeadragon.

## Features

- Interactive WSI viewing with zoom and pan
- Detection box overlay support
- Mini-map navigator
- Toggle detection visibility
- View locking mechanism for fixed positioning
- Real-time image analysis display

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm start
```

## Usage

- Use mouse wheel to zoom
- Click and drag to pan
- Use navigator for quick navigation
- Toggle detection boxes using the button
- Lock/unlock view to freeze current position:
  - Click "Lock View" to disable pan and zoom
  - Click "Unlock View" to re-enable interactions
  - Useful for analysis of specific regions

## Dependencies

- React
- OpenSeadragon
- Material-UI

## License

MIT
