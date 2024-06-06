import { LitElement, css} from 'lit';
import { property} from 'lit/decorators.js';

type Constructor<T = {}> = new (...args: any[]) => T;

export const ModeMixin = <T extends Constructor<LitElement>>(superClass: T) => {
    class Mode extends superClass {
        @property({type: String})
        mode: 'dark' | 'light' = 'light'; // Default mode can be set here


        static styles = [
            (superClass as any).styles || css``, // Include superClass styles if any or else keep it empty
            css`
                :host([mode="dark"]) {
                    background-color: black;
                    color: white;
                    --button-bg-color:  rgb(0, 165, 152);
                    --button-color:  white;
                    --button-hover-color: rgb(1, 106, 100);
                    --task-item-bg-color: dimgray;
                }
                :host([mode="light"]) {
                    background-color: #f4f5fa;
                    color: black;
                    --button-bg-color: #5ddddd; 
                    --button-color: black;
                    --button-hover-color: #5dbea3;
                    --task-item-bg-color: #DCDCDC;
                }
            `
        ]
        ;
        
    }
    return Mode;

}