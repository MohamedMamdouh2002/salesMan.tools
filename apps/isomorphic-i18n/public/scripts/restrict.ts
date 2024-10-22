// import { useEffect } from 'react';

// const MyComponent = () => {
//   useEffect(() => {
//     const handleContextMenu = (e: MouseEvent) => {
//       e.preventDefault();
//     };

//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'F12' || (e.ctrlKey && (e.key === 'I' || e.key === 'U' || e.key === 'J'))) {
//         e.preventDefault();
//         e.stopPropagation();
//       }
//     };

//     const checkDevTools = () => {
//       const threshold = 160;
//       const widthThreshold = window.outerWidth - window.innerWidth > threshold;
//       const heightThreshold = window.outerHeight - window.innerHeight > threshold;

//       if (widthThreshold || heightThreshold) {
//         alert("Tools are open!");
//       }
//     };

//     document.addEventListener('contextmenu', handleContextMenu);
//     document.addEventListener('keydown', handleKeyDown);
//     const intervalId = setInterval(checkDevTools, 1000);

//     // Clean up the event listeners and interval when the component unmounts
//     return () => {
//       document.removeEventListener('contextmenu', handleContextMenu);
//       document.removeEventListener('keydown', handleKeyDown);
//       clearInterval(intervalId);
//     };
//   }, []);

// };

// export default MyComponent;
