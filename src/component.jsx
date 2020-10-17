import { useEffect, useLayoutEffect, useRef } from 'react';
import { types } from './types';
import { defaults } from './defaults';
import Cytoscape from 'cytoscape';
import { patch } from './patch';

/**
 * The `CytoscapeComponent` is a React component that allows for the declarative creation
 * and modification of a Cytoscape instance, a graph visualisation.
 */


export const CytoscapeComponent = (props) => {

  const $cy = useRef(null);
  const $container = useRef(null);


  const updateCytoscape = (prevProps, newProps) => {
    const { diff, toJson, get, forEach } = newProps;

    patch($cy.current, prevProps, newProps, diff, toJson, get, forEach);

    if (newProps.cy != null) {
      newProps.cy($cy.current);
    }
  };

  useLayoutEffect(() => {

    $cy.current = () => Cytoscape({
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
  }, [$cy, $container]);

  useEffect(() => {
    updateCytoscape(null, props);
  }, [props]);

  return <div ref={$container} style={{ width: "100vw", height: "100vh" }} />;

};

CytoscapeComponent.displayName = `CytoscapeComponent`;
CytoscapeComponent.propTypes = () => types;
CytoscapeComponent.defaultProps = () => defaults;
CytoscapeComponent.normalizedElements = elements => {
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




// componentDidUpdate(prevProps) {
//   this.updateCytoscape(prevProps, this.props);
// }

// componentWillUnmount() {
//   this._cy.destroy();
// }

// render() {
//   const { id, className, style } = this.props;

//   return React.createElement('div', {
//     id,
//     className,
//     style
//   });
// }
// }
