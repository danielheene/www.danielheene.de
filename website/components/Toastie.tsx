import React, { memo, useEffect, useReducer, useRef } from 'react';
import ReactDOM from 'react-dom';

enum ActionType {
  KeyUp = 'Toastie/KeyUp',
  Reset = 'Toastie/Reset',
  SetBuffer = 'Toastie/SetBuffer',
  SetImage = 'Toastie/SetImage',
}

type Action =
  | {
      type: `${ActionType.KeyUp}`;
      payload: string;
    }
  | {
      type: `${ActionType.Reset}`;
    }
  | {
      type: `${ActionType.SetBuffer}`;
      payload: AudioBuffer;
    }
  | {
      type: `${ActionType.SetImage}`;
      payload: string;
    };

type State = {
  success: boolean;
  code: string[];
  buffer?: AudioBuffer;
  image?: string;
};

const keySequence = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
  // 'Enter',
];

export const initialState: State = Object.freeze<State>({
  success: false,
  code: [...keySequence],
  image: undefined,
  buffer: undefined,
});

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.Reset:
      return {
        ...state,
        code: [...initialState.code],
        success: initialState.success,
      };

    case ActionType.KeyUp:
      if (action.payload === state.code[0]) {
        return {
          ...state,
          success: state.code.length === 1,
          code: state.code.slice(1),
        };
      }

      return {
        ...state,
        success: initialState.success,
        code: initialState.code,
      };

    case ActionType.SetBuffer:
      return {
        ...state,
        buffer: action.payload,
      };

    case ActionType.SetImage:
      return {
        ...state,
        image: action.payload,
      };

    default:
      return state;
  }
};

interface ToastieProps {
  audioPath: string;
  imagePath: string;
}

let eventIsRegistered = false;
export const Toastie = memo(
  ({ imagePath, audioPath }: ToastieProps): JSX.Element => {
    const audioContext = useRef<AudioContext>();
    const portalRef = useRef<HTMLDivElement>();
    const [{ success, image, buffer }, dispatch] = useReducer(
      reducer,
      initialState
    );

    /**
     * Prepare react portal as rendering target
     */
    useEffect(() => {
      if (!portalRef.current && document) {
        portalRef.current = document.createElement('div');
        portalRef.current?.classList.add('ReactPortal');
        document.body.appendChild(portalRef.current);
      }

      return () => {
        if (portalRef.current) {
          document.body.removeChild(portalRef.current);
          portalRef.current = undefined;
        }
      };
    }, []);

    /**
     *
     */
    useEffect(() => {
      const handleKeyUpEvent = (event: KeyboardEvent) => {
        dispatch({
          type: 'Toastie/KeyUp',
          payload: event.key,
        });
      };

      setTimeout(() => {
        if (!eventIsRegistered) {
          eventIsRegistered = true;

          window.addEventListener('keyup', handleKeyUpEvent, false);

          console.info(
            '\n%c' +
              '                                                \n' +
              '    you are familiar with video games? 🎮       \n' +
              '    good luck on finding that easter egg! 😉    \n' +
              '                                                \n',
            `
          background: #000;
          color: #fff;
          font-size: 120%;
          font-weight: bold;
          padding: 0 10px;
        `
          );
        }
      }, 0);

      return () => {
        if (eventIsRegistered) {
          eventIsRegistered = false;
          window.removeEventListener('keyup', handleKeyUpEvent, false);
        }
      };
    }, []);

    /**
     *
     */
    useEffect(() => {
      if (success && !buffer) {
        audioContext.current = new AudioContext();

        fetch(audioPath)
          .then((response) => response.arrayBuffer())
          .then((arrayBuffer) =>
            audioContext.current!.decodeAudioData(arrayBuffer)
          )
          .then((audioBuffer) => {
            dispatch({
              type: 'Toastie/SetBuffer',
              payload: audioBuffer,
            });
          })
          .catch((error: Error) => {
            console.error(
              'failed to load easter egg audio 😔\n',
              error.message
            );
          });
      }
    }, [audioPath, buffer, success]);

    /**
     *
     */
    useEffect(() => {
      if (!image) {
        fetch(imagePath)
          .then((response) => response.blob())
          .then((blob) => {
            dispatch({
              type: 'Toastie/SetImage',
              payload: URL.createObjectURL(blob),
            });
          })
          .catch((error: Error) => {
            console.error(
              'failed to load easter egg image 😔\n',
              error.message
            );
          });
      }
    }, [image, imagePath]);

    /**
     *
     */
    useEffect(() => {
      if (buffer && image && success) {
        const audioBuffer = audioContext.current!.createBufferSource();
        audioBuffer.buffer = buffer;
        audioBuffer.onended = () => {
          dispatch({
            type: 'Toastie/Reset',
          });
        };
        audioBuffer.connect(audioContext.current!.destination);
        audioBuffer.start(0);
      }
    }, [buffer, image, success]);

    if (!buffer || !image || !success || !portalRef.current) return null;

    return ReactDOM.createPortal(
      <React.Fragment>
        <div>
          <img src={image} alt='' aria-hidden={true} />
        </div>
        <style jsx>{`
          @keyframes slideInAnimation {
            0% {
              transform: translate(100%);
            }
            100% {
              transform: translate(0);
            }
          }

          div {
            position: absolute;
            display: flex;
            bottom: 0;
            right: 0;
            transform: translate(100%);
            animation: slideInAnimation 200ms ease-in-out normal forwards
              running;
            z-index: 2147483647;
          }

          div > img {
            width: 250px;
            height: 250px;
          }
        `}</style>
      </React.Fragment>,
      portalRef.current
    );
  }
);
