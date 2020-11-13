export declare const identity: (x: any) => any;
export declare const elements: ({
    data: {
        id: string;
        label: string;
        source?: undefined;
        target?: undefined;
    };
} | {
    data: {
        id: string;
        source: string;
        target: string;
        label?: undefined;
    };
})[];
export declare const stylesheet: {
    selector: string;
    style: {
        label: string;
    };
}[];
export declare const zoom = 1;
export declare const pan: {
    x: number;
    y: number;
};
export declare const defaults: {
    diff: (a: any, b: any) => boolean;
    get: (obj: any, key: any) => any;
    toJson: (obj: any) => any;
    forEach: (arr: any, iterator: any) => any;
    elements: ({
        data: {
            id: string;
            label: string;
            source?: undefined;
            target?: undefined;
        };
    } | {
        data: {
            id: string;
            source: string;
            target: string;
            label?: undefined;
        };
    })[];
    stylesheet: {
        selector: string;
        style: {
            label: string;
        };
    }[];
    zoom: number;
    pan: {
        x: number;
        y: number;
    };
};
