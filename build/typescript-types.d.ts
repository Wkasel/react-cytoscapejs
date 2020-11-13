export interface ICytoscapeContext {
    container?: any;
    cy?: any;
    setZoom?: any;
    setPan?: any;
    zoomIn?: any;
    zoomOut?: any;
    panBy?: any;
    initialized?: boolean;
}
export interface ICytoscapeElements {
    nodes?: [];
    edges?: [];
}
export interface ICytoscapePan {
    x?: number;
    y?: number;
}
export interface ICytoscapeComponent {
    id?: string;
    className?: string;
    styles?: {};
    elements?: [ICytoscapeElements];
    layout?: any;
    pan?: ICytoscapePan;
    zoom?: number;
    panningEnabled?: boolean;
    userPanningEnabled?: boolean;
    minZoom?: number;
    maxZoom?: number;
    zoomingEnabled?: boolean;
    userZoomingEnabled?: boolean;
    boxSelectionEnabled?: boolean;
    cy?: any;
    headless?: boolean;
    hideEdgesOnViewport?: boolean;
    autolock?: boolean;
}
