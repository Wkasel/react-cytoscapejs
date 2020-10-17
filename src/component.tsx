import React, { useEffect, useLayoutEffect, useRef } from "react";
import { defaults } from "./defaults";
import Cytoscape from "cytoscape";
import { patch } from "./patch";



interface ICytoscapeComponentProps {
  id?: any,
  className?: any,
  style?: any,
  elements?: any,
  stylesheet?: any,
  layout?: any,
  pan?: any,
  zoom?: any,
  panningEnabled?: any,
  userPanningEnabled?: any,
  minZoom?: any,
  maxZoom?: any,
  zoomingEnabled?: any,
  userZoomingEnabled?: any,
  boxSelectionEnabled?: any,
  autoungrabify?: any,
  autolock?: any,
  autounselectify?: any,
  get?: any,
  toJson?: any,
  diff?: any,
  forEach?: any,
  cy?: any,
  headless?: any,
  styleEnabled?: any,
  hideEdgesOnViewport?: any,
  textureOnViewport?: any,
  motionBlur?: any,
  motionBlurOpacity?: any,
  wheelSensitivity?: any,
  pixelRatio?: any,
  normalizedElements?: any
}





/**
 * The `CytoscapeComponent` is a React component that allows for the declarative creation
 * and modification of a Cytoscape instance, a graph visualisation.
 */
export const CytoscapeComponent: React.FC<ICytoscapeComponentProps> = props => {
  const $cy = useRef<Cytoscape>(null);
  const $container = useRef<HTMLDivElement>(null);
  const updateCytoscape = (prevProps, newProps) => {
    const { diff, toJson, get, forEach } = newProps;
    patch($cy.current, prevProps, newProps, diff, toJson, get, forEach);
    if (newProps.cy != null) {
      newProps.cy($cy.current);
    }
  };
  useLayoutEffect(
    () => {
      $cy.current = () =>
        Cytoscape({
          container: $container.current,
          headless: props.headless,
          styleEnabled: props.styleEnabled,
          hideEdgesOnViewport: props.hideEdgesOnViewport,
          textureOnViewport: props.textureOnViewport,
          motionBlur: props.motionBlur,
          motionBlurOpacity: props.motionBlurOpacity,
          wheelSensitivity: props.wheelSensitivity,
          pixelRatio: props.pixelRatio
        });

      // not good practice
      // if (global) {
      //   window[global] = cy;
      // }
      updateCytoscape(null, props);
      return () => {
        $cy.current.destroy();
      };
    },
    [$cy, $container]
  );
  useEffect(
    () => {
      updateCytoscape(null, props);
    },
    [props]
  );
  return <div ref={$container} style={{ width: "100vw", height: "100vh" }} />;
};
CytoscapeComponent.displayName = `CytoscapeComponent`;

export const normalizedElements = elements => {
  const isArray = elements.length != null;
  if (isArray) {
    return elements;
  } else {
    let { nodes, edges } = elements;
    if (nodes == null) {
      nodes = [];
    }
    if (edges == null) {
      edges = [];
    }
    return nodes.concat(edges);
  }
};
