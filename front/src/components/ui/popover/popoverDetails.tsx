import React from 'react'
import { createPopper } from "@popperjs/core";

type Props = {}

const PopoverDetails = ({ color, children }: any) => {
    const [popoverShow, setPopoverShow] = React.useState(false);
    const btnRef = React.createRef();
    const popoverRef = React.createRef();
    const openPopover = () => {
        createPopper(btnRef.current, popoverRef.current, {
            placement: "left"
        });
        setPopoverShow(true);
    };
    const closePopover = () => {
        setPopoverShow(false);
    };

    return (
        <>
            <div className="flex flex-wrap ">
                <div className="w-full text-center pb-4 ">
                    <div onClick={() => {
                        popoverShow ? closePopover() : openPopover();
                    }} ref={btnRef}>
                        {children}
                    </div>
                   
                    <div
                        className={
                            (popoverShow ? "" : "hidden ") +
                            "bg-slate-600 border-0 mr-3 block z-auto font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg "
                        }
                        ref={popoverRef}
                    >
                        <div>
                            {/* <div
                                className={
                                    "bg-slate-600 text-white opacity-75 font-semibold p-3 mb-0 border-b border-solid border-slate-100 uppercase rounded-t-lg"
                                }
                            >
                                {color} popover title
                            </div> */}
                            <div className="text-white p-3">
                                And here's some amazing content. It's very engaging. Right? 
                                And here's some amazing content. It's very engaging. Right?
                                And here's some amazing content. It's very engaging. Right?
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default PopoverDetails