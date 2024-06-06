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
                }
                :host([mode="light"]) {
                    background-color: white;
                    color: black;
                }
            `
        ]
        ;
        
    }
    return Mode;

}