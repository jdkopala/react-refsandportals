import { forwardRef, useImperativeHandle, useRef } from "react";

// This is how we use a ref across components pre React 19:
const ResultModal = forwardRef(function ResultModal({ result, targetTime }, ref) {
    const dialog = useRef();

    // This function can expose callable functions to other components
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    });

    return (
        <dialog ref={dialog} className="result-modal">
            <h2>You {result}!</h2>
            <p>The target time was <strong>{targetTime} seconds</strong></p>
            <p>You stopped the timer with <strong>X seconds left.</strong></p>
            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>
    );
})

export default ResultModal;

//// This method is cleaner and will work with React 19+
// export default function ResultModal({ ref, result, targetTime }) {
//     useImperativeHandle(ref);
//     return (
//         <dialog ref={ref} className="result-modal">
//             <h2>You {result}!</h2>
//             <p>The target time was <strong>{targetTime} seconds</strong></p>
//             <p>You stopped the timer with <strong>X seconds left.</strong></p>
//             <form method="dialog">
//                 <button>Close</button>
//             </form>
//         </dialog>
//     );
// }