/* eslint-disable */
import { fabric } from 'fabric';
import { useRef, forwardRef, useCallback, useImperativeHandle, useEffect } from 'react';

const useFabric = (ref: any) => {
  const canvas = useRef(null);
  useImperativeHandle(ref, () => canvas.current);
  const fabricRef = useCallback((element: any) => {
    if (canvas.current === null) return;
    // if (!element) return canvas.current?.dispose();
    canvas.current = new fabric.Canvas(element);
  }, []);
  return fabricRef;
};

const MyFabric = forwardRef((props, ref) => {
  const fabricRef = useFabric(ref);
  return (
    <canvas
      className='w-[100%] h-[100%] border'
      width={500}
      height={500}
      ref={fabricRef}
    />
  );
});

MyFabric.displayName = 'fabric';

const MyToolKit = (props) => {
  const { canvas } = props;

  const handleImage = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = () => {
      new fabric.Image.fromURL(reader.result, (image) => {
        image.scale(0.75);
        canvas.current.add(image);
        canvas.current.renderAll();
      });
    };
    reader.readAsDataURL(file);
  };

  const drawText = () => {
    const text = new fabric.IText('hello world', {
      left: 100,
      top: 100,
      fontFamily: 'sans-serif',
    });
    canvas.current.add(text);
  };
  return (
    <div className='flex'>
      <button
        type='button'
        onClick={drawText}
      >
        text
      </button>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor='upload'>image</label>
      <input
        type='file'
        id='upload'
        onChange={handleImage}
        hidden
      />
    </div>
  );
};
export const PresentationView = () => {
  const canvas = useRef(null);
  useEffect(() => {
    // const json = JSON.parse(url);

    (async () => {
      //   const objects = await new Promise((resolve) =>
      //     fabric.util.enlivenObjects(json?.objects, resolve),
      //   );
      //   canvas.current.add(...objects);
    })();
  }, [canvas]);
  return (
    <div className='flex flex-col w-[100%]'>
      <MyToolKit canvas={canvas} />
      <MyFabric ref={canvas} />
    </div>
  );
};
