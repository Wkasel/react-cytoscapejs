import React, { FC, useEffect, useState, useLayoutEffect, useRef } from "react";
import { defaults } from "./defaults";
import Cytoscape from "cytoscape";
import { patch } from "./patch";
import { ICytoscapeContext, ICytoscapeComponent } from './typescript-types'



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



export const CytoscapeComponent = () => <div>Test</div>


export const CytoscapeContext = React.createContext<ICytoscapeContext>(null || {});



/**
 * The `CytoscapeComponent` is a React component that allows for the declarative creation
 * and modification of a Cytoscape instance, a graph visualisation.
 */
export const TestCytoscapeComponent: FC<ICytoscapeComponentProps> = props => {

  const $cy = useRef<Cytoscape>(null);
  const $container = useRef<HTMLDivElement>(null);
  console.log({ props })
  const [state, setState] = useState({
    ...defaults,
    ...props,
  })

  const updateCytoscape = (prevProps, newProps) => {
    if (!$cy.current) return;
    const { diff, toJson, get, forEach } = newProps;
    console.log($cy)
    // , diff, toJson, get, forEach
    patch($cy.current, prevProps, newProps, null, null, null, null);
    if (newProps.cy != null) {
      newProps.cy($cy.current);
    }
  };

  useLayoutEffect(
    () => {
      // if (!$cy.current) return

      setState({ ...state, ...props })

      $cy.current = new Cytoscape({
        ...defaults,
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

      $cy.current.ready(() => {
        console.log('cytoscape ready')
      })

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


  return (
    <>
      <div ref={$container} style={{ width: "100vw", height: "100vh" }} />
    </>
  )
};

CytoscapeComponent.displayName = `CytoscapeComponent`;
CytoscapeComponent.defaultProps = defaults;

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

