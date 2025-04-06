import React, { useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import OpenSeadragon from "openseadragon";
import wsiImage from "../assets/wsi-image.png";
import output from "../data/output.json";

const VIEWER_CONFIG = {
  id: "openseadragon-viewer",
  showNavigator: true,
  navigatorPosition: "TOP_RIGHT",
  navigatorHeight: "150px",
  navigatorWidth: "200px",
  navigatorAutoFade: false,
  prefixUrl: "//openseadragon.github.io/openseadragon/images/",
  animationTime: 0.5,
  immediateRender: true,
  preserveViewport: true,
  visibilityRatio: 1,
  minZoomLevel: 0.1,
  maxZoomPixelRatio: 4,
  maxZoomLevel: 10,
  zoomPerClick: 1.4,
  zoomPerScroll: 1.4,
  debugMode: false,
  gestureSettingsMouse: {
    clickToZoom: true,
    dblClickToZoom: true,
    dragToPan: true,
    scrollToZoom: true,
  }
};

const ImageViewer = ({ isLocked }) => {
  const viewerRef = useRef(null);
  const viewer = useRef(null);

  const parseDetectionData = () => {
    try {
      const rawData = output.inference_results;
      const match = rawData.match(/detection_results':\s*(\[\[.*?\]\])/s);
      if (!match) throw new Error("No detection results found");
      return JSON.parse(match[1].replace(/'/g, '"').trim());
    } catch (error) {
      console.error("Error parsing detection data:", error);
      return [];
    }
  };

  const addDetectionOverlays = (viewer) => {
    try {
      const detections = parseDetectionData();
      console.log(`Found ${detections.length} detections`);

      // Create SVG overlay and append to canvas container
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("class", "detection-overlay");
      svg.setAttribute("id", "detection-overlay");
      svg.setAttribute("viewBox", "0 0 1024 512");

      // Append to canvas container instead of viewer element
      const container = viewer.canvas.parentElement;
      container.appendChild(svg);

      // Function to update overlay positions
      const updateOverlayPositions = () => {
        const viewport = viewer.viewport;
        if (!viewport) return;

        const SCALE_FACTOR = 0.85; // Adjust this value to change box size (0.85 = 85% of original size)

        detections.forEach(([x1, y1, x2, y2], index) => {
          const rect = svg.children[index];
          if (!rect) return;

          // Calculate center point of the box
          const centerX = (x1 + x2) / 2;
          const centerY = (y1 + y2) / 2;

          // Calculate scaled dimensions
          const width = (x2 - x1) * SCALE_FACTOR;
          const height = (y2 - y1) * SCALE_FACTOR;

          // Calculate new coordinates based on center and scaled dimensions
          const newX1 = centerX - (width / 2);
          const newY1 = centerY - (height / 2);

          // Convert to viewport rectangle
          const viewportRect = viewport.imageToViewportRectangle(newX1, newY1, width, height);
          const screenRect = viewport.viewportToViewerElementRectangle(viewportRect);

          // Apply screen coordinates
          rect.setAttribute("x", screenRect.x-25);
          rect.setAttribute("y", screenRect.y-55);
          rect.setAttribute("width", screenRect.width);
          rect.setAttribute("height", screenRect.height);
        });
      };

      // Create detection boxes
      detections.forEach(() => {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("class", "detection-box");
        svg.appendChild(rect);
      });

      // Add event handlers
      viewer.addHandler('update-viewport', updateOverlayPositions);
      viewer.addHandler('animation', updateOverlayPositions);
      viewer.addHandler('resize', updateOverlayPositions);
      
      // Initial position update
      updateOverlayPositions();

    } catch (error) {
      console.error("Error adding overlays:", error);
    }
  };

  useEffect(() => {
    if (viewer.current) {
      // Update lock state
      viewer.current.setMouseNavEnabled(!isLocked);
      viewer.current.outerTracker.setTracking(!isLocked);
      viewer.current.innerTracker.setTracking(!isLocked);
      
      // Disable viewport changes when locked
      if (isLocked) {
        viewer.current.viewport.applyConstraints();
      }
    }
  }, [isLocked]);

  useEffect(() => {
    if (!viewer.current) {
      viewer.current = OpenSeadragon({
        ...VIEWER_CONFIG,
        tileSources: {
          type: "image",
          url: wsiImage,
          width: 1024,
          height: 512
        }
      });

      viewer.current.addHandler('open', () => {
        setTimeout(() => addDetectionOverlays(viewer.current), 500);
      });
    }

    return () => {
      if (viewer.current) {
        viewer.current.destroy();
        viewer.current = null;
      }
    };
  }, []);

  return (
    <div className="image-viewer-container">
      <div 
        id="openseadragon-viewer" 
        ref={viewerRef} 
        style={{ width: "100%", height: "100%" }} 
      />
    </div>
  );
};

ImageViewer.propTypes = {
  isLocked: PropTypes.bool.isRequired
};

export default ImageViewer;
