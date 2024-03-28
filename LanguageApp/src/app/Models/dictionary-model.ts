export interface DictionaryModel {
   
        meta:     Meta;
        hom?:     number;
        hwi:      Hwi;
        fl:       string;
        ins?:     In[];
        def:      Def[];
        et?:      Array<string[]>;
        date:     string;
        shortdef: string[];
    }
    
    export interface Def {
        sseq: Array<Array<Array<SseqClass | SseqEnum>>>;
    }
    
    export interface SseqClass {
        sn?:      string;
        dt?:      Array<Array<Array<Array<string[]> | DtClass> | string>>;
        sdsense?: Sdsense;
        sls?:     string[];
        sense?:   Sense;
        vrs?:     VR[];
    }
    
    export interface DtClass {
        t:   string;
        aq?: Aq;
    }
    
    export interface Aq {
        auth: string;
    }
    
    export interface Sdsense {
        sd: string;
        dt: Array<string[]>;
    }
    
    export interface Sense {
        dt: Array<string[]>;
    }
    
    export interface VR {
        vl: string;
        va: string;
    }
    
    export enum SseqEnum {
        Bs = "bs",
        Sen = "sen",
        Sense = "sense",
    }
    
    export interface Hwi {
        hw:   string;
        prs?: PR[];
    }
    
    export interface PR {
        mw:     string;
        sound?: Sound;
    }
    
    export interface Sound {
        audio: string;
        ref:   string;
        stat:  string;
    }
    
    export interface In {
        il:  string;
        ifc: string;
        if:  string;
    }
    
    export interface Meta {
        id:        string;
        uuid:      string;
        sort:      string;
        src:       string;
        section:   string;
        stems:     string[];
        offensive: boolean;
    }
    

