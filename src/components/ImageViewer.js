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

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("class", "detection-overlay");
      svg.setAttribute("id", "detection-overlay");
      svg.setAttribute("viewBox", "0 0 1024 512");
      svg.style.position = "absolute";
      svg.style.left = "0";
      svg.style.top = "0";
      svg.style.width = "100%";
      svg.style.height = "100%";
      svg.style.pointerEvents = "none";

      detections.forEach(([x1, y1, x2, y2]) => {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("class", "detection-box");
        rect.setAttribute("x", x1);
        rect.setAttribute("y", y1);
        rect.setAttribute("width", x2 - x1);
        rect.setAttribute("height", y2 - y1);
        svg.appendChild(rect);
      });

      viewer.element.appendChild(svg);

      const updateOverlay = () => {
        const viewport = viewer.viewport;
        if (!viewport) return;

        const zoom = viewport.getZoom(true);
        const bounds = viewport.getBounds(true);
        const transform = `scale(${1/bounds.width}) translate(${-bounds.x}px, ${-bounds.y}px)`;
        svg.style.transform = transform;
      };

      viewer.addHandler('animation', updateOverlay);
      viewer.addHandler('zoom', updateOverlay);
      viewer.addHandler('pan', updateOverlay);
      updateOverlay();

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
