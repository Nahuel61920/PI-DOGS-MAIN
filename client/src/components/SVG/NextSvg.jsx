import * as React from "react";
import './next_prev.css';


const NextSvg = (props) => (
    <div className="wrapper btn-slide next">
        <svg
        width={18}
        height={17}
        viewBox="-1 0 18 17"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        >
            <path
            className="arrow"
            d="M16.375 8.339 7.76 15.307l-.857-.99 7.387-5.975-7.383-5.914.852-.992z"
            />
            <path
            className="arrow-fixed"
            d="M16.375 8.339 7.76 15.307l-.857-.99 7.387-5.975-7.383-5.914.852-.992z"
            />
            <path d="M0 .562v15.63L9.708 8.34 0 .562Zm1.333 2.74 6.292 5.04-6.292 5.09V3.303Z" />
        </svg>
    </div>
);

export default NextSvg;
