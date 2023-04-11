import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { Direction, getTrackBackground, Range } from 'react-range';

interface IProps {
  values?: number[];
  setValues?: (values: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  open?: boolean;
}

const VolumeSlider: React.FC<IProps> = ({
  values = [50],
  setValues,
  min = 0,
  max = 1,
  step = 0.1,
  open,
}) => {
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className={`h-[100px] w-[23px] flex justify-center`}
            initial={{ height: 0 }}
            animate={{ height: '100px', transition: { duration: 0.3 } }}
            exit={{ height: 0 }}
          >
            <Range
              step={step}
              min={min}
              max={max}
              values={values}
              direction={Direction.Up}
              onChange={(values) => setValues && setValues(values)}
              renderTrack={({ props, children }) => (
                <div
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{
                    ...props.style,
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                  }}
                >
                  <div
                    ref={props.ref}
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: '4px',
                      background: getTrackBackground({
                        values: values,
                        colors: ['#EE4950', '#E4E7E6'],
                        min: min,
                        max: max,
                        direction: Direction.Up,
                      }),
                    }}
                  >
                    {children}
                  </div>
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '10px',
                    width: '10px',
                    backgroundColor: '#999',
                    display: 'none',
                  }}
                />
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VolumeSlider;
