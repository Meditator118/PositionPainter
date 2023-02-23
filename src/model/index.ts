
export interface initPosition{
    x: number;
    stay: boolean;
    y: number;
    id: string;
    z: number;
    timestamp: number;
    sampleTime: string;
    sampleBatch: number;
}
export interface initAcc{
    gyroscopey:number;
    accz:number;
    gyroscopex:number;
    id:number;
    x:number;
    y:number;
    accx:number;
    theta:number;
    accy:number;
    error:number;
    gyroscopez:number;
    timestamp:number;
}
export interface Acc{
    gyroscopey:number;
    accz:number;
    gyroscopex:number;
    id:string;
    accx:number;
    accy:number;
    gyroscopez:number;
    timestamp:number;
    sampleTime:string;
    sampleBatch:number;
    stay:boolean;
}
export interface csvinitPosition{
    x: number;
    stay: number;
    y: number;
    id: number;
    z: number;
    timestamp: number;
    sample_time: string;
    sample_batch: number;
    bs_address: string;
    address: string;
}
export interface truepos{
    x: number;
    y: number;
    id: string;
   step:number;
   magic:number;
}
