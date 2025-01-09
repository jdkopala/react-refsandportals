import { forwardRef, useImperativeHandle, useRef } from "react";

// This is how we use a ref across components pre React 19:
const ResultModal = forwardRef(function ResultModal({ targetTime, timeRemaining, onReset }, ref) {
    const dialog = useRef();

    const userLost = timeRemaining <= 0
    const formattedTimeRemaining = (timeRemaining / 1000).toFixed(2)
    const score = (1 - timeRemaining / (targetTime * 1000)) * 100;

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
            {userLost && <h2>You Lost!</h2>}
            {!userLost && <h2>Your Score: {score}</h2>}
            <p>The target time was <strong>{targetTime} seconds</strong></p>
            <p>You stopped the timer with <strong>{formattedTimeRemaining} seconds left.</strong></p>
            <form method="dialog" onSubmit={onReset}>
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