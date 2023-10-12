type LightObject = {
    state: {
        on: boolean;
        bri: number;
        ct: number;
        alert: string;
        colormode: string;
        mode: string;
        reachable: boolean;
    };
    swupdate: {
        state: string;
        lastinstall: string;
    };
    type: string;
    name: string;
    modelid: string;
    manufacturername: string;
    productname: string;
    capabilities: {
        certified: boolean;
        control: {
            mindimlevel: number;
            maxlumen: number;
            ct: {
                min: number;
                max: number;
            };
        };
        streaming: {
            renderer: boolean;
            proxy: boolean;
        };
    };
    config: {
        archetype: string;
        function: string;
        direction: string;
        startup: {
            mode: string;
            configured: boolean;
        };
    };
    uniqueid: string;
    swversion: string;
    swconfigid: string;
    productid: string;
}

export type LightsData = Record<string, LightObject>;

type RoomId = string;

export type RoomAction = {
    on?: boolean;
    bri?: number;
    ct?: number;
    alert?: string;
    colormode?: string;
}

export type RoomActionWithId = RoomAction & {roomId: number}

export type RoomActionWithIds = RoomAction & {roomIds: number[]}

type RoomState = {
    all_on: boolean;
    any_on: boolean;
}

export type Room = {
    name: string;
    lights: string[];
    sensors: any[]; // Modify this type based on the actual data structure of the sensors
    type: string;
    state: RoomState;
    recycle: boolean;
    class: string;
    action: RoomAction;
}

export type RoomsData = {
    [key in RoomId]: Room;
}

export interface SuccessResponse {
    success: {
        [key: string]: boolean;
    };
}
